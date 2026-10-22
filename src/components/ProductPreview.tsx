/** Clearly-labelled illustrative previews (no real product screenshots supplied yet). */
function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="light-surface overflow-hidden rounded-[var(--radius)] border border-line">
      <div className="flex items-center justify-between border-b border-line bg-wash px-3 py-2">
        <span className="font-mono text-xs text-muted">{title}</span>
        <span className="rounded-full border border-brand-text/40 px-2 py-0.5 font-mono text-xs text-brand-text">Illustrative preview, not a product screenshot</span>
      </div>
      <div className="p-4">{children}</div>
      <figcaption className="sr-only">Illustrative preview, not a screenshot of the live product.</figcaption>
    </figure>
  );
}

export function ProductPreview({ slug }: { slug: "debo-labs" | "motoadmin" | "tenantplane" }) {
  if (slug === "debo-labs") {
    return (
      <Frame title="learner@lab: ~">
        <pre className="overflow-x-auto rounded-md bg-forest p-4 font-mono text-xs leading-relaxed text-ondark" tabIndex={0} aria-label="Illustrative terminal output">
{`$ ls -l deploy.sh
-rw-r--r-- 1 learner learner 64 deploy.sh
$ chmod +x deploy.sh
$ ./deploy.sh
deploying to staging… done
✓ Check passed · deploy.sh is executable`}
        </pre>
        <p className="mt-3 text-xs text-muted">The example shown on labs.deboistech.in.</p>
      </Frame>
    );
  }
  if (slug === "tenantplane") {
    return (
      <Frame title="tenantplane explain-sync">
        <pre className="overflow-x-auto rounded-md bg-forest p-4 font-mono text-xs leading-relaxed text-ondark" tabIndex={0} aria-label="Illustrative terminal output">
{`$ tenantplane explain-sync (example)
tenant      team-a   (isolation: shared)
resource    Service/web  -> host namespace
decision    MAP   name rewritten, labels kept
resource    Secret/token -> host namespace
decision    DENY  not allowed by SyncPolicy`}
        </pre>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          {["TenantCluster", "IsolationProfile", "SyncPolicy"].map((c) => <li key={c} className="rounded border border-line px-2 py-1 font-mono">{c}</li>)}
        </ul>
      </Frame>
    );
  }
  const rows = [
    { doc: "Learner’s Licence", state: "Valid" },
    { doc: "Insurance", state: "Expiring soon" },
    { doc: "PUC", state: "Expired" },
  ];
  return (
    <Frame title="Customer · Sample record">
      <table className="w-full text-sm">
        <caption className="sr-only">Illustrative document status list</caption>
        <thead><tr className="text-left text-xs text-muted"><th className="pb-2 font-medium">Document</th><th className="pb-2 font-medium">Status</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.doc} className="border-t border-line"><td className="py-2">{r.doc}</td>
              <td className="py-2"><span className="font-semibold">{r.state}</span></td></tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-muted">Reminder sent via WhatsApp before expiry (example).</p>
    </Frame>
  );
}
