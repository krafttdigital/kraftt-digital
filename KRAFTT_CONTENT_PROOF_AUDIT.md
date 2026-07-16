# Kraftt Digital Content and Proof Audit

Audit date: 2026-07-16  
Project root audited: `D:\Live Sites\kraftt-digital`

## Summary

The site has substantially stronger content than a normal placeholder agency site. Services, packages, tools, blog posts and portfolio entries are detailed. The remaining issue is proof governance: strong claims should have evidence, permission and review notes behind them before public launch.

Content score: 76 / 100

Primary content risk: credible-looking claims exist, but the repo does not include proof records or approval records.

## Service and Pricing Proof

Source: `src/data/services.ts`

Observed:
- 8 service categories.
- 24 packages.
- INR and USD prices defined for all package prices.
- Package buttons build contact prefill URLs through `src/utils/contactPrefill.ts`.
- Latest requested service edits are reflected in source:
  - Web maintenance: Rs. 1,500/month or Rs. 12,000/year.
  - Custom domain business email removed from visible web package inclusions.
  - AI creative packages remain one-time/fixed; ongoing AI support is Rs. 10,000/month.
  - Social starter is Rs. 12,000/month with 15 posts, 10 stories, 1 platform, SEO captions/hashtags and profile setup.
  - Social growth is Rs. 22,000/month with 21 posts, 15 stories, 2 platforms, content calendar, captions/hashtags, profile integration and monthly analytics report.
  - Social domination is Rs. 40,000/month with 30 posts, 20 stories, 3 platforms, 4 typography/educational reels, hashtag/caption research and strategy/growth analytics.
  - Brand starter is Rs. 12,000 with logo suite, primary palette, typography and brand voice/tone guide.

Package table:

| Service | Package | INR | USD | Billing | Timeline |
| --- | --- | ---: | ---: | --- | --- |
| Web Design & Development | Starter - single page | 12000 | 299 | one-time | 3-4 days |
| Web Design & Development | Business - multi page | 25000 | 599 | one-time | 6-8 days |
| Web Design & Development | Growth - full build | 45000 | 999 | one-time | 10-14 days |
| Shopify Store Development | Launch store | 22000 | 499 | one-time | 5-7 days |
| Shopify Store Development | Growth store | 40000 | 899 | one-time | 8-12 days |
| Shopify Store Development | Complete store | 70000 | 1499 | one-time | 14-20 days |
| E-commerce SEO | SEO starter | 12000 | 299 | monthly | Ongoing monthly |
| E-commerce SEO | SEO growth | 22000 | 549 | monthly | Ongoing monthly |
| E-commerce SEO | SEO domination | 40000 | 999 | monthly | Ongoing monthly |
| Content & Copywriting | Copy starter | 8000 | 199 | one-time | 3-4 days |
| Content & Copywriting | Content suite | 20000 | 499 | one-time | 7-10 days |
| Content & Copywriting | Brand content pack | 38000 | 899 | one-time | 12-15 days |
| Dashboards & Internal Tools | Simple tool | 28000 | 599 | one-time | 7-10 days |
| Dashboards & Internal Tools | Business dashboard | 60000 | 1299 | one-time | 14-20 days |
| Dashboards & Internal Tools | Full internal suite | 110000 | 2499 | one-time | 25-35 days |
| AI-Powered Creative | AI creative pack | 10000 | 249 | one-time | 2-3 days |
| AI-Powered Creative | AI brand kit | 22000 | 549 | one-time | 5-7 days |
| AI-Powered Creative | AI launch suite | 42000 | 999 | one-time | 8-12 days |
| Brand Identity | Brand starter | 12000 | 299 | one-time | 4-5 days |
| Brand Identity | Brand identity | 30000 | 699 | one-time | 8-12 days |
| Brand Identity | Full brand system | 55000 | 1299 | one-time | 15-20 days |
| Social Media Management | Social starter | 12000 | 299 | monthly | Ongoing monthly |
| Social Media Management | Social growth | 22000 | 599 | monthly | Ongoing monthly |
| Social Media Management | Social domination | 40000 | 999 | monthly | Ongoing monthly |

Risk:
- Pricing is clear and strong.
- Maintenance/retainer language should be rechecked in final visible UI to avoid any ambiguity between monthly, yearly and one-time billing.

Recommended fix:
- Do a final pricing screenshot pass before launch.

## Portfolio Proof Table

Source: `src/data/portfolio.ts`

| Project | Live URL | Status in source | Evidence in repo | Proof risk | Recommended proof action |
| --- | --- | --- | --- | --- | --- |
| The Vibed Vines | `https://thevibedvines.com` | Real, featured, not placeholder | Screenshots/gallery assets, detailed copy, tools, challenges, metrics, testimonial text | Medium | Keep client approval, Search Console/Clarity screenshots and launch checklist privately. |
| Aegis Squad | `https://aegissquad.com` | Real, featured, not placeholder | Screenshots/gallery assets, budget-scope copy, metrics, testimonial text | Medium | Keep client approval and proof that contact form/custom images/dropdowns shipped. |
| Mittal Architect | `https://mittalarchitect.in` | Real, featured, not placeholder | Screenshots/gallery assets, SEO/AEO/GEO/GSC/GA4 claims, metrics, testimonial text | High | Keep GSC/GA4 setup proof, page count proof, JSON-LD examples and client approval. |
| KIRAQ | `https://kiraq.in` | Real, featured, not placeholder | Screenshots/gallery assets, MERN/admin/Cloudinary/performance claims, metrics, testimonial text | High | Keep backend/admin proof, Cloudinary proof, performance before/after notes and client approval. |

