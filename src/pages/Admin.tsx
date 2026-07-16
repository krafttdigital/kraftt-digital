import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { SEO } from '@/components/seo/SEO';
import { siteConfig } from '@/config/siteConfig';
import { bundles } from '@/data/bundles';
import { serviceCategories } from '@/data/services';
import { formatPrice } from '@/utils/format';
import signatureImage from '@/assets/Signature.png';

type AdminDocumentId = 'agreement' | 'invoice' | 'welcome' | 'guide' | 'fulfillment' | 'report';
type AdminServiceId = string;
type AdminServiceProfile = {
  title: string;
  overview: string;
  sections: { title: string; body: string[] }[];
  deliverables: string[];
};

interface AdminClientData {
  clientName: string;
  companyName: string;
  clientEmail: string;
  clientPhone: string;
  city: string;
  address: string;
  serviceName: string;
  projectName: string;
  projectScope: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: 'INR' | 'USD';
  taxMode: 'percentage' | 'inclusive';
  servicePrice: string;
  taxRate: string;
  paymentMethod: string;
  paymentDetails: string;
  paymentQrText: string;
  communicationChannel: string;
  startDate: string;
  monthlyVisitors: string;
  uniqueVisitors: string;
  topPages: string;
  directTraffic: string;
  searchTraffic: string;
  socialTraffic: string;
  averageSession: string;
  bounceRate: string;
  conversionRate: string;
  monthlyUpdates: string;
  selectedServices: AdminServiceId[];
  packageSelections: Record<string, string>;
}

interface AdminDocument {
  id: AdminDocumentId;
  title: string;
  eyebrow: string;
  description: string;
}

const storageKey = 'kraftt-admin-doc-builder';
const authStorageKey = 'kraftt-admin-session';
const adminPassword = 'Kraftt@2026';
const adminUsers = ['ketan@kraftt.com', 'amisha@kraftt.com'];

const documents: AdminDocument[] = [
  { id: 'agreement', title: 'Client Agreement', eyebrow: 'Agreement', description: 'Working terms, payment commitment, approvals and project responsibility.' },
  { id: 'invoice', title: 'Invoice', eyebrow: 'Billing', description: 'Service table, totals, payment instructions, QR code and 7-day clearance note.' },
  { id: 'welcome', title: 'Welcome Letter', eyebrow: 'Onboarding', description: 'Client experience, responsibilities, next steps and communication rhythm.' },
  { id: 'guide', title: 'Website / Service Guide', eyebrow: 'Guide', description: 'Usage, maintenance and management guidance tailored to the selected service.' },
  { id: 'fulfillment', title: 'Fulfillment', eyebrow: 'Delivery', description: 'Final deliverables, handover checklist, access items and completion record.' },
  { id: 'report', title: 'Monthly Report', eyebrow: 'Reporting', description: 'Traffic, source, behavior and improvement summary for monthly retainers.' },
];

const coreServiceOptions = [
  { id: 'website', label: 'Website Design & Development' },
  { id: 'shopify', label: 'Shopify Store Development' },
  { id: 'seo', label: 'SEO / AEO / GEO' },
  { id: 'branding', label: 'Brand Identity' },
  { id: 'content', label: 'Content & Copywriting' },
  { id: 'dashboard', label: 'Dashboard / Internal Tool' },
  { id: 'ai', label: 'AI-Powered Creative' },
  { id: 'social', label: 'Social Media Management' },
].map((item) => ({ ...item, group: 'Services' as const }));

const bundleServiceOptions = bundles.map((bundle) => ({
  id: `bundle:${bundle.slug}`,
  label: `Bundle - ${bundle.name}`,
  group: 'Bundles' as const,
}));

const serviceOptions = [...coreServiceOptions, ...bundleServiceOptions];

const adminServiceCategoryIds: Record<string, string> = {
  website: 'web',
  shopify: 'shopify',
  seo: 'ecomseo',
  branding: 'brand',
  content: 'content',
  dashboard: 'dashboard',
  ai: 'ai',
  social: 'social',
};

const today = new Date().toISOString().slice(0, 10);
const dueDateDefault = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const defaultData: AdminClientData = {
  clientName: 'Client Name',
  companyName: 'Business Name',
  clientEmail: 'client@example.com',
  clientPhone: '+91 00000 00000',
  city: 'City',
  address: 'Client address, city, state',
  serviceName: 'Website Design & Development',
  projectName: 'Business Website Build',
  projectScope: 'Design, development, responsive pages, contact flow, basic SEO, JSON-LD, analytics setup and launch support.',
  invoiceNumber: `KD-${new Date().getFullYear()}-001`,
  invoiceDate: today,
  dueDate: dueDateDefault,
  currency: 'INR',
  taxMode: 'percentage',
  servicePrice: '25000',
  taxRate: '0',
  paymentMethod: 'UPI / bank transfer',
  paymentDetails: 'UPI ID: add-your-upi@bank\nAccount name: Kraftt Digital\nBank details: add account details before sending.',
  paymentQrText: 'upi://pay?pa=add-your-upi@bank&pn=Kraftt%20Digital',
  communicationChannel: 'Email and WhatsApp',
  startDate: today,
  monthlyVisitors: '17334',
  uniqueVisitors: '14652',
  topPages: 'Home, Services, Contact',
  directTraffic: '2330',
  searchTraffic: '5402',
  socialTraffic: '9299',
  averageSession: '4.30 min',
  bounceRate: '17%',
  conversionRate: '5.3%',
  monthlyUpdates:
    'This month, improvements were made to loading speed, responsive sections, contact paths, SEO foundations, tracking checks and content clarity.',
  selectedServices: ['website'],
  packageSelections: {
    website: 'web-business',
  },
};

