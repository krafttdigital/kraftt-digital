import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { SEO } from '@/components/seo/SEO';
import { siteConfig } from '@/config/siteConfig';
import signatureImage from '@/assets/Signature.png';

type AdminDocumentId = 'agreement' | 'invoice' | 'welcome' | 'guide' | 'fulfillment' | 'report';
type AdminServiceId = 'website' | 'shopify' | 'seo' | 'branding' | 'content' | 'dashboard' | 'ai' | 'social';

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

const serviceOptions: { id: AdminServiceId; label: string }[] = [
  { id: 'website', label: 'Website Design & Development' },
  { id: 'shopify', label: 'Shopify Store Development' },
  { id: 'seo', label: 'SEO / AEO / GEO' },
  { id: 'branding', label: 'Brand Identity' },
  { id: 'content', label: 'Content & Copywriting' },
  { id: 'dashboard', label: 'Dashboard / Internal Tool' },
  { id: 'ai', label: 'AI-Powered Creative' },
  { id: 'social', label: 'Social Media Management' },
];

const today = new Date().toISOString().slice(0, 10);

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
  dueDate: today,
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
};

const serviceGuides: Record<string, { title: string; overview: string; sections: { title: string; body: string[] }[]; deliverables: string[] }> = {
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
    return stored ? { ...defaultData, ...JSON.parse(stored) } : defaultData;
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
  if (normalized.includes('shopify') || normalized.includes('store')) return serviceGuides.shopify;
  if (normalized.includes('seo') || normalized.includes('search')) return serviceGuides.seo;
  if (normalized.includes('web') || normalized.includes('website') || normalized.includes('development')) return serviceGuides.website;
  return serviceGuides.default;
}

function getSelectedServiceProfiles(selectedServices: AdminServiceId[]) {
  const ids = selectedServices.length ? selectedServices : defaultData.selectedServices;
  return ids.map((id) => serviceGuides[id]).filter(Boolean);
}

