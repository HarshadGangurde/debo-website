"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Link that reports a whitelisted analytics event. External links open safely. */
export function TrackedLink({
  href, children, className, event, eventProps, ariaLabel, onNavigate,
}: {
  href: string; children: ReactNode; className?: string; event?: AnalyticsEvent;
  eventProps?: Record<string, string | undefined>; ariaLabel?: string; onNavigate?: () => void;
}) {
  const onClick = () => { if (event) track(event, eventProps); onNavigate?.(); };
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const web = href.startsWith("http");
    return (
      <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}
         {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {web && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>{children}</Link>;
}
