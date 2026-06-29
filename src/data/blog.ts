import type { BlogPost } from '@/types';
import blogGeoAeo from '../../assets/blog-geo-aeo.svg';
import blogGstInvoice from '../../assets/blog-gst-invoice.svg';
import blogShopifyCustom from '../../assets/blog-shopify-custom.svg';
import blogSipInvestment from '../../assets/blog-sip-investment.svg';
import blogWebsiteCost from '../../assets/blog-website-cost.svg';

// All articles below are original content written for Kraftt Digital.
// Attribution uses the agency's editorial team rather than an invented
// named individual, per the no-fabricated-team-members rule.
const TEAM = { name: 'Kraftt Digital Team', role: 'Agency editorial' };

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-much-should-a-website-cost-in-2026',
    title: 'How Much Should a Website Cost in 2026?',
    excerpt:
      'A realistic breakdown of what drives website pricing — page count, SEO scope, and integrations — so you can budget before you ask an agency for a quote.',
    category: 'Web Design',
    tags: ['pricing', 'web design', 'budgeting'],
    imageUrl: blogWebsiteCost,
    imageAlt: 'Editorial dashboard illustration showing website cost, page scope, SEO and 2026 pricing.',
    author: TEAM,
    publishedAt: '2026-01-14',
    readingTimeMinutes: 6,
    relatedSlugs: ['shopify-vs-custom-website-choosing-the-right-platform'],
    relatedToolSlugs: ['website-cost-calculator'],
    contentHtml: `
      <p>Website pricing varies more than almost any other digital service, because "a website" can mean a single landing page or a ten-page site with a blog, lead capture, and full technical SEO. Before you ask an agency for a quote, it helps to understand which variables actually move the price.</p>

      <h2>The three variables that drive cost</h2>
      <p><strong>Page count</strong> is the most obvious factor: a single landing page takes far less time to design, write and build than an eight-page site with distinct service pages, an about page and a contact flow. <strong>Technical scope</strong> — on-page SEO across every page, structured data, Search Console setup — adds work that does not show up visually but matters for how the site performs after launch. <strong>Integrations</strong> such as WhatsApp click-to-chat, CRM connections or a blog system add ongoing complexity beyond the initial page build.</p>

      <h2>What a realistic budget range looks like</h2>
      <p>As a reference point, Kraftt Digital's own published web design pricing runs from $299 (single page, basic SEO) through $599 (five pages, full on-page SEO and lead capture) to $999 (eight to ten pages, complete SEO, JSON-LD and CRM integration). These are not industry averages — they are one agency's transparent pricing — but the shape of the curve is typical: cost scales with page count and technical depth, not with vague notions of "premium design."</p>

      <h2>Questions to ask before you get a quote</h2>
      <p>How many distinct pages does the business actually need? Will the site need to rank in search results, or is it primarily for people who already know the brand? Is there a CRM or booking system it needs to talk to? Answering these before a discovery call means the quote you receive will actually match the project, rather than being padded for unknowns.</p>

      <h2>Try it yourself</h2>
      <p>Our <a href="/tools/website-cost-calculator">Website Cost Calculator</a> takes your page count and feature needs and matches them to a real package and price, rather than a generic estimate.</p>
    `,
  },
  {
    slug: 'gst-for-freelancers-and-small-agencies-in-india',
    title: 'GST for Freelancers and Small Agencies in India: A Practical Guide',
    excerpt:
      'When GST registration becomes mandatory, how to add or remove GST from an invoice correctly, and the rate categories that apply to digital services.',
    category: 'Business Growth',
    tags: ['gst', 'india', 'invoicing'],
    imageUrl: blogGstInvoice,
    imageAlt: 'Invoice and GST calculator illustration for Indian freelancers and small agencies.',
    author: TEAM,
    publishedAt: '2026-02-03',
    readingTimeMinutes: 5,
    relatedSlugs: [],
    relatedToolSlugs: ['gst-calculator', 'profit-margin-calculator'],
    contentHtml: `
      <p>Goods and Services Tax (GST) registration becomes mandatory in India once an individual's or business's aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in certain special category states) for services. Many freelancers and small agencies stay under this threshold initially, but it is worth understanding the mechanics before you cross it — and before a client asks for a GST-compliant invoice.</p>

      <h2>What rate applies to digital services?</h2>
      <p>Most digital services — web design, software development, marketing and creative work — fall under the 18% GST slab in India. This is the rate to use unless your specific service category has been notified at a different rate; when in doubt, confirm with a chartered accountant rather than assuming.</p>

      <h2>Adding GST vs removing GST from a quoted price</h2>
      <p>There are two common scenarios. If you have agreed a <em>base price</em> with a client and need to add GST on top, the formula is straightforward: GST amount = base price × rate, and the invoice total is base price plus that GST amount. If instead a client has agreed to pay an <em>all-inclusive</em> amount and you need to work out how much of that is GST, the calculation runs in reverse: base price = total ÷ (1 + rate), and the GST component is the difference between the total and that base price. Mixing these two up is the single most common invoicing mistake among freelancers issuing their first GST invoices.</p>

      <h2>A worked example</h2>
      <p>Say you have quoted a client ₹50,000 for a project, and need to add 18% GST. The GST amount is ₹9,000, making the invoice total ₹59,000. Now say a different client has agreed to pay you an all-inclusive ₹59,000 and you need to know your actual fee: dividing ₹59,000 by 1.18 gives a base price of exactly ₹50,000, with ₹9,000 as the GST component you will need to remit.</p>

      <h2>Try it yourself</h2>
      <p>Our <a href="/tools/gst-calculator">GST Calculator</a> performs both directions of this calculation instantly, at any standard Indian GST rate.</p>

      <p><em>This article is for general educational purposes and is not tax advice. Confirm registration thresholds, applicable rates and filing obligations with a qualified chartered accountant for your specific situation.</em></p>
    `,
  },
  {
    slug: 'sip-vs-lump-sum-which-investment-approach-fits-your-goals',
    title: 'SIP vs Lump Sum: Which Investment Approach Fits Your Goals?',
    excerpt:
      'How a Systematic Investment Plan compares to a one-time lump sum investment, and how a step-up SIP changes the maths over a long time horizon.',
    category: 'Tools and Calculators',
    tags: ['sip', 'investing', 'compound interest'],
    imageUrl: blogSipInvestment,
    imageAlt: 'SIP investment growth chart illustration with step-up bars and compounding line.',
    author: TEAM,
    publishedAt: '2026-02-21',
    readingTimeMinutes: 6,
    relatedSlugs: [],
    relatedToolSlugs: ['sip-calculator', 'compound-interest-calculator'],
    contentHtml: `
      <p>A Systematic Investment Plan (SIP) means investing a fixed amount on a regular schedule — typically monthly — rather than investing one lump sum upfront. Both approaches rely on the same underlying principle, compounding, but they behave differently depending on your cash flow and risk tolerance.</p>

      <h2>Why the schedule of investing matters</h2>
      <p>A lump sum invested today has the maximum possible time in the market to compound — if invested at the start of a long horizon, it will generally produce a higher final value than the same total amount drip-fed in over years, <em>assuming</em> markets rise steadily over that period. The trade-off is sequencing risk: if the market falls shortly after a lump sum is invested, the entire amount is exposed to that drop at once. A SIP spreads that risk across many entry points, which is part of why it is popular for investors without a large amount of capital sitting idle, or who prefer not to time a single entry point.</p>

      <h2>What a step-up SIP changes</h2>
      <p>A standard SIP keeps the monthly contribution flat for the entire duration. A step-up SIP increases that contribution by a fixed percentage every year — a reasonable assumption for anyone expecting their income to grow over time. Modelling this accurately requires a month-by-month simulation rather than the simple annuity formula, because the contribution amount itself changes partway through the timeline.</p>

      <h2>A worked example</h2>
      <p>Investing ₹10,000 a month at an assumed 12% annual return for 15 years, with no step-up, grows to a materially smaller maturity value than the same starting contribution with a 10% annual step-up — because the step-up version is contributing significantly more in the later years, when the existing corpus is also larger and compounding faster. Run both scenarios in the calculator below to see the exact numbers for your own inputs.</p>

      <h2>Try it yourself</h2>
      <p>Our <a href="/tools/sip-calculator">SIP Calculator</a> models both flat and step-up contributions month by month, with a year-by-year breakdown of invested amount versus corpus value.</p>

      <p><em>Returns used in any example are illustrative assumptions, not guarantees. Mutual fund investments are subject to market risk.</em></p>
    `,
  },
  {
    slug: 'shopify-vs-custom-website-choosing-the-right-platform',
    title: 'Shopify vs a Custom Website: Choosing the Right Platform for Your Store',
    excerpt:
      'When a Shopify store is the right call for a product business, and when a custom-built website serves the business better.',
    category: 'Development',
    tags: ['shopify', 'ecommerce', 'web development'],
    imageUrl: blogShopifyCustom,
    imageAlt: 'Split-screen editorial illustration comparing Shopify storefronts and custom websites.',
    author: TEAM,
    publishedAt: '2026-03-10',
    readingTimeMinutes: 5,
    relatedSlugs: ['how-much-should-a-website-cost-in-2026'],
    relatedToolSlugs: ['website-cost-calculator'],
    contentHtml: `
      <p>The choice between Shopify and a custom-built website is really a question about what the business primarily needs the site to do, and how much ongoing flexibility matters relative to time-to-launch.</p>

      <h2>When Shopify is the better fit</h2>
      <p>If the core of the business is selling physical or digital products directly to consumers, Shopify's checkout, inventory and payment infrastructure already solves problems that would otherwise need to be built from scratch. Theme customisation gets a store to a professional, on-brand result quickly, and the platform handles security, uptime and payment compliance as part of the subscription.</p>

      <h2>When a custom website makes more sense</h2>
      <p>A service business, a content-led brand, or a company whose website needs to do something Shopify was not built for — a complex booking flow, a highly specific internal dashboard, or content structures outside an ecommerce template — is usually better served by a custom build. Custom development also makes sense once a store's requirements outgrow what theme customisation can reasonably achieve, even within Shopify itself.</p>

      <h2>A practical way to decide</h2>
      <p>Ask whether the site's primary job is processing product orders, or presenting information and capturing leads. The former points to Shopify; the latter points to a standard website build. Many growing brands eventually use both — a Shopify store for the storefront, and supporting content or internal tooling built separately.</p>

      <h2>Try it yourself</h2>
      <p>Our <a href="/tools/website-cost-calculator">Website Cost Calculator</a> asks about ecommerce needs directly and will point you to the right package — Shopify or standard web build — based on your answers.</p>
    `,
  },
  {
    slug: 'what-is-geo-and-aeo-preparing-for-ai-powered-search',
    title: 'What Is GEO and AEO? Preparing Your Website for AI-Powered Search',
    excerpt:
      'Generative Engine Optimisation and Answer Engine Optimisation, explained — and what actually changes on a webpage to support them.',
    category: 'SEO',
    tags: ['seo', 'geo', 'aeo'],
    imageUrl: blogGeoAeo,
    imageAlt: 'Search network illustration explaining GEO and AEO for AI-powered search.',
    author: TEAM,
    publishedAt: '2026-04-02',
    readingTimeMinutes: 6,
    relatedSlugs: ['how-much-should-a-website-cost-in-2026'],
    relatedToolSlugs: ['seo-roi-calculator'],
    contentHtml: `
      <p>Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) are two related but distinct disciplines that have grown alongside AI-assisted search and chat-based answer tools. Both sit alongside traditional SEO rather than replacing it.</p>

      <h2>AEO: optimising for direct answers</h2>
      <p>AEO focuses on structuring content so that search engines and voice assistants can extract a direct, concise answer to a specific question — the kind of result that appears as a featured snippet or a spoken answer. In practice, this means writing question-based headings, placing a clear, short answer immediately after the heading, and avoiding burying the actual answer under several paragraphs of preamble.</p>

      <h2>GEO: optimising for AI systems that summarise and cite</h2>
      <p>GEO is about making content easy for generative AI systems to understand, retrieve and accurately cite — which depends less on snippet formatting and more on clear entity definitions, consistent terminology, and content that states facts plainly rather than implying them. A page that defines what a service or product actually is, in plain language, near the top of the page, is easier for an AI system to summarise correctly than a page that opens with abstract brand language.</p>

      <h2>What this looks like on a real page</h2>
      <p>In practice: a clear H1 stating what the page is about, a one- or two-sentence definition near the top, FAQ sections built from real questions customers actually ask (not invented ones, and not hidden from visible content), structured data (JSON-LD) that matches what is visibly on the page, and internal links connecting related services, tools and articles so the relationships between them are explicit rather than assumed.</p>

      <h2>What does not help</h2>
      <p>Keyword stuffing, hidden text, FAQ schema for questions that are not actually visible on the page, and fabricated statistics or credentials all work against both traditional SEO and AEO/GEO — search engines and AI systems are increasingly good at identifying and discounting this kind of content.</p>
    `,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
