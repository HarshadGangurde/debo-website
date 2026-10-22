/** The seven documents MotoAdmin tracks (from motoadmin.in). Pauses on hover; static and wrapped under reduced motion. */
const DOCS = ["Learner’s Licence", "Driving Licence", "Vehicle RC", "Insurance", "PUC", "Fitness Certificate", "Badge"];

export function DocumentTicker() {
  const row = (hidden: boolean) => (
    <ul className={`flex shrink-0 items-center gap-10 pr-10 ${hidden ? "ticker-dup" : ""}`} aria-hidden={hidden || undefined}>
      {DOCS.map((d) => (
        <li key={d} className="flex items-center gap-10 whitespace-nowrap text-2xl font-semibold text-ink sm:text-3xl">
          {d}<span aria-hidden className="size-2 bg-brand-logo" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ticker mt-10 overflow-hidden border-y border-line py-6" role="group" aria-label="Documents MotoAdmin tracks">
      <p className="mb-4 text-sm text-muted">Documents it tracks</p>
      <div className="ticker-track">{row(false)}{row(true)}</div>
    </div>
  );
}
