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
    transcription,
)
from livekit.agents.llm import (
    ChatContext,
    ChatMessage,
    ChatRole,
    ChatImage
)
from livekit.plugins import deepgram  # type: ignore

import requests


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


def dict_to_chat_message(data: dict) -> ChatMessage:
    return ChatMessage(
        role=ChatRole(data['role']),
        text=data['text'],
        images=[ChatImage(image=image) for image in data.get('images', [])]
    )


async def _forward_transcription(
    stt_stream: stt.SpeechStream,
    stt_forwarder: transcription.STTSegmentsForwarder,
    chat_ctx: ChatContext,
):
    """Forward the transcription to the client and log the transcript in the console"""
    async for ev in stt_stream:

        stt_forwarder.update(ev)
        if ev.type == stt.SpeechEventType.INTERIM_TRANSCRIPT:
            print(ev.alternatives[0].text, end="")
        # elif ev.type == stt.SpeechEventType.FINAL_TRANSCRIPT:
        #     print("\n")
        #     print(" -> ", ev.alternatives[0].text)
        #     # print(post_response.text)
        elif ev.type == stt.SpeechEventType.END_OF_SPEECH:
            chat_ctx.messages.append(ChatMessage(
                role=ChatRole.USER, text=ev.alternatives[0].text))
            url_post = "http://localhost:3000/api/ai/tts"
            try:
                response = requests.post(
                    url_post, json=chat_context_to_dict(chat_ctx), stream=True)
                response.raise_for_status()
                logging.info(response.json())
                chat_message_response = dict_to_chat_message(response.json())
                logging.info(chat_ctx.messages)
                chat_ctx.messages.append(chat_message_response)
                logging.info(chat_message_response)

            except requests.exceptions.RequestException as e:
                logging.error(e)
            except Exception as e:
                logging.error(e)


async def entrypoint(job: JobContext):

    initial_ctx = ChatContext(
        messages=[
            ChatMessage(
                role=ChatRole.SYSTEM,
                text="You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech.",
            )
        ]
    )

    stt = deepgram.STT(min_silence_duration=500, interim_results=False)

    tasks = []

    async def transcribe_track(participant: rtc.RemoteParticipant, track: rtc.Track):
        audio_stream = rtc.AudioStream(track)
        stt_forwarder = transcription.STTSegmentsForwarder(
            room=job.room, participant=participant, track=track
        )
        stt_stream = stt.stream()

        stt_task = asyncio.create_task(
            _forward_transcription(
                stt_stream, stt_forwarder, chat_ctx=initial_ctx)
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


async def request_fnc(req: JobRequest) -> None:
    await req.accept(entrypoint, auto_subscribe=agents.AutoSubscribe.AUDIO_ONLY)


if __name__ == "__main__":
    cli.run_app(WorkerOptions(request_fnc=request_fnc))
