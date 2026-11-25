export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="grid min-h-dvh place-items-center">
      <span className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-violet" />
    </div>
  );
}
