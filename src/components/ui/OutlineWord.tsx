"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface OutlineWordProps {
  word: string;
  className?: string;
}

/** Huge decorative outlined word that drifts slowly as you scroll (GSAP ScrollTrigger parallax). */
export function OutlineWord({ word, className }: OutlineWordProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 18 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "text-outline pointer-events-none absolute right-0 top-10 -z-10 select-none font-display text-[22vw] font-bold leading-none tracking-tighter md:text-[16rem]",
        className,
      )}
    >
      {word}
    </div>
  );
}
