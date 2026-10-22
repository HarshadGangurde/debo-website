import type { Metadata } from "next";
import { DashboardApp } from "./DashboardApp";

// Not linked from anywhere on the site; reachable only by typing /dashboard. Kept out of search and the sitemap.
export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false, nocache: true } };

export default function DashboardPage() {
  return (
    <div className="fixed inset-0 z-[200] overflow-auto bg-paper text-ink">
      <DashboardApp />
    </div>
  );
}
