import { IntentForm } from "@/components/IntentForm";
import { PixelEdge } from "@/components/PixelEdge";
import { PageHero, Section } from "@/components/ui";
import { INTENTS, SITE, type Intent } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Contact", "Contact DeboisTech about a software project, a product, the Technology Excellence Program, careers or a partnership.", "/contact");

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) ?? "";
  const intent = (INTENTS.find((i) => i.value === one("intent"))?.value ?? "project") as Intent;
  const track = ["ai-ml", "multi-cloud"].includes(one("track")) ? one("track") : "";
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk" lead="Tell us what you need. Start by choosing what your enquiry is about." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <IntentForm initialIntent={intent} initialTrack={track} />
          <aside aria-labelledby="direct" className="space-y-4 text-muted">
            <h2 id="direct" className="text-xl font-extrabold text-ink">Prefer to reach us directly?</h2>
            <p><span className="block font-semibold text-ink">Email</span><a className="inline-block py-1 underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p><span className="block font-semibold text-ink">Phone / WhatsApp</span><a className="inline-block py-1 underline" href={SITE.phoneHref}>{SITE.phone}</a></p>
            <p><span className="block font-semibold text-ink">Location</span>{SITE.location}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
