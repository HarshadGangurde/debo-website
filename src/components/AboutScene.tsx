import { SITE } from "@/content/site";
import { InView } from "./InView";
import { ScrollText } from "./ScrollText";

/** The opening statement, then what the company does and where it works. All facts are from deboistech.in. */
export function AboutScene() {
  return (
    <section aria-label="About DeboisTech" className="bg-paper pb-16 pt-20 text-ink sm:pb-28 sm:pt-36">
      <div className="container-x">
        <ScrollText className="display max-w-6xl text-3xl sm:text-5xl lg:text-6xl" text="A small engineering team in Nashik. We build software for clients, run products of our own, and teach what we practise." />

        <InView className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <p className="reveal max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            With client teams we work on software, AI/ML, cloud and DevOps, UI/UX, data engineering, cybersecurity and digital transformation.
            We also build and run our own products, and teach engineers through the Technology Excellence Program and Debo Labs.
          </p>
          <dl className="reveal space-y-5" style={{ ["--d" as string]: ".12s" }}>
            <div className="border-t border-line pt-4">
              <dt className="text-sm text-muted">Based in</dt>
              <dd className="mt-1 text-lg font-semibold">{SITE.location}</dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="text-sm text-muted">Works with</dt>
              <dd className="mt-1 text-lg font-semibold">Clients across India and internationally, remotely</dd>
            </div>
          </dl>
        </InView>
      </div>
    </section>
  );
}
