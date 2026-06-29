import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Search, ShoppingBag, Sparkles } from 'lucide-react';
import type { PortfolioProject } from '@/types';

interface CaseStudyVisualProps {
  project: PortfolioProject;
  variant?: 'card' | 'hero' | 'gallery';
  className?: string;
}

export function CaseStudyVisual({ project, variant = 'card', className = '' }: CaseStudyVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const isHero = variant === 'hero';
  const previewUrl = project.projectUrl && project.projectUrl !== '#' ? project.projectUrl : undefined;
  const shouldShowImage = Boolean(project.imageUrl && (variant !== 'card' || project.slug === 'the-vibed-vines'));
  const labels = project.highlights?.slice(0, isHero ? 6 : 4) ?? project.services.slice(0, isHero ? 6 : 4);

  if (shouldShowImage && project.imageUrl) {
    return (
      <div
        className={`relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-black ${className}`}
        role="img"
        aria-label={project.heroImageAlt}
      >
        <img src={project.imageUrl} alt={project.heroImageAlt} className="h-full min-h-[260px] w-full object-cover object-top" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,4,5,0.42))]" aria-hidden="true" />
      </div>
    );
  }

  if (previewUrl && variant === 'card') {
    return (
      <div
        className={`relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#030405] ${className}`}
        role="img"
        aria-label={project.heroImageAlt}
      >
        <div className="absolute inset-0 agency-star-panel" aria-hidden="true">
          <div className="kd-hero-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-6 rounded-[12px] border border-white/10 bg-white/[0.055]" />
          <div className="absolute left-10 top-12 h-2 w-1/2 rounded-full bg-white/16" />
          <div className="absolute left-10 top-20 grid w-[72%] grid-cols-3 gap-3">
            <span className="h-14 rounded-[8px] bg-[var(--color-cyan)]/16" />
            <span className="h-14 rounded-[8px] bg-[var(--color-signal)]/14" />
            <span className="h-14 rounded-[8px] bg-[var(--color-umber)]/18" />
          </div>
        </div>
        <div className="relative z-10 flex h-8 items-center justify-between border-b border-white/10 bg-black/70 px-3 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--color-coral)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-sand)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
          </div>
          <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[var(--color-sand)]">Live preview</span>
        </div>
        <iframe
          title={`${project.client} live preview`}
          src={previewUrl}
          loading="lazy"
          scrolling="no"
          className="pointer-events-none relative z-10 h-[calc(100%-2rem)] w-full border-0 bg-[#030405] opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,transparent_58%,rgba(3,4,5,0.58))]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`agency-star-panel relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#030405] ${isHero ? 'min-h-[430px]' : 'aspect-[4/3]'} ${className}`}
      role="img"
      aria-label={project.heroImageAlt}
    >
      <div className="kd-hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(105,216,255,0.2),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(167,127,78,0.2),transparent_28%),linear-gradient(135deg,rgba(3,4,5,0.34),rgba(3,4,5,0.92))]" aria-hidden="true" />

      <motion.div
        className={`absolute rounded-[18px] border border-white/12 bg-white/[0.065] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
          isHero ? 'left-8 top-10 w-[64%] p-5 md:left-10 md:top-12 md:p-6' : 'left-5 top-5 w-[72%] p-3'
        }`}
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--color-coral)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-sand)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
          </div>
          <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[var(--color-sand)]">Storefront</span>
        </div>

        <div className={`${isHero ? 'mt-6 grid gap-5 md:grid-cols-[1fr_0.68fr]' : 'mt-4 space-y-3'}`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--color-sand)]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {project.client}
            </span>
            <div className={`${isHero ? 'mt-5 space-y-3' : 'mt-4 space-y-2'}`}>
              <span className={`${isHero ? 'h-3 w-[92%]' : 'h-2.5 w-[86%]'} block rounded-full bg-white/20`} />
              <span className={`${isHero ? 'h-3 w-[70%]' : 'h-2.5 w-[58%]'} block rounded-full bg-white/12`} />
              <span className={`${isHero ? 'h-3 w-[54%]' : 'h-2.5 w-[72%]'} block rounded-full bg-white/10`} />
            </div>
            <div className={`${isHero ? 'mt-7 grid grid-cols-3 gap-3' : 'mt-4 grid grid-cols-3 gap-2'}`}>
              {['Drop', 'Anime', 'Street'].map((item, index) => (
                <motion.span
                  key={item}
                  className={`${isHero ? 'h-20' : 'h-12'} rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(105,216,255,0.22),rgba(167,127,78,0.18))]`}
                  animate={shouldReduceMotion ? undefined : { opacity: [0.62, 1, 0.62] }}
                  transition={shouldReduceMotion ? undefined : { duration: 3.2 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>

          {isHero && (
            <div className="rounded-[14px] border border-white/10 bg-black/24 p-4">
              <div className="flex items-center gap-2 text-[var(--color-sand)]">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span className="font-sans text-[10px] uppercase tracking-[0.18em]">Product path</span>
              </div>
              <div className="mt-4 space-y-3">
                {labels.slice(0, 3).map((label) => (
                  <div key={label} className="flex items-start gap-2 rounded-[8px] border border-white/10 bg-white/[0.045] p-3">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-[var(--color-signal)]" aria-hidden="true" />
                    <span className="font-sans text-xs leading-relaxed text-[var(--color-dusk)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className={`absolute right-5 rounded-[22px] border border-white/12 bg-[#080909]/86 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl ${
          isHero ? 'bottom-8 h-[260px] w-[142px] md:right-10' : 'bottom-5 h-[158px] w-[86px]'
        }`}
        animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(244,239,231,0.08),rgba(3,4,5,0.82))] p-2">
          <span className="mx-auto block h-1 w-7 rounded-full bg-white/20" />
          <div className={`${isHero ? 'mt-5' : 'mt-3'} space-y-2`}>
            <span className={`${isHero ? 'h-16' : 'h-9'} block rounded-[8px] bg-[linear-gradient(135deg,rgba(105,216,255,0.32),rgba(167,127,78,0.22))]`} />
            <span className="block h-2 rounded-full bg-white/22" />
            <span className="block h-2 w-3/4 rounded-full bg-white/12" />
            <span className="block h-7 rounded-[6px] bg-[var(--color-umber)]/85" />
          </div>
        </div>
      </motion.div>

      <div className={`absolute ${isHero ? 'bottom-9 left-10' : 'bottom-5 left-5'} flex flex-wrap gap-2`}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-signal)]/25 bg-[var(--color-signal)]/10 px-3 py-1 font-sans text-[10px] text-[var(--color-forest-text)]">
          <MessageCircle className="h-3 w-3" aria-hidden="true" />
          WhatsApp orders
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-sand)]/24 bg-[var(--color-sand)]/10 px-3 py-1 font-sans text-[10px] text-[var(--color-sand)]">
          <Search className="h-3 w-3" aria-hidden="true" />
          SEO + JSON-LD
        </span>
      </div>
    </div>
  );
}
