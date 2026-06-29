import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/Button';
import { serviceCategories } from '@/data/services';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="The page you're looking for doesn't exist." path="/404" noIndex />
      <section className="min-h-[80vh] flex items-center bg-[var(--color-parchment)] pt-[68px]">
        <div className="container-kd text-center max-w-lg mx-auto">
          <p className="eyebrow mb-4">404</p>
          <h1 className="font-display text-[40px] md:text-[52px] leading-[1.1] text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
            This page doesn't exist.
          </h1>
          <p className="mt-4 font-sans text-[15px] text-[var(--color-midnight)]/65 leading-relaxed">
            The link may be broken, or the page may have moved. Here's where you probably meant to go:
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button to="/" variant="primary">
              Back to home
            </Button>
            <Button to="/services" variant="secondary">
              View services
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {serviceCategories.slice(0, 4).map((c) => (
              <Button key={c.slug} to={`/services/${c.slug}`} variant="ghost" className="!px-0 !py-0 text-xs">
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
