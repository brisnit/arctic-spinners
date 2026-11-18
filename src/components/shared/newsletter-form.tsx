"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { EMAIL_RE } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Email capture. Front-end only — wire `subscribe()` to a mailing platform
 * (Klaviyo, Mailchimp, Shopify Email…) before launch.
 */
async function subscribe(email: string) {
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true as const, email };
}

export function NewsletterForm({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const dark = tone === "dark";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("loading");
    await subscribe(email.trim());
    setStatus("success");
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-start gap-3 rounded-lg p-4",
              dark ? "bg-white/10 text-white" : "bg-white text-navy ring-1 ring-border",
            )}
            role="status"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-arctic text-white">
              <Check className="size-4" />
            </span>
            <div>
              <p className="font-semibold">You’re on the list.</p>
              <p className={cn("text-sm", dark ? "text-white/70" : "text-muted-foreground")}>
                Prototype preview — no email was sent. A mailing platform will be connected before launch.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }}>
            <label htmlFor={id} className="sr-only">
              Email address
            </label>
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-lg p-1.5 ring-1 transition-shadow focus-within:ring-2",
                dark
                  ? "bg-white/10 ring-white/20 focus-within:ring-electric"
                  : "bg-white ring-border focus-within:ring-arctic",
                error && "ring-2 ring-destructive",
              )}
            >
              <input
                id={id}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-err` : undefined}
                className={cn(
                  "h-11 w-0 min-w-0 flex-1 bg-transparent px-3 text-[0.95rem] outline-none",
                  dark ? "text-white placeholder:text-white/50" : "text-navy placeholder:text-muted-foreground/70",
                )}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-signal px-4 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-signal-600 disabled:opacity-70 sm:px-5"
              >
                {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
                <span>Sign up</span>
              </button>
            </div>
            {error && (
              <p id={`${id}-err`} className={cn("mt-2 text-sm", dark ? "text-[#ffb59b]" : "text-destructive")} role="alert">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