function getSelectedServiceLabel(selectedServices: AdminServiceId[]) {
  const selected = serviceOptions.filter((service) => selectedServices.includes(service.id));
  if (selected.length === 0) return 'Service';
  if (selected.length === 1) return selected[0].label;
  return `${selected.length} selected services`;
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
  const selectedProfiles = useMemo(() => getSelectedServiceProfiles(client.selectedServices), [client.selectedServices]);
  const guide = useMemo(() => selectedProfiles[0] ?? getServiceGuide(client.serviceName), [client.serviceName, selectedProfiles]);
  const selectedServiceLabel = getSelectedServiceLabel(client.selectedServices);

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
      return { ...current, selectedServices: selectedServices.length ? selectedServices : [serviceId] };
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
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050607] px-5 py-20 text-[var(--color-linen)]">
          <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
          <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md rounded-[var(--radius-card)] border border-white/10 bg-black/55 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <p className="eyebrow mb-3">Private admin</p>
            <h1 className="font-display text-[38px] leading-none text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
              Kraftt document desk.
            </h1>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">
              Client-side login for the internal no-backend document builder. Use hosting protection for real production security.
            </p>
            <div className="mt-6 space-y-4">
              <AdminField label="Email" type="email" value={loginEmail} onChange={setLoginEmail} />
              <AdminField label="Password" type="password" value={loginPassword} onChange={setLoginPassword} />
            </div>
            {loginError && <p className="mt-4 rounded-[var(--radius-button)] border border-[var(--color-error)]/35 bg-[var(--color-error)]/15 px-3 py-2 font-sans text-xs text-[#ffd7d7]">{loginError}</p>}
            <button type="submit" className="mt-6 w-full rounded-[var(--radius-button)] bg-[var(--color-umber)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] transition-colors hover:bg-[var(--color-sand)]">
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
      <section className="relative overflow-hidden bg-[#050607] pt-[112px] pb-16 text-[var(--color-linen)]">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <div className="admin-no-print mb-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow mb-3">Private workspace</p>
              <h1 className="max-w-3xl font-display text-[36px] leading-[1.05] md:text-[58px]" style={{ fontWeight: 300 }}>
                Kraftt client document builder.
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-dusk)]">
                Fill client and project details once. Agreement, invoice, welcome letter, guide, fulfillment and monthly report update instantly.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-umber)]/30 bg-[var(--color-umber)]/10 p-4 font-sans text-xs leading-relaxed text-[var(--color-dusk)]">
              <div className="flex items-center justify-between gap-3">
                <span>Signed in as {sessionEmail}</span>
                <button type="button" onClick={logout} className="rounded-[var(--radius-button)] border border-white/10 px-3 py-1.5 text-[var(--color-linen)] hover:border-[var(--color-umber)]">
                  Logout
                </button>
              </div>
              <p className="mt-3">No backend is used. Data is saved only in this browser's localStorage. Use the print button and choose "Save as PDF" for a clean document export.</p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
            <aside className="admin-no-print space-y-4 rounded-[var(--radius-card)] border border-white/10 bg-black/45 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Client inputs</p>
                  <p className="mt-1 font-sans text-xs text-[var(--color-dusk)]">Auto-saved locally</p>
                </div>
                <button
                  type="button"
                  onClick={resetDemo}
                  className="rounded-[var(--radius-button)] border border-white/10 px-3 py-2 font-sans text-xs text-[var(--color-dusk)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
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
                <p className="mb-2 font-sans text-[11px] font-medium text-[var(--color-dusk)]">Services included in guide / fulfillment</p>
                <div className="grid grid-cols-1 gap-2">
                  {serviceOptions.map((service) => {
                    const checked = client.selectedServices.includes(service.id);
                    return (
                      <label
                        key={service.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-[var(--radius-button)] border px-3 py-2 font-sans text-xs transition-colors ${
                          checked ? 'border-[var(--color-umber)] bg-[var(--color-umber)]/15 text-[var(--color-sand)]' : 'border-white/10 bg-black/25 text-[var(--color-dusk)] hover:border-white/20'
                        }`}
                      >
                        <input type="checkbox" checked={checked} onChange={() => toggleService(service.id)} className="h-3.5 w-3.5 accent-[var(--color-umber)]" />
                        {service.label}
                      </label>
                    );
                  })}
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
              <AdminTextarea label="Payment details" value={client.paymentDetails} onChange={(value) => update('paymentDetails', value)} rows={3} />
              <AdminTextarea label="QR code payment text / UPI link" value={client.paymentQrText} onChange={(value) => update('paymentQrText', value)} rows={2} />

              <details className="rounded-[var(--radius-card)] border border-white/10 p-3">
                <summary className="cursor-pointer font-sans text-sm text-[var(--color-linen)]">Monthly report fields</summary>
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
              <div className="admin-no-print mb-4 rounded-[var(--radius-card)] border border-white/10 bg-black/40 p-3 backdrop-blur-xl">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="eyebrow">{selectedDocument.eyebrow}</p>
                    <p className="mt-1 font-sans text-sm text-[var(--color-dusk)]">
                      {selectedDocument.description} Active scope: {selectedServiceLabel}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => printDocument(activeDoc)}
                    className="rounded-[var(--radius-button)] bg-[var(--color-umber)] px-4 py-2.5 font-sans text-xs font-medium text-[var(--color-midnight)] transition-colors hover:bg-[var(--color-sand)]"
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
                          ? 'border-[var(--color-umber)] bg-[var(--color-umber)] text-[var(--color-midnight)]'
                          : 'border-white/10 bg-white/[0.04] text-[var(--color-dusk)] hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]'
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
                      className="rounded-[var(--radius-button)] border border-white/10 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-dusk)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                    >
                      Print {doc.eyebrow}
                    </button>
                  ))}
                </div>
              </div>

              <DocumentPage>
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
      <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-dusk)]">{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[var(--radius-button)] border border-white/10 bg-black/35 px-3 py-2.5 font-sans text-sm text-[var(--color-linen)] outline-none transition-colors placeholder:text-[var(--color-dusk)]/55 focus:border-[var(--color-umber)]"
      />
    </label>
  );
}

function AdminSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-dusk)]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[var(--radius-button)] border border-white/10 bg-black/35 px-3 py-2.5 font-sans text-sm text-[var(--color-linen)] outline-none transition-colors focus:border-[var(--color-umber)]"
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
      <span className="mb-1.5 block font-sans text-[11px] font-medium text-[var(--color-dusk)]">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-[var(--radius-button)] border border-white/10 bg-black/35 px-3 py-2.5 font-sans text-sm text-[var(--color-linen)] outline-none transition-colors placeholder:text-[var(--color-dusk)]/55 focus:border-[var(--color-umber)]"
      />
    </label>
  );
}

function DocumentPage({ children }: { children: ReactNode }) {
  return (
    <article className="kd-admin-document mx-auto w-full max-w-[900px] overflow-hidden border border-black/10 bg-[#F2EFE9] text-black shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
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
    <header className="grid min-h-[220px] grid-cols-[1.3fr_0.7fr] border-b border-black/20">
      <div className="flex items-end p-5 md:p-8">
        <h2 className="font-sans text-[52px] font-black uppercase leading-[0.86] tracking-[-0.04em] text-black md:text-[86px]">{title}</h2>
      </div>
      <div className="flex flex-col justify-between border-l border-black/10 p-5 md:p-8">
        <BrandMark compact />
        <div className="font-sans text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-black">{aside}</div>
      </div>
    </header>
  );
}

function SplitSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-[0.9fr_1.1fr] border-b border-black/16">
      <div className="border-r border-black/10 p-5 font-sans text-[13px] font-black uppercase tracking-[-0.02em] text-black">{label}</div>
      <div className="p-5 font-sans text-[12px] leading-relaxed text-black/72">{children}</div>
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
      <div className="border-b border-black/20 p-5 md:p-8">
        <p className="max-w-4xl font-sans text-[12px] leading-relaxed text-black/70">
          This agreement records that {client.clientName} of {client.companyName} accepts the working terms, payment obligations and project responsibilities for {client.projectName}. The client confirms they are ready to work with {siteConfig.name}, will provide accurate information, will not misrepresent project details, and will clear all agreed payments on time.
        </p>
      </div>
      <div className="grid grid-cols-2 border-b border-black/20">
        <InfoBlock title="Prepared for" lines={[client.clientName, client.companyName, client.city]} />
        <InfoBlock title="Project" lines={[client.projectName, client.serviceName, `Start date: ${client.startDate}`]} />
      </div>
      <SplitSection label="Scope">{client.projectScope}</SplitSection>
      <SplitSection label="Payment terms">
        The client agrees to clear invoices within the due date stated on the invoice, and never later than 7 days unless a different written payment schedule is accepted by {siteConfig.name}. Late payments may pause delivery, handover, support, launch or access transfer.
      </SplitSection>
      <SplitSection label="Approvals">
        The client agrees to provide feedback, content, access, images, credentials and approvals on time. Delays from the client side may extend the project timeline.
      </SplitSection>
      <SplitSection label="Integrity">
        Both parties agree to work in good faith. Fraudulent chargebacks, false claims, withheld access, unpaid usage of deliverables or misuse of unpaid work may result in suspension of services and recovery action.
      </SplitSection>
      <SplitSection label="Acceptance">
        By approving this document, starting the project, paying an invoice, or sharing required project material, the client confirms acceptance of these terms and the website terms published at {siteConfig.domain}.
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
      <div className="grid grid-cols-3 border-b border-black/20">
        <LogoBlock />
        <InfoBlock title="From" lines={[siteConfig.name, siteConfig.contact.email, `+91 ${siteConfig.contact.phone}`]} />
        <InfoBlock title="To" lines={[client.clientName, client.companyName, client.address, client.clientEmail]} />
      </div>
      <table className="w-full border-collapse font-sans text-[12px]">
        <thead>
          <tr className="bg-black text-[#F2EFE9]">
            <th className="px-5 py-3 text-left uppercase tracking-[0.1em]">Service name</th>
            <th className="px-5 py-3 text-left uppercase tracking-[0.1em]">Details</th>
            <th className="px-5 py-3 text-right uppercase tracking-[0.1em]">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-black/12">
            <td className="px-5 py-6 font-bold uppercase">{client.serviceName}</td>
            <td className="px-5 py-6 text-black/65">{client.projectScope}</td>
            <td className="px-5 py-6 text-right font-bold">{formatMoney(subtotal, client.currency)}</td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-[1fr_320px] border-b border-black/20">
        <div className="p-5">
          <p className="font-sans text-[22px] font-black uppercase tracking-[-0.04em]">Payment will be accepted with:</p>
          <p className="mt-4 whitespace-pre-line font-sans text-[12px] leading-relaxed text-black/70">{client.paymentDetails}</p>
        </div>
        <div className="border-l border-black/10 p-5">
          <TotalRow label={client.taxMode === 'inclusive' ? 'Base value' : 'Sub total'} value={formatMoney(subtotal, client.currency)} dark />
          <TotalRow label={client.taxMode === 'inclusive' ? `Tax included (${client.taxRate || 0}%)` : `Tax (${client.taxRate || 0}%)`} value={formatMoney(tax, client.currency)} />
          <TotalRow label="Total" value={formatMoney(total, client.currency)} dark />
          <img src={qrUrl(client.paymentQrText)} alt="Payment QR code" className="mt-5 h-36 w-36 border border-black/20 bg-white p-2" />
        </div>
      </div>
      <section className="grid grid-cols-[0.9fr_1.1fr]">
        <div className="p-5">
          <h3 className="font-sans text-[40px] font-black uppercase leading-none tracking-[-0.05em]">Agreement</h3>
        </div>
        <div className="p-5 font-sans text-[12px] leading-relaxed text-black/70">
          Payment is due within 7 days of the invoice date unless otherwise agreed in writing. Late payment may incur additional fees and may result in a temporary suspension of services. This invoice constitutes a binding agreement upon payment.
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
        We are excited to work with you on {client.projectName}. This document gives you a clear view of the client experience, responsibilities, next steps and communication process.
      </SplitSection>
      <SplitSection label="Client experience">
        <BulletList items={['Project overview with scope, objectives and key deliverables.', 'Timeline and milestones with progress updates.', 'Clear communication through the selected channel.', 'Professional handover after final review and approval.']} />
      </SplitSection>
      <SplitSection label="How we work">
        <BulletList items={['Clear scope before starting.', 'Design, build, review and refine in structured steps.', 'Regular feedback checkpoints.', 'Focus on quality, performance and clean delivery.']} />
      </SplitSection>
      <SplitSection label="Client responsibilities">
        <BulletList items={['Provide all required content, assets, logins and brand material.', 'Give timely feedback and approvals.', 'Clear pending invoices as agreed.', 'Share accurate business and project information.']} />
      </SplitSection>
      <SplitSection label="Next steps">
        <BulletList items={['Review and approve the agreement.', 'Clear the starting invoice if applicable.', 'Provide required content, images, access and notes.', 'Confirm communication channel and key decision-maker.']} />
      </SplitSection>
      <SplitSection label="Communication">
        Primary communication: {client.communicationChannel}. For urgent questions, contact {siteConfig.contact.email} or +91 {siteConfig.contact.phone}.
      </SplitSection>
      <div className="flex min-h-[180px] items-center justify-center p-8 text-center font-sans text-[18px] font-black uppercase tracking-[-0.02em]">Let's build something great.</div>
      <BlackFooter />
    </>
  );
}

function GuideDocument({ client, guide, profiles }: { client: AdminClientData; guide: ReturnType<typeof getServiceGuide>; profiles: ReturnType<typeof getSelectedServiceProfiles> }) {
  const title = profiles.length === 1 ? profiles[0].title : 'Service Guide';

  return (
    <>
      <DocHeader title={title} aside="This guide helps you understand, manage and get the most out of your delivered project." />
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
      <div className="border-b border-black/20 p-5 md:p-8">
        <p className="font-sans text-[12px] leading-relaxed text-black/70">
          This document records the deliverables prepared for {client.companyName} under {client.projectName}. It can be shared at completion or used as an internal handover checklist.
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
        <BulletList items={['Final links, files or credentials shared with the client.', 'Any admin, hosting, analytics, domain, CMS or platform access transferred where applicable.', 'Client advised to update passwords after receiving access.']} />
      </SplitSection>
      <SplitSection label="Quality check">
        <BulletList items={['Responsive check completed.', 'Important links and buttons reviewed.', 'Contact or order flow checked.', 'Basic SEO, analytics or schema tasks reviewed if included in scope.']} />
      </SplitSection>
      <SplitSection label="Completion">
        The project is considered fulfilled once the listed deliverables are shared, the agreed final review is complete, and pending invoices are cleared.
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
        Most of your next gains should come from improving the highest-intent pages first, refreshing weak content, reviewing conversion paths and keeping technical SEO healthy.
      </SplitSection>
      <BlackFooter />
    </>
  );
}

function InfoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="min-h-[120px] border-r border-black/10 p-5 last:border-r-0">
      <p className="font-sans text-[11px] font-black uppercase tracking-[0.1em] text-black">{title}</p>
      <div className="mt-4 space-y-1 font-sans text-[12px] leading-relaxed text-black/70">
        {lines.filter(Boolean).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function LogoBlock() {
  return (
    <div className="flex min-h-[120px] items-center border-r border-black/10 p-5">
      <BrandMark />
    </div>
  );
}

function TotalRow({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={`grid grid-cols-2 border-b border-black/10 font-sans text-[12px] ${dark ? 'bg-black text-[#F2EFE9]' : 'text-black'}`}>
      <div className="px-4 py-3 font-black uppercase tracking-[0.1em]">{label}</div>
      <div className="px-4 py-3 text-right font-bold">{value}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item}>- {item}</li>
      ))}
    </ul>
  );
}

function SignatureRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-2 border-b border-black/20">
      <div className="p-5">
        <p className="font-sans text-[11px] font-black uppercase tracking-[0.1em]">{left}</p>
        <div className="mt-12 border-t border-black/35 pt-2 font-sans text-[11px] text-black/60">Name, date and signature</div>
      </div>
      <div className="border-l border-black/10 p-5">
        <p className="font-sans text-[11px] font-black uppercase tracking-[0.1em]">{right}</p>
        <div className="mt-5 flex h-16 items-end">
          <img src={signatureImage} alt="Kraftt Digital signature" className="h-14 w-auto object-contain" />
        </div>
        <div className="mt-2 border-t border-black/35 pt-2 font-sans text-[11px] text-black/60">Authorized signatory</div>
      </div>
    </div>
  );
}

function MetricBand({ title, metrics }: { title: string; metrics: [string, string][] }) {
  return (
    <section className="border-b border-black/20">
      <h3 className="px-5 pt-5 font-sans text-[13px] font-black uppercase tracking-[-0.02em] text-black">{title}</h3>
      <div className="mt-3 grid grid-cols-3 border-t border-black/10">
        {metrics.map(([label, value]) => (
          <div key={label} className="min-h-[96px] border-r border-black/10 p-5 text-center last:border-r-0">
            <p className="font-sans text-[11px] font-black uppercase tracking-[0.08em] text-black">{label}</p>
            <p className="mt-4 font-sans text-[30px] font-black uppercase leading-none tracking-[-0.06em] text-black">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlackFooter() {
  return <div className="h-10 bg-black" />;
}
