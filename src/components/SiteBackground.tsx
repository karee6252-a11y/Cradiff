"use client";

import { useEffect, useRef } from "react";

export default function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones get the cheapest treatment: fewer particles and no link drawing,
    // which is the expensive O(n²) part that hurts low-end mobile + battery.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    // Cap the backing store resolution so we don't shade millions of pixels on
    // high-DPR phones — the effect is decorative and blur-soft anyway.
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    const linkDistance = 130;
    const drawLinks = !isMobile;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let raf = 0;

    const applySize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    const count = Math.min(
      isMobile ? 26 : 70,
      Math.floor((width * height) / (isMobile ? 42000 : 26000)),
    );

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
    }));

    let resizeTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applySize, 150);
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(185, 28, 28, 0.55)";
        ctx.fill();
      }

      if (drawLinks) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < linkDistance) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(139, 26, 26, ${0.16 * (1 - dist / linkDistance)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(185, 28, 28, 0.4)";
        ctx.fill();
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    // Don't burn CPU/battery animating an off-screen tab.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduce) {
      start();
    } else {
      renderStatic();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Aurora blobs — animating huge blur radii is the heaviest paint on
          mobile, so we shrink the blur and freeze the animation on phones. */}
      <div className="absolute -top-40 -left-40 h-[55vh] w-[55vh] rounded-full bg-burgundy/30 blur-[70px] animate-none sm:blur-[120px] sm:animate-aurora" />
      <div
        className="absolute top-1/3 -right-40 h-[60vh] w-[60vh] rounded-full bg-burgundy-light/25 blur-[70px] animate-none sm:blur-[140px] sm:animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 hidden h-[45vh] w-[45vh] rounded-full bg-burgundy-dark/30 blur-[70px] animate-none sm:block sm:blur-[120px] sm:animate-aurora"
        style={{ animationDelay: "-12s" }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)] dark:opacity-100 opacity-0" />
    </div>
  );
}
