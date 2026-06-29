import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/utils/format';
import { recommendWebsiteTier } from '@/utils/calculators';
import { serviceCategories } from '@/data/services';

const PACKAGE_LOOKUP: Record<string, { categorySlug: string; packageId: string }> = {
  'web-starter': { categorySlug: 'web-design', packageId: 'web-starter' },
  'web-business': { categorySlug: 'web-design', packageId: 'web-business' },
  'web-growth': { categorySlug: 'web-design', packageId: 'web-growth' },
  'shopify-launch': { categorySlug: 'shopify-development', packageId: 'shopify-launch' },
  'shopify-growth': { categorySlug: 'shopify-development', packageId: 'shopify-growth' },
};

export default function WebsiteCostCalculator() {
  const { currency } = useCurrency();
  const [pageCount, setPageCount] = useState('5');
  const [needsEcommerce, setNeedsEcommerce] = useState(false);
  const [needsSeo, setNeedsSeo] = useState(true);
  const [needsBlog, setNeedsBlog] = useState(false);

  const tierId = useMemo(
    () =>
      recommendWebsiteTier({
        pageCount: Math.max(1, Number(pageCount) || 1),
        needsEcommerce,
        needsSeo,
        needsBlog,
      }),
    [pageCount, needsEcommerce, needsSeo, needsBlog],
  );
  const lookup = PACKAGE_LOOKUP[tierId];
  const category = serviceCategories.find((c) => c.slug === lookup.categorySlug)!;
  const pkg = category.packages.find((p) => p.id === lookup.packageId)!;
  const formatted = formatPrice(pkg.price, currency);

  function reset() {
    setPageCount('5');
    setNeedsEcommerce(false);
    setNeedsSeo(true);
    setNeedsBlog(false);
  }

  return (
    <ToolPageLayout
      slug="website-cost-calculator"
      h1="Website Cost Calculator"
      intro="Answer a few questions about your project and see exactly which real Kraftt Digital package fits — with the actual price, not a generic estimate."
      calculator={
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField label="How many pages do you need?" id="wc-pages" value={pageCount} onChange={setPageCount} unit="pages" min={1} max={50} />
          </div>
          <div className="mt-5 space-y-3">
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input type="checkbox" checked={needsEcommerce} onChange={(e) => setNeedsEcommerce(e.target.checked)} className="w-4 h-4 accent-[var(--color-umber)]" />
              I need to sell products online (ecommerce)
            </label>
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input type="checkbox" checked={needsSeo} onChange={(e) => setNeedsSeo(e.target.checked)} className="w-4 h-4 accent-[var(--color-umber)]" />
              I want the site optimised to rank in search
            </label>
            <label className="flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
              <input type="checkbox" checked={needsBlog} onChange={(e) => setNeedsBlog(e.target.checked)} className="w-4 h-4 accent-[var(--color-umber)]" />
              I want a blog section
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>

          <div className="mt-5 bg-[var(--color-midnight)] rounded-[var(--radius-card)] p-6">
            <p className="font-sans text-xs text-[var(--color-dusk)] tracking-wide">Recommended package</p>
            <p className="mt-1 font-display text-2xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
              {pkg.name} <span className="text-[var(--color-midnight)]/0">·</span> {category.name}
            </p>
            {formatted && (
              <p className="mt-2 font-display text-3xl text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
                {formatted}
              </p>
            )}
            <Link to={`/services/${category.slug}`} className="mt-4 inline-block font-sans text-xs text-[var(--color-umber)] hover:underline">
              See full package details →
            </Link>
          </div>
        </div>
      }
      formulaExplanation={
        <p>
          Rather than a generic cost-per-page formula, this tool maps your answers directly to one of our real,
          published packages: ecommerce needs point to a Shopify package; everything else is matched by page count
          and whether a blog is required, to either the Starter, Business or Growth web design package.
        </p>
      }
      example={<p>A 5-page site with no ecommerce and no blog matches the Business package — five pages, full on-page SEO, and lead capture, at a fixed published price.</p>}
      interpretation={
        <p>
          This points you to the closest standard package. Projects with requirements outside any standard tier — a
          much larger page count, custom integrations — are quoted individually after a brief.
        </p>
      }
      faqs={[
        { question: 'What if my project does not fit neatly into one package?', answer: 'Get in touch with your specific requirements — most custom scope is quoted as a variation on the closest standard package.' },
        { question: 'Does this include ongoing hosting costs?', answer: 'No — package prices cover design and build work. Hosting, domain renewal and any third-party subscriptions (like Shopify\'s own plan) are billed separately by those providers.' },
      ]}
    />
  );
}
