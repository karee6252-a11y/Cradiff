"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import Icon from "@/components/ui/Icon";
import { JOBS, SITE } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export default function CareersForm({ presetRole }: { presetRole?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      formRef.current?.reset();
      setFileName("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    }
  }

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-7 shadow-glow sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-burgundy/25 blur-3xl" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-burgundy-light to-burgundy-dark text-white shadow-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="text-2xl font-bold">Application received!</h3>
            <p className="max-w-sm text-[var(--muted)]">
              Thank you for applying to Cardiff International School. Our team
              will review your application and be in touch shortly.
            </p>
            <GlowButton variant="ghost" onClick={() => setStatus("idle")}>
              Submit another
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
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+44 7000 000000"
                required
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--foreground)]">
                  Position
                </label>
                <select
                  name="position"
                  defaultValue={presetRole || ""}
                  className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors focus:border-burgundy-light focus:shadow-glow sm:text-sm"
                >
                  <option value="">Select a role…</option>
                  {JOBS.map((j) => (
                    <option key={j.title} value={j.title}>
                      {j.title}
                    </option>
                  ))}
                  <option value="Other / Speculative">
                    Other / Speculative
                  </option>
                </select>
              </div>
            </div>

            {/* CV upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Upload CV{" "}
                <span className="text-[var(--muted)]">(PDF/DOC, max 5MB)</span>
              </label>
              <label className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/40 px-5 py-4 transition-colors hover:border-burgundy-light/60">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burgundy/20 text-burgundy-glow">
                  <Icon name="book" className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {fileName || "Choose a file or drag it here"}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    Accepted: PDF, DOC, DOCX
                  </span>
                </span>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name ?? "")
                  }
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us why you'd be a great fit for CIS…"
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-base text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-burgundy-light focus:shadow-glow sm:text-sm"
              />
            </div>

            {status === "error" && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="mt-1 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="order-2 text-xs text-[var(--muted)] sm:order-1">
                Applications are sent securely to our recruitment team.
              </p>
              <GlowButton
                type="submit"
                disabled={status === "loading"}
                className="order-1 w-full sm:order-2 sm:w-auto"
              >
                {status === "loading" ? "Sending…" : "Submit Application"}
                {status !== "loading" && (
                  <Icon name="arrow" className="h-4 w-4" />
                )}
              </GlowButton>
            </div>
            <noscript>
              <p className="text-xs text-[var(--muted)]">
                Or email us at {SITE.applicationsEmail}.
              </p>
            </noscript>
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
    type === "email"
      ? "email"
      : type === "tel"
        ? "tel"
        : name === "name"
          ? "name"
          : undefined;
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
