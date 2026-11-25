"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { useFinePointer } from "@/hooks/useFinePointer";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Mirror the layout on alternating cards. */
  flip?: boolean;
  priority?: boolean;
}

export function ProjectCard({ project, flip = false, priority = false }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const tilt = finePointer && !reduce;

  // 3D tilt following the cursor over the preview
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View the ${project.name} case study`}
          data-cursor="button"
          className="block [perspective:1400px]"
          onPointerMove={(e) => {
            if (!tilt) return;
            const r = e.currentTarget.getBoundingClientRect();
            px.set((e.clientX - r.left) / r.width - 0.5);
            py.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
          }}
        >
          <motion.div
            style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
            whileHover={tilt ? { scale: 1.015 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectPreview project={project} priority={priority} />
          </motion.div>
        </Link>
      </Reveal>

      <Reveal delay={0.1} className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <p className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-violet">Project {project.index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-white/15" />
          {project.tagline}
        </p>

        <h3
          id={`project-${project.slug}`}
          className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {project.name}
        </h3>

        <p className="mt-5 text-base leading-relaxed text-white/85">{project.description}</p>

        <dl className="mt-6 space-y-5 text-sm">
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-violet">Problem</dt>
            <dd className="mt-1.5 leading-relaxed text-muted">{project.problem}</dd>
          </div>

          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-violet">Built with</dt>
            <dd className="mt-2">
              {project.techStack.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <PendingNote className="py-2.5 text-xs">Technology details are being added.</PendingNote>
              )}
            </dd>
          </div>

          {project.features.length > 0 ? (
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-violet">Key features</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <li key={f} className="rounded-full bg-gradient-to-r from-violet/15 to-blue/15 px-3 py-1 text-xs text-white/90">
                      {f}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8">
          <ProjectLinks project={project} showCaseStudy />
        </div>
      </Reveal>
    </article>
  );
}
