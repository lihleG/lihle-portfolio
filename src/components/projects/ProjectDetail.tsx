import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/data/projects";

interface ProjectDetailProps {
  project: Project;
  next: Project;
}

function Block({ label, children, delay = 0 }: { label: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-violet">{label}</h2>
      {children}
    </Reveal>
  );
}

export function ProjectDetail({ project, next }: ProjectDetailProps) {
  return (
    <article className="relative pb-28 pt-28 md:pb-40 md:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[40rem] opacity-70"
        style={{
          background: `radial-gradient(55% 60% at 70% 0%, color-mix(in srgb, ${project.accent} 22%, transparent), transparent 70%)`,
        }}
      />
      <div className="container-x">
        <Reveal>
          <Link
            href="/#projects"
            data-cursor="button"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
            All projects
          </Link>
        </Reveal>

        <header className="max-w-4xl">
          <Reveal>
            <p className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              <span className="text-violet">Project {project.index}</span>
              <span aria-hidden="true" className="h-px w-10 bg-white/15" />
              {project.tagline}
            </p>
          </Reveal>
          <AnimatedHeading
            as="h1"
            text={project.name}
            className="text-[clamp(3rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{project.description}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <ProjectLinks project={project} />
          </Reveal>
        </header>

        <Reveal className="mt-14 md:mt-20" y={50}>
          <ProjectPreview project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
        </Reveal>

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="space-y-14">
            <Block label="The problem">
              <p className="text-xl leading-relaxed text-white/90">{project.problem}</p>
            </Block>

            <Block label="Technologies used" delay={0.1}>
              {project.techStack.length > 0 ? (
                <ul className="flex flex-wrap gap-2.5">
                  {project.techStack.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <PendingNote>
                  The technology stack for this project is being documented and will appear here.
                </PendingNote>
              )}
            </Block>
          </div>

          <div className="space-y-14">
            <Block label="Key features">
              {project.features.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.features.map((f, i) => (
                    <li key={f}>
                      <SpotlightCard className="h-full p-5">
                        <span className="font-mono text-xs text-violet">{String(i + 1).padStart(2, "0")}</span>
                        <p className="mt-3 font-display text-lg font-medium tracking-tight">{f}</p>
                      </SpotlightCard>
                    </li>
                  ))}
                </ul>
              ) : (
                <PendingNote>The feature list for this project is being documented and will appear here.</PendingNote>
              )}
            </Block>

            <Block label="Technical challenges" delay={0.1}>
              {project.challenges.length > 0 ? (
                <ul className="space-y-4">
                  {project.challenges.map((c) => (
                    <li key={c} className="surface-card rounded-2xl p-5 leading-relaxed text-white/85">
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <PendingNote>
                  The technical challenges and how they were solved will be written up here.
                </PendingNote>
              )}
            </Block>
          </div>
        </div>

        {/* Next project */}
        <Reveal className="mt-28 md:mt-40">
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="button"
            aria-label={`Next project: ${next.name}`}
            className="group glass relative block overflow-hidden rounded-[2rem] p-8 sm:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Next project</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">{next.name}</p>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-bg transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110">
                <ArrowRight aria-hidden="true" className="size-6" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
