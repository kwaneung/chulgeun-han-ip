"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

import "./SpotlightCard.css";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(56, 189, 248, 0.2)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`rb-spotlight ${className}`}
    >
      {children}
    </div>
  );
}
