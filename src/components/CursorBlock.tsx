"use client";
import { useEffect, useRef } from "react";

/**
 * Hero cursor: one small green square that trails the pointer, growing over links and buttons.
 * The real cursor stays visible. Off for reduced motion and touch-only devices; sleeps once it has caught up.
 */
export function CursorBlock() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current, host = el?.parentElement;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0, s = 1, ts = 1, primed = false, inside = false;
    const frame = () => {
      raf = 0;
      if (!primed) { x = tx; y = ty; primed = true; }
      x += (tx - x) * 0.22; y += (ty - y) * 0.22; s += (ts - s) * 0.2;
      el.style.transform = `translate3d(${(x - 7).toFixed(1)}px, ${(y - 7).toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
      if (inside && (Math.hypot(tx - x, ty - y) > 0.3 || Math.abs(ts - s) > 0.01)) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      el.style.opacity = inside ? "1" : "0";
      if (!inside) { primed = false; return; }
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      ts = (e.target as Element | null)?.closest("a, button, [role='button']") ? 2.6 : 1;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => { inside = false; primed = false; el.style.opacity = "0"; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); document.documentElement.removeEventListener("pointerleave", onLeave); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0 z-30 size-3.5 bg-glow opacity-0 mix-blend-screen transition-opacity duration-200" />;
}
