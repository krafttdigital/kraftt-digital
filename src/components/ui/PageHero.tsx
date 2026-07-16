import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Calculator,
  Code2,
  FileText,
  Images,
  Layers3,
  MessageSquare,
  MousePointer2,
  NotebookPen,
  Palette,
  PanelsTopLeft,
  PenTool,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type VisualKind = 'services' | 'portfolio' | 'about' | 'blog' | 'tools' | 'contact';

interface PageHeroProps {
  breadcrumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  description?: string;
  visual: VisualKind;
  stats?: { value: string; label: string }[];
}

const visualConfig = {
  services: {
    label: 'Service map',
    icon: <Layers3 className="w-4 h-4" aria-hidden="true" />,
    tiles: [
      { label: 'Web', meta: 'Speed + SEO', icon: <Code2 className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-cyan)' },
      { label: 'Store', meta: 'Checkout', icon: <ShoppingBag className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-signal)' },
      { label: 'Brand', meta: 'System', icon: <Palette className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-coral)' },
      { label: 'Growth', meta: 'Traffic', icon: <TrendingUp className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-sand)' },
    ],
  },
  portfolio: {
    label: 'Case study board',
    icon: <Images className="w-4 h-4" aria-hidden="true" />,
    tiles: [
      { label: 'Brief', meta: 'Challenge', icon: <BriefcaseBusiness className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-cyan)' },
      { label: 'Direction', meta: 'Strategy', icon: <MousePointer2 className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-signal)' },
      { label: 'Build', meta: 'Solution', icon: <PanelsTopLeft className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-coral)' },
      { label: 'Outcome', meta: 'Results', icon: <BarChart3 className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-sand)' },
    ],
  },
  about: {
    label: 'Agency operating system',
    icon: <Sparkles className="w-4 h-4" aria-hidden="true" />,
    tiles: [
      { label: 'Scope', meta: 'Before price', icon: <FileText className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-cyan)' },
      { label: 'Review', meta: 'Human QA', icon: <BadgeCheck className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-signal)' },
      { label: 'Systems', meta: 'Fewer handoffs', icon: <Layers3 className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-coral)' },
      { label: 'Clarity', meta: 'No fake proof', icon: <Search className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-sand)' },
    ],
  },
  blog: {
    label: 'Editorial desk',
    icon: <NotebookPen className="w-4 h-4" aria-hidden="true" />,
    tiles: [
      { label: 'Research', meta: 'Useful angles', icon: <Search className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-cyan)' },
      { label: 'Draft', meta: 'Original copy', icon: <PenTool className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-signal)' },
      { label: 'Design', meta: 'Readable', icon: <PanelsTopLeft className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-coral)' },
      { label: 'Action', meta: 'Next step', icon: <TrendingUp className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-sand)' },
    ],
  },
  tools: {
    label: 'Calculator lab',
    icon: <Calculator className="w-4 h-4" aria-hidden="true" />,
    tiles: [
      { label: 'Inputs', meta: 'Local only', icon: <MousePointer2 className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-cyan)' },
      { label: 'Formula', meta: 'Tested math', icon: <Calculator className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-signal)' },
      { label: 'Charts', meta: 'Visual readout', icon: <BarChart3 className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-coral)' },
      { label: 'Decision', meta: 'Next move', icon: <BadgeCheck className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-sand)' },
    ],
  },
  contact: {
    label: 'Project intake',
    icon: <MessageSquare className="w-4 h-4" aria-hidden="true" />,
    tiles: [
      { label: 'Brief', meta: 'Your goal', icon: <FileText className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-cyan)' },
      { label: 'Scope', meta: 'Right package', icon: <Search className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-signal)' },
      { label: 'Proposal', meta: 'Fixed price', icon: <BadgeCheck className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-coral)' },
      { label: 'Send', meta: 'Start clean', icon: <Send className="w-4 h-4" aria-hidden="true" />, color: 'var(--color-sand)' },
    ],
  },
} satisfies Record<VisualKind, { label: string; icon: ReactNode; tiles: { label: string; meta: string; icon: ReactNode; color: string }[] }>;

export function PageHero({ breadcrumbs, eyebrow, title, description, visual, stats }: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const config = visualConfig[visual];

  return (
    <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[98px] md:pb-20">
      <div className="kd-hero-grid absolute inset-0 opacity-[0.18]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-bone)]" aria-hidden="true" />
      <div className="container-kd relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Breadcrumbs items={breadcrumbs} />
          <p className="eyebrow mt-6 mb-4">{eyebrow}</p>
          <h1 className="text-balance font-display text-[36px] leading-[1.07] text-[var(--color-midnight)] md:text-[56px]" style={{ fontWeight: 300 }}>
            {title}
          </h1>
          {description && <p className="mt-5 max-w-2xl font-sans text-[15px] leading-relaxed text-[var(--color-midnight)]/68">{description}</p>}
          {stats && stats.length > 0 && (
            <div className="mt-8 grid w-full max-w-2xl min-w-0 grid-cols-3 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-bone)] bg-[var(--color-white-paper)]/70 backdrop-blur">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0 border-r border-[var(--color-bone)] px-3 py-4 last:border-r-0 sm:px-4">
                  <span className="block font-display text-2xl text-[var(--color-midnight)] md:text-3xl" style={{ fontWeight: 300 }}>
                    {stat.value}
                  </span>
                  <span className="mt-1 block break-words font-sans text-[8px] uppercase leading-tight tracking-[0.1em] text-[var(--color-midnight)]/52 sm:text-[10px] sm:tracking-[0.16em]">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="relative hidden min-h-[360px] lg:block"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-[var(--radius-card)] border border-[var(--color-bone)] bg-[var(--color-white-paper)]/74 p-5 shadow-[0_28px_90px_rgba(13,13,13,0.1)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[var(--color-bone)] pb-4">
              <div className="inline-flex items-center gap-2 text-[var(--color-umber)]">
                {config.icon}
                <span className="font-sans text-[10px] uppercase tracking-[0.2em]">{config.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--color-coral)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-sand)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-4">
              {config.tiles.map((tile, index) => (
                <motion.div
                  key={tile.label}
                  className="relative overflow-hidden rounded-[8px] border border-[var(--color-bone)] bg-[var(--color-parchment)]/78 p-4"
                  animate={shouldReduceMotion ? undefined : { y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 5.2 + index, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="absolute inset-x-3 top-0 h-px" style={{ backgroundColor: tile.color, opacity: 0.72 }} />
                  <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-[6px] bg-[var(--color-midnight)]" style={{ color: tile.color }}>
                    {tile.icon}
                  </div>
                  <p className="relative mt-4 font-sans text-sm font-medium text-[var(--color-midnight)]">{tile.label}</p>
                  <p className="relative mt-1 font-sans text-[11px] text-[var(--color-midnight)]/56">{tile.meta}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-[8px] border border-[var(--color-bone)] bg-[var(--color-midnight)] p-4">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-[var(--color-linen)]">Scroll-activated workspace</span>
                <Bot className="w-4 h-4 text-[var(--color-sand)]" aria-hidden="true" />
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                <div className="space-y-2">
                  {[74, 88, 61].map((width, index) => (
                    <span key={width} className="block h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className="block h-full rounded-full bg-[var(--color-umber)]"
                        initial={{ width: '20%' }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: shouldReduceMotion ? 0.1 : 1, delay: 0.25 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  ))}
                </div>
                <Sparkles className="mt-0.5 w-5 h-5 text-[var(--color-sand)]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
