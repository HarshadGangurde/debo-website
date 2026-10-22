"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type Slide = { id: string; label: string; node: ReactNode };

/**
 * Swipeable product slider on native scroll-snap (touch swipe, trackpad and wheel just work).
 * Prev/next buttons and a product switcher drive it too. No autoplay; reduced motion jumps instead of gliding.
 * Slides that aren't showing are `inert`, so keyboard and screen-reader users only meet the visible one.
 */
export function ProductCarousel({ slides, label }: { slides: Slide[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [announce, setAnnounce] = useState("");

  const goTo = useCallback((i: number, fromUser = true) => {
    const el = trackRef.current; if (!el) return;
    const n = Math.max(0, Math.min(slides.length - 1, i));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: n * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
    if (fromUser) track("product_view", { product_slug: slides[n].id });
  }, [slides]);

  // Keep `active` in step with the scroll position (swipes, trackpad, buttons alike).
  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
      setActive((prev) => { if (prev !== i) setAnnounce(`${slides[i]?.label}, slide ${i + 1} of ${slides.length}`); return i; });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => el.scrollTo({ left: active * el.clientWidth, behavior: "auto" });
    window.addEventListener("resize", onResize);
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, [slides, active]);

  const arrow = "inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-brand-text hover:text-brand-text disabled:pointer-events-none disabled:opacity-35";

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Choose a product" className="flex flex-wrap gap-2">
          {slides.map((s, i) => (
            <button key={s.id} type="button" onClick={() => goTo(i)} aria-pressed={i === active}
              className={`min-h-11 rounded-full border px-5 py-2 text-[15px] font-semibold transition-colors ${i === active ? "border-glow bg-glow text-forest" : "border-line-strong text-ink hover:border-glow"}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm text-muted" aria-hidden>{active + 1} / {slides.length}</span>
          <button type="button" className={arrow} onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous product">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l-6 6 6 6" /></svg>
          </button>
          <button type="button" className={arrow} onClick={() => goTo(active + 1)} disabled={active === slides.length - 1} aria-label="Next product">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div ref={trackRef} className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((s, i) => (
          <div key={s.id} role="group" aria-roledescription="slide" aria-label={`${s.label}, ${i + 1} of ${slides.length}`}
               inert={i !== active} className="w-full shrink-0 snap-center pr-px">
            {s.node}
          </div>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announce}</p>
    </div>
  );
}
