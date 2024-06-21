import asyncio
import logging

from livekit import agents, rtc
from livekit.agents import (
    JobContext,
    JobRequest,
    WorkerOptions,
    cli,
    stt,
    transcription,
)
# from livekit.agents import JobContext, JobRequest, WorkerOptions, cli, stt

from livekit.plugins import openai, silero  # type: ignore
import requests


async def _forward_transcription(
    stt_stream: stt.SpeechStream,
    stt_forwarder: transcription.STTSegmentsForwarder,
):
    """Forward the transcription to the client and log the transcript in the console"""
    async for ev in stt_stream:
        # logging.info(ev.alternatives)

        stt_forwarder.update(ev)
        if ev.type == stt.SpeechEventType.INTERIM_TRANSCRIPT:
            print(ev.alternatives[0].text, end="")
        elif ev.type == stt.SpeechEventType.FINAL_TRANSCRIPT:
            print("\n")
            print(" -> ", ev.alternatives[0].text)
            url_post = "http://localhost:3000/api/ai/tts"
            post_response = requests.post(
                url_post, json=ev.alternatives[0].text)
            # print(post_response.text)


async def entrypoint(job: JobContext):
    logging.info("starting speech-to-text example")
    openai_stt = stt.StreamAdapter(
        stt=openai.STT(), vad=silero.VAD())
    tasks = []

    async def transcribe_track(participant: rtc.RemoteParticipant, track: rtc.Track):
        audio_stream = rtc.AudioStream(track)
        stt_forwarder = transcription.STTSegmentsForwarder(
            room=job.room, participant=participant, track=track
        )
        stt_stream = openai_stt.stream()

        stt_task = asyncio.create_task(
            _forward_transcription(stt_stream, stt_forwarder)
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
