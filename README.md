# Kraftt Digital — Website

A production-ready, multipage React + TypeScript website for Kraftt Digital, built from the supplied brand identity and service/pricing files. This README covers the brand audit, design decisions, architecture, setup, deployment, and how to maintain the site going forward.

---

## 1. Brand audit summary

Extracted from `kraftt_digital_brand_identity.html` and `agency_service_menu_and_pricing.html`.

- **Brand name:** Kraftt Digital
- **Tagline:** "Digital presence for brands that take themselves seriously."
- **Positioning:** A digital agency offering web design, Shopify development, e-commerce SEO, content/copywriting, dashboards/internal tools, AI-powered creative, brand identity, and social media management — for Indian and international clients, priced transparently in INR and USD.
- **Voice:** precise, craft-forward, confident (not loud), result-first, human (not corporate), earned authority. Copy throughout the site avoids generic agency filler ("bespoke", "cutting-edge", "unlock") in favour of specific, factual statements.
- **Services extracted:** 8 categories, 3 packages each (24 total), plus 4 bundles — every name, inclusion, add-on, price (INR + USD where supplied) and delivery window transcribed exactly into `src/data/services.ts` and `src/data/bundles.ts`.

## 2. Design system

### Colour palette (sourced directly from the brand kit, see `src/index.css` `@theme`)

