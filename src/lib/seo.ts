import type { Metadata } from "next";
import { SITE } from "@/content/site";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE.name}`, description, url: path },
  };
}
