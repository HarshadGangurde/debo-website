import { ButtonLink, PageHero, Section } from "@/components/ui";
import { PixelEdge } from "@/components/PixelEdge";
import { OPENINGS } from "@/content/careers";
import { TrackedLink } from "@/components/TrackedLink";
import { SITE } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Careers", "Open roles at DeboisTech.", "/careers");

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Work with DeboisTech" lead="We’re a small engineering team in Nashik." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white">
        {OPENINGS.length === 0 ? (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold">No current openings</h2>
            <p className="mt-2 text-muted">We don’t have open roles listed right now. If you’d like us to keep you in mind, tell us what you do and send a link to your work.</p>
            <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/contact?intent=careers">Get in touch</ButtonLink><ButtonLink variant="secondary" href={`mailto:${SITE.email}`}>{SITE.email}</ButtonLink></div>
          </div>
        ) : (
          <ul className="space-y-6">{OPENINGS.map((o) => (
            <li key={o.slug} className="rounded-[var(--radius)] border border-line p-6"><h2 className="text-xl font-bold">{o.title}</h2><p className="text-muted">{o.location} · {o.type}</p>
              <TrackedLink href={o.applyHref} event="career_apply_click" eventProps={{ role_slug: o.slug, destination: o.applyHref }} className="mt-3 inline-block font-semibold text-brand-text underline">Apply</TrackedLink></li>
          ))}</ul>
        )}
      </Section>
    </>
  );
}
