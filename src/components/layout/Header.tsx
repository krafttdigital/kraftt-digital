import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react';
import { primaryNav, resourceNav } from '@/data/navigation';
import { siteConfig } from '@/config/siteConfig';
import { trackEvent } from '@/utils/analytics';
import { CurrencyToggle } from './CurrencyToggle';
import { MobileMenu } from './MobileMenu';
import primaryLightLogo from '../../../assets/PrimaryLight Logo-Photoroom.png';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const [lastPathname, setLastPathname] = useState(location.pathname);
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setMobileOpen(false);
    setResourcesOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 18);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    };
  }, []);

  function isActive(href: string) {
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href || (href !== '/' && location.pathname.startsWith(`${href}/`));
  }

  function openResources() {
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    setResourcesOpen(true);
  }

  function closeResourcesSoon() {
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    resourcesCloseTimer.current = setTimeout(() => setResourcesOpen(false), 160);
  }

  const resourcesActive = resourceNav.some((item) => isActive(item.href));

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-[var(--color-border-light)] bg-[rgba(247,244,238,0.99)] shadow-[0_14px_42px_rgba(13,13,13,0.07)] md:bg-[rgba(242,239,233,0.96)] md:backdrop-blur-xl'
          : 'border-[var(--color-border-light)] bg-[rgba(247,244,238,0.985)] md:bg-[rgba(242,239,233,0.94)] md:backdrop-blur-xl'
      }`}
    >
      <motion.span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-umber)]/70 to-transparent"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: scrolled ? 1 : 0.55, scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="container-kd flex h-[74px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} home`}>
          <img src={primaryLightLogo} alt="Kraftt Digital" className="h-11 w-auto object-contain md:h-12" />
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/66 p-1.5 shadow-[0_12px_34px_rgba(13,13,13,0.05)] backdrop-blur-xl lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`agency-magnetic relative flex h-9 items-center rounded-[6px] px-3 font-sans text-[13px] tracking-wide ${
                  active
                    ? 'bg-[var(--color-midnight)] text-[var(--color-parchment)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-midnight)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="relative" onMouseEnter={openResources} onMouseLeave={closeResourcesSoon}>
            <button
              type="button"
              className={`agency-magnetic relative flex h-9 items-center gap-1.5 rounded-[6px] px-3 font-sans text-[13px] tracking-wide ${
                resourcesActive || resourcesOpen
                  ? 'bg-[var(--color-midnight)] text-[var(--color-parchment)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-midnight)]'
              }`}
              aria-expanded={resourcesOpen}
              aria-controls="desktop-resources-menu"
              onClick={() => setResourcesOpen((value) => !value)}
              onFocus={openResources}
            >
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {resourcesOpen && (
              <div
                id="desktop-resources-menu"
                className="absolute left-0 top-full w-52 pt-2"
                onMouseEnter={openResources}
                onMouseLeave={closeResourcesSoon}
              >
                <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-1.5 shadow-[0_22px_70px_rgba(13,13,13,0.14)]">
                  {resourceNav.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setResourcesOpen(false)}
                      className="flex min-h-11 items-center rounded-[6px] px-3 font-sans text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-parchment)] hover:text-[var(--color-midnight)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CurrencyToggle compact />
          <Link
            to="/contact"
            onClick={() => trackEvent('nav_audit_click', { location: 'desktop_header' })}
            className="agency-magnetic inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-2.5 font-sans text-[13px] font-medium tracking-wide text-[var(--color-parchment)] shadow-[0_14px_36px_rgba(13,13,13,0.18)] hover:bg-[var(--color-umber)]"
          >
            Request an Audit
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CurrencyToggle compact />
          <button
            type="button"
            className="agency-magnetic rounded-[6px] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/78 p-2 text-[var(--color-midnight)] shadow-[0_10px_28px_rgba(13,13,13,0.08)]"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
