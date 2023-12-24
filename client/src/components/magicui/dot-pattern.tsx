import { cn } from "@/lib/utils";
import React, { useId } from "react";

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  [key: string]: any;
  children: React.ReactNode;
}
export default function DotPattern({
  children,
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <>
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/40",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle id="pattern-circle" cx={cy} cy={cy} r={cr} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>
      {children}
    </>
  );
}

// export default DotPattern;

// "use client";

// import React from "react";

// import useMouseMove from "@/hooks/use-mouse-move";

// export default function DotPattern({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // --x and --y will be updated based on mouse position
//   useMouseMove();
//   return (
//     <>"bg-white text-slate-900 antialiased light"
//       <div className="fixed left-0 top-0 -z-50">
//         <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden">
//           <div className="bg-muted-foreground/20 absolute inset-0 z-[-1]" />
//           <div className="bg-gradient-radial from-muted-foreground/80 absolute left-[--x] top-[--y] z-[-1] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full from-0% to-transparent to-90% blur-md" />
//           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
//             <defs>
//               <pattern
//                 id="dotted-pattern"
//                 width="16"
//                 height="16"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <circle cx="2" cy="2" r="1" fill="black" />
//               </pattern>
//               <mask id="dots-mask">
//                 <rect width="100%" height="100%" fill="white" />
//                 <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
//               </mask>
//             </defs>
//             <rect
//               width="100%"
//               height="100%"
//               fill="hsl(var(--background))"
//               mask="url(#dots-mask)"
//             />
//           </svg>
//         </div>
//       </div>

//       {children}
//     </>
//   );
// }
