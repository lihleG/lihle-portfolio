import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string[];
  description?: string;
  /** id for the <h2>, referenced by the section's aria-labelledby */
  titleId?: string;
}

export function SectionHeading({ index, eyebrow, title, highlight, description, titleId }: SectionHeadingProps) {
  return (
    <header className="mb-14 max-w-3xl md:mb-20">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-violet">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-violet to-transparent" />
          {eyebrow}
        </p>
      </Reveal>
      <AnimatedHeading
        id={titleId}
        text={title}
        highlight={highlight}
        className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
      />
      {description ? (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
