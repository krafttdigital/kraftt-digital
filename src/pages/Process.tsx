import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, CheckCircle2, Clock3, FileText, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/config/siteConfig';

const processSteps = [
  {
    title: 'Audit',
    duration: '1-2 working days',
    happens: 'Kraftt reviews the current website, search presence, brand clarity, trust signals and enquiry path.',
    client: 'Share website links, social profiles, access screenshots and the main business goal.',
    kraftt: 'Find the strongest opportunities, blockers and the service mix that makes sense.',
    approval: 'You confirm whether the audit direction matches the business reality.',
  },
  {
    title: 'Proposal',
    duration: '1-2 working days',
    happens: 'A written scope is prepared with deliverables, price, timeline, payment milestones and exclusions.',
    client: 'Review the scope carefully and ask questions before payment or kickoff.',
    kraftt: 'Clarify what is included, what is not included and how extra requests will be quoted.',
    approval: 'You approve the written proposal before work begins.',
  },
  {
    title: 'Kickoff',
    duration: '1 working day',
    happens: 'Project inputs are collected and the working direction is locked.',
    client: 'Provide content, logo files, brand assets, product information, access and decision-maker feedback.',
    kraftt: 'Set up the project workspace, timeline, page structure and first production checklist.',
    approval: 'You confirm that the content and access needed for production has been provided.',
  },
  {
    title: 'Design & Build',
    duration: 'Depends on package scope',
    happens: 'The website, store, brand system, content, SEO or tool is created in working form.',
    client: 'Stay available for practical decisions, missing information and timely review points.',
    kraftt: 'Design, write, develop, configure integrations and test core user journeys.',
    approval: 'You review the working link or deliverable set before final launch preparation.',
  },
  {
    title: 'Review',
    duration: '1-3 working days',
    happens: 'Feedback is collected, corrections are made and final QA is completed.',
    client: 'Send clear, consolidated feedback instead of scattered revisions across different channels.',
    kraftt: 'Apply approved revisions, test mobile and desktop states, and confirm launch readiness.',
    approval: 'You approve the final delivery before launch or handover.',
  },
  {
    title: 'Launch',
    duration: '1 working day after approval',
    happens: 'The project goes live or the final deliverables are handed over.',
    client: 'Confirm domain, account ownership, payment completion and preferred communication channel for support.',
    kraftt: 'Connect domain, submit search foundations, hand over accounts, and share next-step maintenance guidance.',
    approval: 'You receive launch confirmation and handover details.',
  },
];

const expectations = [
  'Written scope is agreed before production starts.',
  'Payment milestones are confirmed before kickoff.',
  'Feedback should be consolidated and shared within agreed review windows.',
  'Third-party costs such as hosting, domains, apps and subscriptions are identified separately.',
  'New features, new sections or major additions are quoted before implementation.',
  'Final assets and agreed accounts are handed over to the client.',
];

export default function Process() {
  return (
    <>
      <SEO
        title="Kraftt Digital Process"
        description="The Kraftt Digital process: Audit, Proposal, Kickoff, Design & Build, Review and Launch with clear scope, approval points and handover."
        path="/process"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Process', path: '/process' }])} />

      <section className="relative overflow-hidden bg-[var(--color-parchment)] pt-[120px] pb-16 text-[var(--color-midnight)] md:pt-[140px] md:pb-24">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="container-kd relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Process</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
              {'Audit -> Proposal -> Kickoff -> Design & Build -> Review -> Launch'}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              A clear project rhythm keeps the work practical: scope first, build second, review honestly, launch with ownership and handover intact.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
                Request an Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/services" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
                View Services & Pricing <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_26px_80px_rgba(13,13,13,0.08)]">
            <p className="eyebrow">How feedback works</p>
            <div className="mt-5 grid gap-3">
              {expectations.slice(0, 4).map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                  <p className="font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Approval points</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Every stage has a clear job, owner and decision point.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.04} className="grid gap-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] lg:grid-cols-[0.28fr_1fr]">
                <div className="border-b border-[var(--color-border-light)] bg-[var(--color-midnight)] p-5 text-[var(--color-parchment)] lg:border-b-0 lg:border-r lg:border-[var(--color-border-dark)]">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-4 font-display text-3xl leading-tight" style={{ fontWeight: 300 }}>
                    {step.title}
                  </h3>
                  <p className="mt-5 flex items-center gap-2 font-sans text-xs text-[var(--color-text-muted-on-dark)]">
                    <Clock3 className="h-3.5 w-3.5 text-[var(--color-sand)]" aria-hidden="true" />
                    {step.duration}
                  </p>
                </div>

                <div className="grid gap-px bg-[var(--color-border-light)] md:grid-cols-2">
                  <ProcessCell label="What happens" body={step.happens} />
                  <ProcessCell label="Client provides" body={step.client} />
                  <ProcessCell label="Kraftt provides" body={step.kraftt} />
                  <ProcessCell label="Approval point" body={step.approval} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="container-kd grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Project rules</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Clear boundaries make the project feel calmer.
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {expectations.map((item, index) => (
              <Reveal key={item} delay={index * 0.04} className="rounded-[8px] border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] p-4">
                <BadgeCheck className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd grid gap-8 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <Reveal>
            <p className="eyebrow">Next step</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Know the process before the project starts.
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Send the business context first. Kraftt will respond with the best service path and what is needed to begin.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link to="/contact" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
              Request an Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`https://wa.me/91${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
              Start on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ProcessCell({ label, body }: { label: string; body: string }) {
  return (
    <div className="bg-[var(--color-bg-secondary)] p-5">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">{label}</p>
      </div>
      <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{body}</p>
    </div>
  );
}
