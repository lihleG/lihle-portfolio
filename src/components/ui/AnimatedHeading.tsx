"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const marks = highlight.map((w) => w.toLowerCase());

  return (
    <Tag id={id} className={cn("font-display", className)} aria-label={text}>
      {words.map((word, i) => {
        const bare = word.replace(/[^\p{L}\p{N}']/gu, "").toLowerCase();
        const isMarked = marks.includes(bare);
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className={cn("inline-block", isMarked && "text-gradient")}
              initial={reduce ? false : { y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
