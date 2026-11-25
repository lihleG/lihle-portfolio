import { Briefcase } from "lucide-react";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ExperienceEntry } from "@/data/experience";

interface ExperienceProps {
  entries: ExperienceEntry[];
}

export function Experience({ entries }: ExperienceProps) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 md:py-40">
      <OutlineWord word="CAREER" />
      <div className="container-x">
        <SectionHeading
          titleId="experience-title"
          index="04"
          eyebrow="Professional experience"
          title="Where I've worked."
          highlight={["worked"]}
          description="Employment history, kept separate from the personal software projects above."
        />

        {entries.length === 0 ? <EmptyState /> : <Timeline entries={entries} />}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <Reveal>
      <div className="relative max-w-3xl pl-10 md:pl-14">
        <span aria-hidden="true" className="absolute bottom-0 left-[0.6rem] top-2 w-px bg-gradient-to-b from-violet/60 via-white/10 to-transparent md:left-[1.1rem]" />
        <span aria-hidden="true" className="absolute left-0 top-1 grid size-[1.35rem] place-items-center rounded-full border border-violet/60 bg-bg md:left-[0.45rem]">
          <span className="size-1.5 rounded-full bg-violet" />
        </span>
        <div className="rounded-3xl border border-dashed border-white/15 p-8">
          <Briefcase aria-hidden="true" className="mb-4 size-6 text-violet" />
          <h3 className="font-display text-xl font-semibold tracking-tight">Employment history coming soon</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Professional roles will appear here as a timeline. In the meantime, the featured projects above
            are the best picture of how I work.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="relative max-w-4xl">
      <span aria-hidden="true" className="absolute bottom-2 left-[0.6rem] top-2 w-px bg-gradient-to-b from-violet via-blue/40 to-transparent md:left-[1.1rem]" />
      {entries.map((e, i) => (
        <li key={e.id} className="relative pb-14 pl-10 last:pb-0 md:pl-14">
          <span aria-hidden="true" className="absolute left-0 top-2 grid size-[1.35rem] place-items-center rounded-full border border-violet/60 bg-bg md:left-[0.45rem]">
            <span className="size-1.5 rounded-full bg-violet" />
          </span>

          <Reveal delay={i * 0.05}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {e.start} — {e.end}
              {e.location ? <span className="text-white/40"> · {e.location}</span> : null}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{e.position}</h3>
            <p className="mt-1 text-base text-violet">{e.company}</p>

            {e.responsibilities.length > 0 ? (
              <div className="mt-6">
                <h4 className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Responsibilities
                </h4>
                <ul className="space-y-2.5 text-sm leading-relaxed text-muted md:text-base">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-white/30" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {e.achievements && e.achievements.length > 0 ? (
              <div className="mt-6">
                <h4 className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Achievements
                </h4>
                <ul className="space-y-2.5 text-sm leading-relaxed text-white/85 md:text-base">
                  {e.achievements.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-blue" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
