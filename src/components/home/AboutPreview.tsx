"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { GlowLink } from "@/components/ui/GlowButton";
import Icon from "@/components/ui/Icon";

const highlights = [
  { icon: "globe", label: "35+ nationalities in one community" },
  { icon: "trophy", label: "98% acceptance to top universities" },
  { icon: "book", label: "Cambridge-accredited curriculum" },
];

export default function AboutPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl glass-strong shadow-glow"
            >
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
                alt="Students collaborating at Cardiff International School"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong absolute -bottom-6 -left-4 flex items-center gap-4 rounded-2xl px-5 py-4 shadow-glow sm:-left-8"
            >
              <span className="font-heading text-3xl font-extrabold text-gradient-burgundy">
                20+
              </span>
              <span className="text-xs leading-tight text-[var(--muted)]">
                Years shaping
                <br />
                future leaders
              </span>
            </motion.div>

            <div className="absolute -right-6 -top-6 h-24 w-24 animate-glow-pulse rounded-full bg-burgundy/40 blur-2xl" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-burgundy-glow">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-burgundy-glow" />
              About CIS
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              A place where <span className="text-gradient">brilliant minds</span>{" "}
              find their purpose
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
              For over two decades, Cardiff International School has blended
              academic rigour with genuine care. Our students don&apos;t just
              achieve outstanding results — they grow into confident,
              compassionate global citizens ready to lead.
            </p>
          </Reveal>

          <div className="mt-2 flex flex-col gap-3">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.15 + i * 0.08} direction="left">
                <div className="glass glow-on-hover flex items-center gap-4 rounded-2xl px-5 py-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/20 text-burgundy-glow">
                    <Icon name={h.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {h.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-4">
              <GlowLink href="/about" variant="ghost">
                Discover Our Story
                <Icon name="arrow" className="h-4 w-4" />
              </GlowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
