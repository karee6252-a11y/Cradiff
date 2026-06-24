"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-36 text-center sm:px-8 sm:pt-44">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 0%, rgba(139,26,26,0.3), transparent 70%)",
        }}
      />
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-burgundy-glow"
      >
        <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-burgundy-glow" />
        {eyebrow}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-tight sm:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base text-[var(--muted)] sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </section>
  );
}
