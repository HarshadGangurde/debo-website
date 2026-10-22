import { COMMUNITIES, COMMUNITY_INTRO } from "@/content/community";
import { InView } from "./InView";
import { SectionHeader } from "./ui";

/** How DeboisTech contributes to developer communities. Content lives in src/content/community.ts. */
export function CommunitySection({ headingId = "community" }: { headingId?: string }) {
  return (
    <>
      <SectionHeader id={headingId} title="Our community work." lead={COMMUNITY_INTRO} />
      <InView>
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {COMMUNITIES.map((c, i) => (
            <li key={c.name} className="reveal flex flex-col border-t-2 border-ink pt-6" style={{ ["--d" as string]: `${i * 0.08}s` }}>
              <h3 className="text-2xl font-extrabold leading-tight">{c.name}</h3>
              <p className="mt-2 text-sm text-muted">{c.about}</p>
              {c.contribution.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {c.contribution.map((t) => (
                    <li key={t} className="flex gap-3"><span aria-hidden className="mt-2 size-2 shrink-0 bg-brand-logo" /><span className="text-muted">{t}</span></li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-muted">Contribution details are being added.</p>
              )}
              {c.facts.length > 0 && (
                <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                  {c.facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[6rem_1fr] gap-3 py-2.5"><dt className="text-muted">{f.label}</dt><dd className="font-medium">{f.value}</dd></div>
                  ))}
                </dl>
              )}
            </li>
          ))}
        </ul>
      </InView>
    </>
  );
}
