# Kraftt Digital Final Pre-Launch Audit

Audit date: 2026-07-16  
Project root audited: `D:\Live Sites\kraftt-digital`  
Mode: report-only audit. No production source files were intentionally edited.  
Build side effect: `npm run build` ran the sitemap generator, so `public/sitemap.xml` and `dist/` may have been refreshed by the normal build process.

## Executive Summary

Overall score: 78 / 100

Launch stance: the site is visually strong, technically buildable, and substantially complete, but I would fix the P1 items before treating it as a fully launch-ready agency website. The strongest risks are not layout bugs. They are trust, SEO delivery architecture, public admin protection, and proof/legal readiness.

Severity counts:

| Severity | Count |
| --- | ---: |
| P0 | 0 |
| P1 | 4 |
| P2 | 13 |
| P3 | 8 |

Validation result:

| Check | Result | Evidence |
| --- | --- | --- |
| Build | Pass | `npm run build` exited 0; Vite built successfully; sitemap generated with 42 URLs |
| Lint | Pass | `npm run lint` exited 0 |
| Type-check | Pass | `npx tsc --noEmit` exited 0 |
| Production audit | Pass | `npm audit --omit=dev --json` returned 0 vulnerabilities |

## Category Scores

| Category | Score | Notes |
| --- | ---: | --- |
| Technical stability | 8.5 / 10 | Build, lint, type-check and production dependency audit pass. |
| Visual direction | 8 / 10 | Premium light direction, motion, video, case-study visuals and stronger homepage structure are present. |
| Conversion clarity | 8 / 10 | Strong audit CTA, WhatsApp links, contact form, package prefill and service CTAs exist. |
| Service/pricing clarity | 8.5 / 10 | 8 services and 24 packages are defined with INR/USD pricing and delivery windows. |
| Content credibility | 6.5 / 10 | Strong case-study copy exists, but proof records, permission notes and legal placeholders need cleanup. |
| SEO readiness | 6.5 / 10 | Sitemap, robots, JSON-LD and metadata exist, but metadata is client-side and static brand metadata needs alignment. |
| Performance readiness | 6.5 / 10 | Large hero/video and 1MB+ image assets should be optimized before aggressive traffic campaigns. |
| Mobile confidence | 7 / 10 | Code has responsive handling and mobile menu, but no live viewport QA was completed in this report-only pass. |
| Accessibility | 7.5 / 10 | Skip link, focus states, mobile focus trap and form error focus are present; visual contrast still needs browser QA. |
| Trust/compliance | 6.5 / 10 | Legal pages declare themselves templates; admin is only client-side protected. |

## P1 Findings

### P1-01: Route metadata is client-side only

Evidence:
- `src/components/seo/SEO.tsx` uses `useEffect` to set title, canonical, robots, Open Graph and Twitter metadata.
- The same file contains a note recommending prerendering or an SSG migration for crawlable per-route HTML.
- `netlify.toml` rewrites all non-static routes to `/index.html`, which means direct route HTML starts from the same SPA shell.

Impact:
- Google can usually render JavaScript, but non-Google crawlers, social share bots and some SEO tools may only see the base homepage metadata.
- Service, portfolio, blog and tool routes may not expose their best title/description/schema in raw HTML.
- This weakens the site's claim of SEO/AEO/GEO execution.

Recommended fix:
- Add prerendering for public routes before launch, or migrate to an SSR/SSG framework.
- At minimum, prerender the main commercial routes: `/`, `/services`, all service pages, `/portfolio`, portfolio detail pages, `/blog`, blog detail pages and `/tools`.

Difficulty: Medium.

### P1-02: `/admin` is protected only by client-side credentials

Evidence:
- `src/pages/Admin.tsx` defines `adminPassword = 'Kraftt@2026'` and `adminUsers = ['ketan@kraftt.com', 'amisha@kraftt.com']`.
- Login state is stored in `localStorage` under `kraftt-admin-session`.
- The page itself warns: "Use hosting protection for real production security."
- `robots.txt` disallows `/admin`, and `netlify.toml` sends `X-Robots-Tag` for `/admin`, but those do not provide authentication.

Impact:
- Anyone can download the JavaScript bundle and read the credentials.
- Client details entered into the admin page are stored only in the browser; they are not secure shared storage.
- If used for real invoices/client agreements, this can damage trust.

