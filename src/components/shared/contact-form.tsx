"use client";

import { Check, ChevronDown, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { EMAIL_RE } from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const TOPICS = [
  { id: "general", label: "General question" },
  { id: "order", label: "Question about an order" },
  { id: "color", label: "Help choosing a color" },
  { id: "dealer", label: "Become a dealer" },
  { id: "catch", label: "Share a catch" },
] as const;

type Fields = { name: string; email: string; phone: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please include a few more details (at least 10 characters).";
  return e;
}

const inputCls =
  "h-12 w-full rounded-md border border-input bg-white px-3.5 text-[0.95rem] text-navy outline-none transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-arctic focus-visible:ring-2 focus-visible:ring-electric/40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/15";

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = TOPICS.some((t) => t.id === params.get("topic")) ? params.get("topic")! : "general";
  const [f, setF] = useState<Fields>({ name: "", email: "", phone: "", topic: initialTopic, message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    // Prototype: wire to a form backend (Formspree, Resend, HubSpot…) before launch.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  const topicLabel = TOPICS.find((t) => t.id === f.topic)?.label ?? "Website inquiry";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${topicLabel} — ${f.name}`)}&body=${encodeURIComponent(
    `${f.message}\n\n${f.name}\n${f.email}${f.phone ? `\n${f.phone}` : ""}`,
  )}`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-ice p-8 sm:p-10"
          role="status"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-arctic text-white">
            <Check className="size-6" />
          </span>
          <h2 className="display mt-5 text-4xl text-navy">Thanks, {f.name.split(" ")[0]}.</h2>
          <p className="mt-3 text-muted-foreground">
            This is a prototype, so your message <strong className="text-navy">has not been sent</strong> yet. To reach us
            today, send it by email or give us a call.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={mailto}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-arctic px-6 text-[0.8125rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy"
            >
              <Send className="size-4" /> Send by email
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center rounded-md border border-navy/20 px-6 text-[0.8125rem] font-semibold tracking-[0.12em] text-navy uppercase hover:bg-navy hover:text-white"
            >
              Call {site.phone}
            </a>
          </div>
          <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-arctic hover:underline">
            Edit message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" id="name" error={errors.name}>
            <input id="contact-name" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-err" : undefined} className={inputCls} />
          </Field>
          <Field label="Email" id="email" error={errors.email}>
            <input id="contact-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-err" : undefined} className={inputCls} />
          </Field>
          <Field label="Phone (optional)" id="phone">
            <input id="contact-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} className={inputCls} />
          </Field>
          <Field label="Topic" id="topic">
            <div className="relative">
              <select id="contact-topic" value={f.topic} onChange={set("topic")} className={cn(inputCls, "appearance-none pr-10")}>
                {TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-navy" />
            </div>
          </Field>
          <Field label="Message" id="message" error={errors.message} className="sm:col-span-2">
            <textarea
              id="contact-message"
              rows={6}
              value={f.message}
              onChange={set("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-err" : undefined}
              placeholder={f.topic === "dealer" ? "Tell us about your shop and location." : "How can we help?"}
              className={cn(inputCls, "h-auto py-3")}
            />
          </Field>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">Prototype form — messages aren’t delivered yet.</p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-arctic px-7 text-[0.8125rem] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-navy disabled:opacity-70"
            >
              {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              Send message
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  id,
  error,
  className,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={`contact-${id}`} className="mb-2 block text-sm font-semibold text-navy">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`contact-${id}-err`} className="mt-1.5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
