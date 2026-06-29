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

function resolveAbsoluteUrl(url: string) {
  return new URL(url, siteConfig.domain).toString();
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
    const robots = noIndex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const canonicalUrl = resolveAbsoluteUrl(path);
    const socialImage = resolveAbsoluteUrl(image ?? siteConfig.assets.socialImage);

    document.title = fullTitle;

    setMeta('title', fullTitle);
    setMeta('description', description);
    setMeta('robots', robots);
    setLink('canonical', canonicalUrl);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:site_name', siteConfig.name, 'property');
    setMeta('og:image', socialImage, 'property');
    setMeta('og:image:secure_url', socialImage, 'property');
    setMeta('og:image:alt', `${siteConfig.name} brand preview`, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', socialImage);
    setMeta('twitter:image:alt', `${siteConfig.name} brand preview`);
  }, [title, description, path, type, noIndex, image]);

  return null;
}
