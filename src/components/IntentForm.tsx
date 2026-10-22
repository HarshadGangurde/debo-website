"use client";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { INTENTS, SITE, type Intent } from "@/content/site";
import { TRACKS } from "@/content/tep";
import { track } from "@/lib/analytics";
import { emptyEnquiry, LIMITS, validateEnquiry, type EnquiryInput, type FieldErrors } from "@/lib/validation";

type Phase = "idle" | "submitting" | "success" | "failure";
const FAIL_COPY: Record<string, string> = {
  not_configured: "Our enquiry inbox isn’t set up yet, so your message was not sent.",
  rate_limited: "Too many attempts from your connection. Please wait a few minutes and try again.",
  delivery_failed: "We couldn’t deliver your message just now.",
  invalid: "Some details need fixing. Check the highlighted fields.",
};

const field = "mt-1 block min-h-11 w-full rounded-[var(--radius-sm)] border border-line-strong bg-wash px-3 py-2 text-ink aria-[invalid=true]:border-error aria-[invalid=true]:border-2";

export function IntentForm({ initialIntent = "project", initialTrack = "" }: { initialIntent?: Intent; initialTrack?: string }) {
  const [v, setV] = useState<EnquiryInput>({ ...emptyEnquiry(initialIntent), track: initialTrack });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [failCode, setFailCode] = useState("");
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof EnquiryInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const onStart = () => { if (!started.current) { started.current = true; track("form_start", { form_type: "contact", intent: v.intent }); } };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (phase === "submitting") return;
    const errs = validateEnquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      track("form_error", { form_type: "contact", error_category: "validation" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setPhase("submitting");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: FieldErrors };
      if (res.ok && body.ok === true) {
        setPhase("success");
        track("form_success", { form_type: "contact", intent: v.intent });
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }
      if (body.errors) setErrors(body.errors);
      setFailCode(body.code ?? "delivery_failed");
      track("form_error", { form_type: "contact", error_category: body.code ?? "server" });
    } catch {
      setFailCode("delivery_failed");
      track("form_error", { form_type: "contact", error_category: "network" });
    }
    setPhase("failure");
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  if (phase === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[var(--radius-lg)] border-2 border-brand bg-mint p-8">
        <h2 className="text-2xl font-extrabold">Thanks. Your message was sent.</h2>
        <p className="mt-2 text-muted">The DeboisTech team has received your enquiry and will reply to the email address you provided.</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/products" className="text-brand-text underline underline-offset-4">Explore products</Link>
          <Link href="/services" className="text-brand-text underline underline-offset-4">Explore services</Link>
          <Link href="/" className="text-brand-text underline underline-offset-4">Back to home</Link>
        </div>
      </div>
    );
  }

  const errList = (Object.entries(errors) as [keyof EnquiryInput, string | undefined][]).filter(([, m]) => m);
  const err = (k: keyof EnquiryInput) => errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm font-medium text-error">{errors[k]}</p> : null;
  const a11y = (k: keyof EnquiryInput) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined } as const);
  const lbl = "block text-sm font-semibold";

  return (
    <form onSubmit={onSubmit} noValidate onFocus={onStart} className="space-y-5" aria-describedby="form-note">
      {errList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[var(--radius)] border-2 border-error bg-[var(--error-bg)] p-4">
          <h2 className="font-bold text-error">Please fix {errList.length} {errList.length === 1 ? "field" : "fields"}</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {errList.map(([k, m]) => <li key={k}><a className="underline" href={`#f-${k}`}>{m}</a></li>)}
          </ul>
        </div>
      )}
      {phase === "failure" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-[var(--radius)] border-2 border-error bg-[var(--error-bg)] p-4">
          <h2 className="font-bold text-error">Your message was not sent</h2>
          <p className="mt-1 text-sm">{FAIL_COPY[failCode] ?? FAIL_COPY.delivery_failed} What you entered is still here. You can try again, or contact us directly:{" "}
            <a className="font-semibold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a className="font-semibold underline" href={SITE.phoneHref}>{SITE.phone}</a>.</p>
        </div>
      )}
      <p id="form-note" className="text-sm text-muted">Fields marked <span aria-hidden>*</span><span className="sr-only">with an asterisk</span> are required.</p>

      <div>
        <label htmlFor="f-intent" className={lbl}>What is your enquiry about? *</label>
        <select id="f-intent" className={field} value={v.intent} onChange={set("intent")} required {...a11y("intent")}>
          {INTENTS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
        </select>{err("intent")}
      </div>

      {v.intent === "tep" && (
        <div>
          <label htmlFor="f-track" className={lbl}>Which track? *</label>
          <select id="f-track" className={field} value={v.track} onChange={set("track")} {...a11y("track")}>
            <option value="">Select a track</option>
            {TRACKS.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            <option value="not-sure">Not sure yet</option>
          </select>{err("track")}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={lbl}>Name *</label>
          <input id="f-name" className={field} value={v.name} onChange={set("name")} autoComplete="name" maxLength={LIMITS.name + 20} {...a11y("name")} />{err("name")}
        </div>
        <div>
          <label htmlFor="f-email" className={lbl}>Email *</label>
          <input id="f-email" type="email" inputMode="email" className={field} value={v.email} onChange={set("email")} autoComplete="email" {...a11y("email")} />{err("email")}
        </div>
        <div>
          <label htmlFor="f-phone" className={lbl}>Phone (optional)</label>
          <input id="f-phone" type="tel" className={field} value={v.phone} onChange={set("phone")} autoComplete="tel" {...a11y("phone")} />{err("phone")}
        </div>
        <div>
          <label htmlFor="f-organization" className={lbl}>Organization (optional)</label>
          <input id="f-organization" className={field} value={v.organization} onChange={set("organization")} autoComplete="organization" {...a11y("organization")} />{err("organization")}
        </div>
      </div>

      <div>
        <label htmlFor="f-message" className={lbl}>Message *</label>
        <textarea id="f-message" rows={6} className={field} value={v.message} onChange={set("message")} {...a11y("message")} />{err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input id="f-consent" type="checkbox" checked={v.consent} onChange={set("consent")} className="mt-1 size-5 accent-[var(--brand)]" {...a11y("consent")} />
          <span>I have read the <Link href="/privacy" className="font-semibold underline underline-offset-4">privacy notice</Link> and agree that DeboisTech may use these details to reply to my enquiry. *</span>
        </label>{err("consent")}
      </div>

      <button type="submit" disabled={phase === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-glow px-7 py-3 sm:w-auto font-semibold text-forest hover:bg-glow-hi disabled:opacity-60">
        {phase === "submitting" ? "Sending…" : phase === "failure" ? "Try again" : "Send enquiry"}
      </button>
    </form>
  );
}
