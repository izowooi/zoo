"use client";

import { useEffect, useState } from "react";

interface AnimatedMarkerProps {
  d: string;
  color: string;
  durationMs: number;
}

export default function AnimatedMarker({ d, color, durationMs }: AnimatedMarkerProps) {
  const [traveled, setTraveled] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTraveled(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="absolute h-3 w-3 rounded-full shadow-md"
      style={{
        backgroundColor: color,
        offsetPath: `path('${d}')`,
        offsetDistance: traveled ? "100%" : "0%",
        offsetRotate: "0deg",
        transform: "translate(-50%, -50%)",
        transition: `offset-distance ${durationMs}ms linear`,
      }}
    />
  );
}
