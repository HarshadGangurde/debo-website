import type { ReactNode } from "react";

/**
 * Renders a post body written in plain text. Blank line = paragraph, "## " = heading, "- " lines = bullet list.
 * Everything is rendered as text nodes by React, so nothing the author types can become HTML or script.
 */
export function PostBody({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const out: ReactNode[] = blocks.map((b, i) => {
    if (b.startsWith("## ")) return <h2 key={i} className="mt-10 text-2xl font-extrabold">{b.slice(3).trim()}</h2>;
    const lines = b.split("\n");
    if (lines.every((l) => l.trim().startsWith("- "))) return <ul key={i} className="list-disc space-y-1 pl-6">{lines.map((l, k) => <li key={k}>{l.trim().slice(2)}</li>)}</ul>;
    return <p key={i}>{lines.map((l, k) => (k ? [<br key={`b${k}`} />, l] : l))}</p>;
  });
  return <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink">{out}</div>;
}
