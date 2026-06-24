"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY } from "@/lib/site";

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback((dir: number) => {
    setActive((prev) => {
      if (prev === null) return prev;
      return (prev + dir + GALLERY.length) % GALLERY.length;
    });
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, go]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {GALLERY.map((item, i) => (
          <motion.button
            key={item.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            onClick={() => setActive(i)}
            className={`group relative block w-full overflow-hidden rounded-2xl glass glow-on-hover ${
              item.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-heading text-lg font-bold text-white">
                {item.title}
              </span>
            </div>
            <span className="absolute right-4 top-4 flex h-9 w-9 scale-0 items-center justify-center rounded-full glass-strong text-white transition-transform duration-500 group-hover:scale-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="glass-strong absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <ArrowBtn dir={-1} onClick={(e) => { e.stopPropagation(); go(-1); }} />

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] w-full max-w-4xl overflow-hidden rounded-3xl glass-strong shadow-glow-strong"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={GALLERY[active].src}
                  alt={GALLERY[active].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <h3 className="font-heading text-lg font-bold text-white">
                  {GALLERY[active].title}
                </h3>
                <span className="text-sm text-[#f0c9c9]">
                  {active + 1} / {GALLERY.length}
                </span>
              </div>
            </motion.div>

            <ArrowBtn dir={1} onClick={(e) => { e.stopPropagation(); go(1); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowBtn({
  dir,
  onClick,
}: {
  dir: number;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 1 ? "Next image" : "Previous image"}
      className={`glass-strong absolute z-10 flex h-12 w-12 items-center justify-center rounded-full text-white ${
        dir === 1 ? "right-4 sm:right-8" : "left-4 sm:left-8"
      }`}
    >
      <svg
        width="20"
        height="20"
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
