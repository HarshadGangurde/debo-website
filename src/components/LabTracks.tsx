import { LAB_TRACKS, LABS } from "@/content/labs";
import { SpotlightGroup } from "./SpotlightGroup";
import { TrackedLink } from "./TrackedLink";

/** Each track as a small field of squares: one square per lab, so the size of a track is visible at a glance. */
export function LabTracks() {
  return (
    <SpotlightGroup as="ul" className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {LAB_TRACKS.map((t) => (
        <li key={t.slug} className="spot bg-paper">
          <TrackedLink href={`${LABS.url}/t/${t.slug}`} className="flex h-full min-h-56 flex-col gap-3 p-6">
            <span className="text-xl font-bold">{t.name}</span>
            <span className="text-sm text-muted">{t.blurb}</span>
            <span aria-hidden className="mt-auto flex flex-wrap gap-1 pt-4">
              {Array.from({ length: t.labs }, (_, i) => <span key={i} className="size-2 bg-brand-logo" />)}
            </span>
            <span className="text-sm font-semibold text-brand-text">{t.labs} {t.labs === 1 ? "lab" : "labs"} · {t.minutes} min</span>
          </TrackedLink>
        </li>
      ))}
    </SpotlightGroup>
  );
}
