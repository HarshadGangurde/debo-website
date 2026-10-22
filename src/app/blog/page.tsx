import Image from "next/image";
import { PixelEdge } from "@/components/PixelEdge";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";
import { getPosts, imageUrl } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Blog", "Notes from the DeboisTech team on engineering, our products and learning.", "/blog");
const date = (t?: number) => (t ? new Date(t).toLocaleDateString("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }) : "");

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes from the team." lead="Engineering, our products and what we teach." />
      <PixelEdge from="var(--paper)" to="#ffffff" />
      <Section theme="white">
        {posts.length === 0 ? (
          <p className="max-w-xl text-lg text-muted">No posts yet. Check back soon.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.id}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  {p.coverImageId && <Image src={imageUrl(p.coverImageId)} alt="" width={800} height={450} unoptimized className="aspect-video w-full rounded-[var(--radius)] border border-line object-cover" />}
                  <p className="mt-4 text-sm text-muted">{date(p.publishedAt)}{p.author ? ` · ${p.author}` : ""}</p>
                  <h2 className="mt-1 text-2xl font-extrabold leading-snug group-hover:text-brand-text">{p.title}</h2>
                  <p className="mt-2 text-muted">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
