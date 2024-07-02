import asyncio
import logging
from dataclasses import dataclass, field, asdict
from livekit import agents, rtc
from livekit.agents import (
    JobContext,
    JobRequest,
    WorkerOptions,
    cli,
    stt,
    tts,
    transcription,
    tokenize
)
from livekit.agents.llm import (
    ChatContext,
    ChatMessage,
    ChatRole,
    ChatImage
)
from livekit.plugins import deepgram, openai  # type: ignore

import requests

import json


class ChatRole(enum.Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"
    TOOL = "tool"


class MetadataType(dict):
    {
        user_session: str,
    }


def chat_message_to_dict(message: ChatMessage) -> dict:
    return {
        'role': message.role.value,
        'text': message.text,
        'images': [image for image in message.images]
    }


def chat_context_to_dict(context: ChatContext) -> dict:
    return {
        'messages': [chat_message_to_dict(message) for message in context.messages]
    }


async def _forward_transcription(
    stt_stream: stt.SpeechStream,
    stt_forwarder: transcription.STTSegmentsForwarder,
    tts: tts.TTS,
    source: rtc.AudioSource,
    ctx: ChatContext,
):
    async for ev in stt_stream:
        stt_forwarder.update(ev)
        if ev.type == stt.SpeechEventType.INTERIM_TRANSCRIPT:
            print(ev.alternatives[0].text, end="")
        elif ev.type == stt.SpeechEventType.END_OF_SPEECH:
            ctx.messages.append(ChatMessage(
                role=ChatRole.USER, text=ev.alternatives[0].text))

            url_post = "http://localhost:3000/api/ai/tts"
            try:

                messages_serializable = chat_context_to_dict(ctx)

                response = requests.post(
                    url_post, json=messages_serializable, cookies={})
                data = response.json()["result"]["messages"]
                logging.info(data)

                message = ChatMessage(
                    role=ChatRole(data[0]['role']),
                    text=data[0]['text'],
                    images=[ChatImage(image=image)
                            for image in data[0].get('images', [])]
                )

                ctx.messages.append(message)
                await _forward_audio(tts, source, message.text)
            except Exception as e:
                logging.error(e)


async def _forward_audio(
    tts: tts.TTS,  # define the variable with the correct type
    source: rtc.AudioSource,
    text
):
    logging.info(f"Forwarding audio for text: {text}")
    async for output in tts.synthesize(text):
        await source.capture_frame(output.data)


async def entrypoint(job: JobContext):
    json.loads(job.room.metadata)

    initial_ctx = ChatContext(
        messages=[
            ChatMessage(
                role=ChatRole.SYSTEM,
                text="You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech.",
            )
        ]
    )

    # TTS
    openai_tts = tts.StreamAdapter(
        tts=openai.TTS(voice="alloy"),
        sentence_tokenizer=tokenize.basic.SentenceTokenizer(),
    )

    source = rtc.AudioSource(openai_tts.sample_rate, openai_tts.num_channels)
    track = rtc.LocalAudioTrack.create_audio_track("agent-mic", source)
    options = rtc.TrackPublishOptions()
    options.source = rtc.TrackSource.SOURCE_MICROPHONE

    # STT
    stt = deepgram.STT(min_silence_duration=200, interim_results=False)
    tasks = []

    async def transcribe_track(participant: rtc.RemoteParticipant, track: rtc.Track):
        audio_stream = rtc.AudioStream(track)
        stt_forwarder = transcription.STTSegmentsForwarder(
            room=job.room, participant=participant, track=track
        )
        stt_stream = stt.stream()

        stt_task = asyncio.create_task(
            _forward_transcription(
                stt_stream=stt_stream, stt_forwarder=stt_forwarder, tts=openai_tts, source=source, ctx=initial_ctx)
        )
        tasks.append(stt_task)

        async for ev in audio_stream:
            stt_stream.push_frame(ev.frame)

    @job.room.on("track_subscribed")
    def on_track_subscribed(
        track: rtc.Track,
        publication: rtc.TrackPublication,
        participant: rtc.RemoteParticipant,
    ):
        if track.kind == rtc.TrackKind.KIND_AUDIO:
            tasks.append(asyncio.create_task(
                transcribe_track(participant, track)))

    await job.room.local_participant.publish_track(track, options)

    await asyncio.sleep(2)
    logging.info('Saying "Hello!"')
    async for output in openai_tts.synthesize("Hello how can I help you today?"):
        await source.capture_frame(output.data)


async def request_fnc(req: JobRequest) -> None:
    await req.accept(entrypoint, auto_subscribe=agents.AutoSubscribe.AUDIO_ONLY)


if __name__ == "__main__":
    cli.run_app(WorkerOptions(request_fnc=request_fnc))
