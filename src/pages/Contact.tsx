import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Phone } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { siteConfig } from '@/config/siteConfig';
import { useCurrency } from '@/context/CurrencyContext';
import { bundles } from '@/data/bundles';
import { serviceCategories } from '@/data/services';
import { getBundlePrefill, getPackagePrefill } from '@/utils/contactPrefill';
import { trackEvent } from '@/utils/analytics';
import { InstagramIcon, LinkedInIcon } from '@/components/ui/SocialIcons';
import type { Currency } from '@/types';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  country: string;
  service: string;
  currencyPreference: string;
  budget: string;
  timeline: string;
  description: string;
  referral: string;
  consent: boolean;
}

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  country: '',
  service: '',
  currencyPreference: 'USD',
  budget: '',
  timeline: '',
  description: '',
  referral: '',
  consent: false,
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
const errorFieldOrder: (keyof FormState)[] = ['fullName', 'company', 'phone', 'website', 'service', 'consent'];

const auditWhatsAppMessage = `Hi Kraftt Digital, I would like to discuss a Digital Authority Audit for my business.

Business name:
City:
Website or Instagram:
Main goal:`;

const contactFaqs = [
  {
    question: 'What happens after I request an audit?',
    answer:
      'We review the details you send, look at your current digital presence, then reply with the most sensible next step: a package, a custom scope or a short clarification question.',
  },
  {
    question: 'Do I need to know the exact service?',
    answer:
      'No. Select the closest option or choose a bundle. The audit exists to help identify whether your biggest gap is website credibility, search visibility, enquiry flow, content or brand presentation.',
  },
  {
    question: 'Can I message on WhatsApp instead?',
    answer:
      'Yes. The WhatsApp button opens a pre-filled audit message with the details we need first.',
  },
];