Recommended fix:
- Add Netlify/Vercel password protection, Basic Auth, or a separate private deployment for `/admin`.
- Keep `/admin` out of public navigation and sitemap, which is already done.
- Change the client-side message from "login" to "local gate" unless hosting-level auth is added.

Difficulty: Low to medium depending on hosting.

### P1-03: Legal pages still contain unfinished template language

Evidence:
- `src/data/legal.ts` says legal documents are starting templates and not reviewed by a lawyer.
- It contains visible `[CONTENT REQUIRED]` placeholders for payment terms, liability limitation, governing law, refundability, cancellation notice and non-performance.
- `LegalPageLayout` displays a visible notice that pages should be reviewed before publishing live.

Impact:
- Publishing legal pages with placeholders makes the brand look unfinished.
- It can weaken payment/refund expectations for real clients.
- It is especially risky because the admin document tool creates agreement and invoice PDFs.

Recommended fix:
- Finalize legal copy before public launch.
- If the legal pages cannot be completed immediately, temporarily noindex legal routes or simplify them into a clear interim legal notice without bracketed placeholders.

Difficulty: Medium because it requires business/legal decisions.

### P1-04: Case-study proof is strong editorially, but proof records are not present

Evidence:
- `src/data/portfolio.ts` has four real projects and includes results, metrics, testimonials, Search Console/GA4/Clarity claims and technical deliverables.
- The repo does not include proof files such as client approvals, analytics screenshots, Search Console screenshots, testimonial author approvals or before/after performance evidence.
- README still says "Real portfolio case studies ... none exist yet", which conflicts with the current portfolio data.

Impact:
- Case studies are persuasive, but a premium agency should be able to back every proof claim if challenged.
- Search/analytics setup claims are credibility-sensitive.
- Testimonial-style text without attribution or permission can feel internally written.

Recommended fix:
- Maintain a private proof folder outside the public repo with client permission notes, screenshots and launch records.
- Make visible testimonials clearly attributed only where client-approved.
- Update README to reflect the current four case studies.

Difficulty: Medium.

## P2 Findings

### P2-01: Static brand metadata is not perfectly aligned

Evidence:
- `siteConfig.tagline` is "Digital presence for brands that take themselves seriously".
- Static JSON-LD in `index.html` uses slogan "Your reputation, finally visible online."
- Static HTML title says "Digital Authority for Established Indian Businesses", while `Home.tsx` sets the React route title to "Kraftt Digital | Digital Presence for Serious Brands".

Impact: None of these are broken, but a premium brand should use one deliberate positioning system across static HTML, JSON-LD, React metadata and visible copy.

Recommended fix: Choose the final homepage title/slogan hierarchy and sync `index.html`, `siteConfig`, homepage SEO and schema.

Difficulty: Low.

### P2-02: Google Search Console verification is still empty

Evidence: `siteConfig.analytics.searchConsoleVerification` is `''`.

Impact: The code documents the need but does not include the verification token. If the domain is not otherwise verified through DNS or GTM, Search Console verification may fail.

Recommended fix: Confirm the domain property is verified through DNS, or add the HTML meta verification token if that is the chosen method.

Difficulty: Low.

### P2-03: GA4 can double count if GTM also fires GA4

Evidence:
- `index.html` includes GTM container `GTM-T44Z78PQ`.
- `src/components/analytics/GoogleAnalytics.tsx` directly loads `gtag.js` for `G-5MLNQBXJY3`.
- README warns not to also paste/static-fire GA4 inside GTM.

Impact: If the GTM container contains the same GA4 config tag, pageviews and events can double count.

Recommended fix: Use either GTM as the single analytics launcher or the React GA4 tracker as the single launcher. Document which one is live.

Difficulty: Low.

### P2-04: Admin invoice defaults still include placeholder payment details

Evidence: `src/pages/Admin.tsx` default data includes `add-your-upi@bank` and "add account details before sending".

Impact: A PDF can accidentally be generated and sent with placeholder payment information.

Recommended fix: Add an admin warning before print/export if payment details contain placeholder text, or replace defaults with final payment details.

Difficulty: Low.

### P2-05: Large media assets should be optimized before traffic campaigns

