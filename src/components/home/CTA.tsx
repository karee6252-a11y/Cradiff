"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { GlowLink } from "@/components/ui/GlowButton";
import Icon from "@/components/ui/Icon";

export default function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-14 text-center shadow-glow-strong sm:rounded-[2.5rem] sm:px-16 sm:py-24">
          {/* Animated gradient backdrop */}
          <div
            className="absolute inset-0 -z-10 animate-gradient bg-[length:200%_200%]"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #4a0707, #8b1a1a, #2a0404, #6a0d0d)",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-black/30" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
          />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 animate-glow-pulse rounded-full bg-burgundy-glow/30 blur-3xl" />

          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            Admissions Open 2026
          </span>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Begin your child&apos;s journey to{" "}
            <span className="text-[#f0c9c9]">excellence</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Limited places remain for the upcoming academic year. Book a private
            campus tour and discover the CIS difference.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-burgundy-dark shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_0_40px_-4px_rgba(255,255,255,0.6)]"
              >
                Apply Now
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </motion.span>
            <GlowLink href="/contact" variant="ghost" className="!text-white">
              Book a Tour
            </GlowLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