Important observation:
- All four projects are marked real and featured, with testimonial-style text.
- None are marked as concept/placeholders.
- The source comments say "Real case studies only" and "without inventing client proof", which is good, but the repo itself does not contain the proof chain.

Recommended fix:
- Create a private non-public proof pack per project:
  - client permission to publish
  - launch date
  - scope checklist
  - before/after screenshots if applicable
  - Search Console/GA4/Clarity setup screenshots where claimed
  - live URL confirmation
  - testimonial permission and attribution decision

## Claims That Need Backing

| Claim area | Where found | Current status | Risk | Recommendation |
| --- | --- | --- | --- | --- |
| "Google Search Console setup" | Portfolio, services, blog, schema/services | Claimed in multiple places | Medium/high | Keep proof screenshot or setup checklist per project. |
| "GA4 setup" | Mittal Architect project and analytics config | Claimed and current site has GA4 | Medium | Keep property screenshots for client projects where claimed. |
| "Microsoft Clarity setup" | The Vibed Vines project | Claimed | Medium | Keep Clarity workspace screenshot or client approval. |
| "Performance optimization" | Portfolio and service copy | Claimed generally | Medium | Add measurable before/after only if available; otherwise keep wording qualitative. |
| "SEO/AEO/GEO" | Services, blog, portfolio, homepage | Strategic positioning | Medium | Ensure visible examples and schema are valid. Avoid implying guaranteed rankings. |
| "Premium" | Sitewide | Brand positioning | Low/medium | The UI supports this; keep proof and visual quality aligned. |
| "No fake guarantees, invented numbers or vanity proof" | Home/about copy | Strong ethical claim | Medium | Maintain strict proof policy for portfolio and metrics. |
| "Most popular" badges | Service packages | Internal positioning | Low/medium | If not based on sales data, treat as recommendation label rather than factual popularity. |

## Blog and Editorial Proof

Source: `src/data/blog.ts`

| Post | Topic risk | Evidence status | Recommendation |
| --- | --- | --- | --- |
| How Much Should a Website Cost in 2026? | Low/medium | Uses Kraftt prices as reference, not industry averages | Good; keep pricing synced to services. |
| GST for Freelancers and Small Agencies in India | High | Includes threshold/rate statements and a tax disclaimer | Have a CA review before promoting. |
| SIP vs Lump Sum | High | Includes investment assumptions and market-risk disclaimer | Keep disclaimer visible; avoid guaranteed-return language. |
| Shopify vs Custom Website | Medium | Platform comparison | Keep balanced and non-defamatory. |
| What is GEO and AEO? | Medium | SEO/AEO/GEO explainer | Keep claims educational and avoid ranking promises. |

## Tool Content Proof

Source: `src/data/tools.ts`, `src/pages/tools/*.tsx`, `src/components/tools/ToolPageLayout.tsx`

Observed:
- 12 tools exist.
- Tool pages include formulas/explanations, related links and in some cases disclaimers.
- Tools are positioned as planning estimates, not promises.

Risk:
- Financial and tax calculators can create user reliance.
- Marketing calculators like SEO ROI and ROAS can look predictive.

Recommendation:
- Keep all calculators labelled as estimates.
- Make disclaimers visible on GST, SIP, EMI, compound interest, SEO ROI and ROAS.
- Avoid "guaranteed", "assured return" or "rank guarantee" wording.

## Contact and Conversion Proof

Source: `src/pages/Contact.tsx`, `src/utils/contactPrefill.ts`

Observed:
- Required fields: name, business name, WhatsApp number, website/Instagram, service and consent.
- Optional email, city, budget, timeline, description and callback time.
- Validation moves focus to the first error.
- Status handling exists for loading, success and error.
- Formspree endpoint is configured.
- Service package links prefill service, budget, currency, timeline, description and referral source.

Risk:
- Production delivery depends on Formspree configuration and domain behavior.

Recommendation:
- Submit one production test from the live domain after deploy.
- Confirm Formspree email delivery and spam handling.

## Legal and Policy Content

Source: `src/data/legal.ts`

Risk level: P1.

Open items:
- Payment terms.
- Liability limitation.
- Governing law.
- Deposit refundability.
- Cancellation notice period.
- Monthly retainer cancellation terms.
- Non-performance/refund terms.

Recommendation:
- Finalize before launch.
- Do not publish legal pages with bracketed content-required placeholders unless intentionally marked as draft.

## Brand Consistency Proof

Good:
- Main tagline in `siteConfig`: "Digital presence for brands that take themselves seriously".
- Homepage and footer are aligned with owner-led business positioning.
- Visual style is consistent: light parchment, dark surfaces, umber accent, editorial typography.

Needs cleanup:
- Static JSON-LD in `index.html` has a different slogan: "Your reputation, finally visible online."
- README still says real portfolio case studies do not exist yet.
- Static homepage title, React homepage title and `siteConfig.tagline` should be intentionally aligned.

## Final Content Readiness Decision

Ready:
- Service/pricing content.
- Homepage positioning.
- Contact form structure.
- Portfolio UI/content structure.
- Blog/tool structure.

Needs pre-launch cleanup:
- Legal copy.
- Static brand metadata alignment.
- Portfolio proof records.
- Search Console verification.
- README drift.

Best next content task:
- Build a private proof checklist for each project and finalize all legal placeholders before public launch.
