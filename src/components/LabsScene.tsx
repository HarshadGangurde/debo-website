import { LAB_TOTALS, LABS } from "@/content/labs";
import { LabTerminal } from "./LabTerminal";
import { ButtonLink, Section, SectionHeader } from "./ui";

/** Homepage scene: Debo Labs, the hands-on DevOps practice platform. */
export function LabsScene() {
  return (
    <Section theme="white" labelledBy="labs">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader id="labs" eyebrow="Debo Labs" title="Practice in a real terminal." lead="Our hands-on DevOps platform. Every lab runs in a real shell and is graded on what actually happened in your sandbox." />
          <p className="-mt-6 mb-8 text-muted">{LAB_TOTALS.labs} labs across {LAB_TOTALS.tracks} tracks, about {LAB_TOTALS.minutes.toLocaleString("en-IN")} minutes in total. Run it hosted, or offline in Docker.</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/labs" event="hero_cta_click" eventProps={{ cta_id: "labs_about" }}>About Debo Labs</ButtonLink>
            <ButtonLink href={LABS.startUrl} variant="secondary" event="hero_cta_click" eventProps={{ cta_id: "labs_start" }}>Start the first lab</ButtonLink>
          </div>
        </div>
        <LabTerminal />
      </div>
    </Section>
  );
}
