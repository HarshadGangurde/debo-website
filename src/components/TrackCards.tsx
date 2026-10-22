import { TRACKS } from "@/content/tep";
import { ButtonLink } from "./ui";

export function TrackCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {TRACKS.map((t) => (
        <article key={t.slug} className="flex flex-col border-t-2 border-ink pt-6">
          <h3 className="display text-3xl sm:text-4xl">{t.name}</h3>
          <p className="mt-3 text-muted">{t.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/tep/${t.slug}`} event="tep_track_select" eventProps={{ track_id: t.slug }}>Track details</ButtonLink>
            <ButtonLink variant="secondary" href={`/contact?intent=tep&track=${t.slug}`} event="tep_track_select" eventProps={{ track_id: t.slug, cta_id: "enquire" }}>Enquire</ButtonLink>
          </div>
        </article>
      ))}
    </div>
  );
}
