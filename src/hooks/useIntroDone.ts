"use client";

import { useSyncExternalStore } from "react";
import { introStore } from "@/lib/intro-store";

/** True once the preloader has finished (or was skipped). */
export function useIntroDone() {
  return useSyncExternalStore(introStore.subscribe, introStore.getSnapshot, introStore.getServerSnapshot);
}
