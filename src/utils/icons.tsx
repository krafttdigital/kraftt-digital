/* eslint-disable react-refresh/only-export-components -- this module intentionally
   exports a small lookup helper (getIcon) and a thin resolver component (DynamicIcon)
   together; splitting them into separate files would obscure that they are one
   tightly-coupled icon-resolution utility. */
import {
  Layout,
  Store,
  TrendingUp,
  PenLine,
  LayoutDashboard,
  Bot,
  Palette,
  Share2,
  Wallet,
  Target,
  Scale,
  PiggyBank,
  Receipt,
  Landmark,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Layout,
  Store,
  TrendingUp,
  PenLine,
  LayoutDashboard,
  Bot,
  Palette,
  Share2,
  Wallet,
  Target,
  Scale,
  PiggyBank,
  Receipt,
  Landmark,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Layout;
}

/**
 * Renders an icon resolved by name. Centralising the by-name lookup behind
 * one component (rather than doing `const Icon = getIcon(name)` followed by
 * `<Icon />` in every consumer) keeps the "select a component dynamically"
 * pattern in a single, well-understood place instead of repeated across
 * the codebase.
 */
export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  /* eslint-disable react-hooks/static-components -- intentional: this is the one
     centralised icon-by-name resolver; ICONS is a fixed, module-level lookup table,
     so the resolved component is referentially stable across renders for a given name. */
  const Icon = getIcon(name);
  return <Icon className={className} aria-hidden="true" />;
  /* eslint-enable react-hooks/static-components */
}
