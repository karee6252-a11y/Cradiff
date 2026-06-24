"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-7 shadow-glow sm:p-9">
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-burgundy/25 blur-3xl" />
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-burgundy-light to-burgundy-dark text-white shadow-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="text-2xl font-bold">Message sent!</h3>
            <p className="max-w-sm text-[var(--muted)]">
              Thank you for reaching out. We&apos;ll respond to your enquiry as
              soon as possible.
            </p>
            <GlowButton variant="ghost" onClick={() => setStatus("idle")}>
              Send another
            </GlowButton>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Jane Doe" required />
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@email.com"
                required
              />
            </div>
            <Field
              label="Subject"
              name="subject"
              placeholder="Admissions enquiry"
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-[var(--foreground)]"
              >
                Message<span className="text-burgundy-glow"> *</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can we help you?"
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-burgundy-light focus:shadow-glow sm:text-sm"
              />
            </div>

            {status === "error" && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <GlowButton
              type="submit"
              disabled={status === "loading"}
              className="mt-1 w-full sm:w-auto sm:self-start"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
              {status !== "loading" && <Icon name="arrow" className="h-4 w-4" />}
            </GlowButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const inputMode =
    type === "email" ? "email" : type === "tel" ? "tel" : undefined;
  const autoComplete =
    type === "email" ? "email" : name === "name" ? "name" : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[var(--foreground)]"
      >
        {label}
        {required && <span className="text-burgundy-glow"> *</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-burgundy-light focus:shadow-glow sm:text-sm"
      />
    </div>
  );
}
