import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb, ButtonLink, Section } from "@/components/ui";
import { PostBody } from "@/components/PostBody";
import { getPost, imageUrl } from "@/lib/content";
import { SITE } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const date = (t?: number) => (t ? new Date(t).toLocaleDateString("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }) : "");

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const p = await getPost((await params).slug);
  return p ? pageMeta(p.title, p.excerpt, `/blog/${p.slug}`) : { title: "Post not found", robots: { index: false } };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt, url: `${SITE.url}/blog/${p.slug}`,
    ...(p.publishedAt ? { datePublished: new Date(p.publishedAt).toISOString() } : {}), ...(p.author ? { author: { "@type": "Person", name: p.author } } : {}), publisher: { "@type": "Organization", name: SITE.legalName } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: p.title }]} />
      <Section className="!pt-8">
        <article>
          <p className="text-sm text-muted">{date(p.publishedAt)}{p.author ? ` · ${p.author}` : ""}</p>
          <h1 className="display mt-3 max-w-4xl text-4xl sm:text-6xl">{p.title}</h1>
          <p className="mt-5 max-w-2xl text-xl text-muted">{p.excerpt}</p>
          {p.coverImageId && <Image src={imageUrl(p.coverImageId, "full")} alt="" width={1600} height={900} unoptimized className="mt-10 aspect-video w-full max-w-4xl rounded-[var(--radius-lg)] border border-line object-cover" />}
          <div className="mt-10"><PostBody text={p.body} /></div>
          {p.tags && p.tags.length > 0 && <ul className="mt-10 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm text-muted">{t}</li>)}</ul>}
          <div className="mt-12"><ButtonLink href="/blog" variant="secondary">All posts</ButtonLink></div>
        </article>
      </Section>
    </>
  );
}
