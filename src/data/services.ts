import type { ServiceCategory } from '@/types';
import { addon, addonInrOnly, price } from './priceHelpers';

// ============================================================================
// Every package name, price, inclusion, add-on and delivery window below is
// transcribed exactly from agency_service_menu_and_pricing.html. Overview
// copy, problems-solved, ideal-client and FAQ content is original copy
// written for this site in the Kraftt Digital voice (precise, result-first,
// human, no invented statistics or claims).
// ============================================================================

export const serviceCategories: ServiceCategory[] = [
  // --------------------------------------------------------------------
  // 1. WEB DESIGN & DEVELOPMENT
  // --------------------------------------------------------------------
  {
    id: 'web',
    slug: 'web-design',
    name: 'Web Design & Development',
    icon: 'Layout',
    shortSummary: 'Responsive websites built for speed, search visibility and lead capture.',
    heroSummary:
      'A website that loads fast, reads clearly on a phone, and gives visitors an obvious next step — built on clean code, not a bloated template.',
    problemsSolved: [
      'No website yet, or one built years ago that no longer represents the business',
      'Existing site is slow, hard to update, or invisible on Google',
      'Enquiries arrive by phone or WhatsApp with no way to qualify them first',
    ],
    idealClients: [
      'Founders launching a new business or service',
      'Established businesses replacing a dated or DIY website',
      'Professionals and consultants who need a credible online presence',
    ],
    deliverables: [
      'Responsive pages built for mobile, tablet and desktop',
      'On-page SEO: titles, meta descriptions, heading structure, alt text',
      'WhatsApp click-to-chat integration',
      'Custom domain business email',
      'Contact form with lead capture (Business tier and above)',
    ],
    process: [
      { title: 'Discovery', description: 'A short brief call to understand the business, the audience, and what the site needs to achieve.' },
      { title: 'Structure', description: 'Sitemap and page-by-page content plan, so every page has a clear job before any design starts.' },
      { title: 'Design & build', description: 'Pages are designed and built together — no static mockup handed off and rebuilt later.' },
      { title: 'Review', description: 'A working link is shared for feedback before anything goes live.' },
      { title: 'Launch', description: 'Domain connection, email setup, Search Console configuration, and a final pass on speed and mobile rendering.' },
    ],
    packages: [
      {
        id: 'web-starter',
        name: 'Starter — single page',
        badge: 'Entry level',
        featured: false,
        price: price(299, 12000),
        includes: [
          'Single page responsive website',
          'Basic on-page SEO',
          'WhatsApp chat button integration',
          'Custom domain business email (1 ID)',
          'Mobile optimised',
        ],
        addons: [
          addon('GEO & AEO optimisation', 79, 4000),
          addon('JSON-LD schema markup', 49, 2500),
          addonInrOnly('Kraftt website maintenance', 12000, 'yearly'),
        ],
        delivery: '3–4 days',
      },
      {
        id: 'web-business',
        name: 'Business — multi page',
        badge: 'Most popular',
        featured: true,
        price: price(599, 25000),
        includes: [
          '5-page responsive website',
          'Full on-page SEO (all pages)',
          'WhatsApp integration',
          'Custom business email (3 IDs)',
          'Contact form + basic lead capture',
          'Google Search Console setup',
        ],
        addons: [
          addon('GEO & AEO optimisation', 99, 5000),
          addon('JSON-LD schema markup', 69, 3500),
          addonInrOnly('Kraftt website maintenance', 12000, 'yearly'),
        ],
        delivery: '6–8 days',
      },
      {
        id: 'web-growth',
        name: 'Growth — full build',
        badge: 'Premium',
        featured: false,
        price: price(999, 45000),
        includes: [
          '8–10 page responsive website',
          'Complete SEO + JSON-LD included',
          'GEO & AEO included',
          'Unlimited business email IDs',
          'Google Search Console included',
          'WhatsApp + CRM integration',
          'Blog section setup',
        ],
        addons: [addonInrOnly('Kraftt website maintenance', 12000, 'yearly')],
        delivery: '10–14 days',
      },
    ],
    faqs: [
      {
        question: 'How many revisions are included in a website package?',
        answer:
          'The Starter and Business tiers include a structured review round before launch. The Growth tier includes additional review cycles given the larger scope. Specific revision counts are confirmed in your proposal — get in touch and we will set this out clearly before work begins.',
      },
      {
        question: 'Do I need to provide content, or do you write it?',
        answer:
          'You are welcome to supply your own copy and images. If you need copy written, the Content & Copywriting packages pair directly with any web design package — ask us to bundle them in your enquiry.',
      },
      {
        question: 'Will my website work on mobile phones?',
        answer: 'Yes. Every package on this page is built mobile-first and tested across phone, tablet and desktop breakpoints before launch.',
      },
      {
        question: 'Is website maintenance included after launch?',
        answer:
          'One-time website payment covers the build, launch and handover. After that, you maintain the site yourself. If you want Kraftt Digital to maintain the site, handle small content updates, keep the site healthy, and make normal changes for you, maintenance is Rs. 12,000/year for every website package. New features, new sections, advanced integrations, or larger scope additions are priced separately.',
      },
      {
        question: 'Can international clients order a website package?',
        answer:
          'Yes. All three tiers are available in USD for clients outside India, with the same deliverables and timelines. Use the currency selector in the navigation to see USD pricing.',
      },
    ],
    relatedSlugs: ['brand-identity', 'ecommerce-seo', 'content-copywriting'],
  },

  // --------------------------------------------------------------------
  // 2. SHOPIFY STORE DEVELOPMENT
  // --------------------------------------------------------------------
  {
    id: 'shopify',
    slug: 'shopify-development',
    name: 'Shopify Store Development',
    icon: 'Store',
    shortSummary: 'Full Shopify store setup, theming, product loading and launch.',
    heroSummary:
      'A Shopify store with products loaded, checkout configured, and search basics in place from day one — ready to take orders, not just look the part.',
    problemsSolved: [
      'No store yet, or a partially-built Shopify account that never launched',
      'Existing store has an unconfigured theme, missing product data, or no SEO setup',
      'Product descriptions and images need to be created before launch',
    ],
    idealClients: [
      'D2C and product brands launching their first store',
      'Businesses migrating from another platform to Shopify',
      'Sellers who need products uploaded, described and photographed for launch',
    ],
    deliverables: [
      'Theme setup and customisation to match brand colours and typography',
      'Home, Collection and Product page configuration',
      'Checkout page configuration',
      'Product upload (volume depends on package)',
      'Domain connection and basic store SEO',
    ],
    process: [
      { title: 'Store audit', description: 'Review of your product catalogue, brand assets and any existing Shopify setup.' },
      { title: 'Theme & structure', description: 'Theme selected and customised; collections and navigation mapped to how customers actually shop.' },
      { title: 'Product loading', description: 'Products uploaded with descriptions, pricing and images, following the package scope.' },
      { title: 'Checkout & integrations', description: 'Checkout, payment and (where included) email automation configured and tested.' },
      { title: 'Launch', description: 'Final QA pass across devices, then the store goes live on your domain.' },
    ],
    packages: [
      {
        id: 'shopify-launch',
        name: 'Launch store',
        badge: 'Entry level',
        featured: false,
        price: price(499, 22000),
        includes: [
          'Theme setup & customisation',
          'Home, Collections, Product pages',
          'Checkout page configuration',
          'Up to 20 products uploaded',
          'Basic Google SEO for store',
          'Domain connection',
        ],
        addons: [addon('Product photography mockups', 79, 4000), addonInrOnly('Extra products (per product)', 150)],
        delivery: '5–7 days',
      },
      {
        id: 'shopify-growth',
        name: 'Growth store',
        badge: 'Most popular',
        featured: true,
        price: price(899, 40000),
        includes: [
          'Full theme setup + custom sections',
          'All collection & product pages',
          'Up to 50 products uploaded',
          'AI-written product descriptions',
          'Google SEO + Search Console',
          'WhatsApp chat widget',
          'Email capture + basic automation',
        ],
        addons: [addon('AI product mockups', 99, 5000), addon('Blog content setup', 149, 6500)],
        delivery: '8–12 days',
      },
      {
        id: 'shopify-complete',
        name: 'Complete store',
        badge: 'Premium',
        featured: false,
        price: price(1499, 70000),
        includes: [
          'Full custom Shopify build',
          'Unlimited products uploaded',
          'AI product descriptions + SEO',
          'Complete e-commerce SEO',
          'Search Console + Analytics',
          'Product creation & mockups',
          'Email automation (Klaviyo)',
          'GEO + AEO optimisation',
        ],
        addons: [addon('Monthly SEO retainer', 199, 8000, 'monthly')],
        delivery: '14–20 days',
      },
    ],
    faqs: [
      {
        question: 'How many products can you upload?',
        answer:
          'Launch includes up to 20 products, Growth up to 50, and Complete is unlimited. Need more than 20 on the Launch tier? Extra products can be added at ₹150 each.',
      },
      {
        question: 'Do you write the product descriptions?',
        answer:
          'Growth and Complete include AI-written product descriptions as part of the package. On the Launch tier, descriptions can be added via the Content & Copywriting or AI Content packages.',
      },
      {
        question: 'Is the Shopify subscription included in the price?',
        answer:
          'No — the package price covers our design, build and setup work. Your monthly Shopify platform subscription is billed to you directly by Shopify.',
      },
      {
        question: 'Can you migrate my store from another platform?',
        answer:
          'Yes. Share your current platform and product count when you get in touch, and we will scope the migration into the right package tier.',
      },
    ],
    relatedSlugs: ['ai-content', 'ecommerce-seo', 'brand-identity'],
  },

  // --------------------------------------------------------------------
  // 3. E-COMMERCE SEO (monthly)
  // --------------------------------------------------------------------
  {
    id: 'ecomseo',
    slug: 'ecommerce-seo',
    name: 'E-commerce SEO',
    icon: 'TrendingUp',
    shortSummary: 'Ongoing SEO, content and visibility work for online stores.',
    heroSummary:
      'Monthly, hands-on SEO for stores that already exist but are not showing up in search — on-page fixes, content, and outreach, reported every month.',
    problemsSolved: [
      'Store is live but rarely appears in Google search results',
      'No one is tracking rankings, traffic or what is actually working',
      'Product and collection pages were never optimised for search',
    ],
    idealClients: [
      'Shopify and e-commerce stores already live and selling',
      'Brands that want consistent, measured SEO work rather than a one-off audit',
      'Stores preparing for a seasonal sales push',
    ],
    deliverables: [
      'Google Search Console setup and ongoing monitoring',
      'On-page SEO across product and collection pages',
      'Monthly SEO blog content',
      'Monthly keyword and performance reporting',
    ],
    process: [
      { title: 'Audit', description: 'Search Console connected and current rankings, indexing and technical issues reviewed.' },
      { title: 'Plan', description: 'A prioritised monthly plan covering on-page fixes, content and (on higher tiers) outreach.' },
      { title: 'Execute', description: 'On-page changes shipped, blog content published, and links built according to the tier scope.' },
      { title: 'Report', description: 'A monthly report covering rankings, traffic direction and what is planned next.' },
    ],
    packages: [
      {
        id: 'seo-starter',
        name: 'SEO starter',
        badge: 'Entry level',
        featured: false,
        price: price(299, 12000, 'monthly'),
        includes: [
          'Google Search Console setup + monitoring',
          'On-page SEO (10 pages/month)',
          'Keyword tracking report',
          '1 SEO blog post/month (AI-written)',
        ],
        addons: [addon('GEO + AEO layer', 79, 3500, 'monthly')],
        delivery: 'Ongoing monthly',
      },
      {
        id: 'seo-growth',
        name: 'SEO growth',
        badge: 'Most popular',
        featured: true,
        price: price(549, 22000, 'monthly'),
        includes: [
          'Full Search Console management',
          'On-page SEO (all pages)',
          'GEO + AEO optimisation included',
          '4 SEO blog posts/month',
          'Backlink outreach (5 links/month)',
          'Monthly performance report',
        ],
        addons: [addonInrOnly('Product description rewrites', 8200, 'monthly')],
        delivery: 'Ongoing monthly',
      },
      {
        id: 'seo-domination',
        name: 'SEO domination',
        badge: 'Premium',
        featured: false,
        price: price(999, 40000, 'monthly'),
        includes: [
          'Complete SEO management',
          'GEO + AEO fully managed',
          '8 blog posts/month',
          'Technical SEO audit + fixes',
          'Competitor analysis monthly',
          'Link building (15 links/month)',
          'Ranking + traffic growth focus',
        ],
        addons: [],
        delivery: 'Ongoing monthly',
      },
    ],
    faqs: [
      {
        question: 'Is there a minimum contract length?',
        answer:
          'Packages are billed monthly. SEO compounds over several months, so we recommend a minimum 3-month commitment to see meaningful movement — but specific terms are confirmed in your proposal.',
      },
      {
        question: 'Can you guarantee a #1 Google ranking?',
        answer:
          'No agency can honestly guarantee a specific ranking position — search algorithms are outside any agency\'s control. What we commit to is the scope of work in each tier: the audits, content, on-page fixes and link building described above, delivered every month.',
      },
      {
        question: 'What is GEO and AEO optimisation?',
        answer:
          'GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation) structure your content so AI-assisted search tools and answer engines can understand and cite it accurately — clear definitions, structured data, and direct-answer formatting, alongside traditional SEO.',
      },
    ],
    relatedSlugs: ['shopify-development', 'web-design', 'content-copywriting'],
  },

  // --------------------------------------------------------------------
  // 4. CONTENT & COPYWRITING
  // --------------------------------------------------------------------
  {
    id: 'content',
    slug: 'content-copywriting',
    name: 'Content & Copywriting',
    icon: 'PenLine',
    shortSummary: 'Landing pages, product descriptions, email sequences and ad creative.',
    heroSummary:
      'Words that explain what you sell and why it matters — landing pages, product copy and email sequences written to be read, not skimmed past.',
    problemsSolved: [
      'A new page or product launch with no copy written for it yet',
      'Product descriptions that read the same as every competitor\'s',
      'No welcome or nurture email sequence for new subscribers or customers',
    ],
    idealClients: [
      'Stores and websites that need copy for a specific launch or page',
      'Brands building out a full content library across landing pages and email',
      'Teams without an in-house copywriter',
    ],
    deliverables: [
      'Landing or sales page copy',
      'Product descriptions written for search and conversion',
      'Email sequence drafts',
      'Ad creative copy (Content suite tier and above)',
    ],
    process: [
      { title: 'Brief', description: 'Audience, offer and tone confirmed before any writing starts.' },
      { title: 'Draft', description: 'First draft written and shared for review.' },
      { title: 'Edit', description: 'Feedback incorporated into a final, polished version.' },
      { title: 'Handover', description: 'Copy delivered in a format ready to drop straight into your site, store or email tool.' },
    ],
    packages: [
      {
        id: 'copy-starter',
        name: 'Copy starter',
        badge: 'Entry level',
        featured: false,
        price: price(199, 8000),
        includes: ['1 landing page (AI-written + edited)', '5 product descriptions', '3 email sequence drafts'],
        addons: [addon('Product mockup shoot', 79, 3500)],
        delivery: '3–4 days',
      },
      {
        id: 'content-suite',
        name: 'Content suite',
        badge: 'Most popular',
        featured: true,
        price: price(499, 20000),
        includes: [
          '3 landing pages or sales pages',
          '10 product descriptions + SEO',
          '5-email welcome sequence',
          '10 AI product mockups',
          '2 ad creative sets (static)',
        ],
        addons: [addon('Product creation concept', 149, 6000)],
        delivery: '7–10 days',
      },
      {
        id: 'brand-content-pack',
        name: 'Brand content pack',
        badge: 'Premium',
        featured: false,
        price: price(899, 38000),
        includes: [
          '5 landing/sales pages',
          'Unlimited product descriptions',
          'Full email sequence (10 emails)',
          'Product shoot mockups (20 images)',
          'Ad creatives (3 sets)',
          'Product creation + packaging concept',
        ],
        addons: [],
        delivery: '12–15 days',
      },
    ],
    faqs: [
      {
        question: 'Do you write copy in a specific brand voice?',
        answer:
          'Yes — we work from your existing brand voice guide if you have one, or establish a clear tone during the brief stage if you don\'t.',
      },
      {
        question: 'Can copy be delivered directly into my website or store?',
        answer:
          'Copy is delivered in document form ready to paste in, or — if paired with a Web Design or Shopify package — built directly into the live pages.',
      },
      {
        question: 'How many product descriptions are included?',
        answer:
          'Copy starter includes 5, Content suite includes 10, and Brand content pack includes an unlimited number for the scope of the project agreed at brief stage.',
      },
    ],
    relatedSlugs: ['ai-content', 'web-design', 'shopify-development'],
  },

  // --------------------------------------------------------------------
  // 5. DASHBOARDS & INTERNAL TOOLS
  // --------------------------------------------------------------------
  {
    id: 'dashboard',
    slug: 'dashboards-tools',
    name: 'Dashboards & Internal Tools',
    icon: 'LayoutDashboard',
    shortSummary: 'Admin panels, internal tools, billing and automation software.',
    heroSummary:
      'Software built for the way your team actually works — admin panels, inventory dashboards and billing tools that replace spreadsheets and manual CSV exports.',
    problemsSolved: [
      'Operations run on spreadsheets that don\'t talk to each other',
      'No central place to manage inventory, orders or accounts',
      'Manual, repetitive data entry that a tool could automate',
    ],
    idealClients: [
      'Operations and ecommerce teams managing inventory or orders manually',
      'Businesses that need a simple internal tool for one specific job',
      'Companies ready to replace ad-hoc spreadsheets with a real admin panel',
    ],
    deliverables: [
      'Custom-built internal tool or admin panel',
      'User login and role-based access control',
      'Data dashboards and reporting',
      'API integrations where included in the tier',
    ],
    process: [
      { title: 'Requirements', description: 'A working session to map exactly what the tool needs to do and who will use it.' },
      { title: 'Architecture', description: 'Data model and user roles defined before any screens are built.' },
      { title: 'Build', description: 'The tool is built in working increments, so you can test functionality as it ships.' },
      { title: 'Handover & support', description: 'Access provisioned for your team, with documentation on how to use and maintain the tool.' },
    ],
    packages: [
      {
        id: 'dashboard-simple',
        name: 'Simple tool',
        badge: 'Entry level',
        featured: false,
        price: price(599, 28000),
        includes: ['Single-purpose internal tool', 'CSV upload/export automation', 'Basic data dashboard', 'User login + access control'],
        addons: [addon('Bulk update feature', 149, 6000)],
        delivery: '7–10 days',
      },
      {
        id: 'dashboard-business',
        name: 'Business dashboard',
        badge: 'Most popular',
        featured: true,
        price: price(1299, 60000),
        includes: [
          'Full admin panel',
          'Product & inventory dashboard',
          'Bulk upload/update tools',
          'Accounts management module',
          'PDF report generation',
          'User roles + permissions',
        ],
        addons: [addon('Billing + invoicing module', 299, 12000)],
        delivery: '14–20 days',
      },
      {
        id: 'dashboard-full-suite',
        name: 'Full internal suite',
        badge: 'Premium',
        featured: false,
        price: price(2499, 110000),
        includes: [
          'Complete admin + ops dashboard',
          'Billing & invoicing software',
          'Accounts + expenses module',
          'CSV automation tools',
          'API integrations (Razorpay, Shopify)',
          'Ongoing support retainer (1 month)',
        ],
        addons: [],
        delivery: '25–35 days',
      },
    ],
    faqs: [
      {
        question: 'Can the tool integrate with the software we already use?',
        answer:
          'The Full internal suite tier includes API integrations such as Razorpay and Shopify. Other integrations can be scoped on request — tell us what you use when you get in touch.',
      },
      {
        question: 'Who hosts the tool once it is built?',
        answer:
          'Hosting setup and recommendations are part of delivery; ongoing hosting costs are billed separately by the hosting provider, not included in the package price.',
      },
      {
        question: 'Is support included after launch?',
        answer:
          'The Full internal suite tier includes a one-month support retainer. Ongoing support beyond that can be arranged separately for any tier.',
      },
    ],
    relatedSlugs: ['web-design', 'ecommerce-seo'],
  },

  // --------------------------------------------------------------------
  // 6. AI-POWERED CREATIVE
  // --------------------------------------------------------------------
  {
    id: 'ai',
    slug: 'ai-content',
    name: 'AI-Powered Creative',
    icon: 'Bot',
    shortSummary: 'AI-powered ad creatives, product mockups, copy and social designs.',
    heroSummary:
      'Ad creatives, product mockups and copy produced faster with AI tools — directed, reviewed and finished by a human before anything ships.',
    problemsSolved: [
      'No budget yet for a full photography or video shoot',
      'Need a volume of ad creative for testing across platforms',
      'Product needs visual mockups before physical samples exist',
    ],
    idealClients: [
      'Brands testing multiple ad creative variations',
      'D2C founders who need product visuals before manufacturing',
      'Teams that need a fast turnaround on social and ad assets',
    ],
    deliverables: [
      'Static and motion ad creative sets',
      'Product mockup and shoot-simulation images',
      'AI-written product descriptions and email copy',
      'Social post designs',
    ],
    process: [
      { title: 'Brief', description: 'Product, brand assets and target platforms confirmed.' },
      { title: 'Generate', description: 'AI tools produce a first set of creative directions and copy variations.' },
      { title: 'Curate & finish', description: 'Our team selects, edits and finishes the strongest outputs — nothing ships unreviewed.' },
      { title: 'Delivery', description: 'Final files delivered in platform-ready formats and sizes.' },
    ],
    packages: [
      {
        id: 'ai-creative-pack',
        name: 'AI creative pack',
        badge: 'Entry level',
        featured: false,
        price: price(249, 10000),
        includes: ['5 ad creatives (static)', '5 product mockup images', '10 AI-written product descriptions', '3 email drafts'],
        addons: [
          addon('Animated ad creatives', 99, 4500),
          addonInrOnly('Monthly AI creative support ', 10000, 'monthly'),
        ],
        delivery: '2–3 days',
      },
      {
        id: 'ai-brand-kit',
        name: 'AI brand kit',
        badge: 'Most popular',
        featured: true,
        price: price(549, 22000),
        includes: [
          '15 ad creatives (static + motion)',
          '10 product design mockups',
          'Product shoot simulation (10 images)',
          'Full email sequence (6 emails)',
          'Landing page copy',
          '5 social post designs',
        ],
        addons: [
          addon('Product packaging design', 149, 6000),
          addonInrOnly('Monthly AI creative support (half-scope product mockups)', 10000, 'monthly'),
        ],
        delivery: '5–7 days',
      },
      {
        id: 'ai-launch-suite',
        name: 'AI launch suite',
        badge: 'Premium',
        featured: false,
        price: price(999, 42000),
        includes: [
          '30 ad creatives',
          '20 product mockups + shoot simulation',
          'Full email automation copy',
          '3 landing pages',
          '10 social post designs',
          'Product creation concept + mockup',
        ],
        addons: [addonInrOnly('Monthly AI creative support (excludes landing pages; half-scope product mockups)', 10000, 'monthly')],
        delivery: '8–12 days',
      },
    ],
    faqs: [
      {
        question: 'Are these creatives generated entirely by AI with no human input?',
        answer:
          'AI tools produce the first pass of images and copy. Every output is then reviewed, curated and finished by our team before delivery — nothing ships without a human check.',
      },
      {
        question: 'Can AI mockups replace real product photography?',
        answer:
          'They are a fast, lower-cost way to visualise products before or alongside a real shoot — useful for testing, early launches or budget-constrained projects, not a permanent substitute once a brand scales.',
      },
      {
        question: 'What file formats are delivered?',
        answer: 'Platform-ready formats and sizes for the ad networks and social platforms you specify in the brief.',
      },
      {
        question: 'Is AI-Powered Creative fixed or monthly?',
        answer:
          'The listed AI-Powered Creative packages are fixed one-time packages. If ongoing creative support is needed, it is Rs. 10,000/month. Monthly support excludes landing pages, and product mockups are handled at half-scope compared with the fixed package unless scoped separately.',
      },
    ],
    relatedSlugs: ['content-copywriting', 'shopify-development', 'social-media-management'],
  },

  // --------------------------------------------------------------------
  // 7. BRAND IDENTITY
  // --------------------------------------------------------------------
  {
    id: 'brand',
    slug: 'brand-identity',
    name: 'Brand Identity',
    icon: 'Palette',
    shortSummary: 'Logo, colour palette, typography and brand voice — built as a system.',
    heroSummary:
      'A logo, colour palette and typography system that work together — so every page, post and product looks like it belongs to the same brand.',
    problemsSolved: [
      'No logo yet, or one that no longer matches the business',
      'Inconsistent colours and fonts across the website, social and packaging',
      'No reference document for how the brand should look and sound',
    ],
    idealClients: [
      'New businesses building a brand identity from zero',
      'Established businesses rebranding or formalising an inconsistent look',
      'Teams that need a guidelines document so freelancers and staff stay on-brand',
    ],
    deliverables: [
      'Logo design with primary, secondary and icon variations (tier-dependent)',
      'Colour palette with documented usage rules',
      'Typography system',
      'Brand guidelines document',
    ],
    process: [
      { title: 'Discovery', description: 'Positioning, audience and competitors reviewed before any visual direction is explored.' },
      { title: 'Concept', description: 'Logo concepts developed and presented for review.' },
      { title: 'Refine', description: 'Selected direction refined through the included revision rounds.' },
      { title: 'System & guidelines', description: 'Colour, typography and usage rules documented into a guidelines file.' },
    ],
    packages: [
      {
        id: 'brand-starter',
        name: 'Brand starter',
        badge: 'Entry level',
        featured: false,
        price: price(299, 12000),
        includes: ['Logo design (3 concepts, 2 revisions)', 'Primary colour palette', 'Font selection (2 typefaces)', 'Logo files (PNG, SVG, PDF)'],
        addons: [addon('Brand guidelines document', 99, 4000)],
        delivery: '4–5 days',
      },
      {
        id: 'brand-identity-pkg',
        name: 'Brand identity',
        badge: 'Most popular',
        featured: true,
        price: price(699, 30000),
        includes: [
          'Logo suite (primary, secondary, icon)',
          'Full colour palette + usage rules',
          'Typography system',
          'Brand voice & tone guide',
          'Business card + letterhead design',
          'Brand guidelines PDF',
        ],
        addons: [addon('Brand illustrations (3 custom)', 149, 6500)],
        delivery: '8–12 days',
      },
      {
        id: 'full-brand-system',
        name: 'Full brand system',
        badge: 'Premium',
        featured: false,
        price: price(1299, 55000),
        includes: [
          'Complete logo system',
          'Full brand identity kit',
          'Brand illustrations (5 custom)',
          'Social media profile kit',
          'Packaging design concept',
          'Pitch deck template',
          'Brand guidelines (30-page PDF)',
        ],
        addons: [],
        delivery: '15–20 days',
      },
    ],
    faqs: [
      {
        question: 'How many logo concepts and revisions are included?',
        answer:
          'Brand starter includes 3 initial concepts and 2 rounds of revisions. Higher tiers include a fuller logo suite — exact revision scope for Brand identity and Full brand system is confirmed in your proposal.',
      },
      {
        question: 'What files do I receive for the final logo?',
        answer: 'PNG, SVG and PDF formats are included from the Brand starter tier upward, suitable for web, print and packaging use.',
      },
      {
        question: 'Can branding be bundled with a website or Shopify store?',
        answer: 'Yes — see the bundle packages on the Services page, which combine branding with web design or Shopify development at a combined price.',
      },
    ],
    relatedSlugs: ['web-design', 'shopify-development', 'social-media-management'],
  },

  // --------------------------------------------------------------------
  // 8. SOCIAL MEDIA MANAGEMENT (monthly)
  // --------------------------------------------------------------------
  {
    id: 'social',
    slug: 'social-media-management',
    name: 'Social Media Management',
    icon: 'Share2',
    shortSummary: 'Content calendar, posts, stories, captions and profile management.',
    heroSummary:
      'A content calendar that actually publishes — feed posts, stories and captions planned and managed every month, not promised and forgotten.',
    problemsSolved: [
      'Social profiles are inconsistent or have gone quiet',
      'No time internally to plan and write a content calendar every month',
      'Profile bios, links and highlights are outdated or unoptimised',
    ],
    idealClients: [
      'Brands that need consistent monthly content without an in-house social team',
      'Businesses managing multiple platforms with no unified calendar',
      'Teams that want analytics and a strategy review, not just posts going out',
    ],
    deliverables: [
      'Monthly content calendar',
      'Feed posts and stories per the tier scope',
      'Captions and hashtag sets',
      'Monthly analytics reporting (Growth tier and above)',
    ],
    process: [
      { title: 'Audit', description: 'Existing profiles, audience and past performance reviewed.' },
      { title: 'Calendar', description: 'A monthly content calendar planned around your offers and key dates.' },
      { title: 'Create & schedule', description: 'Posts, stories and captions produced and scheduled for the month.' },
      { title: 'Report', description: 'Performance reviewed monthly, with adjustments to the next month\'s calendar.' },
    ],
    packages: [
      {
        id: 'social-starter',
        name: 'Social starter',
        badge: 'Entry level',
        featured: false,
        price: price(299, 10000, 'monthly'),
        includes: [
          '12 posts/month (feed)',
          '8 stories/month',
          'Captions + hashtag sets',
          '1 platform (Instagram or LinkedIn)',
          'Profile setup + bio optimisation',
        ],
        addons: [addon('Additional platform', 99, 4000, 'monthly')],
        delivery: 'Ongoing monthly',
      },
      {
        id: 'social-growth',
        name: 'Social growth',
        badge: 'Most popular',
        featured: true,
        price: price(599, 22000, 'monthly'),
        includes: [
          '20 posts/month',
          '15 stories/month',
          '2 platforms managed',
          'Monthly content calendar',
          'Captions + hashtag strategy',
          'Profile integration (links, highlights)',
          'Monthly analytics report',
        ],
        addons: [addon('Reel / short-form video', 199, 8000, 'monthly')],
        delivery: 'Ongoing monthly',
      },
      {
        id: 'social-domination',
        name: 'Social domination',
        badge: 'Premium',
        featured: false,
        price: price(999, 40000, 'monthly'),
        includes: [
          '30 posts/month',
          '20 stories/month',
          '3 platforms fully managed',
          '4 reels/month',
          'Full content calendar',
          'Hashtag research + rotation',
          'Community management (DM replies)',
          'Growth analytics + strategy call',
        ],
        addons: [],
        delivery: 'Ongoing monthly',
      },
    ],
    faqs: [
      {
        question: 'Do you create the visuals for each post, or just captions?',
        answer: 'Visual creation and captions are both included — posts are designed, written and scheduled as a complete package.',
      },
      {
        question: 'Which platforms can you manage?',
        answer:
          'Instagram and LinkedIn are supported on the Social starter tier (choose one), with additional platforms available as an add-on or included from the Growth tier upward.',
      },
      {
        question: 'Is community management (replying to DMs and comments) included?',
        answer: 'Community management is included on the Social domination tier. Lower tiers focus on content creation and publishing.',
      },
    ],
    relatedSlugs: ['ai-content', 'brand-identity', 'content-copywriting'],
  },
];

export function getCategoryBySlug(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}
