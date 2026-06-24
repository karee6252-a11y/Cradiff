"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const t = TESTIMONIALS[index];

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="Voices of CIS"
        title={
          <>
            Loved by <span className="text-gradient">families & alumni</span>
          </>
        }
      />

      <div className="relative mt-14">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 shadow-glow sm:px-14">
          <span className="pointer-events-none absolute left-6 top-4 font-heading text-[8rem] leading-none text-burgundy/20">
            &ldquo;
          </span>

          <div className="relative min-h-[230px] sm:min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction * -60, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-7 text-center"
              >
                <blockquote className="max-w-2xl text-lg font-medium leading-relaxed text-[var(--foreground)] sm:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-burgundy-light/60">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block font-heading font-bold text-[var(--foreground)]">
                      {t.name}
                    </span>
                    <span className="block text-sm text-burgundy-glow">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <NavBtn dir={-1} onClick={() => paginate(-1)} />
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-burgundy-glow"
                    : "w-2 bg-[var(--muted)]/40 hover:bg-[var(--muted)]"
                }`}
              />
            ))}
          </div>
          <NavBtn dir={1} onClick={() => paginate(1)} />
        </div>
      </div>
    </section>
  );
}

function NavBtn({ dir, onClick }: { dir: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 1 ? "Next" : "Previous"}
      className="glass glow-on-hover flex h-11 w-11 items-center justify-center rounded-full text-[var(--foreground)]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={dir === 1 ? "" : "rotate-180"}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
