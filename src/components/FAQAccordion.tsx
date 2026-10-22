/** Native <details>: keyboard and screen-reader accessible with zero client JS. */
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-[var(--radius)] border border-line bg-wash">
      {items.map((it) => (
        <details key={it.q} className="group p-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden className="font-mono text-brand-text transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