Evidence:
- `assets/background.mp4` is about 2.62 MB.
- `assets/founder.PNG` is about 1.75 MB.
- Multiple portfolio desktop PNG assets are between about 1.0 MB and 1.8 MB.
- Home video uses `preload="metadata"` but no `poster` attribute.

Impact: Slower first load, especially on mobile data. This can hurt perceived premium quality and conversion.

Recommended fix:
- Compress PNGs to WebP/AVIF where possible.
- Add a poster image for the hero video.
- Consider serving smaller mobile-specific hero media.

Difficulty: Medium.

### P2-06: Hero watermark masking is fragile

Evidence:
- `Home.tsx` includes `kd-hero-watermark-mask`.
- `src/index.css` hides the watermark mask on mobile.

Impact: If the video itself contains a visible watermark, desktop masking may work only at one crop/viewport, and mobile may expose it.

Recommended fix: Replace the video with a clean licensed export or a self-owned render. Do not rely on CSS masking for production credibility.

Difficulty: Medium.

### P2-07: Financial/tax content needs professional review

Evidence:
- Blog/tool content covers GST, SIP, EMI, investment, ROI, ROAS, profit margin and break-even.
- Disclaimers exist for SIP/GST examples and tools, which is good.

Impact: Educational content can still be interpreted as tax or financial guidance.

Recommended fix: Have GST content reviewed by a CA and financial/investment tools reviewed for wording and assumptions. Keep disclaimers visible on every financial/tax tool.

Difficulty: Medium.

### P2-08: Contact form depends on Formspree and external availability

Evidence:
- `Contact.tsx` posts to `VITE_CONTACT_FORM_ENDPOINT || siteConfig.contact.formEndpoint`.
- Default endpoint is `https://formspree.io/f/mzdlrzrq`.
- Client-side validation and error focus exist.

Impact: Form delivery depends on Formspree configuration, spam settings and verified recipient setup.

Recommended fix: Send a real test submission from production after deploy and confirm email delivery. Add spam protection if submission volume grows.

Difficulty: Low.

### P2-09: Domain email would look more premium than Gmail

Evidence: `siteConfig.contact.email` is `krafttdigital@gmail.com`.

Impact: Gmail is usable, but a domain email such as `hello@krafttdigital.in` would better match the premium agency positioning.

Recommended fix: Use Gmail if that is the operational inbox today, but consider a branded alias that forwards to it.

Difficulty: Low.

### P2-10: README is stale after portfolio work

Evidence: README "Content Required" still says real portfolio case studies do not exist yet, while `src/data/portfolio.ts` includes four real projects.

Impact: Handover confusion and lower internal confidence.

Recommended fix: Update README after launch decisions are final.

Difficulty: Low.

### P2-11: No automated UI or route regression tests

Evidence:
- `package.json` has build, lint, preview and sitemap scripts, but no test/e2e script.
- No Playwright/Cypress setup is present.

Impact: Future visual/navigation changes can break mobile menus, dropdowns or calculators without an automated warning.

Recommended fix: Add a small Playwright smoke suite covering home, services, contact, mobile menu, one service page, one portfolio page, one blog post and one tool.

Difficulty: Medium.

### P2-12: Mobile header width needs final live viewport QA

Evidence:
- `Header.tsx` shows logo plus mobile `CurrencyToggle` at width `w-[110px]` plus menu button.
- Mobile menu code is good, but this audit did not include browser screenshots at 320/360/390 px.

Impact: The header may feel tight on small Android devices.

Recommended fix: Verify 320 px, 360 px and 390 px screenshots before launch. If tight, hide one currency label or reduce logo width on very small screens.

Difficulty: Low.

### P2-13: Schema accuracy can be improved

Evidence:
- `buildServiceSchema` only emits USD offers because it filters by `priceUsd`.
- `buildToolSchema` uses `applicationCategory: 'FinanceApplication'` for every tool, including agency planning tools like website cost and branding cost.

Impact: Schema is present, but not perfectly aligned with the India-first pricing and mixed tool categories.

Recommended fix:
- Emit INR offer data for India-first service pages, or use an OfferCatalog with multiple currencies.
- Use more specific WebApplication categories where possible.

Difficulty: Medium.

## P3 Findings

### P3-01: Extraneous packages in `node_modules`

Evidence: `npm ls --depth=0` listed several extraneous packages in local `node_modules`.

Impact: Not a production blocker because package files are authoritative, but it suggests local install drift.

