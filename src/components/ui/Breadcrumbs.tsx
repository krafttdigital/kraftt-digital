import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, light = false }: { items: BreadcrumbItem[]; light?: boolean }) {
  const full = [{ name: 'Home', path: '/' }, ...items];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(full)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1.5 font-sans text-xs">
          {full.map((item, index) => {
            const isLast = index === full.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className={`w-3 h-3 ${light ? 'text-white/30' : 'text-[var(--color-midnight)]/30'}`} aria-hidden="true" />}
                {isLast ? (
                  <span aria-current="page" className={light ? 'text-[var(--color-linen)]' : 'text-[var(--color-midnight)]'}>
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className={`${light ? 'text-[var(--color-dusk)] hover:text-[var(--color-linen)]' : 'text-[var(--color-midnight)]/50 hover:text-[var(--color-umber)]'} transition-colors`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
