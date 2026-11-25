"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Card with a soft glow that follows the cursor (pure CSS vars, no re-renders). */
export function SpotlightCard({ children, className, onMouseMove, ...rest }: SpotlightCardProps) {
  return (
    <div
      {...rest}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        onMouseMove?.(e);
      }}
      className={cn("spotlight surface-card rounded-3xl", className)}
    >
      {children}
    </div>
  );
}
