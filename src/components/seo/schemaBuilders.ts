import { siteConfig } from '@/config/siteConfig';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/favicon.svg`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: `+91${siteConfig.contact.phone}`,
    areaServed: siteConfig.areaServed,
    availableLanguage: siteConfig.languages,
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.twitter].filter(Boolean),
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.domain,
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  };
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  offers: { name: string; priceUsd: number | null; priceInr: number | null }[];
}

export function buildServiceSchema({ name, description, path, offers }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url: `${siteConfig.domain}${path}`,
    provider: {
      '@type': 'ProfessionalService',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: siteConfig.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name,
      itemListElement: offers
        .filter((o) => o.priceUsd !== null)
        .map((o) => ({
          '@type': 'Offer',
          name: o.name,
          priceCurrency: 'USD',
          price: o.priceUsd,
          availability: 'https://schema.org/InStock',
        })),
    },
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
}

export function buildArticleSchema({ title, description, path, authorName, publishedAt, updatedAt }: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${siteConfig.domain}${path}`,
    author: { '@type': 'Person', name: authorName },
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.domain}/favicon.svg` } },
  };
}

interface SoftwareAppSchemaInput {
  name: string;
  description: string;
  path: string;
}

export function buildToolSchema({ name, description, path }: SoftwareAppSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${siteConfig.domain}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any (runs in browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
