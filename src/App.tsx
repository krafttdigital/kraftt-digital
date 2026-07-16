import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Route-level code splitting: every page is its own chunk.
const Home = lazy(() => import('@/pages/Home'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const BundleDetail = lazy(() => import('@/pages/BundleDetail'));
const AuthoritySystem = lazy(() => import('@/pages/AuthoritySystem'));
const Process = lazy(() => import('@/pages/Process'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioDetail = lazy(() => import('@/pages/PortfolioDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPostPage = lazy(() => import('@/pages/BlogPost'));
const Tools = lazy(() => import('@/pages/Tools'));
const Admin = lazy(() => import('@/pages/Admin'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Privacy = lazy(() => import('@/pages/legal/Privacy'));
const Terms = lazy(() => import('@/pages/legal/Terms'));
const Cookies = lazy(() => import('@/pages/legal/Cookies'));
const Refund = lazy(() => import('@/pages/legal/Refund'));

const SipCalculator = lazy(() => import('@/pages/tools/SipCalculator'));
const NetWorthCalculator = lazy(() => import('@/pages/tools/NetWorthCalculator'));
const WebsiteCostCalculator = lazy(() => import('@/pages/tools/WebsiteCostCalculator'));
const BrandingCostCalculator = lazy(() => import('@/pages/tools/BrandingCostCalculator'));
const SocialMediaCostCalculator = lazy(() => import('@/pages/tools/SocialMediaCostCalculator'));
const SeoRoiCalculator = lazy(() => import('@/pages/tools/SeoRoiCalculator'));
const RoasCalculator = lazy(() => import('@/pages/tools/RoasCalculator'));
const BreakEvenCalculator = lazy(() => import('@/pages/tools/BreakEvenCalculator'));
const ProfitMarginCalculator = lazy(() => import('@/pages/tools/ProfitMarginCalculator'));
const GstCalculator = lazy(() => import('@/pages/tools/GstCalculator'));
const EmiCalculator = lazy(() => import('@/pages/tools/EmiCalculator'));
const CompoundInterestCalculator = lazy(() => import('@/pages/tools/CompoundInterestCalculator'));

function PageLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--color-parchment)]">
      <div className="agency-glass-light flex min-w-[220px] flex-col items-center rounded-[var(--radius-card)] px-8 py-7 text-center" role="status" aria-live="polite">
        <div className="relative h-14 w-14">
          <span className="absolute inset-0 rounded-full border border-[var(--color-umber)]/25" />
          <span className="absolute inset-2 animate-spin rounded-full border-2 border-[var(--color-bone)] border-t-[var(--color-umber)]" />
          <span className="absolute inset-0 flex items-center justify-center font-display text-lg text-[var(--color-midnight)]">K</span>
        </div>
        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[var(--color-umber)]">Loading</p>
      </div>
    </div>
  );
}

function RouteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 520);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          className="pointer-events-none fixed inset-x-0 top-[74px] z-[95]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.span
            className="block h-px bg-gradient-to-r from-transparent via-[var(--color-umber)] to-transparent shadow-[0_0_18px_rgba(167,127,78,0.75)]"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, transformOrigin: 'right' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full border border-[var(--color-bone)] bg-[var(--color-white-paper)]/88 px-3 py-1.5 text-[var(--color-umber)] shadow-[0_18px_60px_rgba(13,13,13,0.12)] backdrop-blur-md"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-umber)]" />
            <span className="font-sans text-[9px] uppercase tracking-[0.2em]">Loading</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <GoogleAnalytics />
      <RouteLoader key={location.pathname} />
      <Suspense fallback={<PageLoading />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/bundles/:slug" element={<BundleDetail />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/authority-system" element={<AuthoritySystem />} />
                <Route path="/process" element={<Process />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/admin" element={<Admin />} />

                <Route path="/tools/sip-calculator" element={<SipCalculator />} />
                <Route path="/tools/net-worth-calculator" element={<NetWorthCalculator />} />
                <Route path="/tools/website-cost-calculator" element={<WebsiteCostCalculator />} />
                <Route path="/tools/branding-cost-calculator" element={<BrandingCostCalculator />} />
                <Route path="/tools/social-media-cost-calculator" element={<SocialMediaCostCalculator />} />
                <Route path="/tools/seo-roi-calculator" element={<SeoRoiCalculator />} />
                <Route path="/tools/roas-calculator" element={<RoasCalculator />} />
                <Route path="/tools/break-even-calculator" element={<BreakEvenCalculator />} />
                <Route path="/tools/profit-margin-calculator" element={<ProfitMarginCalculator />} />
                <Route path="/tools/gst-calculator" element={<GstCalculator />} />
                <Route path="/tools/emi-calculator" element={<EmiCalculator />} />
                <Route path="/tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />

                <Route path="/legal/privacy-policy" element={<Privacy />} />
                <Route path="/legal/terms-and-conditions" element={<Terms />} />
                <Route path="/legal/cookie-policy" element={<Cookies />} />
                <Route path="/legal/refund-policy" element={<Refund />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
}
