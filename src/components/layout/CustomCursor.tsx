"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * Desktop-only trailing ring + dot. The native cursor is left visible
 * so nothing is lost for accessibility.
 */
export function CustomCursor() {
  const finePointer = useFinePointer();
  const reduce = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  const enabled = finePointer && !reduce;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor], input, textarea, summary")));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-white/50 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
