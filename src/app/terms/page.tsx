import { PageHero, Section } from "@/components/ui";
import { PixelEdge } from "@/components/PixelEdge";
import { Prose } from "@/components/Prose";
import { SITE } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Terms of Use", "Terms governing use of the DeboisTech website.", "/terms");

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" lead="Terms for using this website." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white">
        <Prose>
          <p>These terms cover general use of this website. Product, program and service terms are agreed separately.</p>
          <h2>About this website</h2>
          <p>This website is operated by {SITE.legalName}, {SITE.location}.</p>
          <h2>Use of the website</h2>
          <p>You may browse the site and use its enquiry forms for lawful purposes. Do not attempt to disrupt the site, probe it for vulnerabilities, or submit unlawful or misleading content.</p>
          <h2>Information on this site</h2>
          <p>We aim to keep information accurate, but product capabilities, program details and availability can change. Nothing here is an offer; commitments are made only in a written agreement.</p>
          <h2>Intellectual property</h2>
          <p>The DeboisTech name, logo and site content belong to DeboisTech unless stated otherwise. Open-source products such as TenantPlane are licensed under their own licences.</p>
          <h2>Third-party links</h2>
          <p>We link to external sites and services we don’t control, and aren’t responsible for their content.</p>
          <h2>Liability</h2>
          <p>To the extent permitted by law, DeboisTech is not liable for loss arising from your use of this website.</p>
          <h2>Governing law</h2>
          <p>Indian law applies, with jurisdiction in the courts of Nashik.</p>
          <h2>Contact</h2>
          <p><a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a></p>
        </Prose>
      </Section>
    </>
  );
}
