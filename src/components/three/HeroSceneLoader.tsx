"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SceneBoundary } from "@/components/three/SceneBoundary";
import { SceneFallback } from "@/components/three/SceneFallback";
import { cn } from "@/lib/utils";

// The whole three.js / R3F bundle is split out and only fetched in the browser.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

interface HeroSceneLoaderProps {
  eventSource: HTMLElement;
}

export function HeroSceneLoader({ eventSource }: HeroSceneLoaderProps) {
  const reduce = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSupported(webglAvailable());
  }, []);

  // Pause rendering when the hero is scrolled away or the tab is hidden (saves GPU/battery)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? true), {
      threshold: 0,
    });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {/* Static visual: visible until the canvas is ready, and as the permanent fallback */}
      <div className={cn("transition-opacity duration-1000", ready ? "opacity-0" : "opacity-100")}>
        <SceneFallback />
      </div>

      {supported ? (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <SceneBoundary fallback={null}>
            <HeroScene
              active={inView && tabVisible}
              reduceMotion={reduce}
              eventSource={eventSource}
              onReady={() => setReady(true)}
            />
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  );
}
