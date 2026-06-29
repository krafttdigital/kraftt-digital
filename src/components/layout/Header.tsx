import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import { primaryNav } from '@/data/navigation';
import { siteConfig } from '@/config/siteConfig';
import { CurrencyToggle } from './CurrencyToggle';
import { ServiceMegaMenu } from './ServiceMegaMenu';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;
  const servicesActive = location.pathname.startsWith('/services');

  // Close the mega menu & mobile menu on route change. Adjusted during
  // render (React's recommended pattern for "resetting state when a prop
  // changes") rather than in an effect, to avoid an extra render pass.
  const [lastPathname, setLastPathname] = useState(location.pathname);
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'agency-glass-dark border-b border-white/10'
      }`}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <motion.span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-signal)] to-transparent"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: transparent ? 0 : 1, scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="container-kd flex items-center justify-between h-[74px]">
        <Link to="/" className="flex items-baseline gap-1.5 shrink-0" aria-label={`${siteConfig.name} — home`}>
          <span className="font-display text-2xl text-[var(--color-linen)]" style={{ fontWeight: 300, letterSpacing: 0 }}>
            {siteConfig.logo.wordmark}
            <span className="text-[var(--color-umber)]">.</span>
          </span>
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[var(--color-umber)] self-center pt-0.5">
            {siteConfig.logo.subLabel}
          </span>
        </Link>

        <nav className="agency-glass-dark hidden md:flex items-center gap-1 rounded-[var(--radius-card)] p-1" aria-label="Primary">
          {primaryNav.map((item) =>
            item.label === 'Services' ? (
              <div key={item.href} className="relative" onMouseEnter={() => setMegaOpen(true)}>
                <NavLink
                  to={item.href}
                  onFocus={() => setMegaOpen(true)}
                  className={({ isActive }) =>
                    `agency-magnetic relative flex h-9 items-center gap-1 rounded-[6px] px-3 font-sans text-[13px] tracking-wide ${
                      isActive || megaOpen ? 'bg-white/[0.08] text-[var(--color-sand)]' : 'text-[var(--color-linen)]/82 hover:bg-white/[0.06] hover:text-[var(--color-linen)]'
                    }`
                  }
                  aria-expanded={megaOpen}
                >
                  {item.label}
                  {(servicesActive || megaOpen) && <span className="absolute inset-x-3 bottom-1 h-px bg-[var(--color-umber)]" aria-hidden="true" />}
                  <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                </NavLink>
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                onMouseEnter={() => setMegaOpen(false)}
                className={({ isActive }) =>
                  `agency-magnetic relative flex h-9 items-center rounded-[6px] px-3 font-sans text-[13px] tracking-wide ${
                    isActive ? 'bg-white/[0.08] text-[var(--color-sand)]' : 'text-[var(--color-linen)]/82 hover:bg-white/[0.06] hover:text-[var(--color-linen)]'
                  }`
                }
              >
                {item.label}
                {location.pathname === item.href && <span className="absolute inset-x-3 bottom-1 h-px bg-[var(--color-umber)]" aria-hidden="true" />}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4" onMouseEnter={() => setMegaOpen(false)}>
          <CurrencyToggle compact />
          {/* <Link
            to="/contact"
            className="agency-magnetic font-sans text-[13px] font-medium tracking-wide px-4 py-2.5 rounded-[var(--radius-button)] bg-[var(--color-umber)] text-[var(--color-midnight)] shadow-[0_12px_35px_rgba(167,127,78,0.28)] hover:bg-[var(--color-sand)]"
          >
            Start a project
          </Link> */}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CurrencyToggle compact className="h-9 w-[108px]" />
          <button
            type="button"
            className="agency-magnetic rounded-[6px] border border-white/10 bg-white/[0.06] p-2 text-[var(--color-linen)]"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ServiceMegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
