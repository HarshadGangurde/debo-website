import Image from "next/image";
import { markSize, productHref, type Product } from "@/content/products";
import { Badge, ButtonLink } from "./ui";
import { ProductVisual } from "./ProductVisual";
import { InView } from "./InView";
import { DocumentTicker } from "./DocumentTicker";

/** A product "launch": product mark, big claim, one large visual, three highlights, honest status. */
export function ProductStory({ product: p, tone = "light", headingLevel = 2 }: { product: Product; tone?: "light" | "wash"; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section aria-labelledby={`${p.slug}-h`} className={`${tone === "wash" ? "light-surface" : "bg-paper"} py-14 sm:py-28`}>
      <InView className="container-x">
        <div className="reveal flex flex-wrap items-center gap-4">
          <span className="light-surface inline-flex items-center rounded-xl px-3 py-1.5"><Image src={p.mark.src} alt={p.mark.alt} width={markSize(p).w} height={markSize(p).h} className="h-9 w-auto" unoptimized={p.mark.src.endsWith(".svg")} /></span>
          <span className="text-xl font-bold">{p.name}</span>
          <Badge>{p.status}</Badge>
        </div>
        <H id={`${p.slug}-h`} className="display reveal mt-6 max-w-5xl text-5xl sm:text-7xl lg:text-8xl" style={{ ["--d" as string]: ".08s" }}>{p.headline}</H>
        <p className="reveal mt-6 max-w-2xl text-xl leading-relaxed text-muted" style={{ ["--d" as string]: ".16s" }}>{p.summary}</p>
        <div className="reveal mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: ".24s" }}>
          <ButtonLink href={productHref(p)} event="product_cta_click" eventProps={{ product_slug: p.slug, cta_id: "story_details" }}>About {p.name}</ButtonLink>
          <ButtonLink href={p.cta[0].href} variant="secondary" event="product_cta_click" eventProps={{ product_slug: p.slug, cta_id: "story_primary_external" }}>{p.cta[0].label}</ButtonLink>
        </div>

        <ProductVisual product={p} className="reveal mt-10 sm:mt-20" />

        {p.slug === "motoadmin" && <DocumentTicker />}

        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:mt-14 sm:gap-y-8 md:grid-cols-3">
          {p.highlights.map((h, i) => (
            <li key={h.title} className="reveal border-t-2 border-ink pt-5" style={{ ["--d" as string]: `${0.1 * i}s` }}>
              <h3 className="text-xl font-bold">{h.title}</h3>
              <p className="mt-2 text-muted">{h.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">{p.statusNote}</p>
      </InView>
    </section>
  );
}
