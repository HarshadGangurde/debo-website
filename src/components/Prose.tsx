import type { ReactNode } from "react";
export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl space-y-4 text-ink [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_li]:ml-5 [&_li]:list-disc [&_a]:font-semibold [&_a]:text-brand-text [&_a]:underline">{children}</div>;
}
