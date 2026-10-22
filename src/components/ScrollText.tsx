"use client";
import { useEffect, useRef } from "react";

/** A statement whose words ink in one by one as it scrolls through the viewport. Fully visible without JS or with reduced motion. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.5))); // starts as it enters, finished once its top is 40% down the screen
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <p ref={ref} className={className} style={{ ["--n" as string]: words.length }}>
      {words.map((w, i) => (
        <span key={i} className="ink-word" style={{ ["--i" as string]: i }}>{w}{" "}</span>
      ))}
    </p>
  );
}
