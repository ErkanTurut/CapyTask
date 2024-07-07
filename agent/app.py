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
from livekit.plugins import deepgram, openai, cartesia  # type: ignore
import time
import requests

import json


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
    job: JobContext
):
    async for ev in stt_stream:
        stt_forwarder.update(ev)
        if ev.type == stt.SpeechEventType.INTERIM_TRANSCRIPT:
            print(ev.alternatives[0].text, end="")
        elif ev.type == stt.SpeechEventType.END_OF_SPEECH:
            start = time.time()
            # transcribe the text
            ctx.messages.append(ChatMessage(
                role=ChatRole.USER, text=json.dumps({
                    "text": ev.alternatives[0].text,
                    "type": "text"
                })
            ))

            url_post = "http://localhost:3000/api/ai/tts"
            try:
                messages_serializable = chat_context_to_dict(ctx)
                response = requests.post(
                    url_post, json=messages_serializable, cookies={
                        "user_session": next(iter(job.room.participants.values())).metadata})
                result = response.json()["result"]

                ctx.messages.clear()
                for chat in result["chatContext"]["messages"]:
                    role = ChatRole(chat['role'])
                    text = chat['text']
                    images = [ChatImage(image=image)
                              for image in chat.get('images', [])]
                    ctx.messages.append(ChatMessage(
                        role=role, text=text, images=images))

                end = time.time()
                logging.info(f"Time taken to process: {end - start}")

                await _forward_audio(tts, source, result["messages"][0]['text'])

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

    initial_ctx = ChatContext(
        messages=[
            # ChatMessage(
            #     role=ChatRole.SYSTEM,
            #     text=json.dumps({"text": "You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech. Before using a tool, tell the user what you're about to do and that it may take a few seconds.",
            #                     "type": "text"})
            # )
        ]
    )

    # TTS
    tts_model = tts.StreamAdapter(
        tts=openai.TTS(voice="alloy"),
        sentence_tokenizer=tokenize.basic.SentenceTokenizer(),
    )

    tts_model = cartesia.TTS(model="sonic-english")

    source = rtc.AudioSource(tts_model.sample_rate, tts_model.num_channels)
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
                stt_stream=stt_stream, stt_forwarder=stt_forwarder, tts=tts_model, source=source, ctx=initial_ctx, job=job)
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

    # for participant in job.room.participants.items():
    #     logging.info(f"Participant: {participant[1].metadata}")

    await asyncio.sleep(2)
    logging.info('Saying "Hello!"')
    async for output in tts_model.synthesize("Hello how can I help you today?"):
        await source.capture_frame(output.data)


async def request_fnc(req: JobRequest) -> None:
    await req.accept(entrypoint, auto_subscribe=agents.AutoSubscribe.AUDIO_ONLY)


if __name__ == "__main__":
    cli.run_app(WorkerOptions(request_fnc=request_fnc))
