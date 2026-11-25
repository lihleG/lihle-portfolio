/**
 * Lightweight CSS-only stand-in for the 3D object.
 * Shown while the 3D bundle loads, and permanently if WebGL is unavailable or errors.
 */
export function SceneFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute right-[-18%] top-[6%] size-[70vmin] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgb(139_92_246/0.55),rgb(59_130_246/0.18)_45%,transparent_70%)] blur-2xl lg:right-[6%] lg:top-[14%]" />
      <div className="absolute right-[2%] top-[18%] size-[38vmin] rounded-full border border-violet/30 lg:right-[14%] lg:top-[26%]" />
    </div>
  );
}
