import { PageHero, Section } from "@/components/ui";
import { PixelEdge } from "@/components/PixelEdge";
import { Prose } from "@/components/Prose";
import { SITE } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Privacy Policy", "How DeboisTech IT Solutions LLP collects, uses and protects personal information.", "/privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="Last updated 21 July 2026." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white">
        <Prose>
          <p>{SITE.legalName} (“DeboisTech”, “we”) operates www.deboistech.in from {SITE.location}.</p>
          <h2>Information we collect</h2>
          <ul><li>Personal details such as name, contact information, billing details and address.</li><li>Technical data such as IP address, device and browser information, and cookies.</li><li>Product and service data such as accounts, logs and API usage.</li></ul>
          <h2>How we collect it</h2>
          <p>When you visit our website, submit forms or quote requests, make purchases, attend events, subscribe to newsletters, apply for jobs, answer surveys, use our products, or contact support.</p>
          <h2>How we use it</h2>
          <p>To deliver services, manage accounts and payments, provide support, improve our products, keep them secure, and comply with the law. We do not sell personal information.</p>
          <h2>Cookies</h2>
          <p>Cookies may be used for preferences, functionality, analytics and experience. You can disable them in your browser settings.</p>
          <h2>Sharing</h2>
          <p>We share information only where necessary, for example with hosting, payment, email and analytics providers, in response to legal requests, and with service partners. We do not share information for advertising without your consent.</p>
          <h2>Security</h2>
          <p>We use measures such as encryption in transit, access controls, multi-factor authentication, monitoring, backups and role-based permissions.</p>
          <h2>Retention</h2>
          <p>We keep information only as long as needed for services, legal duties, disputes or agreements, then delete or anonymise it.</p>
          <h2>Third-party services</h2>
          <p>We may use third-party services including Google Workspace, GitHub, Microsoft, AWS, Google Cloud, Azure, Cloudflare, Stripe and Razorpay. Each is governed by its own privacy policy.</p>
          <h2>Children</h2>
          <p>Our services are not intended for children under 13, or the applicable minimum age in your country.</p>
          <h2>International transfers</h2>
          <p>Your data may be processed outside your country with reasonable safeguards.</p>
          <h2>Your rights</h2>
          <p>You may request access, correction, deletion, restriction, objection, withdrawal of consent, and data portability using the contact details below.</p>
          <h2>Email communications</h2>
          <p>We send service, security, product, support, billing and event messages. Marketing is sent only where permitted, with an unsubscribe option.</p>
          <h2>Recruitment</h2>
          <p>CVs, portfolios, interview notes and assessments are used only for hiring and employment purposes.</p>
          <h2>Intellectual property</h2>
          <p>Materials you share with us remain DeboisTech’s property unless agreed otherwise in writing.</p>
          <h2>Changes</h2>
          <p>We post updates on this website with a new effective date.</p>
          <h2>Governing law</h2>
          <p>Indian law applies, with exclusive jurisdiction in the courts of Nashik.</p>
          <h2>Contact</h2>
          <p>Legal matters: <a href={`mailto:${SITE.legalEmail}`}>{SITE.legalEmail}</a>. General enquiries: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        </Prose>
      </Section>
    </>
  );
}
