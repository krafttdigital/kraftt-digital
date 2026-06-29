import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { primaryNav } from '@/data/navigation';
import { serviceCategories } from '@/data/services';
import { siteConfig } from '@/config/siteConfig';
import { DynamicIcon } from '@/utils/icons';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
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

  function go(href: string) {
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
          className="fixed inset-0 z-[200] overflow-y-auto bg-[var(--color-midnight)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          ref={panelRef}
        >
          <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-25" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
              <span className="font-display text-2xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                {siteConfig.logo.wordmark}
                <span className="text-[var(--color-umber)]">.</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-[6px] border border-white/10 bg-white/[0.06] p-2 text-[var(--color-linen)] hover:text-[var(--color-umber)] transition-colors"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="px-5 pt-6">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.055] p-5">
                <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Menu
                </span>
                <nav className="mt-5 grid grid-cols-2 gap-2" aria-label="Primary">
                  {primaryNav.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.035 }}
                      onClick={() => go(item.href)}
                      className="rounded-[8px] border border-white/10 bg-white/[0.055] px-3 py-4 text-left font-sans text-sm text-[var(--color-linen)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="px-5 pt-5">
              <p className="eyebrow mb-3 text-[var(--color-sand)]">Service lanes</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceCategories.slice(0, 6).map((cat, index) => (
                  <motion.button
                    key={cat.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.18 + index * 0.03 }}
                    onClick={() => go(`/services/${cat.slug}`)}
                    className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-3 text-left font-sans text-xs text-[var(--color-dusk)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-linen)]"
                  >
                    <DynamicIcon name={cat.icon} className="h-4 w-4 shrink-0 text-[var(--color-umber)]" />
                    {cat.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="px-5 py-6">
              <button
                onClick={() => go('/contact')}
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-umber)] py-3.5 text-center font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] shadow-[0_12px_35px_rgba(167,127,78,0.28)]"
              >
                Start a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
