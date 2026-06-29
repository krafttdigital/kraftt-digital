import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/utils/format';
import { recommendBrandingTier } from '@/utils/calculators';
import { serviceCategories } from '@/data/services';

export default function BrandingCostCalculator() {
  const { currency } = useCurrency();
  const [needsLogoOnly, setNeedsLogoOnly] = useState(true);
  const [needsBusinessCollateral, setNeedsBusinessCollateral] = useState(false);
  const [needsFullGuidelines, setNeedsFullGuidelines] = useState(false);
  const [needsIllustrations, setNeedsIllustrations] = useState(false);

  const tierId = useMemo(
    () => recommendBrandingTier({ needsLogoOnly, needsBusinessCollateral, needsFullGuidelines, needsIllustrations }),
    [needsLogoOnly, needsBusinessCollateral, needsFullGuidelines, needsIllustrations],
  );

  const category = serviceCategories.find((c) => c.slug === 'brand-identity')!;
  const pkg = category.packages.find((p) => p.id === tierId)!;
  const formatted = formatPrice(pkg.price, currency);

  function reset() {
    setNeedsLogoOnly(true);
    setNeedsBusinessCollateral(false);
    setNeedsFullGuidelines(false);
    setNeedsIllustrations(false);
  }

  return (
    <ToolPageLayout
      slug="branding-cost-calculator"
      h1="Branding Cost Calculator"
      intro="Select what your business actually needs and see which Kraftt Digital brand identity package matches, with the real published price."
      calculator={
        <div>
          <div className="space-y-3">
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input type="checkbox" checked={needsLogoOnly} onChange={(e) => setNeedsLogoOnly(e.target.checked)} className="w-4 h-4 accent-[var(--color-umber)]" />
              Just a logo and basic colour palette
            </label>
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input
                type="checkbox"
                checked={needsBusinessCollateral}
                onChange={(e) => setNeedsBusinessCollateral(e.target.checked)}
                className="w-4 h-4 accent-[var(--color-umber)]"
              />
              Business card, letterhead and a voice/tone guide
            </label>
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input
                type="checkbox"
                checked={needsFullGuidelines}
                onChange={(e) => setNeedsFullGuidelines(e.target.checked)}
                className="w-4 h-4 accent-[var(--color-umber)]"
              />
              A full written brand guidelines document
            </label>
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input
                type="checkbox"
                checked={needsIllustrations}
                onChange={(e) => setNeedsIllustrations(e.target.checked)}
                className="w-4 h-4 accent-[var(--color-umber)]"
              />
              Custom illustrations and a packaging concept
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>

          <div className="mt-5 bg-[var(--color-midnight)] rounded-[var(--radius-card)] p-6">
            <p className="font-sans text-xs text-[var(--color-dusk)] tracking-wide">Recommended package</p>
            <p className="mt-1 font-display text-2xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
              {pkg.name}
            </p>
            {formatted && (
              <p className="mt-2 font-display text-3xl text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
                {formatted}
              </p>
            )}
            <Link to="/services/brand-identity" className="mt-4 inline-block font-sans text-xs text-[var(--color-umber)] hover:underline">
              See full package details →
            </Link>
          </div>
        </div>
      }
      formulaExplanation={
        <p>
          This tool maps your selected deliverables directly to one of three real Brand Identity packages — Brand
          starter, Brand identity, or Full brand system — based on how much beyond a basic logo you actually need.
        </p>
      }
      example={<p>A business that needs business cards and a brand voice guide, but not custom illustrations, matches the Brand identity package — the most popular tier.</p>}
      interpretation={<p>If your needs fall between tiers, the add-ons listed on each package (such as brand guidelines documents or custom illustrations) can often bridge the gap without moving to a higher tier.</p>}
      faqs={[
        { question: 'Can I add specific items individually instead of upgrading the whole package?', answer: 'Yes — most packages list specific add-ons (like a brand guidelines document) that can be added to a lower tier rather than upgrading entirely.' },
        { question: 'Does branding pricing include a trademark search or registration?', answer: 'No — these packages cover design work only. Trademark search and registration are legal services outside the scope of any package listed here.' },
      ]}
    />
  );
}