Recommended fix: Fresh `npm ci` before final deploy verification.

Difficulty: Low.

### P3-02: `twitter` social profile is intentionally empty

Evidence: `siteConfig.social.twitter = null`.

Impact: No issue if Kraftt does not use X/Twitter. It is still marked as content required in README.

Recommended fix: Either remove the content-required note or add the profile when available.

Difficulty: Low.

### P3-03: Legal entity name needs confirmation

Evidence: `siteConfig.legalName` has a comment asking to confirm registered legal entity name if different.

Impact: Low unless invoices/legal docs require a registered legal name.

Recommended fix: Confirm whether Kraftt Digital is a trading name, proprietorship name, registered firm or company name.

Difficulty: Low.

### P3-04: Sitemap lastmod churn

Evidence: `scripts/generate-sitemap.ts` uses today's date for all non-blog routes on every generation.

Impact: Search engines can tolerate this, but it may imply every page changed on every build.

Recommended fix: Use file/data updated dates for major static routes if precision becomes important.

Difficulty: Low.

### P3-05: External link checks were not executed

Evidence: This report used local source/build checks. It did not live-check external URLs like project domains, Instagram, LinkedIn, GTM or Formspree.

Impact: External dead links can still exist.

Recommended fix: Run a post-deploy link check once DNS is stable.

Difficulty: Low.

### P3-06: No image sitemap

Evidence: Sitemap covers page URLs only.

Impact: Not required, but portfolio-heavy sites can sometimes benefit from image discovery.

Recommended fix: Consider image sitemap only if image search visibility matters.

Difficulty: Low.

### P3-07: Admin documents depend on browser print

Evidence: `Admin.tsx` uses `window.print()` and instructs "Save as PDF".

Impact: PDF output can vary slightly by browser and print settings.

Recommended fix: For higher reliability, add a fixed PDF export workflow later.

Difficulty: Medium.

### P3-08: Worktree was already dirty before reports

Evidence: `git status --short` showed many modified/untracked source and asset files before audit report creation.

Impact: Harder to distinguish final launch changes from audit artifacts.

Recommended fix: Commit or stash the approved website state after reviewing the audit.

Difficulty: Low.

## Positive Findings

- Build, lint, type-check and production dependency audit pass.
- Routes are lazy-loaded at page level.
- Sitemap is generated from actual data lists, reducing stale route risk.
- `robots.txt` blocks `/admin` and `/404`.
- Netlify sends `X-Robots-Tag` for `/admin` and `/404`.
- Header includes skip-to-content.
- Mobile menu has focus trapping, Escape close and body scroll lock.
- Contact form has client-side validation, accessible alerts, focus movement and success/error states.
- Package CTA links prefill contact form service, package, currency, budget and timeline.
- Currency default detects India through timezone/language and stores preference in localStorage.
- Tools and blog pages include disclaimers where needed.
- `og-image.png`, `favicon.svg`, `site.webmanifest`, `robots.txt` and `sitemap.xml` exist.
- Static Organization JSON-LD phone matches the current configured phone when the India country code is included.
- Service maintenance copy now states Rs. 1,500/month or Rs. 12,000/year.
- Social media package copy now matches the requested post/story/platform structure.

## Highest-Risk Items

Most serious credibility issue: unfinished legal pages plus unverified case-study proof records.

Most serious conversion issue: potential trust drop if a lead sees placeholders/legal-template language or if Formspree delivery is not tested on production.

Most serious technical issue: public client-side `/admin` credentials and client data stored in localStorage without hosting-level protection.

Most serious mobile issue: large hero video/media plus tight header controls require final 320/360/390 px viewport QA.

## Recommended Launch Plan

1. Decide whether route prerendering is required for launch. For a serious SEO agency positioning, it should be.
2. Add hosting-level protection to `/admin`, or remove `/admin` from the public production deployment.
3. Finish legal pages or noindex/hide them until finalized.
4. Create a private proof pack for portfolio claims and update README.
5. Align static brand metadata across `index.html`, `siteConfig` and homepage SEO.
6. Confirm Search Console verification and GA4/GTM single-source tracking.
7. Test Formspree from the production domain.
8. Optimize hero/video/founder/portfolio assets and add a video poster.
9. Run a mobile viewport QA pass.
10. Commit the approved launch state after fixes.
