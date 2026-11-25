"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Link from "next/link";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface MagneticButtonProps {
  children: ReactNode;
  /** Empty / undefined renders a disabled control instead of a dead link. */
  href?: string;
  /** Makes the browser download the file instead of navigating. */
  download?: string;
  variant?: Variant;
  className?: string;
  /** Shown as a tooltip + screen-reader hint when the control is disabled. */
  disabledReason?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  isDisabled?: boolean;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-bg hover:bg-white/90 shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_12px_40px_-12px_rgb(139_92_246/0.7)]",
  secondary: "glass text-white hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

/** Button/link that gently pulls toward the cursor on desktop. */
export function MagneticButton({
  children,
  href,
  download,
  variant = "primary",
  className,
  disabledReason = "Coming soon",
  type = "button",
  onClick,
  isDisabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const magnetic = finePointer && !reduce;

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(base, variants[variant], className);
  const disabled = isDisabled || (!href && !onClick && type === "button");

  let control: ReactNode;
  if (disabled) {
    control = (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={disabledReason}
        className={cn(classes, "cursor-not-allowed opacity-45 hover:bg-transparent")}
      >
        {children}
        <span className="sr-only"> — {disabledReason}</span>
      </button>
    );
  } else if (href && href.startsWith("/") && !href.startsWith("//") && !download) {
    // Internal route → client-side navigation (hash-only links like "#projects" stay plain anchors)
    control = (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  } else if (href) {
    const external = isExternal(href);
    control = (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  } else {
    control = (
      <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={magnetic ? { x: sx, y: sy } : undefined}
      className="inline-block"
      data-cursor="button"
    >
      {control}
    </motion.div>
  );
}
