import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Bot,
  Code2,
  Layers3,
  MousePointer2,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

const capabilityTiles = [
  {
    label: 'Web systems',
    meta: 'Core Web Vitals',
    icon: <Code2 className="w-4 h-4" aria-hidden="true" />,
    tone: 'text-[var(--color-cyan)]',
  },
  {
    label: 'Shopify',
    meta: 'Checkout-ready',
    icon: <ShoppingBag className="w-4 h-4" aria-hidden="true" />,
    tone: 'text-[var(--color-signal)]',
  },
  {
    label: 'Brand identity',
    meta: 'Design systems',
    icon: <Palette className="w-4 h-4" aria-hidden="true" />,
    tone: 'text-[var(--color-coral)]',
  },
  {
    label: 'Growth',
    meta: 'SEO + social',
    icon: <TrendingUp className="w-4 h-4" aria-hidden="true" />,
    tone: 'text-[var(--color-sand)]',
  },
];

const productionRows = [
  { label: 'Strategy', width: 'w-[72%]', color: 'bg-[var(--color-cyan)]' },
  { label: 'Design', width: 'w-[86%]', color: 'bg-[var(--color-signal)]' },
  { label: 'Build', width: 'w-[64%]', color: 'bg-[var(--color-umber)]' },
  { label: 'Growth', width: 'w-[78%]', color: 'bg-[var(--color-coral)]' },
];

const floatingNotes = [
  { label: 'Launch QA', value: '32 checks', className: 'left-2 top-12', icon: <BadgeCheck className="w-4 h-4" aria-hidden="true" /> },
  { label: 'AI creative', value: 'Human-reviewed', className: 'right-8 top-0', icon: <Bot className="w-4 h-4" aria-hidden="true" /> },
  { label: 'SEO layer', value: 'Schema + AEO', className: 'left-12 bottom-16', icon: <Search className="w-4 h-4" aria-hidden="true" /> },
];

export function PremiumHeroScene() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--color-midnight)]" />
      <div className="kd-hero-grid absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(9,10,11,0.98) 0%, rgba(9,10,11,0.9) 42%, rgba(9,10,11,0.58) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-44"
        style={{
          background: 'linear-gradient(0deg, rgba(9,10,11,1) 0%, rgba(9,10,11,0) 100%)',
        }}
      />

      <svg className="absolute right-0 top-20 hidden h-[520px] w-[680px] opacity-70 lg:block" viewBox="0 0 680 520" fill="none">
        <path className="kd-line-flow" d="M48 408C156 338 176 226 290 212C416 196 458 78 632 92" stroke="url(#heroLineA)" strokeWidth="1.5" />
        <path className="kd-line-flow" d="M72 132C166 178 210 288 328 298C456 310 498 400 636 378" stroke="url(#heroLineB)" strokeWidth="1.5" />
        <path d="M126 428H560" stroke="rgba(244,239,231,0.08)" />
        <path d="M126 108H560" stroke="rgba(244,239,231,0.08)" />
        <defs>
          <linearGradient id="heroLineA" x1="48" y1="408" x2="632" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#69D8FF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#69D8FF" />
            <stop offset="1" stopColor="#42E8C4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroLineB" x1="72" y1="132" x2="636" y2="378" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF7A5F" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FF7A5F" />
            <stop offset="1" stopColor="#A77F4E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="absolute right-[-14rem] top-20 hidden h-[520px] w-[680px] lg:block"
        animate={shouldReduceMotion ? undefined : { y: [-8, 8, -8], rotate: [-1.2, 0.7, -1.2] }}
        transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="kd-surface absolute inset-8 rotate-[-3deg] rounded-[8px] p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-coral)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-sand)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-signal)]" />
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--color-dusk)]">
              <Activity className="w-3.5 h-3.5 text-[var(--color-signal)]" aria-hidden="true" />
              Live build board
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {capabilityTiles.map((item, index) => (
              <motion.div
                key={item.label}
                className="rounded-[8px] border border-white/10 bg-white/[0.055] p-4"
                animate={shouldReduceMotion ? undefined : { y: [0, index % 2 === 0 ? -5 : 5, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className={`mb-4 inline-flex h-8 w-8 items-center justify-center rounded-[6px] bg-white/[0.06] ${item.tone}`}>
                  {item.icon}
                </div>
                <p className="font-sans text-xs font-medium text-[var(--color-linen)]">{item.label}</p>
                <p className="mt-1 font-sans text-[11px] text-[var(--color-dusk)]">{item.meta}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-[8px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between">
              <p className="font-sans text-xs text-[var(--color-linen)]">Production pipeline</p>
              <Zap className="w-4 h-4 text-[var(--color-signal)]" aria-hidden="true" />
            </div>
            <div className="mt-4 space-y-3">
              {productionRows.map((row, index) => (
                <div key={row.label} className="grid grid-cols-[72px_1fr] items-center gap-3">
                  <span className="font-sans text-[11px] text-[var(--color-dusk)]">{row.label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={`h-full rounded-full ${row.color}`}
                      initial={{ width: '24%' }}
                      animate={{ width: shouldReduceMotion ? '78%' : ['34%', '100%', '54%', '86%'][index] }}
                      transition={{ duration: shouldReduceMotion ? 0.1 : 1.3, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="kd-scanline absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-[rgba(105,216,255,0)] via-[rgba(105,216,255,0.14)] to-[rgba(105,216,255,0)]" />
        </div>

        {floatingNotes.map((note, index) => (
          <motion.div
            key={note.label}
            className={`kd-surface absolute ${note.className} rounded-[8px] px-4 py-3`}
            animate={shouldReduceMotion ? undefined : { y: [0, index === 1 ? 12 : -10, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 5.5 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2 text-[var(--color-signal)]">{note.icon}</div>
            <p className="mt-2 font-sans text-[11px] text-[var(--color-linen)]">{note.label}</p>
            <p className="mt-0.5 font-sans text-[10px] text-[var(--color-dusk)]">{note.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="kd-surface absolute bottom-14 right-5 w-56 rounded-[8px] p-4 opacity-70 sm:hidden"
        animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 text-[var(--color-signal)]">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span className="font-sans text-[10px] uppercase tracking-[0.18em]">Studio OS</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <span className="h-12 rounded-[6px] bg-[var(--color-cyan)]/18" />
          <span className="h-12 rounded-[6px] bg-[var(--color-signal)]/18" />
          <span className="h-12 rounded-[6px] bg-[var(--color-coral)]/18" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-[var(--color-dusk)]">
          <MousePointer2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="font-sans text-[11px]">Design to launch</span>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-[52%] hidden items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[var(--color-dusk)] md:flex">
        <Layers3 className="w-4 h-4 text-[var(--color-cyan)]" aria-hidden="true" />
        <span className="font-sans text-xs">Strategy, design, build, and growth in one operating system</span>
      </div>
    </div>
  );
}
