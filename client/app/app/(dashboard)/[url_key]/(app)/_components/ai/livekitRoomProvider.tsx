"use client";

import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";

export function LivekitRoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LiveKitRoom
      token={undefined}
      serverUrl={undefined}
      connectOptions={{ autoSubscribe: true }}
    >
      <RoomAudioRenderer />
      {children}
    </LiveKitRoom>
  );
}
