import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-dvh place-items-center py-32 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet">Error 404</p>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-7xl">
          Page not <span className="text-gradient">found.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-medium text-bg transition hover:bg-white/90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
