import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import Logo from "./Logo";
import Icon from "./ui/Icon";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-[var(--border)] sm:mt-24">
      <div className="divider-glow" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo className="h-14" />
          <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            {SITE.description}
          </p>
          <div className="flex gap-3">
            {["in", "f", "X", "ig"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={`Social ${s}`}
                className="glass glow-on-hover flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold text-[var(--muted)] transition-colors hover:text-burgundy-glow"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
            Explore
          </h4>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-underline inline-block text-sm text-[var(--muted)] transition-colors hover:text-burgundy-glow"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
            Get in touch
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[var(--muted)]">
            <li className="flex items-start gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 text-burgundy-glow" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="phone" className="h-4 w-4 text-burgundy-glow" />
              <a href={`tel:${SITE.phone}`} className="hover:text-burgundy-glow">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="mail" className="h-4 w-4 text-burgundy-glow" />
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-burgundy-glow"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-[var(--muted)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Crafted with excellence in Cardiff
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-burgundy-glow" />
          </p>
        </div>
      </div>
    </footer>
  );
}
