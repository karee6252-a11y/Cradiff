"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

// Mirror any responsive width utilities (w-full / w-auto) onto the motion
// wrapper so a button can stretch full-width on mobile yet shrink on desktop.
function wrapperWidth(className: string) {
  const widthTokens = className
    .split(/\s+/)
    .filter((c) => /(?:^|:)w-(?:full|auto)$/.test(c));
  if (widthTokens.length === 0) return "inline-block";
  return `block ${widthTokens.join(" ")}`;
}

function classes(variant: Variant) {
  const base =
    "group relative inline-flex min-h-[44px] items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300";
  if (variant === "primary") {
    return `${base} text-white shadow-[0_8px_30px_-8px_rgba(139,26,26,0.7)] hover:shadow-[0_0_40px_-4px_rgba(185,28,28,0.85)]`;
  }
  return `${base} glass text-[var(--foreground)] hover:border-burgundy-light/60 hover:shadow-glow`;
}

function Inner({
  children,
  variant,
}: {
  children: ReactNode;
  variant: Variant;
}) {
  return (
    <>
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-burgundy-light via-burgundy to-burgundy-dark" />
          <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-burgundy-glow to-burgundy-light transition-transform duration-500 group-hover:translate-y-0" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
}

export function GlowLink({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: CommonProps & { href: string; onClick?: () => void }) {
  return (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={wrapperWidth(className)}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`${classes(variant)} ${className}`}
      >
        <Inner variant={variant}>{children}</Inner>
      </Link>
    </motion.span>
  );
}

export function GlowButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: CommonProps & {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes(variant)} min-h-[48px] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <Inner variant={variant}>{children}</Inner>
    </motion.button>
  );
}
