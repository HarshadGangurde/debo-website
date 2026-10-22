"use client";
import { buttonClass } from "@/components/ui";
import { SITE } from "@/content/site";

export default function Error({ unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  return (
    <div className="container-x py-24">
      <h1 className="text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 max-w-xl text-muted">We couldn’t load this page. Please try again. If it keeps happening, email {SITE.email}.</p>
      <button type="button" onClick={() => unstable_retry()} className={`${buttonClass("primary")} mt-6`}>Try again</button>
    </div>
  );
}
