import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AlertTriangle } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  path: string;
  updatedDate: string;
  html: string;
}

export function LegalPageLayout({ title, path, updatedDate, html }: LegalPageLayoutProps) {
  return (
    <>
      <SEO title={title} description={`${title} for Kraftt Digital.`} path={path} />
      <JsonLd data={buildBreadcrumbSchema([{ name: title, path }])} />

      <header className="bg-[var(--color-midnight)] pt-[120px] pb-14">
        <div className="container-kd">
          <Breadcrumbs items={[{ name: title, path }]} light />
          <h1 className="mt-6 font-display text-[30px] md:text-[42px] leading-[1.15] text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
            {title}
          </h1>
          <p className="mt-3 font-sans text-xs text-[var(--color-dusk)]">Last updated: {new Date(updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </header>

      <div className="bg-[#FBF4E4] border-b border-[var(--color-bone)]">
        <div className="container-kd py-4 flex items-start gap-3 max-w-3xl">
          <AlertTriangle className="w-4.5 h-4.5 text-[var(--color-warning)] mt-0.5 shrink-0" aria-hidden="true" />
          <p className="font-sans text-xs text-[var(--color-midnight)]/70 leading-relaxed">
            This page is a starting template, not finished legal copy. It should be reviewed by a qualified legal
            professional in the agency's operating jurisdiction before publishing live.
          </p>
        </div>
      </div>

      <section className="bg-white py-14 md:py-20">
        <div
          className="container-kd max-w-3xl font-sans text-[15px] leading-[1.8] text-[var(--color-midnight)]/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-[var(--color-midnight)] [&_h2]:font-normal [&_p]:mb-4 [&_a]:text-[var(--color-umber)] [&_a]:underline [&_em]:text-[var(--color-warning)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </>
  );
}
