"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { JOURNEY, TRACKS } from "@/content/tep";
import { track } from "@/lib/analytics";
import { ButtonLink } from "./ui";

/** Accessible tabs: arrow keys move between tracks; the panel is the learning roadmap. */
export function TepJourney() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = TRACKS[i];
  const select = (n: number) => { setI(n); track("tep_track_select", { track_id: TRACKS[n].slug }); };
  const onKey = (e: KeyboardEvent, n: number) => {
    const next = e.key === "ArrowRight" ? (n + 1) % TRACKS.length : e.key === "ArrowLeft" ? (n - 1 + TRACKS.length) % TRACKS.length : null;
    if (next === null) return;
    e.preventDefault(); select(next); refs.current[next]?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label="Program tracks" className="flex flex-wrap gap-2">
        {TRACKS.map((tr, n) => (
          <button key={tr.slug} ref={(el) => { refs.current[n] = el; }} role="tab" id={`tab-${tr.slug}`} aria-selected={n === i} aria-controls={`panel-${tr.slug}`}
            tabIndex={n === i ? 0 : -1} onClick={() => select(n)} onKeyDown={(e) => onKey(e, n)}
            className={`min-h-12 rounded-full border px-5 py-2 text-base font-semibold transition-colors ${n === i ? "border-glow bg-glow text-forest" : "border-line-strong text-ink hover:border-glow"}`}>
            {tr.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${t.slug}`} aria-labelledby={`tab-${t.slug}`} tabIndex={0} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-xl leading-relaxed text-muted">{t.summary}</p>
          <p className="mt-6 text-muted"><span className="font-semibold text-ink">Who it’s for. </span>{t.audience}</p>
          <p className="mt-4 text-muted"><span className="font-semibold text-ink">Format. </span>{t.format.map((f, k) => (k ? f.toLowerCase() : f)).join(", ")}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/tep/${t.slug}`} variant="secondary" event="tep_track_select" eventProps={{ track_id: t.slug, cta_id: "details" }}>Track details</ButtonLink>
            <ButtonLink href={`/contact?intent=tep&track=${t.slug}`} event="tep_track_select" eventProps={{ track_id: t.slug, cta_id: "enquire" }}>Enquire or apply</ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted">Dates, fees and availability change by cohort. We confirm them when you enquire.</p>
        </div>
        <ol className="relative border-l-2 border-line pl-8">
          {JOURNEY[t.slug].map((s, n) => (
            <li key={s.step} className="relative pb-8 last:pb-0">
              <span aria-hidden className="absolute -left-[41px] top-1.5 size-4 bg-brand-logo" />
              <p className="text-sm text-muted">Stage {n + 1}</p>
              <h3 className="text-xl font-bold">{s.step}</h3>
              <p className="mt-1 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
