/**
 * Tiny module-level store so the preloader can tell the hero
 * when the cinematic intro has finished (and the hero can start animating).
 */
let done = false;
const listeners = new Set<() => void>();

export const introStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => done,
  getServerSnapshot: () => false,
  complete() {
    if (done) return;
    done = true;
    listeners.forEach((l) => l());
  },
};
