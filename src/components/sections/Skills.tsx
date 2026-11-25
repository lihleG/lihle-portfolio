"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties } from "react";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories, type SkillCategoryId } from "@/data/skills";
import { cn } from "@/lib/utils";

type Filter = "all" | SkillCategoryId;

export function Skills() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...skillCategories.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <OutlineWord word="STACK" />
      <div className="container-x">
        <SectionHeading
          titleId="skills-title"
          index="02"
          eyebrow="Technical skills"
          title="The technology ecosystem I build with."
          highlight={["ecosystem"]}
          description="Grouped by the part of a product they help me build. These are the tools I work with and keep learning — hover a card to explore, or filter by area."
        />

        <div role="group" aria-label="Filter technologies by area" className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                data-cursor="button"
                className={cn(
                  "relative rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                  on ? "border-transparent text-bg" : "border-white/10 text-muted hover:text-white",
                )}
              >
                {on ? (
                  <motion.span
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {skillCategories.map((cat, ci) => {
            const dimmed = filter !== "all" && filter !== cat.id;
            return (
              <Reveal key={cat.id} delay={0.06 * ci}>
                <div
                  className={cn(
                    "surface-card h-full rounded-3xl p-6 transition-all duration-500 sm:p-8",
                    dimmed && "scale-[0.985] opacity-30 saturate-0",
                  )}
                >
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{cat.label}</h3>
                      <p className="mt-1 text-sm text-muted">{cat.blurb}</p>
                    </div>
                    <span className="font-mono text-xs text-white/40">
                      {String(cat.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {cat.skills.map((skill, si) => (
                      <motion.li
                        key={skill.name}
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: si * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{ "--c": skill.color } as CSSProperties}
                          className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_18px_40px_-18px_var(--c)]"
                        >
                          <skill.icon
                            aria-hidden="true"
                            className="size-7 text-white/60 transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--c)]"
                          />
                          <span className="text-sm font-medium text-white/90">{skill.name}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
