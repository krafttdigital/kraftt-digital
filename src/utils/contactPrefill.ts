import type { Bundle, Currency, ServiceCategory, ServicePackage } from '@/types';
import { formatPrice } from '@/utils/format';

export function buildContactPrefillPath(category: ServiceCategory, pkg: ServicePackage, currency: Currency) {
  const params = new URLSearchParams({
    service: category.id,
    package: pkg.id,
    currency,
  });

  return `/contact?${params.toString()}`;
}

export function getPackagePrefill(category: ServiceCategory, pkg: ServicePackage, currency: Currency) {
  const budget = formatPrice(pkg.price, currency) ?? 'Available for Indian clients only';
  const billing = pkg.price.billing === 'monthly' ? 'monthly' : pkg.price.billing === 'yearly' ? 'yearly' : 'fixed';
  const inclusions = pkg.includes.slice(0, 4).join(', ');

  return {
    budget,
    timeline: pkg.delivery,
    description: `I'm interested in the "${pkg.name}" ${billing} package for ${category.name}. Budget shown: ${budget}. Preferred timeline: ${pkg.delivery}. Key inclusions: ${inclusions}. Please confirm the exact scope and next steps.`,
    referral: `Services pricing menu - ${category.name} / ${pkg.name}`,
  };
}

export function buildBundleContactPrefillPath(bundle: Bundle, currency: Currency) {
  const params = new URLSearchParams({
    bundle: bundle.slug,
    currency,
  });

  return `/contact?${params.toString()}`;
}

export function getBundlePrefill(bundle: Bundle, currency: Currency) {
  const budget = formatPrice(bundle.price, currency) ?? 'Available for Indian clients only';
  const inclusions = bundle.includes.join(', ');

  return {
    budget,
    timeline: bundle.timeline,
    description: `I'm interested in the "${bundle.name}" bundle. Budget shown: ${budget}. Expected timeline: ${bundle.timeline}. Included services: ${inclusions}. Please confirm the exact scope and next steps.`,
    referral: `Services bundle deal - ${bundle.name}`,
  };
}
