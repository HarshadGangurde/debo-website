import { INTENTS, type Intent } from "@/content/site";

export type EnquiryInput = {
  intent: Intent;
  name: string;
  email: string;
  phone: string;
  organization: string;
  track: string;
  message: string;
  consent: boolean;
  /** honeypot: real users never fill this */
  website: string;
};
export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export const LIMITS = { name: 100, email: 254, phone: 20, organization: 120, message: 4000 } as const;
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;
const TRACKS = ["", "ai-ml", "multi-cloud", "not-sure"];

export const emptyEnquiry = (intent: Intent = "project"): EnquiryInput => ({
  intent, name: "", email: "", phone: "", organization: "", track: "", message: "", consent: false, website: "",
});

/** Used identically on the client (inline errors) and the server (authoritative). */
export function validateEnquiry(v: EnquiryInput): FieldErrors {
  const e: FieldErrors = {};
  if (!INTENTS.some((i) => i.value === v.intent)) e.intent = "Choose what your enquiry is about.";
  if (!v.name.trim()) e.name = "Enter your name.";
  else if (v.name.length > LIMITS.name) e.name = `Keep your name under ${LIMITS.name} characters.`;
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Enter a valid phone number, or leave it blank.";
  if (v.organization.length > LIMITS.organization) e.organization = `Keep this under ${LIMITS.organization} characters.`;
  if (!TRACKS.includes(v.track)) e.track = "Choose a track from the list.";
  if (v.intent === "tep" && !v.track) e.track = "Choose a track, or select “Not sure yet”.";
  if (v.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  else if (v.message.length > LIMITS.message) e.message = `Keep your message under ${LIMITS.message} characters.`;
  if (!v.consent) e.consent = "Please confirm you have read the privacy notice.";
  return e;
}

/** Coerce unknown JSON into the typed shape (server side). */
export function parseEnquiry(raw: unknown): EnquiryInput | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const s = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
  return {
    intent: s("intent") as Intent, name: s("name"), email: s("email"), phone: s("phone"),
    organization: s("organization"), track: s("track"), message: s("message"),
    consent: o.consent === true, website: s("website"),
  };
}