function getInitialForm(searchParams: URLSearchParams, defaultCurrency: Currency): FormState {
  const serviceId = searchParams.get('service');
  const packageId = searchParams.get('package');
  const bundleSlug = searchParams.get('bundle');
  const currencyParam = searchParams.get('currency');
  const requestedCurrency: Currency = currencyParam === 'INR' || currencyParam === 'USD' ? currencyParam : defaultCurrency;
  const baseState = { ...initialState, currencyPreference: requestedCurrency };
  const bundle = bundleSlug ? bundles.find((item) => item.slug === bundleSlug) : undefined;

  if (bundle) {
    const prefill = getBundlePrefill(bundle, requestedCurrency);

    return {
      ...baseState,
      service: 'bundle',
      currencyPreference: requestedCurrency,
      budget: prefill.budget,
      timeline: prefill.timeline,
      description: prefill.description,
      referral: prefill.referral,
    };
  }

  const category = serviceCategories.find((item) => item.id === serviceId);
  const pkg = category?.packages.find((item) => item.id === packageId);

  if (!category || !pkg) return baseState;

  const prefill = getPackagePrefill(category, pkg, requestedCurrency);

  return {
    ...baseState,
    service: category.id,
    currencyPreference: requestedCurrency,
    budget: prefill.budget,
    timeline: prefill.timeline,
    description: prefill.description,
    referral: prefill.referral,
  };
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { currency } = useCurrency();
  const [form, setForm] = useState<FormState>(() => getInitialForm(searchParams, currency));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const sendErrorRef = useRef<HTMLDivElement>(null);
  const validationAlertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formStartedRef = useRef(false);
  const activeErrorCount = Object.values(errors).filter(Boolean).length;
  const hasActiveErrors = activeErrorCount > 0;
  const prefillCategory = serviceCategories.find((category) => category.id === searchParams.get('service'));
  const prefillPackage = prefillCategory?.packages.find((pkg) => pkg.id === searchParams.get('package'));
  const prefillBundle = bundles.find((bundle) => bundle.slug === searchParams.get('bundle'));
  const phoneHref = `tel:+91${siteConfig.contact.phone}`;
  const phoneDisplay = `+91 ${siteConfig.contact.phone}`;
  const whatsappHref = `https://wa.me/91${siteConfig.contact.whatsapp}?text=${encodeURIComponent(auditWhatsAppMessage)}`;

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.requestAnimationFrame(() => successRef.current?.focus({ preventScroll: true }));
    }

    if (status === 'error') {
      window.requestAnimationFrame(() => {
        sendErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sendErrorRef.current?.focus({ preventScroll: true });
      });
    }
  }, [status]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent('form_start', { form_name: 'digital_authority_audit' });
    }
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === 'error') setStatus('idle');
  }

  function focusField(key: keyof FormState) {
    const target = formRef.current?.querySelector<HTMLElement>(`#${key}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target?.focus({ preventScroll: true });
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your name.';
    if (!form.company.trim()) next.company = 'Please enter your business name.';
    if (!form.phone.trim()) next.phone = 'Please enter your WhatsApp number.';
    if (!form.website.trim()) next.website = 'Please add your website, Instagram or Google profile link.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.service) next.service = 'Please select the closest service.';
    if (!form.consent) next.consent = 'Please confirm you agree to be contacted about this audit request.';
    setErrors(next);
    const firstError = errorFieldOrder.find((key) => next[key]);
    if (firstError) {
      window.requestAnimationFrame(() => {
        validationAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        validationAlertRef.current?.focus({ preventScroll: true });
        focusField(firstError);
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    trackEvent('form_submit', {
      form_name: 'digital_authority_audit',
      service: form.service || 'unspecified',
      currency: form.currencyPreference || currency,
    });

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || siteConfig.contact.formEndpoint;
    const payload = {
      ...form,
      name: form.fullName,
      business_name: form.company,
      whatsapp: form.phone,
      website_or_instagram: form.website,
      city: form.country,
      main_goal: form.description,
      _replyto: form.email || siteConfig.contact.email,
      _subject: `Digital Authority Audit request: ${form.company || form.fullName}`,
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      trackEvent('audit_request_success', {
        form_name: 'digital_authority_audit',
        service: form.service || 'unspecified',
        currency: form.currencyPreference || currency,
      });
      trackEvent('generate_lead', {
        form_name: 'digital_authority_audit',
        service: form.service || 'unspecified',
        currency: form.currencyPreference || currency,
      });
      setStatus('success');
      setForm({ ...initialState, currencyPreference: currency });
      formStartedRef.current = false;
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[var(--color-parchment)] pt-[92px]">
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="agency-glass-light mx-6 max-w-md rounded-[var(--radius-card)] p-8 text-center text-[var(--color-midnight)] outline-none focus:ring-2 focus:ring-[var(--color-umber)]"
        >
          <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--color-umber)]" aria-hidden="true" />
          <h1 className="mt-5 font-display text-3xl" style={{ fontWeight: 300 }}>
            Your audit request is in.
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/68">
            We will review your business details and reply with the next sensible step.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title="Request a Digital Authority Audit"
        description="Request a Digital Authority Audit from Kraftt Digital for your website, search presence and enquiry flow."
        path="/contact"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Contact', path: '/contact' }])} />

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)]">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
          <p className="eyebrow mt-6 mb-4">Digital authority audit</p>
          <h1 className="max-w-3xl text-balance font-display text-[38px] leading-[1.08] md:text-[58px]" style={{ fontWeight: 300 }}>
            Tell us where your business stands online.
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-[15px] leading-relaxed text-[var(--color-midnight)]/68">
            Share the basics. We will review the visible gaps across credibility, search and enquiry flow, then suggest a clear next step.
          </p>
        </div>
      </header>

      <section className="bg-[var(--color-parchment)] pb-20 md:pb-24">
        <div className="container-kd grid gap-10 md:grid-cols-[1.25fr_0.75fr]">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="agency-glass-light space-y-5 rounded-[var(--radius-card)] p-5 md:p-7"
            aria-describedby={status === 'error' ? 'form-error' : hasActiveErrors ? 'form-validation-error' : undefined}
          >
            {prefillCategory && prefillPackage && (
              <div className="rounded-[var(--radius-card)] border border-[var(--color-umber)]/35 bg-[var(--color-umber)]/10 p-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">Package selected</p>
                <p className="mt-1 font-display text-2xl text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  {prefillPackage.name}
                </p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/68">
                  {prefillCategory.name} has been filled with the package budget, timeline and scope notes.
                </p>
              </div>
            )}

            {prefillBundle && (
              <div className="rounded-[var(--radius-card)] border border-[var(--color-umber)]/35 bg-[var(--color-umber)]/10 p-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">Bundle selected</p>
                <p className="mt-1 font-display text-2xl text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  {prefillBundle.name}
                </p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/68">
                  Bundle budget, timeline and scope notes have been added to the form.
                </p>
              </div>
            )}

            {hasActiveErrors && (
              <div
                ref={validationAlertRef}
                id="form-validation-error"
                role="alert"
                tabIndex={-1}
                className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-umber)]/35 bg-[var(--color-umber)]/10 p-4 outline-none"
              >
                <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                <p className="font-sans text-sm leading-relaxed text-[var(--color-midnight)]">
                  Please fix the highlighted field{activeErrorCount > 1 ? 's' : ''}. Focus has moved to the first one.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div
                ref={sendErrorRef}
                id="form-error"
                role="alert"
                tabIndex={-1}
                className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-error)]/30 bg-[#FBEAEA] p-4 outline-none focus:ring-2 focus:ring-[var(--color-error)]/45"
              >
                <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-error)]" aria-hidden="true" />
                <p className="font-sans text-sm text-[var(--color-error)]">
                  Something went wrong sending your audit request. Please try again, or email us directly at{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="underline">
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" id="fullName" required error={errors.fullName}>
                <input id="fullName" type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass(!!errors.fullName)} aria-invalid={!!errors.fullName} />
              </Field>
              <Field label="Business name" id="company" required error={errors.company}>
                <input id="company" type="text" value={form.company} onChange={(e) => update('company', e.target.value)} className={inputClass(!!errors.company)} aria-invalid={!!errors.company} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="WhatsApp number" id="phone" required error={errors.phone}>
                <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass(!!errors.phone)} aria-invalid={!!errors.phone} />
              </Field>
              <Field label="Website or Instagram" id="website" required error={errors.website}>
                <input id="website" type="text" value={form.website} onChange={(e) => update('website', e.target.value)} className={inputClass(!!errors.website)} aria-invalid={!!errors.website} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Work email (optional)" id="email" error={errors.email}>
                <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass(!!errors.email)} aria-invalid={!!errors.email} />
              </Field>
              <Field label="City" id="country">
                <input id="country" type="text" value={form.country} onChange={(e) => update('country', e.target.value)} className={inputClass(false)} />
              </Field>
            </div>

            <Field label="Closest service" id="service" required error={errors.service}>
              <select id="service" value={form.service} onChange={(e) => update('service', e.target.value)} className={inputClass(!!errors.service)} aria-invalid={!!errors.service}>
                <option value="">Select a service</option>
                {serviceCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="bundle">A bundle / multiple services</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Currency" id="currencyPreference">
                <select id="currencyPreference" value={form.currencyPreference} onChange={(e) => update('currencyPreference', e.target.value)} className={inputClass(false)}>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </Field>
              <Field label="Approximate project range" id="budget">
                <input id="budget" type="text" placeholder="e.g. ₹50,000-₹1,00,000" value={form.budget} onChange={(e) => update('budget', e.target.value)} className={inputClass(false)} />
              </Field>
              <Field label="Desired timeline" id="timeline">
                <input id="timeline" type="text" placeholder="e.g. 2-4 weeks" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} className={inputClass(false)} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Preferred contact time" id="referral">
                <input id="referral" type="text" placeholder="e.g. 4-6 PM" value={form.referral} onChange={(e) => update('referral', e.target.value)} className={inputClass(false)} />
              </Field>
              <div className="hidden sm:block" aria-hidden="true" />
            </div>

            <Field label="Main goal" id="description">
              <textarea id="description" rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} className={inputClass(false)} />
            </Field>

            <div>
              <label className="flex items-start gap-2.5 font-sans text-sm text-[var(--color-midnight)]/68">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[var(--color-umber)]"
                  aria-invalid={!!errors.consent}
                />
                I agree to be contacted about this audit request, per the{' '}
                <a href="/legal/privacy-policy" className="text-[var(--color-umber)] underline">
                  Privacy Policy
                </a>
                .
              </label>
              {errors.consent && <p className="mt-1.5 font-sans text-xs text-[var(--color-error)]">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="agency-magnetic inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-[var(--color-linen)] hover:bg-[var(--color-umber)] disabled:opacity-60 sm:w-auto"
            >
              {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === 'loading' ? 'Sending...' : 'Request My Audit'}
            </button>
          </form>

          <aside className="space-y-5">
            <div className="rounded-[var(--radius-card)] bg-[var(--color-midnight)] p-6 text-[var(--color-linen)] shadow-[0_28px_90px_rgba(13,13,13,0.16)]">
              <p className="eyebrow text-[var(--color-sand)]">Direct contact</p>
              <h2 className="mt-4 font-display text-3xl" style={{ fontWeight: 300 }}>
                Prefer a direct conversation?
              </h2>
              <div className="mt-5 space-y-3 font-sans text-sm text-[var(--color-dusk)]">
                <a href={`mailto:${siteConfig.contact.email}`} className="block text-[var(--color-sand)] hover:underline">
                  {siteConfig.contact.email}
                </a>
                <a href={phoneHref} className="inline-flex items-center gap-1.5 text-[var(--color-sand)] hover:underline">
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                  {phoneDisplay}
                </a>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'contact_sidebar' })}
                className="agency-magnetic mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-linen)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:bg-[var(--color-sand)]"
              >
                Start on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
              <div className="mt-5 flex flex-wrap gap-2">
                {siteConfig.social.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 font-sans text-[11px] text-[var(--color-linen)]/80 transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]">
                    <InstagramIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                    Instagram
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 font-sans text-[11px] text-[var(--color-linen)]/80 transition-colors hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]">
                    <LinkedInIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="agency-glass-light rounded-[var(--radius-card)] p-6">
              <p className="eyebrow">Quick questions</p>
              <div className="mt-3">
                <FAQAccordion items={contactFaqs} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function inputClass(hasError: boolean) {
  return `agency-focus-field w-full rounded-[var(--radius-button)] border ${hasError ? 'border-[var(--color-error)]' : 'border-[var(--color-bone)]'} bg-[var(--color-white-paper)]/82 px-3.5 py-2.5 font-sans text-sm text-[var(--color-midnight)] placeholder:text-[var(--color-midnight)]/35 focus:border-[var(--color-umber)] transition-colors`;
}

function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-sans text-xs font-medium text-[var(--color-midnight)]/68">
        {label} {required && <span className="text-[var(--color-umber)]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 font-sans text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
