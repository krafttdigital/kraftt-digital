// Generates public/sitemap.xml and public/robots.txt's sitemap reference
// from the actual route data — run via `npm run generate:sitemap`.
// Uses vite-node so the same `@/` path alias used throughout src/ resolves
// correctly here, with no duplicated route lists to keep in sync by hand.
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { siteConfig } from '../src/config/siteConfig';
import { serviceCategories } from '../src/data/services';
import { portfolioProjects } from '../src/data/portfolio';
import { blogPosts } from '../src/data/blog';
import { toolsList } from '../src/data/tools';

const today = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  lastmod?: string;
}

const entries: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/services', changefreq: 'weekly', priority: 0.9 },
  { path: '/portfolio', changefreq: 'weekly', priority: 0.7 },
  { path: '/about', changefreq: 'monthly', priority: 0.6 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/blog', changefreq: 'daily', priority: 0.7 },
  { path: '/tools', changefreq: 'weekly', priority: 0.8 },

  ...serviceCategories.map((c) => ({ path: `/services/${c.slug}`, changefreq: 'weekly' as const, priority: 0.85 })),
  ...portfolioProjects.map((p) => ({ path: `/portfolio/${p.slug}`, changefreq: 'monthly' as const, priority: 0.6 })),
  ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, changefreq: 'monthly' as const, priority: 0.6, lastmod: p.updatedAt ?? p.publishedAt })),
  ...toolsList.map((t) => ({ path: `/tools/${t.slug}`, changefreq: 'monthly' as const, priority: 0.75 })),

  { path: '/legal/privacy-policy', changefreq: 'yearly' as const, priority: 0.2 },
  { path: '/legal/terms-and-conditions', changefreq: 'yearly' as const, priority: 0.2 },
  { path: '/legal/cookie-policy', changefreq: 'yearly' as const, priority: 0.2 },
  { path: '/legal/refund-policy', changefreq: 'yearly' as const, priority: 0.2 },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${siteConfig.domain}${e.path}</loc>
    <lastmod>${e.lastmod ?? today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml, 'utf-8');
console.log(`✓ Generated public/sitemap.xml with ${entries.length} URLs.`);
