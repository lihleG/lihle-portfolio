"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { introStore } from "@/lib/intro-store";
import { prefersReducedMotion } from "@/lib/gsap";

const SEEN_KEY = "lg-intro-seen";

function wasSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage unavailable — intro simply plays again next visit */
  }
}

/** Short cinematic intro. Skipped for reduced-motion users and repeat visits in the same session. */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || wasSeen()) {
      // Unmount instantly — no exit animation for repeat visits / reduced motion
      setSkipped(true);
      introStore.complete();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        markSeen();
        setVisible(false);
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (skipped) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        introStore.complete();
      }}
    >
      {visible ? (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl font-semibold tracking-tight sm:text-5xl"
            >
              {siteConfig.name}
            </motion.p>
          </div>
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted">
            {siteConfig.title}
          </p>

          <div className="mt-12 w-48 sm:w-64">
            <div className="h-px w-full bg-white/10">
              <div
                className="h-px bg-gradient-to-r from-violet to-blue"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-right font-mono text-xs tabular-nums text-muted">
              {String(progress).padStart(3, "0")}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
