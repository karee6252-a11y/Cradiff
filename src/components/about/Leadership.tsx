"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LEADERSHIP } from "@/lib/site";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export default function Leadership() {
  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {LEADERSHIP.map((p) => (
        <StaggerItem key={p.name}>
          <motion.figure
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl glass glow-on-hover"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-burgundy-light to-burgundy-glow transition-transform duration-500 group-hover:scale-x-100" />
            </div>
            <figcaption className="absolute bottom-0 w-full p-5">
              <h3 className="font-heading text-lg font-bold text-white">
                {p.name}
              </h3>
              <p className="text-sm text-[#f0c9c9]">{p.role}</p>
            </figcaption>
          </motion.figure>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
