"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useIntroDone } from "@/hooks/useIntroDone";
import { cn } from "@/lib/utils";

const ids = siteConfig.nav.map((n) => n.id);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(ids, isHome);
  const introDone = useIntroDone();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close the menu if the viewport grows to desktop size
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && close();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [close]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -32, opacity: 0 }}
        animate={introDone || reduce ? { y: 0, opacity: 1 } : { y: -32, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-white/[0.07] bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            href={hrefFor("home")}
            onClick={close}
            aria-label={`${siteConfig.name} — home`}
            data-cursor="button"
            className="group flex items-center gap-3"
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet to-blue font-display text-sm font-bold">
              LG
            </span>
            <span className="hidden font-display text-sm font-medium tracking-wide text-white/90 sm:block">
              {siteConfig.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    data-cursor="button"
                    className={cn(
                      "relative px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors",
                      isActive ? "text-white" : "text-muted hover:text-white",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-violet to-blue"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <MagneticButton href={hrefFor("contact")} variant="secondary" className="px-5 py-2.5 text-xs">
                Let&apos;s talk
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass grid size-11 place-items-center rounded-full lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 pt-24 backdrop-blur-2xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1">
              {siteConfig.nav.map((item, i) => {
                const isActive = isHome && active === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={hrefFor(item.id)}
                      onClick={close}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-4xl font-semibold tracking-tight",
                        isActive ? "text-gradient" : "text-white",
                      )}
                    >
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
