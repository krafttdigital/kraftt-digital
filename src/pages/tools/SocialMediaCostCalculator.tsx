import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/utils/format';
import { recommendSocialTier } from '@/utils/calculators';
import { serviceCategories } from '@/data/services';

export default function SocialMediaCostCalculator() {
  const { currency } = useCurrency();
  const [platformCount, setPlatformCount] = useState('1');
  const [postsPerMonth, setPostsPerMonth] = useState('12');
  const [needsCommunityManagement, setNeedsCommunityManagement] = useState(false);

  const tierId = useMemo(
    () =>
      recommendSocialTier({
        platformCount: Math.max(1, Number(platformCount) || 1),
        postsPerMonth: Math.max(1, Number(postsPerMonth) || 1),
        needsCommunityManagement,
      }),
    [platformCount, postsPerMonth, needsCommunityManagement],
  );

  const category = serviceCategories.find((c) => c.slug === 'social-media-management')!;
  const pkg = category.packages.find((p) => p.id === tierId)!;
  const formatted = formatPrice(pkg.price, currency);

  function reset() {
    setPlatformCount('1');
    setPostsPerMonth('12');
    setNeedsCommunityManagement(false);
  }

  return (
    <ToolPageLayout
      slug="social-media-cost-calculator"
      h1="Social Media Marketing Cost Calculator"
      intro="Estimate a realistic monthly social media management budget based on how many platforms and how much content you actually need."
      calculator={
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField label="Number of platforms" id="sm-platforms" value={platformCount} onChange={setPlatformCount} unit="platforms" min={1} max={5} />
            <CalculatorField label="Posts per month" id="sm-posts" value={postsPerMonth} onChange={setPostsPerMonth} unit="posts" min={1} max={60} />
          </div>
          <label className="mt-4 flex items-center gap-2.5 font-sans text-sm text-[var(--color-midnight)]/80">
            <input
              type="checkbox"
              checked={needsCommunityManagement}
              onChange={(e) => setNeedsCommunityManagement(e.target.checked)}
              className="w-4 h-4 accent-[var(--color-umber)]"
            />
            I need someone replying to DMs and comments (community management)
          </label>

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
            <Link to="/services/social-media-management" className="mt-4 inline-block font-sans text-xs text-[var(--color-umber)] hover:underline">
              See full package details →
            </Link>
          </div>
        </div>
      }
      formulaExplanation={<p>This maps your inputs directly to one of three real Social Media Management packages, scaling up from Social starter to Social domination as platform count, posting frequency, or community management needs increase.</p>}
      example={<p>Managing 2 platforms with 20 posts a month, without community management, lands on the Social growth package.</p>}
      interpretation={<p>If your needs sit between two tiers — say, one platform but with community management — the higher tier is recommended, since community management is only included from the Social domination tier upward.</p>}
      faqs={[
        { question: 'Does this include paid ad spend?', answer: 'No — these packages cover content creation, scheduling and management. Paid advertising budget is separate from the management fee.' },
        { question: 'Can I switch platforms partway through a month?', answer: 'Platform allocation is typically set at the start of a billing cycle — get in touch to discuss a change ahead of your next cycle.' },
      ]}
    />
  );
}
