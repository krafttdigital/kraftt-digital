import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot, CheckCircle2, Code2, Palette, ShoppingBag, TrendingUp } from 'lucide-react';

const showcases = [
  {
    title: 'Launch system',
    eyebrow: 'Web + brand',
    description: 'A fast marketing site, conversion-ready copy, SEO metadata, and a brand system that keeps every page consistent.',
    to: '/services/web-design',
    accent: 'var(--color-cyan)',
    icon: <Code2 className="w-4 h-4" aria-hidden="true" />,
    layers: ['Homepage', 'Lead capture', 'Schema'],
  },
  {
    title: 'Commerce engine',
    eyebrow: 'Shopify + growth',
    description: 'Store setup, collection structure, product content, search basics, and launch checks before the first campaign goes live.',
    to: '/services/shopify-development',
    accent: 'var(--color-signal)',
    icon: <ShoppingBag className="w-4 h-4" aria-hidden="true" />,
    layers: ['Products', 'Checkout', 'Analytics'],
  },
  {
    title: 'Creative loop',
    eyebrow: 'AI + social',
    description: 'Ad concepts, product mockups, captions, and social assets produced quickly, then curated and finished by a human team.',
    to: '/services/ai-content',
    accent: 'var(--color-coral)',
    icon: <Bot className="w-4 h-4" aria-hidden="true" />,
    layers: ['Mockups', 'Campaigns', 'Posts'],
  },
];

export function StudioShowcase() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {showcases.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={item.to}
            className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[var(--color-graphite)] transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)]"
          >
            <div className="relative min-h-[230px] overflow-hidden border-b border-white/10 bg-[var(--color-midnight)] p-5">
              <div className="absolute inset-0 kd-hero-grid opacity-25" />
              <div
                className="absolute inset-x-8 top-8 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
              />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.06] px-3 py-2 font-sans text-xs text-[var(--color-linen)]">
                  <span style={{ color: item.accent }}>{item.icon}</span>
                  {item.eyebrow}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-dusk)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-umber)]" aria-hidden="true" />
              </div>

              <div className="relative mt-8 grid grid-cols-[0.8fr_1fr] gap-4">
                <div className="space-y-3">
                  {item.layers.map((layer, layerIndex) => (
                    <motion.div
                      key={layer}
                      className="rounded-[8px] border border-white/10 bg-white/[0.055] p-3"
                      animate={shouldReduceMotion ? undefined : { y: [0, layerIndex % 2 === 0 ? -4 : 4, 0] }}
                      transition={shouldReduceMotion ? undefined : { duration: 4.5 + layerIndex, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="font-sans text-[11px] text-[var(--color-linen)]">{layer}</span>
                      <span className="mt-2 block h-1.5 rounded-full bg-white/10">
                        <span className="block h-full rounded-full" style={{ width: `${54 + layerIndex * 16}%`, backgroundColor: item.accent }} />
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="relative rounded-[8px] border border-white/10 bg-black/20 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="h-14 rounded-[6px] bg-white/[0.06]" />
                    <span className="h-14 rounded-[6px]" style={{ backgroundColor: item.accent, opacity: 0.14 }} />
                    <span className="h-14 rounded-[6px]" style={{ backgroundColor: item.accent, opacity: 0.1 }} />
                    <span className="h-14 rounded-[6px] bg-white/[0.06]" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[var(--color-dusk)]">
                    {index === 0 && <Palette className="w-3.5 h-3.5" aria-hidden="true" />}
                    {index === 1 && <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />}
                    {index === 2 && <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span className="font-sans text-[10px] uppercase tracking-[0.16em]">Ready to hand over</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-display text-2xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-medium text-[var(--color-umber)]">
                Explore service <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
