"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Database, Lightbulb, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  icon: LucideIcon;
  text: string;
}

const STEPS: Step[] = [
  { label: "Idea", icon: Lightbulb, text: "Understand the problem and who it is for." },
  { label: "Design", icon: PenTool, text: "Shape the flows and interface before writing code." },
  { label: "Development", icon: Code2, text: "Build the front end and back end as one product." },
  { label: "Database", icon: Database, text: "Model data in PostgreSQL, Supabase, MongoDB or Firebase." },
  { label: "Deployment", icon: Rocket, text: "Ship to Vercel or Netlify, then keep improving." },
];

/**
 * Animated IDEA → DESIGN → DEVELOPMENT → DATABASE → DEPLOYMENT pipeline.
 * A GSAP ScrollTrigger scrubs the connecting line as you scroll; nodes light up as it passes.
 */
export function ProcessFlow() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const hLine = useRef<HTMLDivElement>(null);
  const vLine = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(reduce ? STEPS.length - 1 : 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduce) {
      setActive(STEPS.length - 1);
      hLine.current && (hLine.current.style.transform = "scaleX(1)");
      vLine.current && (vLine.current.style.transform = "scaleY(1)");
      return;
    }

    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    const track = (line: HTMLDivElement | null, prop: "scaleX" | "scaleY") => {
      if (!line) return;
      gsap.fromTo(
        line,
        { [prop]: 0 },
        {
          [prop]: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.5,
            onUpdate: (self) =>
              setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * (STEPS.length - 1) + 0.02))),
          },
        },
      );
    };

    mm.add("(min-width: 1024px)", () => track(hLine.current, "scaleX"));
    mm.add("(max-width: 1023px)", () => track(vLine.current, "scaleY"));

    return () => mm.revert();
  }, [reduce]);

  return (
    <div ref={rootRef} className="glass relative rounded-[2rem] p-6 sm:p-10 lg:p-12">
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-muted">How I build</p>

      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-4" aria-label="Development process">
        {/* Desktop connector */}
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-white/10 lg:block">
          <div
            ref={hLine}
            className="h-full origin-left bg-gradient-to-r from-violet to-blue"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        {/* Mobile connector */}
        <div aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-white/10 lg:hidden">
          <div
            ref={vLine}
            className="h-full origin-top bg-gradient-to-b from-violet to-blue"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {STEPS.map((step, i) => {
          const on = i <= active;
          const Icon = step.icon;
          return (
            <li key={step.label} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center">
              <motion.span
                animate={reduce ? undefined : { scale: on ? 1 : 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className={cn(
                  "relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border bg-bg transition-all duration-500",
                  on
                    ? "border-violet/60 text-white shadow-[0_0_40px_-8px_rgb(139_92_246/0.8)]"
                    : "border-white/10 text-muted",
                )}
              >
                <Icon aria-hidden="true" className="size-6" />
              </motion.span>
              <div className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-45")}>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-violet">
                  Step 0{i + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{step.label}</h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
