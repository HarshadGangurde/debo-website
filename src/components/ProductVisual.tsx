import Image from "next/image";
import type { Product } from "@/content/products";
import { ProductPreview } from "./ProductPreview";

/** The product's visual in a browser-style window: the real diagram where one exists, else a labelled illustrative preview. */
export function ProductVisual({ product: p, className = "", fit = false }: { product: Product; className?: string; fit?: boolean }) {
  return (
    <figure className={`overflow-hidden rounded-[var(--radius-lg)] light-surface border border-line shadow-[0_40px_100px_-40px_rgba(74,174,94,0.35)] ${className}`}>
      <div aria-hidden className="flex items-center gap-2 border-b border-line bg-wash px-4 py-3">
        <span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate rounded-full bg-paper px-3 py-1 text-xs text-muted">{p.visual ? new URL(p.source).host : "Example"}</span>
      </div>
      {p.visual ? (
        <>
          <div role="region" aria-label={`${p.name} diagram, scrolls sideways on small screens`} tabIndex={0} className="overflow-x-auto bg-white p-4 sm:p-8">
            <Image src={p.visual.src} alt={p.visual.alt} width={p.visual.width} height={p.visual.height} unoptimized className={`mx-auto h-auto w-full max-w-5xl ${fit ? "min-w-[560px] lg:min-w-0" : "min-w-[640px]"}`} />
          </div>
          <figcaption className="border-t border-line bg-paper px-4 py-3 text-sm text-muted">{p.visual.credit}</figcaption>
        </>
      ) : (
        <div className="mx-auto max-w-2xl p-4 sm:p-8"><ProductPreview slug={p.slug} /></div>
      )}
    </figure>
  );
}
