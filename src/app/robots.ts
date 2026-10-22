import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Only the real production deployment is indexable; previews/staging are not.
  const prod = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  return prod
    ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard"] }], sitemap: `${SITE.url}/sitemap.xml` }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
