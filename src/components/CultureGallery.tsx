import Image from "next/image";
import { CULTURE_PHOTOS } from "@/content/culture";
import { InView } from "./InView";

/** Work-culture photos as a quiet editorial grid. Renders nothing until real photos exist in content/culture.ts. */
export function CultureGallery({ title = "Where we build and learn.", headingLevel = 3 }: { title?: string; headingLevel?: 2 | 3 }) {
  if (CULTURE_PHOTOS.length === 0) return null;
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section aria-labelledby="culture-h" className="mt-16 sm:mt-24">
      <H id="culture-h" className="display mb-8 text-3xl sm:text-4xl">{title}</H>
      <InView>
        <ul className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4">
          {CULTURE_PHOTOS.map((p, i) => (
            <li key={p.src} className={`reveal group relative overflow-hidden rounded-[var(--radius)] border border-line ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ ["--d" as string]: `${Math.min(i, 6) * 0.06}s` }}>
              <figure className="size-full">
                <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: p.position }} />
                {p.placeholder && (
                  <span className="absolute left-3 top-3 rounded-full border border-line-strong bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">Placeholder</span>
                )}
                {p.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 max-sm:opacity-100">{p.caption}</figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
