"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { cn, isSet } from "@/lib/utils";
import { LIMITS, validateContact, type ContactErrors, type ContactField, type ContactInput } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

interface ContactFormProps {
  /** Fallback shown if the server can't send mail. */
  fallbackEmail: string;
}

const EMPTY: ContactInput = { name: "", email: "", message: "" };

const inputBase =
  "w-full rounded-2xl border bg-white/[0.03] px-5 py-4 text-base text-white placeholder:text-white/30 transition-colors focus:border-violet focus:bg-white/[0.05] focus:outline-none";

export function ContactForm({ fallbackEmail }: ContactFormProps) {
  const uid = useId();
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const id = (f: ContactField) => `${uid}-${f}`;

  function revalidate(next: ContactInput, fields: Partial<Record<ContactField, boolean>>) {
    const { errors: all } = validateContact(next);
    const visible: ContactErrors = {};
    (Object.keys(all) as ContactField[]).forEach((k) => {
      if (fields[k]) visible[k] = all[k];
    });
    setErrors(visible);
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name as ContactField;
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) revalidate(next, touched);
    if (status === "success" || status === "error") setStatus("idle");
  }

  function onBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name as ContactField;
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    revalidate(values, nextTouched);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const result = validateContact(values);
    if (!result.valid) {
      setTouched({ name: true, email: true, message: true });
      setErrors(result.errors);
      // Move focus to the first invalid field for keyboard / screen-reader users
      const first = (["name", "email", "message"] as ContactField[]).find((f) => result.errors[f]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, website: honeypot }),
      });

      if (res.ok) {
        setStatus("success");
        setValues(EMPTY);
        setTouched({});
        setErrors({});
        return;
      }

      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }

      if (res.status === 422) {
        const body = (await res.json().catch(() => null)) as { errors?: ContactErrors } | null;
        if (body?.errors) {
          setErrors(body.errors);
          setStatus("idle");
          return;
        }
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const submitting = status === "submitting";
  const mailHref = isSet(fallbackEmail) ? `mailto:${fallbackEmail}` : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-6">
      {/* Honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <Field label="Name" id={id("name")} error={errors.name}>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          maxLength={LIMITS.nameMax}
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id("name")}-error` : undefined}
          required
          className={cn(inputBase, errors.name ? "border-red-400/60" : "border-white/10")}
        />
      </Field>

      <Field label="Email" id={id("email")} error={errors.email}>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          maxLength={LIMITS.emailMax}
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id("email")}-error` : undefined}
          required
          className={cn(inputBase, errors.email ? "border-red-400/60" : "border-white/10")}
        />
      </Field>

      <Field
        label="Message"
        id={id("message")}
        error={errors.message}
        hint={`${values.message.length}/${LIMITS.messageMax}`}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          placeholder="Tell me about your idea…"
          maxLength={LIMITS.messageMax}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id("message")}-error` : undefined}
          required
          className={cn(inputBase, "resize-y", errors.message ? "border-red-400/60" : "border-white/10")}
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        data-cursor="button"
        className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium tracking-wide text-bg shadow-[0_12px_40px_-12px_rgb(139_92_246/0.7)] transition-all hover:bg-white/90 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      {/* Live region: announced to screen readers when status changes */}
      <div aria-live="polite" role="status" className="min-h-6">
        {status === "success" ? (
          <p className="flex items-start gap-2.5 text-sm text-emerald-300">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Thank you — your message has been sent. I&apos;ll get back to you soon.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-2.5 text-sm text-red-300">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Something went wrong sending your message. Please try again
            {mailHref ? (
              <>
                {" "}
                or email me at{" "}
                <a href={mailHref} className="underline underline-offset-4">
                  {fallbackEmail}
                </a>
              </>
            ) : null}
            .
          </p>
        ) : null}
        {status === "unconfigured" ? (
          <p className="flex items-start gap-2.5 text-sm text-amber-200">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              The contact form isn&apos;t switched on yet.
              {mailHref ? (
                <>
                  {" "}
                  Please email me directly at{" "}
                  <a href={mailHref} className="underline underline-offset-4">
                    {fallbackEmail}
                  </a>
                  .
                </>
              ) : (
                " Please check back soon."
              )}
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  hint,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {label}
        </label>
        {hint ? <span className="font-mono text-[0.65rem] tabular-nums text-white/30">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
