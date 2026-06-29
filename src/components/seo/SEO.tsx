import { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/services/web-design"
  type?: 'website' | 'article';
  noIndex?: boolean;
  image?: string;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

/**
 * Sets document title, meta description, canonical URL, Open Graph and
 * Twitter card tags for the current route.
 *
 * NOTE on SEO architecture: this app renders metadata client-side. For a
 * production launch where crawlable HTML matters for every route, add a
 * prerendering step (e.g. vite-plugin-prerender, or migrate the route tree
 * to Next.js App Router) so each indexable URL serves real HTML containing
 * these tags server-side. This component is written so that swap is a
 * drop-in: the same title/description/canonical values can be read from
 * each page's static `meta` export during a prerender or SSG build step.
 */
export function SEO({ title, description, path, type = 'website', noIndex = false, image }: SEOProps) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} | ${siteConfig.name}`;
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    const canonicalUrl = `${siteConfig.domain}${path}`;
    setLink('canonical', canonicalUrl);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:site_name', siteConfig.name, 'property');
    if (image) setMeta('og:image', image, 'property');

    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  }, [title, description, path, type, noIndex, image]);

  return null;
}
