"use client";

import { motion } from "framer-motion";
import { PROGRAMS } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { GlowLink } from "@/components/ui/GlowButton";
import Icon from "@/components/ui/Icon";

export default function ProgramsPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="Academic Pathways"
        title={
          <>
            Programs designed to{" "}
            <span className="text-gradient">unlock potential</span>
          </>
        }
        subtitle="From first steps to final exams, every stage is crafted to challenge, inspire and prepare students for a global future."
      />

      <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
        {PROGRAMS.map((p) => (
          <StaggerItem key={p.title}>
            <motion.article
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass glow-on-hover group relative h-full overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-burgundy/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-burgundy-light to-burgundy-dark text-white shadow-glow">
                <Icon name={p.icon} className="h-7 w-7" />
              </span>

              <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-burgundy-glow">
                {p.age}
              </span>
              <h3 className="mt-2 text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {p.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-2.5 text-sm text-[var(--foreground)]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-burgundy/20 text-burgundy-glow">
                      <Icon name="spark" className="h-3 w-3" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-12 flex justify-center">
        <GlowLink href="/academics" variant="primary">
          View All Academics
          <Icon name="arrow" className="h-4 w-4" />
        </GlowLink>
      </div>
    </section>
  );
}
