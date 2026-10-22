import { PRODUCTS, productHref } from "./products";

/** Product-development stories only. No client case studies are approved. */
export const STORIES = PRODUCTS.map((p) => ({
  slug: p.slug,
  title: p.name,
  kind: p.slug === "tenantplane" ? "Open source" : p.slug === "debo-labs" ? "Learning platform" : "Product",
  href: productHref(p),
  ...p.story,
}));
