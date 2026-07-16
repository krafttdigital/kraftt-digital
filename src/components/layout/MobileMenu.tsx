import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Sparkles, X } from 'lucide-react';
import { primaryNav, resourceNav } from '@/data/navigation';
import { trackEvent } from '@/utils/analytics';
import primaryLightLogo from '../../../assets/PrimaryLight Logo-Photoroom.png';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a, button');
    focusables?.[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  function go(href: string, eventName?: string) {
    if (eventName) trackEvent(eventName, { location: 'mobile_menu' });
    setResourcesOpen(false);
    onClose();
    navigate(href);
  }

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] overflow-y-auto bg-[var(--color-parchment)] text-[var(--color-midnight)] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          ref={panelRef}
        >
          <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
          <div className="relative min-h-screen">
            <div className="flex items-center justify-between border-b border-[var(--color-bone)] px-5 py-5">
              <img src={primaryLightLogo} alt="Kraftt Digital" className="h-12 w-auto object-contain" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-[6px] border border-[var(--color-bone)] bg-[var(--color-white-paper)]/70 p-2 text-[var(--color-midnight)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="px-5 pt-6">
              <div className="rounded-[var(--radius-card)] border border-[var(--color-bone)] bg-[var(--color-white-paper)]/68 p-5 shadow-[0_20px_60px_rgba(13,13,13,0.08)]">
                <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-umber)]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Menu
                </span>
                <nav className="mt-5 grid gap-2" aria-label="Primary">
                  {primaryNav.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.035 }}
                      onClick={() => go(item.href)}
                      className="min-h-11 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/72 px-4 py-4 text-left font-sans text-base text-[var(--color-midnight)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)]/72">
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-4 text-left font-sans text-base text-[var(--color-midnight)] transition-colors hover:text-[var(--color-umber)]"
                      aria-expanded={resourcesOpen}
                      aria-controls="mobile-resources-menu"
                      onClick={() => setResourcesOpen((value) => !value)}
                    >
                      Resources
                      <ChevronDown className={`h-4 w-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {resourcesOpen && (
                        <motion.div
                          id="mobile-resources-menu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden border-t border-[var(--color-border-light)]"
                        >
                          <div className="grid gap-2 p-2">
                            {resourceNav.map((item) => (
                              <button
                                key={item.href}
                                type="button"
                                onClick={() => go(item.href)}
                                className="min-h-11 rounded-[6px] bg-[var(--color-bg-secondary)]/80 px-4 py-3 text-left font-sans text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-midnight)]"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>
              </div>
            </div>

            <div className="px-5 py-6">
              <button
                onClick={() => go('/contact', 'nav_audit_click')}
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] py-3.5 text-center font-sans text-sm font-medium tracking-wide text-[var(--color-linen)] shadow-[0_18px_44px_rgba(13,13,13,0.18)]"
              >
                Request a Digital Authority Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(menu, document.body);
}
