"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/site";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { GlowLink } from "./ui/GlowButton";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] transition-all duration-500 sm:px-8 ${
          scrolled || open
            ? "my-2 rounded-2xl glass-strong py-2.5 shadow-glow"
            : "my-3 py-3"
        }`}
      >
        <Link href="/" className="group flex items-center">
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="flex items-center"
          >
            <Logo />
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname === link.href}
              className={`nav-underline text-sm font-medium transition-colors hover:text-[var(--foreground)] ${
                pathname === link.href
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <GlowLink href="/careers" className="!px-5 !py-2.5">
              Apply Now
            </GlowLink>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="glass glow-on-hover relative z-[70] flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-5 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-current"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong fixed inset-0 z-[55] flex h-[100dvh] flex-col overflow-y-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[52px] items-center rounded-2xl px-5 text-2xl font-semibold transition-colors ${
                      pathname === link.href
                        ? "bg-burgundy/20 text-[var(--foreground)]"
                        : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.4 }}
              className="mt-4"
            >
              <GlowLink
                href="/careers"
                onClick={() => setOpen(false)}
                className="w-full !py-4 text-base"
              >
                Apply Now
              </GlowLink>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