const serviceGuides: Record<string, AdminServiceProfile> = {
  website: {
    title: 'Website Guide',
    overview: 'Your website has been built to be fast, responsive, easy to understand and ready to support enquiries.',
    sections: [
      { title: 'Maintenance', body: ['Keep plugins, integrations and scripts reviewed regularly.', 'Monitor forms, speed, analytics and important landing pages.', 'Request developer support before major structure or design changes.'] },
      { title: 'Content Management', body: ['Update text, images, blog posts and page content when business information changes.', 'Keep service details, pricing and contact information accurate.', 'Avoid uploading oversized images without compression.'] },
      { title: 'SEO Care', body: ['Keep page titles and descriptions aligned with real services.', 'Review Google Search Console monthly for indexing issues.', 'Add structured content as new services or pages are published.'] },
    ],
    deliverables: ['Responsive website pages', 'Contact form or enquiry path', 'SEO meta setup', 'JSON-LD basics', 'Analytics/Search Console setup', 'Launch QA checklist'],
  },
  shopify: {
    title: 'Shopify Store Guide',
    overview: 'Your Shopify store has been prepared for product browsing, checkout clarity and easier product management.',
    sections: [
      { title: 'Store Operations', body: ['Review products, pricing, inventory and delivery information before promotions.', 'Keep collection names and product descriptions clean and searchable.', 'Test checkout and payment flows after changing apps or shipping settings.'] },
      { title: 'Product Content', body: ['Use sharp product images and consistent naming.', 'Keep variants, size guides, FAQs and return notes updated.', 'Avoid duplicate titles and thin descriptions.'] },
      { title: 'Growth Care', body: ['Review search terms, abandoned checkout data and top products.', 'Improve product pages before increasing paid traffic.', 'Keep seasonal banners and homepage sections fresh.'] },
    ],
    deliverables: ['Shopify theme setup', 'Product/collection structure', 'Store pages', 'WhatsApp or contact flow', 'SEO basics', 'Launch QA checklist'],
  },
  seo: {
    title: 'SEO / AEO Guide',
    overview: 'Your SEO work is structured to improve search readiness, technical clarity and content discoverability.',
    sections: [
      { title: 'Search Monitoring', body: ['Review Google Search Console every month.', 'Watch impressions, clicks, page indexing and query movement.', 'Fix crawl or indexing errors before adding more content.'] },
      { title: 'Content Updates', body: ['Publish useful pages and articles around real customer questions.', 'Keep headings, schema and internal links aligned.', 'Avoid keyword stuffing or duplicate pages.'] },
      { title: 'Technical Care', body: ['Keep site speed, mobile experience and structured data healthy.', 'Check redirects and broken links after major changes.', 'Review Core Web Vitals before big campaigns.'] },
    ],
    deliverables: ['SEO audit', 'Metadata updates', 'Search Console setup', 'JSON-LD recommendations', 'Content priorities', 'Monthly improvement notes'],
  },
  branding: {
    title: 'Branding Guide',
    overview: 'Your brand identity has been prepared to keep your visual presence consistent, premium and easier to apply across channels.',
    sections: [
      { title: 'Logo Usage', body: ['Use approved logo files only.', 'Keep clear space around the logo.', 'Avoid stretching, recolouring or adding effects unless included in the brand system.'] },
      { title: 'Visual System', body: ['Use the approved colours, typography and spacing rules consistently.', 'Keep social, website and print assets aligned.', 'Avoid mixing unrelated design styles with the final identity.'] },
      { title: 'Brand Rollout', body: ['Update profile images, website headers, documents and key customer touchpoints.', 'Keep product/service descriptions aligned with the new positioning.', 'Request new assets when entering a new format or campaign.'] },
    ],
    deliverables: ['Primary logo', 'Secondary logo or submark', 'Colour palette', 'Typography direction', 'Brand usage notes', 'Exported asset files'],
  },
  content: {
    title: 'Content Guide',
    overview: 'Your content has been shaped for clarity, search readiness and stronger conversion across the selected touchpoints.',
    sections: [
      { title: 'Voice & Messaging', body: ['Keep language clear, specific and customer-focused.', 'Use the approved claims and value propositions consistently.', 'Avoid vague filler copy or unsupported promises.'] },
      { title: 'Publishing', body: ['Review content before publishing for accuracy.', 'Keep service details, pricing and timelines updated.', 'Use headings and internal links to make content easier to scan.'] },
      { title: 'Optimization', body: ['Refresh pages when offers or audience priorities change.', 'Watch engagement and enquiry quality after publishing.', 'Keep SEO/AEO answers concise and factual.'] },
    ],
    deliverables: ['Website copy', 'Landing page sections', 'Product/service descriptions', 'Email or ad copy where scoped', 'SEO-ready headings', 'Content handover notes'],
  },
  dashboard: {
    title: 'Dashboard Guide',
    overview: 'Your dashboard or internal tool has been prepared to reduce manual work and make daily operations easier to manage.',
    sections: [
      { title: 'Access & Roles', body: ['Keep login access limited to responsible team members.', 'Remove access for users who no longer need it.', 'Use strong passwords and update shared credentials after handover.'] },
      { title: 'Data Hygiene', body: ['Enter clean, complete and consistent data.', 'Avoid duplicate records where possible.', 'Export or back up important operational data regularly.'] },
      { title: 'Operations', body: ['Document how your team should use each core workflow.', 'Report bugs with screenshots and steps to reproduce.', 'Request support before changing core logic or integrations.'] },
    ],
    deliverables: ['Admin interface', 'Core workflow screens', 'Forms and records', 'Role/access notes', 'QA checklist', 'Handover guidance'],
  },
  ai: {
    title: 'AI Creative Guide',
    overview: 'Your AI-supported creative assets have been prepared for campaign use, testing and iteration across selected channels.',
    sections: [
      { title: 'Asset Usage', body: ['Use final approved assets in the intended format.', 'Keep source prompts, references and final exports organized.', 'Do not over-edit final assets without checking brand consistency.'] },
      { title: 'Campaign Care', body: ['Test creatives in small batches before scaling.', 'Track which visuals and messages produce useful responses.', 'Refresh assets when audience fatigue appears.'] },
      { title: 'Quality Control', body: ['Review text, hands, product details and brand marks before publishing.', 'Keep claims factual.', 'Avoid using AI outputs as legal, medical or financial claims.'] },
    ],
    deliverables: ['Creative concepts', 'AI-assisted visuals', 'Caption/ad variants', 'Exported assets', 'Usage recommendations', 'Iteration notes'],
  },
  social: {
    title: 'Social Media Guide',
    overview: 'Your social media setup or content plan has been structured for consistency, engagement and easier publishing.',
    sections: [
      { title: 'Publishing Rhythm', body: ['Follow the agreed posting frequency.', 'Keep captions, creatives and hashtags aligned with the brand.', 'Review posts before publishing for accuracy and tone.'] },
      { title: 'Community', body: ['Respond to useful comments and enquiries quickly.', 'Escalate sales or support conversations to the right channel.', 'Do not ignore repeated customer questions.'] },
      { title: 'Performance', body: ['Review saves, shares, reach, profile visits and enquiries.', 'Repeat formats that produce meaningful engagement.', 'Improve weak posts instead of only increasing volume.'] },
    ],
    deliverables: ['Content calendar', 'Post creatives', 'Caption set', 'Hashtag/format guidance', 'Publishing notes', 'Monthly report structure'],
  },
  default: {
    title: 'Service Guide',
    overview: 'Your service has been delivered with clear scope, practical usage guidance and handover support.',
    sections: [
      { title: 'Usage', body: ['Use the delivered assets and systems according to the agreed project scope.', 'Keep shared access, files and credentials organized.', 'Ask before making structural changes that may affect performance or accuracy.'] },
      { title: 'Maintenance', body: ['Review the project monthly for outdated information, broken links or missing assets.', 'Keep communication details and service information accurate.', 'Request support for changes beyond the included handover scope.'] },
      { title: 'Growth', body: ['Track real user behavior and improve from evidence.', 'Prioritize updates that remove friction for customers.', 'Keep brand, content and conversion paths consistent.'] },
    ],
    deliverables: ['Final files or live setup', 'Basic QA pass', 'Handover notes', 'Usage guidance', 'Support recommendations', 'Next-step checklist'],
  },
};

