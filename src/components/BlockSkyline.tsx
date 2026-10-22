"use client";
import { useEffect, useRef } from "react";

/**
 * Hero animation: a skyline of pixel blocks being built. Columns of green squares rise and fall like a slow wave,
 * new blocks drop from above and snap onto the tallest stacks, and columns near the pointer lift up.
 * One canvas, batched by row, ~30fps. Reduced motion draws one still frame. Pauses when off-screen.
 */
const STEP = 30;      // px per block, including the gap
const SIZE = 26;      // block square
const RANGE = 150;    // px of pointer influence
const ACCENT = "74,174,94";

export function BlockSkyline({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current, host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, raf = 0, visible = true, last = 0;
    let cur = new Float32Array(0), bonus = new Float32Array(0);
    const drops: { c: number; y: number; v: number }[] = [];
    const ptr = { x: -9999, on: false, lift: 0 };
    let nextDrop = 0;

    const target = (i: number, t: number) => {
      const x = i * STEP;
      const wave = 3.4 + 2.2 * Math.sin(x * 0.011 + t * 0.00045) + 1.5 * Math.sin(x * 0.027 - t * 0.0007 + 1.7) + 0.8 * Math.sin(x * 0.07 + t * 0.0011);
      return Math.max(0.6, Math.min(rows - 0.5, wave));
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cols = Math.ceil(W / STEP) + 1; rows = Math.max(3, Math.floor(H / STEP));
      cur = new Float32Array(cols); bonus = new Float32Array(cols);
      for (let i = 0; i < cols; i++) cur[i] = target(i, 0);
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const left = (W - (cols - 1) * STEP) / 2;
      for (let k = 0; k < rows; k++) {
        const y = H - (k + 1) * STEP + (STEP - SIZE);
        ctx.fillStyle = `rgba(${ACCENT},${(0.16 + 0.07 * k).toFixed(3)})`;
        for (let i = 0; i < cols; i++) {
          const h = cur[i] + bonus[i];
          if (k + 1 <= Math.floor(h)) ctx.fillRect(left + i * STEP, y, SIZE, SIZE);
        }
      }
      // growing top block of each column (partial height), brighter
      ctx.fillStyle = `rgba(143,217,156,0.9)`;
      for (let i = 0; i < cols; i++) {
        const h = cur[i] + bonus[i], k = Math.floor(h), f = h - k;
        if (k < rows && f > 0.08) { const s = SIZE * f; ctx.fillRect(left + i * STEP + (SIZE - s) / 2, H - (k + 1) * STEP + (STEP - SIZE) + (SIZE - s) / 2, s, s); }
      }
      // falling blocks
      ctx.fillStyle = "#e9fff0";
      for (const d of drops) ctx.fillRect(left + d.c * STEP, d.y, SIZE, SIZE);
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - (last || now));
      if (now - last < 32 && last) { raf = requestAnimationFrame(frame); return; }
      last = now;
      const left = (W - (cols - 1) * STEP) / 2;
      for (let i = 0; i < cols; i++) {
        let t = target(i, now);
        if (ptr.on) { const d = Math.abs(left + i * STEP - ptr.x); if (d < RANGE) t += 4.5 * Math.pow(1 - d / RANGE, 2) * Math.min(1, ptr.lift); t = Math.min(rows - 0.2, t); }
        cur[i] += (t - cur[i]) * 0.1;
        bonus[i] = Math.max(0, bonus[i] - dt * 0.0004);
      }
      nextDrop -= dt;
      if (nextDrop <= 0 && drops.length < 6) { drops.push({ c: Math.floor(Math.random() * cols), y: -SIZE, v: 0.1 }); nextDrop = 500 + Math.random() * 700; }
      for (let n = drops.length - 1; n >= 0; n--) {
        const d = drops[n]; d.v += dt * 0.0009; d.y += d.v * dt;
        const top = H - (Math.floor(cur[d.c] + bonus[d.c]) + 1) * STEP + (STEP - SIZE);
        if (d.y >= top - 2) { bonus[d.c] = Math.min(1.2, bonus[d.c] + 0.9); drops.splice(n, 1); }
      }
      draw();
      if (visible) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && visible && !reduced) { last = 0; raf = requestAnimationFrame(frame); } };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.on = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom + 160;
      ptr.lift = ptr.on ? Math.max(0.35, 1 - Math.max(0, r.top - e.clientY) / 300) : 0;
    };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); });
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(host); io.observe(host); resize(); draw(); kick();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { ro.disconnect(); io.disconnect(); window.removeEventListener("pointermove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} aria-hidden data-skyline className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
