import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PRODUCTS, productHref } from "@/content/products";
import { SERVICES } from "@/content/services";
import { TRACKS } from "@/content/tep";
import { getPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const paths = ["", "/products", "/services", "/company", "/work", "/blog", "/program", "/tep", "/labs", "/careers", "/contact", "/privacy", "/terms",
    ...PRODUCTS.map(productHref), ...SERVICES.map((s) => `/services/${s.slug}`), ...TRACKS.map((t) => `/tep/${t.slug}`), ...posts.map((p) => `/blog/${p.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}` }));
}
