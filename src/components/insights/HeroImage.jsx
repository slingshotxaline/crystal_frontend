"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroImage({ src, alt, caption, chips = [] }) {
  const wrap = useRef(null);
  const layer = useRef(null);

  // Scroll parallax
  useEffect(() => {
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!wrap.current || !layer.current) return;
        const r = wrap.current.getBoundingClientRect();
        const progress = (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight;
        layer.current.style.transform = `translate3d(0, ${progress * 48}px, 0) scale(1.14)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Mouse tilt
  const onMove = (e) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
  };
  const onLeave = () => {
    if (wrap.current) wrap.current.style.transform = "";
  };

  return (
    <figure>
      <div
        ref={wrap}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-slate-200 shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/5 transition-transform duration-300 ease-out"
      >
        <div ref={layer} className="absolute inset-0 will-change-transform">
          <div className="ix-kenburns absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width:1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span
              key={c}
              className="ix-bob rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg backdrop-blur"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-slate-500">{caption}</figcaption>
    </figure>
  );
}