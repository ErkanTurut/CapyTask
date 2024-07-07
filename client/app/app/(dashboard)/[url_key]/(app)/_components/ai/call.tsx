"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  ControlBar,
  useRoomContext,
  useConnectionState,
  useConnectionQualityIndicator,
  TrackReferenceOrPlaceholder,
  useTracks,
  useRemoteParticipants,
} from "@livekit/components-react";
import { useMultibandTrackVolume } from "@/lib/hooks/use-track-volume";
import { RoomEvent, Track, ConnectionState } from "livekit-client";
import { useMemo } from "react";
import { AgentMultibandAudioVisualizer } from "./AgentMultibandAudioVisualizer";
import { BorderBeam } from "@/components/ui/border-beam";

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
        {/* <Button
          onClick={() =>
            fetch("/api/ai/tts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messages: [
                  {
                    role: "system",
                    text: "You are a voice assistant created by Gembuddy. Your interface with users will be voice. Pretend we're having a conversation, no special formatting or headings, just natural speech. Before using a tool, tell the user what you're about to do and that it may take a few seconds. ",
                    images: [],
                  },
                  { role: "user", text: "Hi.", images: [] },
                  {
                    role: "assistant",
                    text: '{"type":"text","text":"Hello! How can I assist you today?"}',
                    images: [],
                  },
                  { role: "user", text: "How are you?", images: [] },
                  {
                    role: "assistant",
                    text: `{"type":"text","text":"I'm just a program, so I don't have feelings, but thanks for asking! How can I assist you today?"}`,
                    images: [],
                  },
                  {
                    role: "user",
                    text: "Can you give me the name of my company?",
                    images: [],
                  },
                  {
                    role: "assistant",
                    text: `{"type":"text","text":"I'll need a few seconds to fetch the name of your company. Let me get that information for you."}`,
                    images: [],
                  },
                  {
                    role: "assistant",
                    text: JSON.stringify({
                      type: "tool-call",
                      toolCallId: "call_4e3k31WnGz9K6KC4wvhCxkrH",
                      toolName: "get_user_company",
                      args: {},
                    }),
                    images: [],
                  },
                  {
                    role: "tool",
                    text: JSON.stringify({
                      type: "tool-result",
                      toolCallId: "call_4e3k31WnGz9K6KC4wvhCxkrH",
                      toolName: "get_user_company",
                      result: [
                        {
                          id: "4doRuGC8pE",
                          public_id: "47200263-44c5-497a-9cc3-961169201d73",
                          name: "ACME CORP.",
                          description: "a cool IT company",
                          created_at: "2024-06-01T17:32:44.801557+00:00",
                          updated_at: "2024-06-01T17:32:44.801557+00:00",
                          workspace_id: "vyhsM7Ce4u",
                          company_user: [
                            { user_id: "a20f9c18-78a0-4dc6-8253-ffee591247a5" },
                          ],
                        },
                      ],
                    }),
                    images: [],
                  },
                  {
                    role: "assistant",
                    text: '{"type":"text","text":"Your company is named ACME CORP. How else can I assist you today?"}',
                    images: [],
                  },
                  {
                    role: "user",
                    text: "And do you have the description?",
                    images: [],
                  },
                ],
              }),
            })
          }
        >
          TEST
        </Button> */}
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
