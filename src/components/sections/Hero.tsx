"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HeroCodeCard } from "@/components/sections/HeroCodeCard";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialLink } from "@/components/ui/SocialLink";
import { siteConfig } from "@/config/site";
import { useIntroDone } from "@/hooks/useIntroDone";
import { getGsap } from "@/lib/gsap";

interface HeroProps {
  /** Resolved server-side: null until the CV PDF actually exists. */
  cvHref: string | null;
}

const LINES = [
  { text: "BUILDING", gradient: false },
  { text: "THE DIGITAL", gradient: false },
  { text: "FUTURE.", gradient: true },
] as const;

const FROM = [167, 139, 250]; // violet-400
const TO = [59, 130, 246]; // electric blue

/** Colour for char i of n along the violet → blue gradient (per-character so GSAP transforms don't break clipping). */
function gradientColor(i: number, n: number) {
  const t = n <= 1 ? 0 : i / (n - 1);
  const c = FROM.map((f, k) => Math.round(f + ((TO[k] ?? f) - f) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

export function Hero({ cvHref }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Subtle scroll parallax: copy drifts up and fades as the hero leaves
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  // Cinematic headline intro (GSAP), starts once the preloader has lifted
  useEffect(() => {
    if (!introDone) return;
    const scope = contentRef.current;
    if (!scope) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".hero-char, .hero-fade", { opacity: 1, yPercent: 0, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        ".hero-char",
        { yPercent: 115, rotate: 6, opacity: 1 },
        { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.025 },
      ).fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 },
        "-=0.9",
      );
    }, scope);

    return () => ctx.revert();
  }, [introDone, reduce]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_30%,rgb(139_92_246/0.14),transparent_70%),radial-gradient(50%_40%_at_15%_90%,rgb(59_130_246/0.10),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />

      {/* 3D environment (lazy-loaded, isolated bundle) */}
      {mounted && sectionRef.current ? <HeroSceneLoader eventSource={sectionRef.current} /> : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"
      />

      <motion.div
        ref={contentRef}
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 pb-28 pt-32 md:pt-36"
      >
        <div className="max-w-4xl">
          <p className="hero-fade mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted opacity-0 sm:text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet/60" />
              <span className="relative inline-flex size-2 rounded-full bg-violet" />
            </span>
            <span className="text-white/90">{siteConfig.name}</span>
            <span aria-hidden="true">/</span>
            <span>{siteConfig.title}</span>
            <span aria-hidden="true" className="hidden sm:inline">
              /
            </span>
            <span className="hidden sm:inline">{siteConfig.location}</span>
          </p>

          <h1
            aria-label="Building the digital future."
            className="font-display text-[clamp(2.9rem,10.5vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]"
          >
            {LINES.map((line) => (
              <span key={line.text} aria-hidden="true" className="hero-line">
                {Array.from(line.text).map((char, i, arr) => (
                  <span
                    key={`${char}-${i}`}
                    className="hero-char opacity-0"
                    style={line.gradient ? { color: gradientColor(i, arr.length) } : undefined}
                  >
                    {char === " " ? " " : char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-8 max-w-xl text-base leading-relaxed text-muted opacity-0 sm:text-lg md:mt-10">
            {siteConfig.heroIntro}
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4 opacity-0">
            <MagneticButton href="#projects">
              View My Work
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href={cvHref ?? undefined}
              download={siteConfig.cv.downloadName}
              variant="secondary"
              disabledReason="CV coming soon"
            >
              <Download aria-hidden="true" className="size-4" />
              Download CV
            </MagneticButton>
          </div>

          <div className="hero-fade mt-10 flex items-center gap-3 opacity-0">
            <SocialLink label="GitHub" href={siteConfig.contact.github} icon={FaGithub} />
            <SocialLink label="LinkedIn" href={siteConfig.contact.linkedin} icon={FaLinkedinIn} />
            <span aria-hidden="true" className="ml-2 hidden h-px w-16 bg-white/15 sm:block" />
            <span className="hidden font-mono text-xs tracking-wide text-muted sm:block">
              {siteConfig.location}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating editor card — signals "developer" instantly (desktop only) */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-24 z-10 hidden justify-end xl:flex">
        <HeroCodeCard play={introDone} />
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to the About section"
        data-cursor="button"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-white"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            style={{ animation: "scroll-cue 2s cubic-bezier(0.65,0,0.35,1) infinite" }}
          />
        </span>
      </a>
    </section>
  );
}
