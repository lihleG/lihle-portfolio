import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { cn, isExternal, isSet } from "@/lib/utils";

interface ContactProps {
  /** Resolved server-side: null until the CV PDF actually exists. */
  cvHref: string | null;
}

interface Channel {
  label: string;
  value: string;
  href?: string;
  icon: IconType | typeof Mail;
  download?: string;
  pending: string;
}

export function Contact({ cvHref }: ContactProps) {
  const { email, linkedin, github } = siteConfig.contact;

  const channels: Channel[] = [
    {
      label: "Email",
      value: isSet(email) ? email : "Email address coming soon",
      href: isSet(email) ? `mailto:${email}` : undefined,
      icon: Mail,
      pending: "Email coming soon",
    },
    {
      label: "LinkedIn",
      value: isSet(linkedin) ? "Connect on LinkedIn" : "LinkedIn coming soon",
      href: isSet(linkedin) ? linkedin : undefined,
      icon: FaLinkedinIn,
      pending: "LinkedIn link coming soon",
    },
    {
      label: "GitHub",
      value: isSet(github) ? "View my code on GitHub" : "GitHub coming soon",
      href: isSet(github) ? github : undefined,
      icon: FaGithub,
      pending: "GitHub link coming soon",
    },
    {
      label: "CV",
      value: cvHref ? "Download my CV (PDF)" : "CV coming soon",
      href: cvHref ?? undefined,
      icon: Download,
      download: siteConfig.cv.downloadName,
      pending: "CV coming soon",
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_80%_at_50%_100%,rgb(139_92_246/0.18),transparent_70%),radial-gradient(40%_60%_at_85%_100%,rgb(59_130_246/0.14),transparent_70%)]"
      />

      <div className="container-x">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="text-violet">05</span>
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-violet to-transparent" />
            Contact
          </p>
        </Reveal>

        <AnimatedHeading
          id="contact-title"
          text="HAVE AN IDEA? LET'S BUILD SOMETHING."
          highlight={["something"]}
          className="max-w-5xl text-[clamp(2.5rem,8.5vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
        />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              Whether it&apos;s a product you want built, a role you&apos;re hiring for, or just a conversation about
              an idea — I&apos;d love to hear from you.
            </p>

            <ul className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {channels.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-colors group-hover:border-violet/50 group-hover:bg-violet/10">
                      <Icon aria-hidden="true" className="size-[1.05rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                        {c.label}
                      </span>
                      <span className="block truncate text-base">{c.value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        download={c.download}
                        data-cursor="button"
                        className="group flex items-center gap-4 py-4 text-white transition-colors hover:text-white"
                        {...(isExternal(c.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        aria-disabled="true"
                        title={c.pending}
                        className={cn("flex cursor-not-allowed items-center gap-4 py-4 opacity-45")}
                      >
                        {inner}
                        <span className="sr-only">{c.pending}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass rounded-[2rem] p-6 sm:p-10">
              <ContactForm fallbackEmail={email} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
