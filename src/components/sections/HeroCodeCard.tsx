"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/config/site";

interface HeroCodeCardProps {
  play: boolean;
}

/** Decorative glass "editor" card that signals "developer" at a glance. */
export function HeroCodeCard({ play }: HeroCodeCardProps) {
  const reduce = useReducedMotion();

  const lines = [
    <>
      <span className="text-violet">const</span> <span className="text-sky-300">developer</span> = {"{"}
    </>,
    <>
      {"  "}name: <span className="text-emerald-300/90">&quot;{siteConfig.name}&quot;</span>,
    </>,
    <>
      {"  "}role: <span className="text-emerald-300/90">&quot;{siteConfig.title}&quot;</span>,
    </>,
    <>
      {"  "}based: <span className="text-emerald-300/90">&quot;Johannesburg, ZA&quot;</span>,
    </>,
    <>
      {"  "}selfTaught: <span className="text-amber-300/90">true</span>,
    </>,
    <>
      {"  "}stack: [<span className="text-emerald-300/90">&quot;TypeScript&quot;</span>,{" "}
      <span className="text-emerald-300/90">&quot;React&quot;</span>,{" "}
      <span className="text-emerald-300/90">&quot;Node.js&quot;</span>],
    </>,
    <>{"}"};</>,
  ];

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, y: 30, rotate: 2 }}
      animate={play || reduce ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 30, rotate: 2 }}
      transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass w-[22rem] rounded-2xl p-5 shadow-[0_30px_80px_-30px_rgb(139_92_246/0.5)]"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[0.65rem] tracking-wide text-muted">developer.ts</span>
      </div>
      <div className="whitespace-pre-wrap font-mono text-[0.78rem] leading-relaxed text-white/85">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={play || reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ delay: 1.5 + i * 0.12, duration: 0.5 }}
          >
            {line}
          </motion.div>
        ))}
        <span
          className="mt-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-violet"
          style={{ animation: "caret 1.1s steps(1) infinite" }}
        />
      </div>
    </motion.div>
  );
}
