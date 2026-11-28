"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type Phase = "idle" | "hidden" | "shown";

/**
 * Scroll-reveal without any animation library.
 *
 *  • Content is fully visible on the server and until JavaScript has measured it.
 *  • Only elements that start BELOW the fold are hidden, then revealed as they approach the viewport.
 *  • Two independent triggers (IntersectionObserver + scroll position) so content can never get stuck hidden.
 *  • Reduced-motion users never get anything hidden.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reached = () => el.getBoundingClientRect().top < window.innerHeight * 0.92;

    // Already on screen (or scrolled past) → leave it visible, no animation needed
    if (reached()) return;

    setPhase("hidden");

    let done = false;
    const cleanups: Array<() => void> = [];
    const reveal = () => {
      if (done) return;
      done = true;
      setPhase("shown");
      cleanups.forEach((fn) => fn());
    };
    const check = () => {
      if (reached()) reveal();
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(el);
      cleanups.push(() => io.disconnect());
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    cleanups.push(() => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    });

    return () => {
      done = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return { ref, phase };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade-and-rise reveal when scrolled into view. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const { ref, phase } = useRevealOnScroll<HTMLDivElement>();

  const style =
    phase === "hidden"
      ? { opacity: 0, transform: `translateY(${y}px)` }
      : phase === "shown"
        ? {
            opacity: 1,
            transform: "none",
            transition: `opacity 900ms ${REVEAL_EASE} ${delay}s, transform 900ms ${REVEAL_EASE} ${delay}s`,
          }
        : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
