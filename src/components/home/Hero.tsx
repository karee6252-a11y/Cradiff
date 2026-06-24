"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { GlowLink } from "@/components/ui/GlowButton";
import Icon from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-1 pb-16 pt-24 sm:pt-28">
      {/* Hero-specific animated gradient sweep */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(139,26,26,0.35), transparent 70%)",
        }}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong relative flex h-24 w-24 items-center justify-center rounded-3xl shadow-glow sm:h-28 sm:w-28"
          >
            <div className="absolute inset-0 animate-glow-pulse rounded-3xl bg-burgundy/30 blur-2xl" />
            <Logo className="relative h-14 sm:h-16" priority />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-burgundy-glow"
        >
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-burgundy-glow" />
          Excellence • Integrity • Global Vision
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-balance text-[clamp(2rem,9vw,3rem)] font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient">Cardiff</span>{" "}
          <span className="text-[var(--foreground)]">International</span>
          <br />
          <span className="text-gradient-burgundy">School</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-5 max-w-2xl text-base text-[var(--muted)] sm:mt-6 sm:text-xl md:text-2xl"
        >
          {SITE.tagline} — a world-class education where curiosity, character and
          ambition shape tomorrow&apos;s changemakers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <GlowLink href="/careers" variant="primary">
            Apply Now
            <Icon name="arrow" className="h-4 w-4" />
          </GlowLink>
          <GlowLink href="/academics" variant="ghost">
            Explore Programs
          </GlowLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--border)] p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-burgundy-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}
