# Kraftt Digital Route Audit

Audit date: 2026-07-16  
Project root audited: `D:\Live Sites\kraftt-digital`

## Route System Summary

Framework: Vite React SPA with React Router.  
Route source: `src/App.tsx`.  
Sitemap source: `scripts/generate-sitemap.ts`, generated from service, portfolio, blog, tool and legal data.  
Generated sitemap count: 42 URLs.  
Total React routes audited: 43 including `/admin`.  
Admin route status: present in app, intentionally excluded from sitemap and disallowed in robots.

## Global Routing Findings

- Direct routes are handled by SPA fallback in `netlify.toml`.
- `public/robots.txt` references `https://krafttdigital.in/sitemap.xml`.
- `/admin` and `/404` are disallowed in robots.
- Netlify headers set `X-Robots-Tag: noindex, nofollow, noarchive` for `/admin` and `/404`.
- Most public pages call the `SEO` component, but metadata is written client-side after React renders.
- Sitemap is data-driven and currently covers all public data-driven pages observed in source.
- This audit did not perform live DNS checks because the task was a local final audit.

## Route Table

| Route | Source/component | Navigation coverage | Sitemap | Index intent | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | `Home` | Header logo, footer | Yes | Index | Strong homepage with hero, trust badges, services, work, process and CTA. |
| `/services` | `Services` | Header, footer CTA, footer services | Yes | Index | Pricing overview and service cards. |
| `/authority-system` | `AuthoritySystem` | Header | Yes | Index | New positioning route for the agency system. |
| `/process` | `Process` | Header | Yes | Index | Process route present and indexed. |
| `/portfolio` | `Portfolio` | Header/footer Work | Yes | Index | Case-study index with four projects. |
| `/about` | `About` | Header/footer | Yes | Index | About route present. |
| `/contact` | `Contact` | Header CTA, footer CTA, CTAs | Yes | Index | Lead form, WhatsApp, social and phone paths present. |
| `/blog` | `Blog` | Resources dropdown, footer Resources | Yes | Index | Insights index. |
| `/tools` | `Tools` | Resources dropdown, footer Resources | Yes | Index | Tool library. |
| `/services/web-design` | `ServiceDetail` | Footer service link, sitemap, services related links | Yes | Index | Related work and package prefill present. |
| `/services/shopify-development` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | Shopify service detail. |
| `/services/ecommerce-seo` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | SEO service detail. |
| `/services/content-copywriting` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | Content service detail. |
| `/services/dashboards-tools` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | Dashboard/internal tools route. |
| `/services/ai-content` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | AI creative service route. |
| `/services/brand-identity` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | Brand identity service route. |
| `/services/social-media-management` | `ServiceDetail` | Footer service link, sitemap | Yes | Index | Social media service route. |
| `/portfolio/the-vibed-vines` | `PortfolioDetail` | Portfolio cards, sitemap | Yes | Index | Real project route; visual gallery data present. |
| `/portfolio/aegis-squad` | `PortfolioDetail` | Portfolio cards, sitemap | Yes | Index | Real project route. |
| `/portfolio/mittal-architect` | `PortfolioDetail` | Portfolio cards, sitemap | Yes | Index | Real project route. |
| `/portfolio/kiraq` | `PortfolioDetail` | Portfolio cards, sitemap | Yes | Index | Real project route. |
| `/blog/how-much-should-a-website-cost-in-2026` | `BlogPost` | Blog index, related links, sitemap | Yes | Index | Article route. |
| `/blog/gst-for-freelancers-and-small-agencies-in-india` | `BlogPost` | Blog index, related links, sitemap | Yes | Index | Tax-sensitive article; disclaimer present. |
| `/blog/sip-vs-lump-sum-which-investment-approach-fits-your-goals` | `BlogPost` | Blog index, related links, sitemap | Yes | Index | Financial article; disclaimer present. |
| `/blog/shopify-vs-custom-website-choosing-the-right-platform` | `BlogPost` | Blog index, related links, sitemap | Yes | Index | Platform decision article. |
| `/blog/what-is-geo-and-aeo-preparing-for-ai-powered-search` | `BlogPost` | Blog index, related links, sitemap | Yes | Index | SEO/AEO/GEO article. |
| `/tools/sip-calculator` | `SipCalculator` | Tools index, footer tool list, related links, sitemap | Yes | Index | Disclaimer present. |
| `/tools/net-worth-calculator` | `NetWorthCalculator` | Tools index, sitemap | Yes | Index | Financial planning tool. |
| `/tools/website-cost-calculator` | `WebsiteCostCalculator` | Tools index, footer tool list, related links, sitemap | Yes | Index | Agency planning tool. |
| `/tools/branding-cost-calculator` | `BrandingCostCalculator` | Tools index, footer tool list, related links, sitemap | Yes | Index | Agency planning tool. |
| `/tools/social-media-cost-calculator` | `SocialMediaCostCalculator` | Tools index, footer tool list, related links, sitemap | Yes | Index | Agency planning tool. |
| `/tools/seo-roi-calculator` | `SeoRoiCalculator` | Tools index, related links, sitemap | Yes | Index | Marketing estimate disclaimer present. |
| `/tools/roas-calculator` | `RoasCalculator` | Tools index, sitemap | Yes | Index | Marketing math tool. |
| `/tools/break-even-calculator` | `BreakEvenCalculator` | Tools index, sitemap | Yes | Index | Business math tool. |
| `/tools/profit-margin-calculator` | `ProfitMarginCalculator` | Tools index, sitemap | Yes | Index | Business math tool. |
| `/tools/gst-calculator` | `GstCalculator` | Tools index, related article, sitemap | Yes | Index | Tax-sensitive tool; should retain disclaimer. |
| `/tools/emi-calculator` | `EmiCalculator` | Tools index, sitemap | Yes | Index | Financial planning tool. |
| `/tools/compound-interest-calculator` | `CompoundInterestCalculator` | Tools index, sitemap | Yes | Index | Financial planning tool. |
| `/legal/privacy-policy` | `Privacy` | Footer legal links, sitemap | Yes | Index | Contains template notice and should be finalized. |
| `/legal/terms-and-conditions` | `Terms` | Footer legal links, sitemap | Yes | Index | Contains content-required legal placeholders. |
| `/legal/cookie-policy` | `Cookies` | Footer legal links, sitemap | Yes | Index | Should reflect actual GTM/GA usage. |
| `/legal/refund-policy` | `Refund` | Footer legal links, sitemap | Yes | Index | Contains content-required refund/cancellation placeholders. |
| `/admin` | `Admin` | Not in public nav | No | Noindex | Client-side-only local gate; requires hosting-level protection. |

