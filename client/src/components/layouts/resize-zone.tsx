"use client";
import { ElementRef, useEffect, useRef, useState, ReactNode, FC } from "react";
import { Shell } from "../shells/shell";

interface ResizeZoneProps {
  children: ReactNode;
}

const ResizeZone: FC<ResizeZoneProps> = ({ children }) => {
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(event);
  };

  return (
    <Shell
      variant="sidebar"
      className="border-r hidden max-h-[100vh] overflow-y-hidden w-[230px] shrink-0 lg:sticky lg:top-28 lg:block backdrop-blur-[1px] group/sidebar"
      as={"aside"}
    >
      {children}
      <div
        onMouseDown={handleMouseDown}
        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-accent right-0 top-0"
      />
    </Shell>
  );
};

export default ResizeZone;
