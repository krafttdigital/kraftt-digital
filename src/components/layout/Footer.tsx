import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { footerServiceLinks, legalLinks, primaryNav, resourceNav } from '@/data/navigation';
import { toolsList } from '@/data/tools';
import { trackEvent } from '@/utils/analytics';
import { InstagramIcon, LinkedInIcon } from '@/components/ui/SocialIcons';
import primaryLightLogo from '../../../assets/PrimaryLight Logo-Photoroom.png';

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:+91${siteConfig.contact.phone}`;
  const phoneDisplay = `+91 ${siteConfig.contact.phone}`;

  return (
    <footer className="site-footer relative overflow-hidden bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]">
      <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
      <div className="container-kd relative z-10 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.8fr_0.9fr_0.9fr]">
          <div>
            <Link to="/" className="inline-flex" aria-label={`${siteConfig.name} home`}>
              <img src={primaryLightLogo} alt="Kraftt Digital" className="h-14 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="mt-5 max-w-sm font-sans text-sm font-medium leading-relaxed text-[var(--color-text-on-dark)]">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">
              Turning earned offline reputation into a credible website, search presence and enquiry system for established owner-led businesses.
            </p>
            <Link
              to="/contact"
              onClick={() => trackEvent('final_cta_click', { location: 'footer' })}
              className="agency-magnetic mt-7 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-linen)] px-4 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:bg-[var(--color-sand)]"
            >
              Request an Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-[var(--color-sand)]">Navigate</h3>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-sans text-[13px] text-[var(--color-text-secondary-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-[var(--color-sand)]">Services</h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-sans text-[13px] text-[var(--color-text-secondary-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="font-sans text-[13px] font-medium text-[var(--color-sand)] transition-colors hover:text-[var(--color-text-on-dark)]">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-[var(--color-sand)]">Resources</h3>
            <ul className="space-y-2.5">
              {resourceNav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-sans text-[13px] text-[var(--color-text-secondary-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">
                    {item.label}
                  </Link>
                </li>
              ))}
              {toolsList.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link to={`/tools/${tool.slug}`} className="font-sans text-[13px] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">
                    {tool.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 font-sans text-xs text-[var(--color-text-muted-on-dark)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <span>Bathinda, Punjab</span>
            <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-[var(--color-text-on-dark)]">
              {siteConfig.contact.email}
            </a>
            <a href={phoneHref} className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-text-on-dark)]">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              {phoneDisplay}
            </a>
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-text-on-dark)]">
                <InstagramIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                Instagram
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-text-on-dark)]">
                <LinkedInIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[11px] text-[var(--color-text-muted-on-dark)]">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="font-sans text-[11px] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
