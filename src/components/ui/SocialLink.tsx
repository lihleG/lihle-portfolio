import type { IconType } from "react-icons";
import { cn, isExternal, isSet } from "@/lib/utils";

interface SocialLinkProps {
  label: string;
  href?: string;
  icon: IconType;
  className?: string;
}

/** Icon link. If the URL is not configured it renders as a disabled control, never a dead link. */
export function SocialLink({ label, href, icon: Icon, className }: SocialLinkProps) {
  const styles = cn(
    "glass inline-flex size-11 items-center justify-center rounded-full text-white/80 transition-all duration-300",
    className,
  );

  if (!isSet(href)) {
    return (
      <span
        role="img"
        aria-label={`${label} — link coming soon`}
        title={`${label} — coming soon`}
        className={cn(styles, "cursor-not-allowed opacity-40")}
      >
        <Icon aria-hidden="true" className="size-[1.1rem]" />
      </span>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      data-cursor="button"
      className={cn(styles, "hover:-translate-y-0.5 hover:bg-white/10 hover:text-white")}
      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Icon aria-hidden="true" className="size-[1.1rem]" />
    </a>
  );
}
