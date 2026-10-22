import Image from "next/image";
import { markSize, productHref, type Product } from "@/content/products";
import { Badge, ButtonLink } from "./ui";
import { ProductVisual } from "./ProductVisual";

/** One slide of the homepage product slider: the pitch on one side, the product visual on the other. */
export function ProductSlide({ product: p }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="light-surface inline-flex items-center rounded-xl px-3 py-1.5">
            <Image src={p.mark.src} alt={p.mark.alt} width={markSize(p).w} height={markSize(p).h} className="h-8 w-auto" unoptimized={p.mark.src.endsWith(".svg")} />
          </span>
          <span className="text-lg font-bold">{p.name}</span>
          <Badge>{p.status}</Badge>
        </div>
        <h3 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">{p.headline}</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{p.summary}</p>
        <ul className="mt-6 space-y-3">
          {p.highlights.map((h) => (
            <li key={h.title} className="flex gap-3">
              <span aria-hidden className="mt-2 size-2 shrink-0 bg-glow" />
              <span><span className="font-semibold">{h.title}.</span> <span className="text-muted">{h.body}</span></span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={productHref(p)} event="product_cta_click" eventProps={{ product_slug: p.slug, cta_id: "slider_learn_more" }}>Learn more about {p.name}</ButtonLink>
          <ButtonLink href={p.cta[0].href} variant="secondary" event="product_cta_click" eventProps={{ product_slug: p.slug, cta_id: "slider_primary_external" }}>{p.cta[0].label}</ButtonLink>
        </div>
      </div>
      <ProductVisual product={p} fit className="min-w-0" />
    </div>
  );
}
