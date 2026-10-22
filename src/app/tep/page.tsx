import { Breadcrumb, PageHero, Section, SectionHeader } from "@/components/ui";
import { PixelEdge } from "@/components/PixelEdge";
import { TepJourney } from "@/components/TepJourney";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TEP_FAQ, TEP_INTRO } from "@/content/tep";
import { ButtonLink } from "@/components/ui";
import { getPrograms } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Technology Excellence Program (TEP)", "Mentor-led, project-based AI/ML and Multi-Cloud Engineering tracks from DeboisTech in Nashik.", "/tep");

export default async function TepPage() {
  const flagship = (await getPrograms())?.find((p) => p.flagship);
  const cohort = flagship ? ([["Starts", flagship.startDate], ["Ends", flagship.endDate], ["Duration", flagship.duration], ["Fee", flagship.fee]].filter(([, v]) => v) as [string, string][]) : [];
  const faq = cohort.length ? TEP_FAQ.filter((f) => f.q !== "Are fees and start dates listed here?") : TEP_FAQ;
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Program", href: "/program" }, { label: "Technology Excellence Program" }]} />
      <PageHero eyebrow="Program" title="Learn by building." lead={TEP_INTRO} />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white" labelledBy="tracks">
        <SectionHeader id="tracks" title="Choose a track." lead="Both tracks are hands-on and project-based. Pick one to see its path." />
        <TepJourney />
      </Section>
      <PixelEdge from="#ffffff" to="var(--wash)" />
      {cohort.length > 0 && (
        <Section theme="mint" labelledBy="cohort-h">
          <SectionHeader id="cohort-h" title="Current cohort." />
          <dl className="flex flex-wrap gap-x-12 gap-y-4">{cohort.map(([k, v]) => <div key={k}><dt className="text-sm text-muted">{k}</dt><dd className="text-xl font-bold">{v}</dd></div>)}</dl>
          <div className="mt-8"><ButtonLink href={flagship?.applyUrl ?? "/contact?intent=tep"}>{flagship?.applyUrl ? "Apply" : "Enquire or apply"}</ButtonLink></div>
        </Section>
      )}
      <Section theme={cohort.length > 0 ? "light" : "mint"} labelledBy="faq">
        <SectionHeader id="faq" title="Questions, answered." />
        <FAQAccordion items={faq} />
      </Section>
    </>
  );
}