function getStoredData(): AdminClientData {
  if (typeof window === 'undefined') return defaultData;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return defaultData;
    const parsed = JSON.parse(stored) as Partial<AdminClientData>;
    return {
      ...defaultData,
      ...parsed,
      selectedServices: parsed.selectedServices?.length ? parsed.selectedServices : defaultData.selectedServices,
      packageSelections: {
        ...defaultData.packageSelections,
        ...(parsed.packageSelections ?? {}),
      },
    };
  } catch {
    return defaultData;
  }
}

function getStoredSession() {
  if (typeof window === 'undefined') return null;

  try {
    const email = window.localStorage.getItem(authStorageKey);
    return email && adminUsers.includes(email) ? email : null;
  } catch {
    return null;
  }
}

function getServiceGuide(serviceName: string) {
  const normalized = serviceName.toLowerCase();
  const bundle = bundles.find((item) => normalized.includes(item.name.toLowerCase()));
  if (bundle) return getBundleProfile(bundle.slug);
  if (normalized.includes('shopify') || normalized.includes('store')) return serviceGuides.shopify;
  if (normalized.includes('seo') || normalized.includes('search')) return serviceGuides.seo;
  if (normalized.includes('brand')) return serviceGuides.branding;
  if (normalized.includes('content') || normalized.includes('copy')) return serviceGuides.content;
  if (normalized.includes('dashboard') || normalized.includes('internal')) return serviceGuides.dashboard;
  if (normalized.includes('ai') || normalized.includes('creative')) return serviceGuides.ai;
  if (normalized.includes('social')) return serviceGuides.social;
  if (normalized.includes('web') || normalized.includes('website') || normalized.includes('development')) return serviceGuides.website;
  return serviceGuides.default;
}

function getCategoryForAdminService(serviceId: string) {
  const categoryId = adminServiceCategoryIds[serviceId];
  return serviceCategories.find((category) => category.id === categoryId) ?? null;
}

function getDefaultPackageId(serviceId: string) {
  const category = getCategoryForAdminService(serviceId);
  return category?.packages.find((pkg) => pkg.featured)?.id ?? category?.packages[0]?.id ?? '';
}

function getSelectedPackage(serviceId: string, packageSelections: AdminClientData['packageSelections']) {
  const category = getCategoryForAdminService(serviceId);
  if (!category) return null;
  const packageId = packageSelections[serviceId] || getDefaultPackageId(serviceId);
  return category.packages.find((pkg) => pkg.id === packageId) ?? category.packages[0] ?? null;
}

function getPackageProfile(serviceId: string, packageSelections: AdminClientData['packageSelections'], currency: AdminClientData['currency']): AdminServiceProfile {
  const baseProfile = serviceGuides[serviceId] ?? serviceGuides.default;
  const category = getCategoryForAdminService(serviceId);
  const pkg = getSelectedPackage(serviceId, packageSelections);

  if (!category || !pkg) return baseProfile;

  const priceLabel = formatPrice(pkg.price, currency) ?? 'Custom quote';
  const addonLabels = pkg.addons.map((addon) => {
    const addonPrice = formatPrice(addon.price, currency);
    return addonPrice ? `${addon.label} (+${addonPrice})` : addon.label;
  });

  return {
    title: `${category.name} - ${pkg.name} Guide`,
    overview: `${category.name} is scoped under the ${pkg.name} package (${pkg.badge}). The package investment is ${priceLabel}${pkg.price.billing === 'monthly' ? ' per month' : ''}.`,
    sections: [
      { title: 'Selected Package', body: [`Package: ${pkg.name}`, `Category: ${category.name}`, `Investment: ${priceLabel}${pkg.price.billing === 'monthly' ? ' per month' : ''}`] },
      { title: 'Included Scope', body: pkg.includes },
      ...baseProfile.sections,
      ...(addonLabels.length ? [{ title: 'Available Add-ons', body: addonLabels }] : []),
    ],
    deliverables: [
      `${category.name} - ${pkg.name}`,
      ...pkg.includes,
      ...baseProfile.deliverables,
    ],
  };
}

function getBundleProfile(slug: string): AdminServiceProfile {
  const bundle = bundles.find((item) => item.slug === slug);
  if (!bundle) return serviceGuides.default;

  return {
    title: `${bundle.name} Guide`,
    overview: bundle.heroSummary,
    sections: [
      { title: 'Best Fit', body: bundle.bestFor },
      { title: 'Business Outcomes', body: bundle.outcomes },
      { title: 'Delivery Rhythm', body: bundle.process.map((step) => `${step.title}: ${step.description}`) },
    ],
    deliverables: [
      ...bundle.includes,
      ...bundle.outcomes,
      `Delivery timeline: ${bundle.timeline}`,
      'Final handover notes and next-step recommendations',
    ],
  };
}

function getSelectedServiceProfiles(selectedServices: AdminServiceId[], packageSelections: AdminClientData['packageSelections'], currency: AdminClientData['currency']) {
  const ids = selectedServices.length ? selectedServices : defaultData.selectedServices;
  return ids.map((id) => (id.startsWith('bundle:') ? getBundleProfile(id.replace('bundle:', '')) : getPackageProfile(id, packageSelections, currency))).filter(Boolean);
}

function getSelectedServiceLabel(selectedServices: AdminServiceId[]) {
  const selected = serviceOptions.filter((service) => selectedServices.includes(service.id));
  if (selected.length === 0) return 'Service';
  if (selected.length === 1) return selected[0].label;
  return `${selected.length} selected services`;
}

function getScopeItems(client: AdminClientData) {
  return client.selectedServices.flatMap((serviceId) => {
    if (serviceId.startsWith('bundle:')) {
      const bundle = bundles.find((item) => item.slug === serviceId.replace('bundle:', ''));
      return bundle ? [`${bundle.name}: ${bundle.includes.join(', ')}`] : [];
    }

    const category = getCategoryForAdminService(serviceId);
    const pkg = getSelectedPackage(serviceId, client.packageSelections);
    return category && pkg ? [`${category.name} (${pkg.name}): ${pkg.includes.join(', ')}`] : [];
  });
}

