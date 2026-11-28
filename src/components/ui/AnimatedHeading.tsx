"use client";

import { REVEAL_EASE, useRevealOnScroll } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Words (case-insensitive, punctuation ignored) rendered with the brand gradient */
  highlight?: string[];
  delay?: number;
  id?: string;
}

/** Word-by-word masked reveal. The full text is exposed to assistive tech via aria-label. */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  highlight = [],
  delay = 0,
  id,
}: AnimatedHeadingProps) {
  const { ref, phase } = useRevealOnScroll<HTMLHeadingElement>();
  const words = text.split(" ");
  const marks = highlight.map((w) => w.toLowerCase());

  return (
    <Tag ref={ref} id={id} className={cn("font-display", className)} aria-label={text}>
      {words.map((word, i) => {
        const bare = word.replace(/[^\p{L}\p{N}']/gu, "").toLowerCase();
        const isMarked = marks.includes(bare);

        const style =
          phase === "hidden"
            ? { transform: "translateY(110%)" }
            : phase === "shown"
              ? {
                  transform: "none",
                  transition: `transform 900ms ${REVEAL_EASE} ${delay + i * 0.06}s`,
                }
              : undefined;

        return (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <span className={cn("inline-block", isMarked && "text-gradient")} style={style}>
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
