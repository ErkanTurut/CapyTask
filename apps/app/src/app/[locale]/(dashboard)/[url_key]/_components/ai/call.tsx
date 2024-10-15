"use client";
import { Icons } from "@/components/icons";
import { useMultibandTrackVolume } from "@/lib/hooks/use-track-volume";
import { Button } from "@gembuddy/ui/button";
import {
  TrackReferenceOrPlaceholder,
  useConnectionState,
  useLocalParticipant,
  useRemoteParticipants,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, RoomEvent, Track } from "livekit-client";
import { useMemo } from "react";
import { AgentMultibandAudioVisualizer } from "./AgentMultibandAudioVisualizer";

export function VoiceAgent() {
  const Room = useRoomContext();
  const roomState = useConnectionState();
  const tracks = useTracks();
  const participants = useRemoteParticipants({
    updateOnlyOn: [RoomEvent.ParticipantMetadataChanged],
  });
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const agentParticipant = participants.find((p) => p.isAgent);
  const isAgentConnected = agentParticipant !== undefined;

  let agentAudioTrack: TrackReferenceOrPlaceholder | undefined;
  const aat = tracks.find(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Audio &&
      trackRef.participant.isAgent,
  );
  if (aat) {
    agentAudioTrack = aat;
  } else if (agentParticipant) {
    agentAudioTrack = {
      participant: agentParticipant,
      source: Track.Source.Microphone,
    };
  }

  const subscribedVolumes = useMultibandTrackVolume(
    agentAudioTrack?.publication?.track,
    5,
  );

  const AudioTileContent = useMemo(() => {
    const disconnectedContent = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
        Connect to get started.
      </div>
    );

    const waitingContent = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
        Waiting for agent to connect.
      </div>
    );

    // TODO: keep it in the speaking state until we come up with a better protocol for agent states
    const visualizerContent = (
      <div className="flex h-full w-full items-center justify-center">
        <AgentMultibandAudioVisualizer
          state="speaking"
          barWidth={30}
          minBarHeight={30}
          maxBarHeight={150}
          accentColor="cyan"
          accentShade={500}
          frequencies={subscribedVolumes}
          borderRadius={12}
          gap={16}
        />
      </div>
    );

    if (roomState === ConnectionState.Disconnected) {
      return disconnectedContent;
    }

    if (!agentAudioTrack) {
      return waitingContent;
    }

    return visualizerContent;
  }, [agentAudioTrack, subscribedVolumes, roomState]);

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="border-bord h-full overflow-hidden rounded-md border bg-muted/50">
        {AudioTileContent}
      </div>

      <div className="col2 grid w-full grid-cols-4 gap-2">
        {roomState === ConnectionState.Connected ? (
          <Button
            onClick={async () => {
              await Room?.disconnect();
            }}
            variant={"outline"}
            className="col-span-2"
          >
            <Icons.stop className="mr-2 h-4 w-4" />
            End call
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const { accessToken, url } = await fetch("/api/token").then(
                (res) => res.json(),
              );

              await Room?.connect(url, accessToken, {
                autoSubscribe: true,
              });
            }}
            variant={"outline"}
            className="col-span-2"
          >
            <Icons.play className="mr-2 h-4 w-4" />
            Connect
          </Button>
        )}

        {roomState === ConnectionState.Connected && (
          <Button
            onClick={() => {
              localParticipant?.setMicrophoneEnabled(!isMicrophoneEnabled);
            }}
            variant={"outline"}
            size={"icon"}
          >
            {isMicrophoneEnabled ? (
              <Icons.mic className="h-4 w-4" />
            ) : (
              <Icons.micOff className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
