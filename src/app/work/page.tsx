import { PageHero, Section } from "@/components/ui";
import { PixelEdge } from "@/components/PixelEdge";
import { ProofScene } from "@/components/ProofScene";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Work", "Product-development stories from DeboisTech: Debo Labs, MotoAdmin and TenantPlane.", "/work");

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Work you can inspect." lead="We publish client case studies only with written permission. Until those are ready, here is the work we can show: our own products." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white"><ProofScene headingLevel={2} /></Section>
    </>
  );
}
