"use client";

import { STATS } from "@/lib/site";
import Counter from "@/components/ui/Counter";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export default function Stats() {
  return (
    <section className="relative mx-auto -mt-10 max-w-7xl px-5 sm:px-8">
      <StaggerGroup className="glass-strong grid grid-cols-2 gap-px overflow-hidden rounded-3xl shadow-glow md:grid-cols-4">
        {STATS.map((s) => (
          <StaggerItem
            key={s.label}
            className="group relative flex flex-col items-center gap-2 px-6 py-10 text-center transition-colors hover:bg-white/5"
          >
            <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-burgundy-glow/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="font-heading text-4xl font-extrabold text-gradient-burgundy md:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </span>
            <span className="text-sm font-medium text-[var(--muted)]">
              {s.label}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