## Route-Level Risks

| Severity | Route(s) | Issue | Recommended fix |
| --- | --- | --- | --- |
| P1 | All public routes except base HTML | Route-specific SEO metadata is client-side only. | Add prerendering/SSG for public routes. |
| P1 | `/admin` | Hardcoded client-side credentials and localStorage session. | Add hosting-level auth or remove from production. |
| P1 | Legal routes | Legal copy includes template warnings and placeholders. | Finalize legal pages before public launch. |
| P2 | Tool routes | Tool schema category is generic FinanceApplication for every tool. | Adjust schema category per tool type. |
| P2 | Service routes | Service schema emits USD offer catalog only. | Add INR offer data or multi-currency offer catalog. |
| P2 | Blog/tool financial routes | Tax/finance topics need expert review. | Keep disclaimers and review content before promotion. |

## Sitemap Coverage

Included:
- Home
- Services index and all 8 service detail routes
- Authority System
- Process
- Portfolio index and all 4 portfolio detail routes
- About
- Contact
- Blog index and all 5 blog posts
- Tools index and all 12 tool detail routes
- 4 legal pages

Excluded intentionally:
- `/admin`
- `/404`
- catch-all route

## Navigation Coverage Notes

- Header primary nav covers Work, Services & Pricing, Authority System, Process and About.
- Header Resources dropdown covers Tools and Insights.
- Header CTA routes to Contact.
- Footer covers primary nav, services, resources, selected tools, legal links, email, phone, Instagram and LinkedIn.
- Mobile menu duplicates primary and resource navigation with a focus trap and close-on-route-change behavior.

## Recommended Route QA Before Launch

1. Test direct hard refresh on every sitemap route after deploy.
2. Inspect raw HTML of service, portfolio, blog and tool pages to confirm whether prerendering has been added.
3. Confirm `/admin` cannot be reached without hosting-level protection.
4. Submit sitemap in Google Search Console only after DNS and SSL are stable.
5. Run a link checker after deploy to verify project URLs and social links.

