# DeboisTech website

Next.js 16 (App Router) · TypeScript · Tailwind v4. No CMS, database or animation library.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint && npx tsc --noEmit
npm run build && npm start -p 3100
npx playwright test  # needs the server on :3100 and Google Chrome installed (axe a11y + interaction tests)
```

## Structure
- `src/content/*` typed content (products, services, TEP tracks, team, careers, work, site constants). **Edit copy here, not in components.**
- `src/components/*` shared UI. `PipelineDemo`, `EcosystemMap`, `IntentForm` and `SiteHeader` are the only client-heavy pieces.
- `src/app/api/enquiry/route.ts` form endpoint (validation, honeypot, rate limit, Resend).
- `src/lib/validation.ts` is shared by browser and server. `src/lib/analytics.ts` is a whitelist-only event facade.
- `public/brand/*` trimmed + converted derivatives of the official logo files. Never redraw them.

## Environment (see `.env.example`)
| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | server-only Resend key |
| `ENQUIRY_TO_EMAIL` | recipient(s), comma-separated |
| `ENQUIRY_FROM_EMAIL` | sender on a Resend-verified domain |
| `NEXT_PUBLIC_SITE_URL` | canonical base URL |

Without the three Resend vars the API returns 503 and the form tells the visitor the message was **not** sent (and shows email/phone). It never fakes success.

## Redirects
`/about→/company`, `/privacy-policy→/privacy`, `/blogs→/`, `/faq→/contact` (in `next.config.ts`).
