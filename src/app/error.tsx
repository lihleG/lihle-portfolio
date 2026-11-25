"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section role="alert" className="container-x grid min-h-dvh place-items-center py-32 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet">Something broke</p>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          That didn&apos;t go to plan.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted">An unexpected error occurred. You can try again.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-bg transition hover:bg-white/90"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
