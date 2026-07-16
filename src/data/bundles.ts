import type { Bundle } from '@/types';
import { price } from './priceHelpers';

export const bundles: Bundle[] = [
  {
    id: 'starter-business-launch',
    slug: 'starter-business-launch',
    name: 'Starter business launch',
    eyebrow: 'Launch from zero',
    description: 'Website + brand identity + social starter - everything to launch from zero.',
    heroSummary:
      'A practical launch stack for a new service business that needs a credible website, first brand system and one month of social presence.',
    price: price(799, 35000),
    includes: ['Website (Business)', 'Brand Starter', 'Social Starter (1 month)'],
    bestFor: [
      'New founders preparing their first serious launch',
      'Local businesses replacing scattered DIY assets',
      'Service brands that need a clean start without overbuilding',
    ],
    outcomes: [
      'A multi-page website that explains the offer clearly',
      'A starter identity system for consistent presentation',
      'A first month of social content to make the brand look active',
    ],
    timeline: '2-4 weeks',
    serviceSlugs: ['web-design', 'brand-identity', 'social-media-management'],
    process: [
      { title: 'Direction', description: 'Clarify the offer, audience, pages, brand tone and social starting point.' },
      { title: 'Build', description: 'Create the website structure, starter brand assets and first content calendar together.' },
      { title: 'Launch', description: 'Connect the website, hand over the brand basics and schedule the first social month.' },
    ],
    faqs: [
      {
        question: 'Is this enough for a complete new business launch?',
        answer:
          'It covers the first visible digital layer: website, starter identity and one month of social content. Extra SEO, ads or advanced automation can be scoped later.',
      },
      {
        question: 'Can I upgrade the website or branding tier?',
        answer: 'Yes. The bundle is a starting configuration; the proposal can upgrade any included service before kickoff.',
      },
    ],
  },
  {
    id: 'd2c-brand-launch-kit',
    slug: 'd2c-brand-launch-kit',
    name: 'D2C brand launch kit',
    eyebrow: 'D2C launch',
    description: 'Shopify store + AI content + brand identity - launch a D2C brand end-to-end.',
    heroSummary:
      'A D2C launch package for product brands that need the store, identity, product content and first search layer planned together.',
    price: price(1799, 80000),
    includes: ['Shopify Growth', 'AI Brand Kit', 'Brand Identity', 'E-commerce SEO (1 month)'],
    bestFor: [
      'D2C founders launching a product catalogue',
      'Brands that need product copy, mockups and store structure',
      'Teams that want search basics included at launch',
    ],
    outcomes: [
      'A Shopify store with product and collection structure',
      'Brand identity and AI-assisted creative support',
      'One month of e-commerce SEO foundation work',
    ],
    timeline: '4-6 weeks',
    serviceSlugs: ['shopify-development', 'ai-content', 'brand-identity', 'ecommerce-seo'],
    process: [
      { title: 'Catalogue map', description: 'Plan products, collections, brand voice, core pages and launch priorities.' },
      { title: 'Store system', description: 'Build Shopify, prepare product content, shape creative assets and connect SEO foundations.' },
      { title: 'Launch review', description: 'Review mobile buying paths, WhatsApp/contact points, metadata and handover.' },
    ],
    faqs: [
      {
        question: 'Are product photos included?',
        answer:
          'AI mockups and creative support are included through the AI Brand Kit scope. Professional physical shoots are not included unless scoped separately.',
      },
      {
        question: 'Does this include paid ads?',
        answer: 'No. This bundle prepares the store, content and SEO foundation. Ad spend and campaign management are separate.',
      },
    ],
  },
  {
    id: 'full-digital-presence',
    slug: 'full-digital-presence',
    name: 'Full digital presence',
    eyebrow: 'Three-month engine',
    description: 'Website + brand + social management + SEO - a complete 3-month digital engine.',
    heroSummary:
      'A connected three-month digital presence for businesses that need website credibility, brand consistency, search work and social activity moving together.',
    price: price(2499, 110000),
    includes: ['Website Growth', 'Brand Identity', 'Social Growth (3 months)', 'E-commerce SEO (3 months)'],
    bestFor: [
      'Established businesses with weak online presentation',
      'Brands that need launch plus ongoing visibility',
      'Founders who want one team handling website, search and social',
    ],
    outcomes: [
      'A stronger website and brand system',
      'Three months of social management',
      'Three months of SEO activity and reporting',
    ],
    timeline: '8-12 weeks',
    serviceSlugs: ['web-design', 'brand-identity', 'social-media-management', 'ecommerce-seo'],
    process: [
      { title: 'Audit and rebuild plan', description: 'Map the current website, brand, search presence and social rhythm.' },
      { title: 'Launch foundation', description: 'Build or improve the website and brand system while planning SEO and social execution.' },
      { title: 'Growth cycle', description: 'Run the three-month content, SEO and reporting rhythm after the core launch.' },
    ],
    faqs: [
      {
        question: 'Is this only for e-commerce?',
        answer: 'No. The SEO component can be adapted for service businesses, local businesses or e-commerce depending on the project.',
      },
      {
        question: 'Can the three-month support continue?',
        answer: 'Yes. Ongoing SEO, social and maintenance can continue as a separate monthly scope after the bundle period.',
      },
    ],
  },
  {
    id: 'local-business-dominator',
    slug: 'local-business-dominator',
    name: 'Local business dominator',
    eyebrow: 'India-only local growth',
    description: 'Built for Indian SMBs - website, WhatsApp setup, Google presence, and social starter.',
    heroSummary:
      'An India-only local business bundle for SMBs that need a website, WhatsApp-ready enquiry path, Google presence and first content push.',
    price: price(null, 55000),
    includes: ['Website Business', 'Social Starter (2 months)', 'E-commerce SEO Starter (2 months)', 'AI Creative Pack'],
    bestFor: [
      'Indian local businesses that rely on calls and WhatsApp',
      'Owner-led SMBs with weak Google and website presence',
      'Brands that need a realistic local visibility starter system',
    ],
    outcomes: [
      'A clear business website with enquiry paths',
      'Two months of social and SEO starter activity',
      'AI-assisted creative support for faster launch material',
    ],
    timeline: '4-8 weeks',
    serviceSlugs: ['web-design', 'social-media-management', 'ecommerce-seo', 'ai-content'],
    process: [
      { title: 'Local audit', description: 'Review service pages, local search gaps, WhatsApp flow and trust signals.' },
      { title: 'Presence build', description: 'Build the website, prepare creative assets and start the SEO/social foundation.' },
      { title: 'Visibility cycle', description: 'Run two months of SEO and social activity with practical reporting and next-step guidance.' },
    ],
    faqs: [
      {
        question: 'Why is this India-only?',
        answer: 'The package is priced and scoped around Indian SMB buying behaviour, local WhatsApp enquiry flow and INR-only delivery economics.',
      },
      {
        question: 'Does this guarantee local rankings?',
        answer: 'No. It improves the website, structure, content rhythm and search foundations, but rankings and enquiries cannot be guaranteed.',
      },
    ],
  },
];

export function getBundleBySlug(slug: string) {
  return bundles.find((bundle) => bundle.slug === slug);
}
