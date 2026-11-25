import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PendingNoteProps {
  children: ReactNode;
  className?: string;
}

/** Honest empty state: used instead of inventing content that hasn't been supplied. */
export function PendingNote({ children, className }: PendingNoteProps) {
  return (
    <p
      className={cn(
        "rounded-2xl border border-dashed border-white/15 px-5 py-4 text-sm leading-relaxed text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
