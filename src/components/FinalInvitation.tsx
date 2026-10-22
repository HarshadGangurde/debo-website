import { InView } from "./InView";
import { TrackedLink } from "./TrackedLink";

const PATHS = [
  { id: "build", label: "Build a product or engineering solution", href: "/contact?intent=project" },
  { id: "product", label: "Explore a DeboisTech product", href: "/products" },
  { id: "program", label: "Explore our programs", href: "/program" },
] as const;

/** Closing scene: a short invitation and three pathways. */
export function FinalInvitation() {
  return (
    <section aria-labelledby="final" className="overflow-hidden bg-paper pb-16 pt-16 sm:pb-24 sm:pt-36">
      <InView className="container-x">
        <h2 id="final" className="display max-w-5xl text-5xl sm:text-7xl lg:text-8xl">Build something with DeboisTech.</h2>
        <ul className="mt-10 border-t border-line sm:mt-14">
          {PATHS.map((p) => (
            <li key={p.id} className="border-b border-line">
              <TrackedLink href={p.href} event="hero_cta_click" eventProps={{ cta_id: `closing_${p.id}`, destination: p.href }}
                className="group flex min-h-20 items-center justify-between gap-4 py-5 text-2xl font-semibold sm:text-4xl">
                <span className="transition-transform duration-300 group-hover:translate-x-2">{p.label}</span>
                <span aria-hidden className="text-brand-text">→</span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
