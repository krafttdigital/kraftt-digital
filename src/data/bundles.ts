import type { Bundle } from '@/types';
import { price } from './priceHelpers';

export const bundles: Bundle[] = [
  {
    id: 'starter-business-launch',
    name: 'Starter business launch',
    description: 'Website + brand identity + social starter — everything to launch from zero.',
    price: price(799, 35000),
    includes: ['Website (Business)', 'Brand Starter', 'Social Starter (1 month)'],
  },
  {
    id: 'd2c-brand-launch-kit',
    name: 'D2C brand launch kit',
    description: 'Shopify store + AI content + brand identity — launch a D2C brand end-to-end.',
    price: price(1799, 80000),
    includes: ['Shopify Growth', 'AI Brand Kit', 'Brand Identity', 'E-commerce SEO (1 month)'],
  },
  {
    id: 'full-digital-presence',
    name: 'Full digital presence',
    description: 'Website + brand + social management + SEO — a complete 3-month digital engine.',
    price: price(2499, 110000),
    includes: ['Website Growth', 'Brand Identity', 'Social Growth (3 months)', 'E-commerce SEO (3 months)'],
  },
  {
    id: 'local-business-dominator',
    name: 'Local business dominator',
    description: 'Built for Indian SMBs — website, WhatsApp setup, Google presence, and social starter.',
    price: price(null, 55000), // Supplied as "N/A" for foreign clients in the source pricing file — India-only bundle
    includes: ['Website Business', 'Social Starter (2 months)', 'E-commerce SEO Starter (2 months)', 'AI Creative Pack'],
  },
];