function buildAdminSuggestions(client: AdminClientData) {
  const selected = serviceOptions.filter((service) => client.selectedServices.includes(service.id));
  const firstServiceId = client.selectedServices[0] ?? defaultData.selectedServices[0];
  const firstOption = selected[0];
  const firstPackage = firstServiceId.startsWith('bundle:') ? null : getSelectedPackage(firstServiceId, client.packageSelections);
  const firstBundle = firstServiceId.startsWith('bundle:') ? bundles.find((bundle) => bundle.slug === firstServiceId.replace('bundle:', '')) : null;
  const companyName = client.companyName.trim() || 'Client Business';
  const clientName = client.clientName.trim() || 'Client';
  const serviceName =
    selected.length === 1 && firstBundle
      ? firstBundle.name
      : selected.length === 1 && firstOption && firstPackage
        ? `${firstOption.label} - ${firstPackage.name}`
        : selected.length === 1 && firstOption
          ? firstOption.label
          : `Digital Authority Scope - ${selected.length || 1} services`;
  const projectName = `${companyName} - ${firstBundle ? firstBundle.name : selected.length > 1 ? 'Digital Authority System' : firstOption?.label ?? 'Digital Project'}`;
  const scopeItems = getScopeItems(client);
  const projectScope = `Prepared for ${clientName} at ${companyName}. Scope includes ${scopeItems.length ? scopeItems.join('; ') : serviceName}. Kraftt Digital will align the work for clarity, conversion, handover and India-ready business use.`;
  const suggestedPrice = client.selectedServices.reduce((sum, serviceId) => {
    if (serviceId.startsWith('bundle:')) {
      const bundle = bundles.find((item) => item.slug === serviceId.replace('bundle:', ''));
      const amount = client.currency === 'USD' ? bundle?.price.usd : bundle?.price.inr;
      return sum + (amount ?? 0);
    }

    const pkg = getSelectedPackage(serviceId, client.packageSelections);
    const amount = client.currency === 'USD' ? pkg?.price.usd : pkg?.price.inr;
    return sum + (amount ?? 0);
  }, 0);

  return {
    serviceName,
    projectName,
    projectScope,
    servicePrice: suggestedPrice ? String(suggestedPrice) : client.servicePrice,
  };
}

