import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Large visual preview. Shows the real screenshot (optimised via next/image) when
 * `project.image` exists in /public, otherwise an abstract, clearly-labelled placeholder.
 */
export function ProjectPreview({
  project,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 58vw, 100vw",
}: ProjectPreviewProps) {
  return (
    <div
      style={{ "--a": project.accent } as CSSProperties}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface shadow-[0_40px_120px_-40px_var(--a)]",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-1.5 border-b border-white/[0.07] bg-bg/70 px-4 backdrop-blur">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="mx-auto h-4 w-1/3 rounded-full bg-white/[0.06]" />
      </div>

      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} application screenshot`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top pt-9"
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder preview for ${project.name}. A real screenshot will replace this.`}
          className="absolute inset-0 pt-9"
        >
          <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_0%,color-mix(in_srgb,var(--a)_30%,transparent),transparent_70%)]" />
          <div className="relative h-full p-4 sm:p-6">
            {project.variant === "listings" && <Listings />}
            {project.variant === "commerce" && <Commerce />}
            {project.variant === "finance" && <Finance />}
          </div>
          <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-bg/70 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted backdrop-blur">
            Screenshot placeholder
          </span>
        </div>
      )}
    </div>
  );
}

const block = "rounded-lg bg-white/[0.06]";
const accentBlock = "rounded-lg bg-[color-mix(in_srgb,var(--a)_45%,transparent)]";

function Listings() {
  return (
    <div className="grid h-full grid-cols-[28%_1fr] gap-4">
      <div className="space-y-3">
        <div className={cn(block, "h-8")} />
        <div className={cn(accentBlock, "h-5 w-2/3")} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={cn(block, "h-3")} style={{ width: `${90 - i * 9}%` }} />
        ))}
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2">
            <div
              className={cn("flex-1 rounded-lg", i % 3 === 0 ? "bg-[color-mix(in_srgb,var(--a)_40%,transparent)]" : "bg-white/[0.07]")}
            />
            <div className={cn(block, "h-2 w-4/5")} />
            <div className={cn(block, "h-2 w-1/2")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Commerce() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className={cn(accentBlock, "h-6 w-24")} />
        <div className={cn(block, "h-6 flex-1")} />
        <div className={cn(block, "size-6 rounded-full")} />
      </div>
      <div className="grid flex-1 grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2">
            <div
              className={cn("flex-1 rounded-lg", i === 1 ? "bg-[color-mix(in_srgb,var(--a)_40%,transparent)]" : "bg-white/[0.07]")}
            />
            <div className={cn(block, "h-2 w-3/4")} />
            <div className={cn(accentBlock, "h-2 w-1/3")} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
        <div className={cn(block, "size-8 rounded-full")} />
        <div className="h-2 flex-1 rounded-full bg-white/[0.08]">
          <div className="h-full w-2/3 rounded-full bg-[color-mix(in_srgb,var(--a)_70%,transparent)]" />
        </div>
      </div>
    </div>
  );
}

function Finance() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
            <div className={cn(block, "h-2 w-1/2")} />
            <div className={cn(i === 0 ? accentBlock : block, "h-4 w-3/4")} />
          </div>
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]">
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
          <defs>
            <linearGradient id="fin-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--a)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--a)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,90 C40,80 60,95 100,70 S170,40 210,55 S290,20 330,35 S380,15 400,10 L400,120 L0,120 Z"
            fill="url(#fin-fill)"
          />
          <path
            d="M0,90 C40,80 60,95 100,70 S170,40 210,55 S290,20 330,35 S380,15 400,10"
            fill="none"
            stroke="var(--a)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
            <div className={cn(block, "size-6 rounded-full")} />
            <div className="h-2 flex-1 rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-[color-mix(in_srgb,var(--a)_70%,transparent)]"
                style={{ width: i === 0 ? "62%" : "38%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
