import { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ServiceFAQ } from '@/types';
import { trackEvent } from '@/utils/analytics';

export function FAQAccordion({ items, tone = 'light' }: { items: ServiceFAQ[]; tone?: 'light' | 'dark' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();
  const isDark = tone === 'dark';

  return (
    <div className={isDark ? 'divide-y divide-white/10' : 'divide-y divide-[var(--color-bone)]'}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  if (!isOpen) trackEvent('faq_open', { question: item.question });
                  setOpenIndex(isOpen ? null : index);
                }}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className={`font-sans text-[15px] ${isDark ? 'text-[var(--color-linen)]' : 'text-[var(--color-midnight)]'}`} style={{ fontWeight: 500 }}>
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4.5 h-4.5 shrink-0 text-[var(--color-umber)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className={`pb-5 font-sans text-sm leading-relaxed max-w-2xl ${isDark ? 'text-[var(--color-dusk)]' : 'text-[var(--color-midnight)]/70'}`}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
