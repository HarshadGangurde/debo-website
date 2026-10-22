import Link from "next/link";
import { PixelEdge } from "@/components/PixelEdge";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { PageHero, Section, SectionHeader } from "@/components/ui";
import { FinalInvitation } from "@/components/FinalInvitation";
import { ENGAGEMENT_STEPS } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Engineering Services", "Software engineering, AI/ML, cloud and DevOps, UI/UX, data engineering, cybersecurity and digital transformation from DeboisTech.", "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="What we engineer." lead="We design, build and run software with client teams. Choose an area, or tell us the problem and we’ll point you to the right one." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white"><ServicesExplorer /></Section>
      <PixelEdge from="#ffffff" to="var(--wash)" />
      <Section theme="mint" labelledBy="how">
        <SectionHeader id="how" title="How an engagement runs" lead="Every engagement moves through the same five phases, scaled to the size of the work." />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-5">{ENGAGEMENT_STEPS.map((s, i) => <li key={s} className="rounded-[var(--radius)] border border-line bg-forest-2 p-4"><span className="font-mono text-xs text-brand-text">{i + 1}</span><p className="font-bold">{s}</p></li>)}</ol>
        <p className="mt-6"><Link className="font-semibold text-brand-text underline underline-offset-4" href="/contact?intent=project">Start with a conversation</Link></p>
      </Section>
      <FinalInvitation />
    </>
  );
}
