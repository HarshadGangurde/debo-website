"use client";
import type { ReactNode, PointerEvent } from "react";

/** Event delegation: any descendant with class "spot" gets a pointer-following light via --mx/--my. */
export function SpotlightGroup({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" }) {
  const onMove = (e: PointerEvent) => {
    const el = (e.target as Element).closest<HTMLElement>(".spot");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <Tag className={className} onPointerMove={onMove}>{children}</Tag>;
}