function formatMoney(value: number, currency: AdminClientData['currency']) {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function parseAmount(value: string) {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function qrUrl(data: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=12&data=${encodeURIComponent(data)}`;
}


const adminPrintStyles = `
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: #F2EFE9 !important;
      overflow: visible !important;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .admin-no-print,
    .admin-no-print * {
      display: none !important;
    }

    .kd-hero-grid {
      display: none !important;
    }

    section {
      margin: 0 !important;
      padding: 0 !important;
      background: #F2EFE9 !important;
      overflow: visible !important;
    }

    .container-kd {
      width: auto !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .kd-admin-document {
      width: 210mm !important;
      min-height: 297mm !important;
      max-width: 210mm !important;
      margin: 0 !important;
      border: 0 !important;
      box-shadow: none !important;
      overflow: visible !important;
      page-break-after: always !important;
      break-after: page !important;
    }

    .kd-admin-document:last-child {
      page-break-after: auto !important;
      break-after: auto !important;
    }

    .kd-admin-document .doc-section,
    .kd-admin-document .doc-card,
    .kd-admin-document .doc-signature {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
  }
`;

export default function Admin() {
  const [client, setClient] = useState<AdminClientData>(getStoredData);
  const [activeDoc, setActiveDoc] = useState<AdminDocumentId>('agreement');
  const [sessionEmail, setSessionEmail] = useState<string | null>(getStoredSession);
  const [loginEmail, setLoginEmail] = useState('ketan@kraftt.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const selectedDocument = documents.find((item) => item.id === activeDoc) ?? documents[0];
  const invoiceAmount = parseAmount(client.servicePrice);
  const taxRate = parseAmount(client.taxRate);
  const tax = client.taxMode === 'inclusive' ? invoiceAmount - invoiceAmount / (1 + taxRate / 100 || 1) : invoiceAmount * (taxRate / 100);
  const subtotal = client.taxMode === 'inclusive' ? invoiceAmount - tax : invoiceAmount;
  const total = client.taxMode === 'inclusive' ? invoiceAmount : subtotal + tax;
  const selectedProfiles = useMemo(
    () => getSelectedServiceProfiles(client.selectedServices, client.packageSelections, client.currency),
    [client.selectedServices, client.packageSelections, client.currency],
  );
  const guide = useMemo(() => selectedProfiles[0] ?? getServiceGuide(client.serviceName), [client.serviceName, selectedProfiles]);
  const selectedServiceLabel = getSelectedServiceLabel(client.selectedServices);
  const fieldSuggestions = useMemo(() => buildAdminSuggestions(client), [client]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(client));
  }, [client]);

  function update<K extends keyof AdminClientData>(key: K, value: AdminClientData[K]) {
    setClient((current) => ({ ...current, [key]: value }));
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = loginEmail.trim().toLowerCase();
    if (!adminUsers.includes(normalizedEmail) || loginPassword !== adminPassword) {
      setLoginError('Invalid admin email or password.');
      return;
    }

    window.localStorage.setItem(authStorageKey, normalizedEmail);
    setSessionEmail(normalizedEmail);
    setLoginPassword('');
    setLoginError('');
  }

  function logout() {
    window.localStorage.removeItem(authStorageKey);
    setSessionEmail(null);
  }

  function toggleService(serviceId: AdminServiceId) {
    setClient((current) => {
      const exists = current.selectedServices.includes(serviceId);
      const selectedServices = exists ? current.selectedServices.filter((item) => item !== serviceId) : [...current.selectedServices, serviceId];
      const packageSelections = { ...current.packageSelections };
      if (exists) {
        delete packageSelections[serviceId];
      } else if (!serviceId.startsWith('bundle:')) {
        packageSelections[serviceId] = packageSelections[serviceId] || getDefaultPackageId(serviceId);
      }
      return { ...current, selectedServices: selectedServices.length ? selectedServices : [serviceId], packageSelections };
    });
  }

  function updatePackageSelection(serviceId: AdminServiceId, packageId: string) {
    setClient((current) => ({
      ...current,
      packageSelections: {
        ...current.packageSelections,
        [serviceId]: packageId,
      },
    }));
  }

  function applySuggestedFields() {
    setClient((current) => {
      const suggestions = buildAdminSuggestions(current);
      return {
        ...current,
        serviceName: suggestions.serviceName,
        projectName: suggestions.projectName,
        projectScope: suggestions.projectScope,
        servicePrice: suggestions.servicePrice,
      };
    });
  }

  function printDocument(docId: AdminDocumentId) {
    setActiveDoc(docId);
    window.setTimeout(() => window.print(), 120);
  }

  function resetDemo() {
    setClient(defaultData);
    setActiveDoc('agreement');
  }

  if (!sessionEmail) {
    return (
      <>
        <SEO title="Admin Login" description="Kraftt Digital admin login." path="/admin" noIndex />
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-parchment)] px-5 py-20 text-[var(--color-midnight)]">
          <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
          <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/92 p-6 shadow-[0_28px_90px_rgba(13,13,13,0.1)] backdrop-blur">
            <p className="eyebrow mb-3">Private admin</p>
            <h1 className="font-display text-[38px] leading-none text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
              Kraftt document desk.
            </h1>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Client-side login for internal document creation. Use hosting protection for production-level access control.
            </p>
            <div className="mt-6 space-y-4">
              <AdminField label="Email" type="email" value={loginEmail} onChange={setLoginEmail} />
              <AdminField label="Password" type="password" value={loginPassword} onChange={setLoginPassword} />
            </div>
            {loginError && <p className="mt-4 rounded-[var(--radius-button)] border border-[var(--color-error)]/25 bg-[var(--color-error)]/10 px-3 py-2 font-sans text-xs text-[var(--color-error)]">{loginError}</p>}
            <button type="submit" className="mt-6 w-full rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-umber)]">
              Enter admin
            </button>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title="Admin Document Builder" description="Internal Kraftt Digital document builder for client documents." path="/admin" noIndex />
      <style>{adminPrintStyles}</style>
      <section className="relative overflow-hidden bg-[var(--color-parchment)] pt-[112px] pb-16 text-[var(--color-midnight)]">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <div className="admin-no-print mb-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow mb-3">Private workspace</p>
              <h1 className="max-w-3xl font-display text-[36px] leading-[1.05] md:text-[58px]" style={{ fontWeight: 300 }}>
                Kraftt client document builder.
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Fill client and project details once. Agreement, invoice, welcome letter, guide, fulfillment and monthly report update instantly.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/82 p-4 font-sans text-xs leading-relaxed text-[var(--color-text-secondary)] shadow-[0_18px_60px_rgba(13,13,13,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <span>Signed in as {sessionEmail}</span>
                <button type="button" onClick={logout} className="rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-3 py-1.5 text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
                  Logout
                </button>
              </div>
              <p className="mt-3">No backend is used. Data is saved only in this browser's localStorage. Use the print button and choose "Save as PDF" for a clean document export.</p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
            <aside className="admin-no-print space-y-4 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/90 p-4 shadow-[0_24px_80px_rgba(13,13,13,0.08)] backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Client inputs</p>
                  <p className="mt-1 font-sans text-xs text-[var(--color-text-muted)]">Auto-saved locally</p>
                </div>
                <button
                  type="button"
                  onClick={resetDemo}
                  className="rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-3 py-2 font-sans text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
                >
                  Reset
                </button>
              </div>

              <AdminField label="Client name" value={client.clientName} onChange={(value) => update('clientName', value)} />
              <AdminField label="Company name" value={client.companyName} onChange={(value) => update('companyName', value)} />
              <AdminField label="Email" type="email" value={client.clientEmail} onChange={(value) => update('clientEmail', value)} />
              <AdminField label="Phone" value={client.clientPhone} onChange={(value) => update('clientPhone', value)} />
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="City" value={client.city} onChange={(value) => update('city', value)} />
                <AdminField label="Start date" type="date" value={client.startDate} onChange={(value) => update('startDate', value)} />
              </div>
              <AdminTextarea label="Address" value={client.address} onChange={(value) => update('address', value)} rows={2} />
              <AdminField label="Invoice service name" value={client.serviceName} onChange={(value) => update('serviceName', value)} />
              <div>
                <p className="mb-2 font-sans text-[11px] font-medium text-[var(--color-text-muted)]">Services included in guide / fulfillment</p>
                <div className="space-y-3">
                  {(['Services', 'Bundles'] as const).map((group) => (
                    <div key={group} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/60 p-2.5">
                      <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">{group}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {serviceOptions
                          .filter((service) => service.group === group)
                          .map((service) => {
                            const checked = client.selectedServices.includes(service.id);
                            return (
                              <label
                                key={service.id}
                                className={`flex cursor-pointer items-center gap-2 rounded-[var(--radius-button)] border px-3 py-2 font-sans text-xs transition-colors ${
                                  checked
                                    ? 'border-[var(--color-umber)] bg-[var(--color-umber)]/12 text-[var(--color-midnight)]'
                                    : 'border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-umber)]'
                                }`}
                              >
                                <input type="checkbox" checked={checked} onChange={() => toggleService(service.id)} className="h-3.5 w-3.5 accent-[var(--color-umber)]" />
                                {service.label}
                              </label>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {client.selectedServices.some((serviceId) => !serviceId.startsWith('bundle:') && getCategoryForAdminService(serviceId)) && (
                <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/60 p-3">
                  <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">Package taken</p>
                  <div className="space-y-3">
                    {client.selectedServices
                      .filter((serviceId) => !serviceId.startsWith('bundle:'))
                      .map((serviceId) => {
                        const category = getCategoryForAdminService(serviceId);
                        if (!category) return null;
                        return (
                          <label key={serviceId} className="block">
                            <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-text-muted)]">{category.name}</span>
                            <select
                              value={client.packageSelections[serviceId] || getDefaultPackageId(serviceId)}
                              onChange={(event) => updatePackageSelection(serviceId, event.target.value)}
                              className="w-full rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-3 py-2.5 font-sans text-sm text-[var(--color-midnight)] outline-none transition-colors focus:border-[var(--color-umber)]"
                            >
                              {category.packages.map((pkg) => (
                                <option key={pkg.id} value={pkg.id}>
                                  {pkg.name} - {pkg.badge}
                                </option>
                              ))}
                            </select>
                          </label>
                        );
                      })}
                  </div>
                </div>
              )}
              <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-3 shadow-[0_14px_40px_rgba(13,13,13,0.045)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">Smart suggestions</p>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-[var(--color-text-muted)]">Generated from client name, company, selected service, bundle and package.</p>
                  </div>
                  <button
                    type="button"
                    onClick={applySuggestedFields}
                    className="shrink-0 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-3 py-2 font-sans text-[11px] font-medium text-[var(--color-parchment)] hover:bg-[var(--color-umber)]"
                  >
                    Apply
                  </button>
                </div>
                <div className="mt-3 space-y-2 font-sans text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  <p><span className="font-semibold text-[var(--color-midnight)]">Invoice:</span> {fieldSuggestions.serviceName}</p>
                  <p><span className="font-semibold text-[var(--color-midnight)]">Project:</span> {fieldSuggestions.projectName}</p>
                </div>
              </div>
              <AdminField label="Project name" value={client.projectName} onChange={(value) => update('projectName', value)} />
              <AdminTextarea label="Scope summary" value={client.projectScope} onChange={(value) => update('projectScope', value)} rows={3} />

              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Invoice no." value={client.invoiceNumber} onChange={(value) => update('invoiceNumber', value)} />
                <AdminField label="Invoice date" type="date" value={client.invoiceDate} onChange={(value) => update('invoiceDate', value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdminSelect label="Currency" value={client.currency} onChange={(value) => update('currency', value as AdminClientData['currency'])} options={['INR', 'USD']} />
                <AdminSelect label="Tax mode" value={client.taxMode} onChange={(value) => update('taxMode', value as AdminClientData['taxMode'])} options={['percentage', 'inclusive']} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Price" inputMode="numeric" value={client.servicePrice} onChange={(value) => update('servicePrice', value)} />
                <AdminField label="Tax %" inputMode="numeric" value={client.taxRate} onChange={(value) => update('taxRate', value)} />
              </div>
              <AdminField label="Due date" type="date" value={client.dueDate} onChange={(value) => update('dueDate', value)} />
              <AdminField label="Payment method" value={client.paymentMethod} onChange={(value) => update('paymentMethod', value)} />
              <AdminTextarea label="Payment details" value={client.paymentDetails} onChange={(value) => update('paymentDetails', value)} rows={3} />
              <AdminTextarea label="QR code payment text / UPI link" value={client.paymentQrText} onChange={(value) => update('paymentQrText', value)} rows={2} />

              <details className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/50 p-3">
                <summary className="cursor-pointer font-sans text-sm text-[var(--color-midnight)]">Monthly report fields</summary>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <AdminField label="Visitors" value={client.monthlyVisitors} onChange={(value) => update('monthlyVisitors', value)} />
                  <AdminField label="Unique" value={client.uniqueVisitors} onChange={(value) => update('uniqueVisitors', value)} />
                  <AdminField label="Direct" value={client.directTraffic} onChange={(value) => update('directTraffic', value)} />
                  <AdminField label="Google / SEO" value={client.searchTraffic} onChange={(value) => update('searchTraffic', value)} />
                  <AdminField label="Social" value={client.socialTraffic} onChange={(value) => update('socialTraffic', value)} />
                  <AdminField label="Avg session" value={client.averageSession} onChange={(value) => update('averageSession', value)} />
                  <AdminField label="Bounce" value={client.bounceRate} onChange={(value) => update('bounceRate', value)} />
                  <AdminField label="Conversion" value={client.conversionRate} onChange={(value) => update('conversionRate', value)} />
                </div>
                <AdminTextarea label="Top pages" value={client.topPages} onChange={(value) => update('topPages', value)} rows={2} />
                <AdminTextarea label="Updates" value={client.monthlyUpdates} onChange={(value) => update('monthlyUpdates', value)} rows={3} />
              </details>
            </aside>

            <div className="min-w-0">
              <div className="admin-no-print mb-4 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/90 p-3 shadow-[0_18px_60px_rgba(13,13,13,0.07)] backdrop-blur">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="eyebrow">{selectedDocument.eyebrow}</p>
                    <p className="mt-1 font-sans text-sm text-[var(--color-text-secondary)]">
                      {selectedDocument.description} Active scope: {selectedServiceLabel}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => printDocument(activeDoc)}
                    className="rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-2.5 font-sans text-xs font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-umber)]"
                  >
                    Save active as PDF
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
                  {documents.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setActiveDoc(doc.id)}
                      className={`rounded-[var(--radius-button)] border px-3 py-2 text-left font-sans text-[11px] transition-colors ${
                        activeDoc === doc.id
                          ? 'border-[var(--color-midnight)] bg-[var(--color-midnight)] text-[var(--color-parchment)]'
                          : 'border-[var(--color-border-light)] bg-[var(--color-parchment)] text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]'
                      }`}
                    >
                      {doc.title}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
                  {documents.map((doc) => (
                    <button
                      key={`${doc.id}-print`}
                      type="button"
                      onClick={() => printDocument(doc.id)}
                      className="rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
                    >
                      Print {doc.eyebrow}
                    </button>
                  ))}
                </div>
              </div>

              <DocumentPage docId={activeDoc}>
                {activeDoc === 'agreement' && <AgreementDocument client={client} />}
                {activeDoc === 'invoice' && <InvoiceDocument client={client} subtotal={subtotal} tax={tax} total={total} />}
                {activeDoc === 'welcome' && <WelcomeDocument client={client} />}
                {activeDoc === 'guide' && <GuideDocument client={client} guide={guide} profiles={selectedProfiles} />}
                {activeDoc === 'fulfillment' && <FulfillmentDocument client={client} guide={guide} profiles={selectedProfiles} />}
                {activeDoc === 'report' && <MonthlyReportDocument client={client} />}
              </DocumentPage>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AdminField({
  label,
  value,
  onChange,
  type = 'text',
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: 'numeric' | 'text';
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-text-muted)]">{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/75 px-3 py-2.5 font-sans text-sm text-[var(--color-midnight)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/55 focus:border-[var(--color-umber)] focus:bg-[var(--color-bg-secondary)]"
      />
    </label>
  );
}

function AdminSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-text-muted)]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/75 px-3 py-2.5 font-sans text-sm text-[var(--color-midnight)] outline-none transition-colors focus:border-[var(--color-umber)] focus:bg-[var(--color-bg-secondary)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function AdminTextarea({ label, value, onChange, rows }: { label: string; value: string; onChange: (value: string) => void; rows: number }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-text-muted)]">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/75 px-3 py-2.5 font-sans text-sm text-[var(--color-midnight)] outline-none transition-colors placeholder:text-[var(--color-text-muted)]/55 focus:border-[var(--color-umber)] focus:bg-[var(--color-bg-secondary)]"
      />
    </label>
  );
}

function DocumentPage({ children, docId }: { children: ReactNode; docId: AdminDocumentId }) {
  return (
    <article data-doc={docId} className="kd-admin-document mx-auto w-full max-w-[900px] overflow-hidden border border-[#D8CDBB] bg-[#F2EFE9] text-[#0D0D0D] shadow-[0_28px_90px_rgba(13,13,13,0.14)]">
      {children}
    </article>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'text-right' : ''}>
      <p className="font-display text-[28px] leading-none tracking-normal text-[#151515]" style={{ fontWeight: 300 }}>
        Kraftt<span className="text-[var(--color-umber)]">.</span>
      </p>
      <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.42em] text-[#8B6D4A]">Digital</p>
    </div>
  );
}

function DocHeader({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <header className="grid min-h-[190px] grid-cols-[1.22fr_0.78fr] border-b border-[#D8CDBB] bg-[#F7F4EE]">
      <div className="flex items-end p-5 md:p-8">
        <h2 className="font-display text-[48px] leading-[0.9] text-[#0D0D0D] md:text-[74px]" style={{ fontWeight: 300 }}>{title}</h2>
      </div>
      <div className="flex flex-col justify-between border-l border-[#D8CDBB] p-5 md:p-8">
        <BrandMark compact />
        <div className="font-sans text-[10px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#4A4641]">{aside}</div>
      </div>
    </header>
  );
}

function SplitSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="doc-section grid grid-cols-[0.82fr_1.18fr] border-b border-[#D8CDBB]">
      <div className="border-r border-[#D8CDBB] bg-[#F7F4EE]/56 p-5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B7355]">{label}</div>
      <div className="p-5 font-sans text-[12px] leading-relaxed text-[#4A4641]">{children}</div>
    </section>
  );
}

function AgreementDocument({ client }: { client: AdminClientData }) {
  return (
    <>
      <DocHeader
        title="Client Agreement"
        aside={
          <>
            Created by
            <br />
            {siteConfig.name}
          </>
        }
      />
      <div className="border-b border-[#D8CDBB] p-5 md:p-8">
        <p className="max-w-4xl font-sans text-[12px] leading-relaxed text-[#4A4641]">
          This agreement records that {client.clientName} of {client.companyName} accepts the project scope, payment responsibilities and approval process for {client.projectName}. The client confirms that the information shared is accurate, the engagement is genuine, and all approved invoices will be cleared within the agreed timeline.
        </p>
      </div>
      <div className="grid grid-cols-2 border-b border-[#D8CDBB]">
        <InfoBlock title="Prepared for" lines={[client.clientName, client.companyName, client.city]} />
        <InfoBlock title="Project" lines={[client.projectName, client.serviceName, `Start date: ${client.startDate}`]} />
      </div>
      <SplitSection label="Scope">{client.projectScope}</SplitSection>
      <SplitSection label="Payment terms">
        Invoices must be cleared by the due date mentioned on the invoice, and not later than 7 days unless a different written schedule is approved by {siteConfig.name}. Late or failed payments may pause work, launch, support, handover, access transfer or release of final files. Taxes, gateway charges, TDS handling or bank charges, if applicable, must be handled as agreed in writing.
      </SplitSection>
      <SplitSection label="Approvals">
        The client will provide required content, images, brand assets, platform access, credentials and feedback on time. Delays in approvals, access, payments or content from the client side may extend the project timeline without penalty to {siteConfig.name}.
      </SplitSection>
      <SplitSection label="Integrity">
        Both parties agree to work in good faith. Fraudulent chargebacks, false claims, misuse of unpaid work, intentional withholding of access, or continued use of deliverables without clearing approved payments may result in suspension of services and recovery action.
      </SplitSection>
      <SplitSection label="Acceptance">
        By approving this document, paying an invoice, sharing required project material, or asking Kraftt Digital to begin work, the client confirms acceptance of this project agreement and the website terms published at {siteConfig.domain}.
      </SplitSection>
      <SignatureRow left="Client signature" right="Kraftt Digital" />
      <BlackFooter />
    </>
  );
}

function InvoiceDocument({ client, subtotal, tax, total }: { client: AdminClientData; subtotal: number; tax: number; total: number }) {
  return (
    <>
      <DocHeader
        title="Invoice"
        aside={
          <>
            {client.invoiceNumber}
            <br />
            {client.companyName}
            <br />
            {client.serviceName}
          </>
        }
      />
      <div className="grid grid-cols-3 border-b border-[#D8CDBB]">
        <LogoBlock />
        <InfoBlock title="From" lines={[siteConfig.name, siteConfig.contact.email, `+91 ${siteConfig.contact.phone}`, 'Bathinda, Punjab, India']} />
        <InfoBlock title="To" lines={[client.clientName, client.companyName, client.address, client.clientEmail, client.clientPhone]} />
      </div>
      <table className="w-full border-collapse font-sans text-[12px]">
        <thead>
          <tr className="bg-[#0D0D0D] text-[#F2EFE9]">
            <th className="px-5 py-3 text-left uppercase tracking-[0.12em]">Service</th>
            <th className="px-5 py-3 text-left uppercase tracking-[0.12em]">Scope summary</th>
            <th className="px-5 py-3 text-right uppercase tracking-[0.12em]">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#D8CDBB]">
            <td className="px-5 py-6 font-semibold text-[#0D0D0D]">{client.serviceName}</td>
            <td className="px-5 py-6 text-[#4A4641]">{client.projectScope}</td>
            <td className="px-5 py-6 text-right font-bold">{formatMoney(subtotal, client.currency)}</td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-[1fr_320px] border-b border-[#D8CDBB]">
        <div className="p-5">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B7355]">Payment details</p>
          <p className="mt-3 font-display text-[28px] leading-tight text-[#0D0D0D]" style={{ fontWeight: 300 }}>{client.paymentMethod}</p>
          <p className="mt-4 whitespace-pre-line font-sans text-[12px] leading-relaxed text-[#4A4641]">{client.paymentDetails}</p>
          <p className="mt-4 font-sans text-[11px] leading-relaxed text-[#69635D]">Invoice date: {client.invoiceDate} · Due date: {client.dueDate}</p>
        </div>
        <div className="border-l border-[#D8CDBB] p-5">
          <TotalRow label={client.taxMode === 'inclusive' ? 'Base value' : 'Sub total'} value={formatMoney(subtotal, client.currency)} dark />
          <TotalRow label={client.taxMode === 'inclusive' ? `Tax included (${client.taxRate || 0}%)` : `Tax (${client.taxRate || 0}%)`} value={formatMoney(tax, client.currency)} />
          <TotalRow label={client.taxMode === 'inclusive' ? 'Total payable' : 'Total'} value={formatMoney(total, client.currency)} dark />
          <img src={qrUrl(client.paymentQrText)} alt="Payment QR code" className="mt-5 h-36 w-36 border border-[#D8CDBB] bg-white p-2" />
        </div>
      </div>
      <section className="grid grid-cols-[0.9fr_1.1fr]">
        <div className="p-5">
          <h3 className="font-display text-[40px] leading-none text-[#0D0D0D]" style={{ fontWeight: 300 }}>Payment agreement</h3>
        </div>
        <div className="p-5 font-sans text-[12px] leading-relaxed text-[#4A4641]">
          Payment is due by {client.dueDate} unless another written schedule is approved. Work, launch, support, access transfer or final file release may pause if payment is delayed. This invoice is issued for the approved scope; GST, TDS, bank charges or platform charges apply only where agreed and applicable.
        </div>
      </section>
      <BlackFooter />
    </>
  );
}

function WelcomeDocument({ client }: { client: AdminClientData }) {
  return (
    <>
      <DocHeader
        title="Welcome"
        aside={
          <>
            Hey {client.clientName},
            <br />
            Thank you for choosing {siteConfig.name}.
          </>
        }
      />
      <SplitSection label="Message">
        Welcome to Kraftt Digital. We are ready to begin {client.projectName} with a clear scope, practical milestones and a transparent communication rhythm.
      </SplitSection>
      <SplitSection label="Client experience">
        <BulletList items={['A clear project scope with deliverables, assumptions and exclusions.', 'Milestone-based progress updates so decisions are not left unclear.', 'Conversion-focused thinking around enquiry flow, trust signals and customer action.', 'Professional handover after final review, launch and approval.']} />
      </SplitSection>
      <SplitSection label="How we work">
        <BulletList items={['We confirm the scope before starting production.', 'We design, build, review and refine in structured steps.', 'We keep feedback checkpoints practical and decision-focused.', 'We prioritise quality, performance, search readiness and clean delivery.']} />
      </SplitSection>
      <SplitSection label="Client responsibilities">
        <BulletList items={['Provide correct business details, content, images, brand files and platform access.', 'Give timely feedback and approvals from the final decision-maker.', 'Clear approved invoices as per the agreed payment schedule.', 'Avoid making parallel changes to live assets while work is in progress unless coordinated.']} />
      </SplitSection>
      <SplitSection label="Next steps">
        <BulletList items={['Review and approve the agreement and invoice.', 'Clear the starting payment if applicable.', 'Share content, images, access, references and business notes.', 'Confirm the WhatsApp/email communication channel and final decision-maker.']} />
      </SplitSection>
      <SplitSection label="Communication">
        Primary communication: {client.communicationChannel}. For urgent questions, contact {siteConfig.contact.email} or +91 {siteConfig.contact.phone}.
      </SplitSection>
      <div className="flex min-h-[150px] items-center justify-center p-8 text-center font-display text-[34px] leading-tight text-[#0D0D0D]" style={{ fontWeight: 300 }}>Let us build something credible, useful and measurable.</div>
      <BlackFooter />
    </>
  );
}

function GuideDocument({ client, guide, profiles }: { client: AdminClientData; guide: ReturnType<typeof getServiceGuide>; profiles: ReturnType<typeof getSelectedServiceProfiles> }) {
  const title = profiles.length === 1 ? profiles[0].title : 'Multi-Service Guide';

  return (
    <>
      <DocHeader title={title} aside="Use this document to manage, maintain and get the most out of the delivered scope." />
      {profiles.length === 1 ? (
        <>
          <SplitSection label="Overview">{guide.overview}</SplitSection>
          {guide.sections.map((section) => (
            <SplitSection key={section.title} label={section.title}>
              <BulletList items={section.body} />
            </SplitSection>
          ))}
        </>
      ) : (
        profiles.map((profile) => (
          <SplitSection key={profile.title} label={profile.title}>
            <p className="mb-2">{profile.overview}</p>
            <BulletList items={profile.sections.flatMap((section) => section.body.slice(0, 2))} />
          </SplitSection>
        ))
      )}
      <SplitSection label="Project notes">
        Project: {client.projectName}
        <br />
        Service: {client.serviceName}
        <br />
        Included scopes: {getSelectedServiceLabel(client.selectedServices)}
        <br />
        Scope: {client.projectScope}
      </SplitSection>
      <BlackFooter />
    </>
  );
}

function FulfillmentDocument({ client, profiles }: { client: AdminClientData; guide: ReturnType<typeof getServiceGuide>; profiles: ReturnType<typeof getSelectedServiceProfiles> }) {
  const deliverables = profiles.flatMap((profile) => profile.deliverables);

  return (
    <>
      <DocHeader title="Fulfillment" aside="Final deliverables, handover and completion record." />
      <div className="border-b border-[#D8CDBB] p-5 md:p-8">
        <p className="font-sans text-[12px] leading-relaxed text-[#4A4641]">
          This fulfillment record confirms the deliverables prepared for {client.companyName} under {client.projectName}. It can be used as a completion note, internal handover checklist and client acknowledgement of the delivered scope.
        </p>
      </div>
      <SplitSection label="Deliverables">
        <BulletList items={[...new Set(deliverables)]} />
      </SplitSection>
      {profiles.map((profile) => (
        <SplitSection key={profile.title} label={profile.title}>
          <BulletList items={profile.deliverables} />
        </SplitSection>
      ))}
      <SplitSection label="Access / files">
        <BulletList items={['Final links, files or credentials shared with the client.', 'Admin, hosting, analytics, domain, CMS or platform access transferred where applicable.', 'Client advised to update passwords and recovery details after receiving access.', 'Client-owned assets and third-party accounts remain under the client business wherever applicable.']} />
      </SplitSection>
      <SplitSection label="Quality check">
        <BulletList items={['Mobile and desktop responsive check completed where applicable.', 'Important links, buttons, forms and WhatsApp paths reviewed.', 'Contact, order or enquiry flow checked before handover.', 'SEO, analytics, schema, speed or platform checks reviewed if included in scope.']} />
      </SplitSection>
      <SplitSection label="Completion">
        The project is considered fulfilled once the listed deliverables are shared, the agreed final review is complete, and pending invoices are cleared. New features, extra pages, new campaigns, additional products or post-handover changes are quoted separately unless covered by a maintenance or retainer scope.
      </SplitSection>
      <SignatureRow left="Client acknowledgement" right="Kraftt Digital" />
      <BlackFooter />
    </>
  );
}

function MonthlyReportDocument({ client }: { client: AdminClientData }) {
  return (
    <>
      <DocHeader title="Monthly Report" aside="This report helps you understand traffic, ranking, engagement and improvement activity." />
      <MetricBand title="Traffic insight" metrics={[['Total visitors', client.monthlyVisitors], ['Unique visitors', client.uniqueVisitors], ['Top pages', client.topPages]]} />
      <MetricBand title="Traffic sources" metrics={[['Direct', client.directTraffic], ['Google / SEO', client.searchTraffic], ['Social media', client.socialTraffic]]} />
      <MetricBand title="User behavior" metrics={[['Average session duration', client.averageSession], ['Bounce rate', client.bounceRate], ['Conversion rate', client.conversionRate]]} />
      <SplitSection label="Updates & improvements">{client.monthlyUpdates}</SplitSection>
      <SplitSection label="Recommendation">
        Prioritise the highest-intent pages first: service pages, product/category pages, WhatsApp entry points, contact forms and proof sections. The next improvement cycle should reduce enquiry friction, refresh weak content and keep search, speed and tracking health intact.
      </SplitSection>
      <BlackFooter />
    </>
  );
}

function InfoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="doc-card min-h-[112px] border-r border-[#D8CDBB] p-5 last:border-r-0">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B7355]">{title}</p>
      <div className="mt-4 space-y-1 font-sans text-[12px] leading-relaxed text-[#4A4641]">
        {lines.filter(Boolean).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function LogoBlock() {
  return (
    <div className="flex min-h-[112px] items-center border-r border-[#D8CDBB] bg-[#F7F4EE]/56 p-5">
      <BrandMark />
    </div>
  );
}

function TotalRow({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={`grid grid-cols-2 border-b border-[#D8CDBB] font-sans text-[12px] ${dark ? 'bg-[#0D0D0D] text-[#F2EFE9]' : 'text-[#0D0D0D]'}`}>
      <div className="px-4 py-3 font-semibold uppercase tracking-[0.12em]">{label}</div>
      <div className="px-4 py-3 text-right font-bold">{value}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[10px_1fr] gap-2">
          <span className="mt-[0.6em] h-1 w-1 rounded-full bg-[#8B7355]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SignatureRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="doc-signature grid grid-cols-2 border-b border-[#D8CDBB]">
      <div className="p-5">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B7355]">{left}</p>
        <div className="mt-12 border-t border-[#8B7355]/45 pt-2 font-sans text-[11px] text-[#69635D]">Name, date and signature</div>
      </div>
      <div className="border-l border-[#D8CDBB] p-5">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B7355]">{right}</p>
        <div className="mt-5 flex h-16 items-end">
          <img src={signatureImage} alt="Kraftt Digital signature" className="h-14 w-auto object-contain" />
        </div>
        <div className="mt-2 border-t border-[#8B7355]/45 pt-2 font-sans text-[11px] text-[#69635D]">Authorized signatory</div>
      </div>
    </div>
  );
}

function MetricBand({ title, metrics }: { title: string; metrics: [string, string][] }) {
  return (
    <section className="doc-section border-b border-[#D8CDBB]">
      <h3 className="px-5 pt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B7355]">{title}</h3>
      <div className="mt-3 grid grid-cols-3 border-t border-[#D8CDBB]">
        {metrics.map(([label, value]) => (
          <div key={label} className="min-h-[92px] border-r border-[#D8CDBB] p-5 text-center last:border-r-0">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4A4641]">{label}</p>
            <p className="mt-4 font-display text-[30px] leading-none text-[#0D0D0D]" style={{ fontWeight: 300 }}>{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlackFooter() {
  return (
    <div className="flex h-10 items-center justify-between bg-[#0D0D0D] px-5 font-sans text-[9px] uppercase tracking-[0.16em] text-[#C5A882]">
      <span>Kraftt Digital</span>
      <span>{siteConfig.domain.replace('https://', '')}</span>
    </div>
  );
}
