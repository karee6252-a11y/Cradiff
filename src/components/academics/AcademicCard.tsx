"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";

export type Academic = {
  title: string;
  age: string;
  icon: string;
  image: string;
  description: string;
  subjects: string[];
  reverse?: boolean;
};

export default function AcademicCard({ data }: { data: Academic }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="glass glow-on-hover group grid overflow-hidden rounded-3xl lg:grid-cols-2"
    >
      <div
        className={`relative aspect-[16/11] overflow-hidden lg:aspect-auto ${
          data.reverse ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
        <span className="absolute left-5 top-5 glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {data.age}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-burgundy-light to-burgundy-dark text-white shadow-glow">
          <Icon name={data.icon} className="h-7 w-7" />
        </span>
        <h3 className="text-2xl font-bold sm:text-3xl">{data.title}</h3>
        <p className="leading-relaxed text-[var(--muted)]">{data.description}</p>
        <div className="flex flex-wrap gap-2.5">
          {data.subjects.map((s) => (
            <span
              key={s}
              className="glass rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-burgundy-light/60 hover:text-burgundy-glow"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
