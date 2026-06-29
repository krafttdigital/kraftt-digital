import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { siteConfig } from '@/config/siteConfig';
import { useCurrency } from '@/context/CurrencyContext';
import { serviceCategories } from '@/data/services';
import { getPackagePrefill } from '@/utils/contactPrefill';
import { trackEvent } from '@/utils/analytics';
import { InstagramIcon, LinkedInIcon } from '@/components/ui/SocialIcons';
import { Loader2, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
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
const errorFieldOrder: (keyof FormState)[] = ['fullName', 'email', 'service', 'description', 'consent'];

function getInitialForm(searchParams: URLSearchParams, defaultCurrency: Currency): FormState {
  const serviceId = searchParams.get('service');
  const packageId = searchParams.get('package');
  const currencyParam = searchParams.get('currency');
  const requestedCurrency: Currency = currencyParam === 'INR' || currencyParam === 'USD' ? currencyParam : defaultCurrency;
  const baseState = { ...initialState, currencyPreference: requestedCurrency };
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

const contactFaqs = [
  {
    question: 'How quickly will I hear back?',
    answer: 'Enquiries are sent to the Kraftt Digital intake inbox through Formspree. We read every project brief and reply as soon as possible.',
  },
  {
    question: 'Do I need to know exactly which package I want?',
    answer: 'No — describe the project and goal, and we will point you to the right package or confirm a custom quote.',
  },
  { question: 'Is there a cost to send an enquiry?', answer: 'No, getting in touch and receiving a scoped proposal is free.' },
];

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
  const activeErrorCount = Object.values(errors).filter(Boolean).length;
  const hasActiveErrors = activeErrorCount > 0;
  const prefillCategory = serviceCategories.find((category) => category.id === searchParams.get('service'));
  const prefillPackage = prefillCategory?.packages.find((pkg) => pkg.id === searchParams.get('package'));
  const phoneHref = `tel:+91${siteConfig.contact.phone}`;
  const phoneDisplay = `+91 ${siteConfig.contact.phone}`;

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
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.service) next.service = 'Please select a service.';
    if (!form.description.trim() || form.description.trim().length < 20) {
      next.description = 'Please describe the project in at least a sentence or two.';
    }
    if (!form.consent) next.consent = 'Please confirm you agree to be contacted about this enquiry.';
    setErrors(next);
    const firstError = errorFieldOrder.find((key) => next[key]);
    if (firstError) {
      window.requestAnimationFrame(() => {
        validationAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    // ------------------------------------------------------------------
    // Sends to Formspree by default. VITE_CONTACT_FORM_ENDPOINT can override
    // this for staging or a future serverless/API endpoint.
    // ------------------------------------------------------------------
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || siteConfig.contact.formEndpoint;
    const payload = {
      ...form,
      name: form.fullName,
      _replyto: form.email,
      _subject: `New Kraftt Digital enquiry: ${form.service || 'General project'}`,
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      trackEvent('generate_lead', {
        form_name: 'project_enquiry',
        service: form.service || 'unspecified',
        currency: form.currencyPreference || currency,
      });
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <section className="agency-section-dark min-h-[70vh] flex items-center justify-center pt-[68px]">
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="agency-glass-dark rounded-[var(--radius-card)] p-8 text-center max-w-md mx-6 outline-none focus:ring-2 focus:ring-[var(--color-umber)] focus:ring-offset-2 focus:ring-offset-[var(--color-midnight)]"
        >
          <CheckCircle2 className="w-10 h-10 text-[var(--color-signal)] mx-auto" aria-hidden="true" />
          <h1 className="mt-5 font-display text-3xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
            Thanks — we've got it.
          </h1>
          <p className="mt-3 font-sans text-sm text-[var(--color-dusk)] leading-relaxed">
            Your enquiry has been recorded. We'll follow up at the email address you provided.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Kraftt Digital to scope a website, Shopify store, brand identity or other project — INR/USD pricing, remote delivery worldwide."
        path="/contact"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Contact', path: '/contact' }])} />

      <header className=" relative overflow-hidden pt-[120px] pb-16">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} light />
          <p className="eyebrow mt-6 mb-4">Get in touch</p>
          <h1 className="max-w-[340px] text-balance font-display text-[32px] leading-[1.12] text-[var(--color-linen)] md:max-w-2xl md:text-[48px]" style={{ fontWeight: 300 }}>
            Tell us what you're building.
          </h1>
          <p className="mt-5 max-w-[330px] font-sans text-[15px] leading-relaxed text-[var(--color-dusk)] md:max-w-xl">
            A short brief is enough to get a scoped package and a fixed price back from us.
          </p>
        </div>
      </header>

      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd grid md:grid-cols-[1.3fr_1fr] gap-14">
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="agency-glass-dark space-y-5 rounded-[var(--radius-card)] border border-white/10 p-5 md:p-7"
              aria-describedby={status === 'error' ? 'form-error' : hasActiveErrors ? 'form-validation-error' : undefined}
            >
              {prefillCategory && prefillPackage && (
                <div className="rounded-[var(--radius-card)] border border-[var(--color-umber)]/35 bg-[var(--color-umber)]/12 p-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)]">Package selected</p>
                  <p className="mt-1 font-display text-xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                    {prefillPackage.name}
                  </p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">
                    {prefillCategory.name} has been filled into the form with the shown budget and timeline.
                  </p>
                </div>
              )}

              {hasActiveErrors && (
                <div
                  ref={validationAlertRef}
                  id="form-validation-error"
                  role="alert"
                  tabIndex={-1}
                  className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-umber)]/35 bg-[var(--color-umber)]/12 p-4 outline-none"
                >
                  <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-sand)]" aria-hidden="true" />
                  <p className="font-sans text-sm leading-relaxed text-[var(--color-linen)]">
                    Please fix the highlighted field{activeErrorCount > 1 ? 's' : ''}. We moved focus to the first one.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div
                  ref={sendErrorRef}
                  id="form-error"
                  role="alert"
                  tabIndex={-1}
                  className="flex items-start gap-2.5 bg-[#FBEAEA] border border-[var(--color-error)]/30 rounded-[var(--radius-card)] p-4 outline-none focus:ring-2 focus:ring-[var(--color-error)]/45"
                >
                  <AlertCircle className="w-4.5 h-4.5 text-[var(--color-error)] mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="font-sans text-sm text-[var(--color-error)]">
                    Something went wrong sending your enquiry. Please try again, or email us directly at{' '}
                    <a href={`mailto:${siteConfig.contact.email}`} className="underline">
                      {siteConfig.contact.email}
                    </a>
                    .
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" id="fullName" required error={errors.fullName}>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className={inputClass(!!errors.fullName)}
                    aria-invalid={!!errors.fullName}
                  />
                </Field>
                <Field label="Work email" id="email" required error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass(!!errors.email)}
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone or WhatsApp" id="phone">
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass(false)} />
                </Field>
                <Field label="Company or brand" id="company">
                  <input id="company" type="text" value={form.company} onChange={(e) => update('company', e.target.value)} className={inputClass(false)} />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Website (if you have one)" id="website">
                  <input id="website" type="text" value={form.website} onChange={(e) => update('website', e.target.value)} className={inputClass(false)} />
                </Field>
                <Field label="Country" id="country">
                  <input id="country" type="text" value={form.country} onChange={(e) => update('country', e.target.value)} className={inputClass(false)} />
                </Field>
              </div>

              <Field label="Service you need" id="service" required error={errors.service}>
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

              <div className="grid sm:grid-cols-3 gap-5">
                <Field label="Currency preference" id="currencyPreference">
                  <select id="currencyPreference" value={form.currencyPreference} onChange={(e) => update('currencyPreference', e.target.value)} className={inputClass(false)}>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                  </select>
                </Field>
                <Field label="Approximate budget" id="budget">
                  <input id="budget" type="text" placeholder="e.g. $500–$1,000" value={form.budget} onChange={(e) => update('budget', e.target.value)} className={inputClass(false)} />
                </Field>
                <Field label="Desired timeline" id="timeline">
                  <input id="timeline" type="text" placeholder="e.g. 2–3 weeks" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} className={inputClass(false)} />
                </Field>
              </div>

              <Field label="Project description" id="description" required error={errors.description}>
                <textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  className={inputClass(!!errors.description)}
                  aria-invalid={!!errors.description}
                />
              </Field>

              <Field label="How did you hear about us?" id="referral">
                <input id="referral" type="text" value={form.referral} onChange={(e) => update('referral', e.target.value)} className={inputClass(false)} />
              </Field>

              <div>
                <label className="flex items-start gap-2.5 font-sans text-sm text-[var(--color-dusk)]">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[var(--color-umber)]"
                    aria-invalid={!!errors.consent}
                  />
                  I agree to be contacted about this enquiry, per the{' '}
                  <a href="/legal/privacy-policy" className="underline text-[var(--color-umber)]">
                    Privacy Policy
                  </a>
                  .
                </label>
                {errors.consent && <p className="mt-1.5 font-sans text-xs text-[var(--color-error)]">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="agency-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans text-sm font-medium tracking-wide px-6 py-3.5 rounded-[var(--radius-button)] bg-[var(--color-umber)] text-[var(--color-midnight)] hover:bg-[var(--color-sand)] disabled:opacity-60"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {status === 'loading' ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          </div>

          <div>
            <div className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-7">
              <h2 className="font-display text-xl text-[var(--color-linen)]" style={{ fontWeight: 400 }}>
                Other ways to reach us
              </h2>
              <p className="mt-3 font-sans text-sm text-[var(--color-dusk)]">
                Email:{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-umber)] hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="mt-2 font-sans text-sm text-[var(--color-dusk)]">
                Phone:{' '}
                <a href={phoneHref} className="inline-flex items-center gap-1.5 text-[var(--color-umber)] hover:underline">
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                  {phoneDisplay}
                </a>
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-sans text-[11px] text-[var(--color-linen)]/80 transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                  >
                    <InstagramIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                    Instagram
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-sans text-[11px] text-[var(--color-linen)]/80 transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
              </div>

              <div className="mt-8">
                <h3 className="eyebrow mb-4">Quick questions</h3>
                <FAQAccordion items={contactFaqs} tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function inputClass(hasError: boolean) {
  return `agency-focus-field w-full rounded-[var(--radius-button)] border ${hasError ? 'border-[var(--color-error)]' : 'border-white/10'} bg-black/30 px-3.5 py-2.5 font-sans text-sm text-[var(--color-linen)] placeholder:text-[var(--color-dusk)]/55 focus:border-[var(--color-umber)] transition-colors`;
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
      <label htmlFor={id} className="block font-sans text-xs font-medium text-[var(--color-dusk)] mb-1.5">
        {label} {required && <span className="text-[var(--color-umber)]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 font-sans text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
