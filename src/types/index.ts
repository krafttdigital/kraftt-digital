// ============================================================================
// Kraftt Digital — shared content types
// Keeping these centralised means every data file and component agrees on
// the same shape, and adding a new service/tool/post never requires
// touching a component.
// ============================================================================

export type Currency = 'USD' | 'INR';
export type Billing = 'one-time' | 'monthly' | 'yearly';

/** A single priced line item — a package, or an add-on to one. */
export interface Price {
  /** Numeric USD amount. `null` means "not offered to international clients". */
  usd: number | null;
  /** True if `usd` was derived from the fallback INR→USD rate, not supplied directly. */
  usdApprox?: boolean;
  /** Numeric INR amount. */
  inr: number | null;
  /** True if `inr` was derived from the fallback rate, not supplied directly. */
  inrApprox?: boolean;
  billing: Billing;
}

export interface AddOn {
  label: string;
  price: Price;
}

export interface ServicePackage {
  id: string;
  name: string;
  /** Display badge, e.g. "Most popular" */
  badge: 'Entry level' | 'Most popular' | 'Premium';
  featured: boolean;
  price: Price;
  includes: string[];
  addons: AddOn[];
  /** e.g. "6–8 days" or "Ongoing monthly" */
  delivery: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  /** lucide-react icon name */
  icon: string;
  /** One-line category description, used in nav/cards */
  shortSummary: string;
  /** Outcome-led summary for the hero of the service detail page */
  heroSummary: string;
  problemsSolved: string[];
  idealClients: string[];
  deliverables: string[];
  process: { title: string; description: string }[];
  packages: ServicePackage[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: Price;
  includes: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  industry: string;
  projectUrl?: string;
  imageUrl?: string;
  services: string[];
  serviceIds?: string[];
  challenge: string;
  strategy: string;
  solution: string;
  deliverables: string[];
  tools?: string[];
  challenges?: string[];
  highlights?: string[];
  integrations?: string[];
  metrics?: { value: string; label: string }[];
  gallery?: { title: string; description: string; label?: string; imageUrl?: string; mobileImageUrl?: string }[];
  timeline: string;
  results?: string;
  testimonial?: string;
  heroImageAlt: string;
  featured: boolean;
  isPlaceholder: boolean;
}

export interface Author {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  imageAlt?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  contentHtml: string;
  relatedSlugs: string[];
  relatedToolSlugs: string[];
}

export interface ToolMeta {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  icon: string;
  relatedToolSlugs: string[];
  relatedServiceSlug?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
