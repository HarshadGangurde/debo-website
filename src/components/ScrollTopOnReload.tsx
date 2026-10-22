"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * On the home page a refresh should start at the top, not jump back to wherever you had scrolled.
 * Browsers restore the old scroll position on reload; here we turn that off for "/" and, if this load
 * is a reload, reset to the top. Links with a #hash, normal navigation and other pages are untouched.
 */
export function ScrollTopOnReload() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual"; // applies to the next refresh of this entry
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload" && !location.hash) window.scrollTo(0, 0);
    return () => { history.scrollRestoration = previous; };
  }, [pathname]);
  return null;
}
