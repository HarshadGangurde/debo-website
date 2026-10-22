import Link from "next/link";
import { STORIES } from "@/content/work";
import { InView } from "./InView";

const ROWS = [
  ["problem", "The problem"], ["challenge", "The challenge"], ["approach", "The approach"], ["solution", "The solution"], ["results", "Verified results"],
] as const;

export function ProofScene({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
      {STORIES.map((s) => (
        <InView key={s.slug} className="reveal">
          <article>
            <p className="text-sm font-semibold text-brand-text">{s.kind}</p>
            <H className="display mt-2 text-4xl sm:text-5xl">{s.title}</H>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {ROWS.map(([k, label]) => (
                <div key={k} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{label}</dt>
                  <dd className={k === "results" ? "italic text-muted" : "text-muted"}>{s[k]}</dd>
                </div>
              ))}
            </dl>
            <Link href={s.href} className="mt-4 inline-block py-3 font-semibold text-brand-text underline underline-offset-4">Read about {s.title}</Link>
          </article>
        </InView>
      ))}
    </div>
  );
}