| Token | Hex | Use |
|---|---|---|
| `--color-midnight` | `#0D0D0D` | Primary dark background, header, nav |
| `--color-linen` | `#E8DCC8` | Primary text on dark |
| `--color-umber` | `#8B7355` | The one accent colour — CTAs, links, active states |
| `--color-parchment` | `#F2EFE9` | **Primary light background** (chosen over pure white — it is the brand's own warm off-white, and reads as more considered/editorial against the dark sections) |
| `--color-indigo` | `#1A1A2E` | Secondary dark surface |
| `--color-forest` | `#2C4A3E` | Success states |
| `--color-sand` | `#C5A882` | Hover state, soft accent |
| `--color-graphite` | `#1E1E1E` | Cards on dark backgrounds |
| `--color-dusk` | `#4A453F` | Muted body text on dark |
| `--color-bone` | `#E2DDD6` | Borders/dividers on light backgrounds |

### Typography

- **Display / headings:** Cormorant Garamond, weight 300 (never bold) — the luxury feel comes from thinness and generous tracking, not weight.
- **Body / UI:** Outfit — a clean geometric sans for legibility at small sizes.

### Why these choices

Pure white was deliberately rejected as the primary light background in favour of `parchment` (`#F2EFE9`), since it is part of the actual brand palette and creates a warmer, more editorial feel consistent with "premium, design-led, refined" in the brief. Bold display type was avoided entirely — every `h1`–`h4` is weight 300, with italic (`<em>`) reserved for single accent words in umber.

## 3. Information architecture / sitemap

```
/                                  Home
/services                         Services index (all 8 categories + bundles)
/services/:slug                   Service detail (8 routes — see src/data/services.ts)
/portfolio                        Portfolio index (empty state — see note below)
/portfolio/:slug                  Case study detail template (ready, unpopulated)
/about
/contact
/blog                              Blog index
/blog/:slug                       5 seed articles
/tools                             Tools hub
/tools/sip-calculator
/tools/net-worth-calculator
/tools/website-cost-calculator
/tools/branding-cost-calculator
/tools/social-media-cost-calculator
/tools/seo-roi-calculator
/tools/roas-calculator
/tools/break-even-calculator
/tools/profit-margin-calculator
/tools/gst-calculator
/tools/emi-calculator
/tools/compound-interest-calculator
/legal/privacy-policy
/legal/terms-and-conditions
/legal/cookie-policy
/legal/refund-policy
*                                  404
```

All 8 service category slugs: `web-design`, `shopify-development`, `ecommerce-seo`, `content-copywriting`, `dashboards-tools`, `ai-content`, `brand-identity`, `social-media-management`.

**On the empty portfolio:** no real client projects were supplied in the source files. Per the brief's explicit instruction never to invent fake clients, case studies or results, `src/data/portfolio.ts` ships as an empty array with a polished, honest empty state on the Portfolio page and on each service page's "related work" section, rather than placeholder content that could be mistaken for real work. The full data schema, filtering UI, and detail-page template are built and ready — adding a real project is a one-object addition (see §8).

## 4. Tech stack & architecture

- **React 19 + TypeScript + Vite** — `npm create vite` scaffold, strict TS config (`noUnusedLocals`, `noUnusedParameters` enabled — the build fails on dead code).
- **React Router 7** — real routes (`/services/web-design`, not `/#/services`).
- **Tailwind CSS v4** — theme tokens defined once in `src/index.css` (`@theme` block), used everywhere via CSS variables.
- **Framer Motion** — used only in `Reveal` (scroll-entrance), `FAQAccordion` (expand/collapse), and the mega menu — never on every element. `useReducedMotion()` is checked in every motion component; the marquee and all CSS transitions also respect `prefers-reduced-motion` globally (see `src/index.css`).
- **lucide-react** — icon set; resolved by name through a single `DynamicIcon` component (`src/utils/icons.tsx`) so new categories/tools just reference an icon name in data, no component changes needed.
- **Centralised data layer** — every piece of repeatable content lives in `src/data/*.ts` or `src/config/siteConfig.ts`. No service, price, FAQ, or nav item is hardcoded inside a component.
- **Route-level code splitting** — every page is `React.lazy()`-loaded in `src/App.tsx`; the production build confirms this (each page is its own small chunk).

### Why this is a client-rendered SPA, and what to do about SEO before launch

This project renders metadata (`<title>`, meta description, canonical, Open Graph, JSON-LD) **client-side** via the `SEO` and `JsonLd` components, because the available build tooling here is Vite + React Router without a server. This is genuinely fine for users and for AI/JS-executing crawlers, but for maximum traditional-SEO crawlability, add a prerendering step before a real launch:

- Easiest: add `vite-plugin-prerender` (or similar) so `npm run build` also emits static HTML per route with the correct `<head>` baked in.
- Most robust: migrate the route tree (already a flat, simple list in `App.tsx`) to Next.js App Router for true SSR/SSG — the component structure, data files and Tailwind theme all carry over directly.

Every page's title/description is already centralised in its `<SEO />` call, so either migration path is a mechanical change, not a content rewrite.

## 5. Getting started

```bash
npm install
cp .env.example .env     # optional: override the default Formspree contact endpoint (see §9)
npm run dev               # http://localhost:5173
```

### Build & preview

```bash
npm run build              # tsc -b && generate sitemap.xml && vite build
npm run preview            # serve the production build locally
```

### Lint

```bash
npm run lint                # zero errors, zero warnings on this codebase
```

## 6. Deployment

The build output is a static `dist/` folder. Any static host works.

- **Vercel:** `vercel.json` is included with a SPA rewrite rule (everything except `/assets`, `sitemap.xml`, `robots.txt` falls back to `index.html` so React Router can render the matched route on a hard refresh/direct link).
- **Netlify:** `netlify.toml` is included with the equivalent redirect rule and build command.
- **Any other static host (S3/CloudFront, GitHub Pages, etc.):** configure a catch-all rewrite to `/index.html` for any path that isn't a real static file — this is required for any client-side-routed SPA, not specific to this project.

## 7. Currency system

- Every package price in `src/data/services.ts` was supplied with **both** an explicit USD and INR amount in the source pricing file — these are not generated by a conversion formula, they are the agency's own deliberately-set, commercially-rounded prices (e.g. `$299`, never `$247.36`).
- A small number of add-ons were only supplied in one currency. For those, `src/data/priceHelpers.ts` (`addonInrOnly` / `addonUsdOnly`) computes the missing side from a single, stable, manually-set fallback rate — never a live exchange rate — and flags it as approximate (`usdApprox`/`inrApprox`), which `formatPrice()` renders with a `≈` prefix.
- **To update the fallback rate:** edit `siteConfig.currency.fallbackUsdPerInr` in `src/config/siteConfig.ts`. Nothing else needs to change.
- Currency choice is stored in `localStorage` (`src/context/CurrencyContext.tsx`), defaults to a locale-based recommendation on first visit (`en-IN` → INR, otherwise USD), and is fully keyboard-accessible and immediately reflected everywhere via `useCurrency()` — no page reload, no layout shift (the toggle has a fixed width).
- No `?currency=` URL parameters are used, so there is no duplicate-content risk for search engines — currency is a display preference, not a routing concern.

## 8. Content editing guide

All of the following are data-only changes — no component code needs to change.

### Add a new service package or category
Edit `src/data/services.ts`. Use the `price()`, `addon()`, `addonInrOnly()`, or `addonUsdOnly()` helpers from `src/data/priceHelpers.ts` for every price so currency formatting and the approximate-value flagging stay consistent.

### Add a portfolio project
Push a new object into the `portfolioProjects` array in `src/data/portfolio.ts`, matching the `PortfolioProject` interface in `src/types/index.ts`. The index page, filtering, and detail route will pick it up automatically — no component changes required. Only add real projects; do not reintroduce placeholders.

### Add a blog post
Add an object to `blogPosts` in `src/data/blog.ts`. `contentHtml` is a plain HTML string with `<h2>` tags for section headings (these automatically populate the table of contents on the article page). Keep new categories consistent with existing ones, or a new filter pill will appear automatically on `/blog`.

### Add a new calculator/tool
1. Add the formula as a pure function in `src/utils/calculators.ts` (with its own input/output TypeScript interfaces, following the existing pattern).
2. Add its metadata to `toolsList` in `src/data/tools.ts`.
3. Create `src/pages/tools/YourCalculator.tsx` using `ToolPageLayout`, `CalculatorField`, and `ResultPanel`/`ResultStat` (see any existing tool page as a template).
4. Register the route in `src/App.tsx` (lazy import + `<Route>`).
5. Run `npm run generate:sitemap` (or just `npm run build`, which runs it automatically) so the new route is in `sitemap.xml`.

## 9. Contact form setup

The form at `/contact` (`src/pages/Contact.tsx`) has full client-side validation, accessible labels/errors, and loading/success/error states. It sends to Formspree by default:

```txt
https://formspree.io/f/mzdlrzrq
```

To override it for staging or a future serverless/API endpoint, set `VITE_CONTACT_FORM_ENDPOINT` in `.env` and rebuild. If no override is present, the site uses `siteConfig.contact.formEndpoint`.

## 10. SEO maintenance

- `npm run generate:sitemap` regenerates `public/sitemap.xml` from the actual route data (services, blog posts, tools, portfolio projects, legal pages) — it runs automatically as part of `npm run build`, so the sitemap can never silently go stale relative to the data files.
- `public/robots.txt` references the sitemap and blocks only the internal `/404` path.
- JSON-LD builders live in `src/components/seo/schemaBuilders.ts` (`Organization`, `WebSite`, `BreadcrumbList`, `Service`, `FAQPage`, `BlogPosting`, `WebApplication`) and are only ever rendered alongside the matching visible content — no schema is added for content that isn't on the page.
- The live production domain is set in `siteConfig.domain` (`https://krafttdigital.in`). The sitemap, canonical URLs, and JSON-LD all read from this single value.
- Google Analytics 4 is configured with measurement ID `G-5MLNQBXJY3` in `siteConfig.analytics.gaMeasurementId`. `src/components/analytics/GoogleAnalytics.tsx` loads `gtag.js`, tracks SPA route changes, and sends a `generate_lead` event when the contact form is submitted successfully. Use `VITE_GA_MEASUREMENT_ID` only when you need to override the default property.

## 11. Content Required (placeholders to fill before launch)

These are clearly marked in code (search for `CONTENT REQUIRED`) and were intentionally left as placeholders rather than invented, per the brief:

- Confirm WhatsApp number if it differs from the published phone number (`siteConfig.contact.whatsapp`)
- X profile URL if the brand wants to publish one (`siteConfig.social.twitter`)
- Google Search Console verification (`siteConfig.analytics.searchConsoleVerification`)
- Legal entity name if different from the trading name (`siteConfig.legalName`)
- Final legal copy for all four legal pages — current content is a good-faith starting template, **not** reviewed by a lawyer (see the visible notice on each legal page and the `[CONTENT REQUIRED]` markers inside `src/data/legal.ts`, covering deposit refundability, cancellation notice periods, governing law, and liability limitation)
- Real portfolio case studies (see §8 above) — none exist yet by design
- A contact-form backend endpoint (see §9)

## 12. Quality-control report

- Build: `npm run build` passes (TypeScript strict mode + Vite production build + sitemap generation)
- Lint: `npm run lint` passes with zero errors and zero warnings
- All 8 service categories and all 24 packages + 4 bundles transcribed exactly from the source pricing file (prices, inclusions, add-ons, delivery windows)
- INR and USD both render correctly via `Intl.NumberFormat`; currency selection persists across reloads and updates every visible price instantly
- No fabricated clients, testimonials, case studies, statistics, awards, or team members anywhere in the codebase
- Every page sets a unique title/description via `<SEO />`; canonical URLs derive from `siteConfig.domain`
- JSON-LD present for Organization, WebSite, Breadcrumbs (every page), Service (every service page), FAQPage (every page with visible FAQs), BlogPosting (every article), WebApplication (every tool)
- `sitemap.xml` and `robots.txt` generated and served from `/public`
- All 12 calculators use real, documented formulas (see each tool's "How this is calculated" section) — none are placeholder/fake outputs
- Mobile menu has focus trapping, Escape-to-close, and closes on route change; skip-to-content link present; all interactive elements are keyboard-reachable with visible focus states
- `prefers-reduced-motion` is respected globally (CSS) and in every Framer Motion component individually
- Contact form has full client + accessible validation; loading/success/error states implemented
- Not done in this environment: an automated accessibility audit (e.g. axe-core) and cross-browser/device lab testing — recommended before launch
- Known limitation: metadata is client-rendered (see §4's SEO note) — add prerendering/SSR before relying on this for organic search at scale
