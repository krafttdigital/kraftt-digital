import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { footerServiceLinks, legalLinks, primaryNav } from '@/data/navigation';
import { toolsList } from '@/data/tools';
import { InstagramIcon, LinkedInIcon } from '@/components/ui/SocialIcons';

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:+91${siteConfig.contact.phone}`;
  const phoneDisplay = `+91 ${siteConfig.contact.phone}`;

  return (
    <footer className="site-footer agency-connector relative overflow-hidden text-[var(--color-linen)]">
      <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
      <div className="container-kd relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl" style={{ fontWeight: 300 }}>
                {siteConfig.logo.wordmark}
                <span className="text-[var(--color-umber)]">.</span>
              </span>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[var(--color-umber)] pt-0.5">
                {siteConfig.logo.subLabel}
              </span>
            </Link>
            <p className="mt-4 font-display italic text-base text-[var(--color-dusk)] max-w-xs" style={{ fontWeight: 300 }}>
              {siteConfig.tagline}
            </p>
            <p className="mt-4 font-sans text-xs text-[var(--color-dusk)] max-w-xs leading-relaxed">
              Remote-first, working with clients across India, the US, UK, UAE, Canada and Australia. Billing available in INR and USD.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kraftt Digital on Instagram"
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
                  aria-label="Kraftt Digital on LinkedIn"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-sans text-[11px] text-[var(--color-linen)]/80 transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-sans text-[13px] text-[var(--color-linen)]/80 hover:text-[var(--color-umber)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="font-sans text-[13px] text-[var(--color-linen)]/80 hover:text-[var(--color-umber)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Tools</h3>
            <ul className="space-y-2.5">
              {toolsList.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link to={`/tools/${tool.slug}`} className="font-sans text-[13px] text-[var(--color-linen)]/80 hover:text-[var(--color-umber)] transition-colors">
                    {tool.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tools" className="font-sans text-[13px] text-[var(--color-umber)]">
                  All tools →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col gap-2 font-sans text-xs text-[var(--color-dusk)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[var(--color-umber)] transition-colors">
              {siteConfig.contact.email}
            </a>
            <a href={phoneHref} className="inline-flex items-center gap-1.5 hover:text-[var(--color-umber)] transition-colors">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              {phoneDisplay}
            </a>
          </div>
          <Link
            to="/contact"
            className="font-sans text-xs font-medium tracking-wide px-4 py-2 rounded-[var(--radius-button)] border border-white/15 text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)] transition-colors w-fit"
          >
            Book a consultation
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <p className="font-sans text-[11px] text-[var(--color-dusk)]">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="font-sans text-[11px] text-[var(--color-dusk)] hover:text-[var(--color-umber)] transition-colors">
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
