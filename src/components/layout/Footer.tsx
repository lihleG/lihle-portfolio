import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-8 text-xs text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-mono tracking-wide">
          {siteConfig.title} · {siteConfig.location}
        </p>
      </div>
    </footer>
  );
}
