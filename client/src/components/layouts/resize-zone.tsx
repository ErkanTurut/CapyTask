"use client";
import { ElementRef, useEffect, useRef, useState, ReactNode, FC } from "react";
import { Shell } from "../shells/shell";

interface ResizeZoneProps {
  children: ReactNode;
}

const ResizeZone: FC<ResizeZoneProps> = ({ children }) => {
  const [isResizing, setResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement | null>(null);
  const initialMouseXRef = useRef<number>(0);
  const initialWidthRef = useRef<number>(0);

  // const handleMouseDown = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   console.log("mousedown");
  //   console.log(resizeRef);
  //   setResizing(true);
  // };

  const handleMouseUp = () => {
    console.log("mouseup");
    setResizing(false);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("mousedown");
    setResizing(true);
    // Save the initial mouse position and the initial width
    const initialMouseX = event.clientX;
    const initialWidth = resizeRef.current?.offsetWidth || 0;
    // Store the initial values in a ref
    initialMouseXRef.current = initialMouseX;
    initialWidthRef.current = initialWidth;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing && resizeRef.current) {
      // Calculate the new width based on the initial mouse position
      const newWidth =
        initialWidthRef.current + (event.clientX - initialMouseXRef.current);
      resizeRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseEnter = () => {
    // Add any hover effect you want when the mouse enters the div
  };

  const handleMouseLeave = () => {
    // Add any hover effect cleanup you want when the mouse leaves the div
  };

  // useEffect(() => {
  //   if (resizeRef.current) {
  //     resizeRef.current.addEventListener("mouseenter", handleMouseEnter);
  //     resizeRef.current.addEventListener("mouseleave", handleMouseLeave);
  //   }

  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     if (resizeRef.current) {
  //       resizeRef.current.removeEventListener("mouseenter", handleMouseEnter);
  //       resizeRef.current.removeEventListener("mouseleave", handleMouseLeave);
  //     }

  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isResizing]);

  return (
    <aside
      ref={resizeRef}
      className="border-r hidden max-h-[100vh] overflow-y-hidden w-[230px]  shrink-0 lg:sticky lg:top-28 lg:block backdrop-blur-[1px] group/sidebar"
    >
      <Shell variant="sidebar" className="h-full">
        {children}
        <div
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-accent right-0 top-0"
        />
      </Shell>
    </aside>
  );
};

export default ResizeZone;
