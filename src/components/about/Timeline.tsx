"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/site";

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* center line */}
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-burgundy-light/60 via-burgundy/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className="flex flex-col gap-12">
        {TIMELINE.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: left ? -40 : 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex flex-col pl-12 md:w-1/2 md:pl-0 ${
                left
                  ? "md:self-start md:pr-12 md:text-right"
                  : "md:self-end md:pl-12"
              }`}
            >
              {/* dot */}
              <span
                className={`absolute top-1.5 left-[9px] flex h-4 w-4 items-center justify-center md:left-auto ${
                  left ? "md:-right-2" : "md:-left-2"
                }`}
              >
                <span className="absolute h-4 w-4 animate-glow-pulse rounded-full bg-burgundy-glow/50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-burgundy-glow ring-4 ring-[var(--background)]" />
              </span>

              <div className="glass glow-on-hover rounded-2xl p-6">
                <span className="font-heading text-2xl font-extrabold text-gradient-burgundy">
                  {item.year}
                </span>
                <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
