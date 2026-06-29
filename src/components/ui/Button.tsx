import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  to?: string; // if provided, renders as a Link
  href?: string; // if provided, renders as an external anchor
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[var(--color-umber)] text-[var(--color-midnight)] shadow-[0_12px_35px_rgba(167,127,78,0.28)] hover:bg-[var(--color-sand)] hover:shadow-[0_16px_45px_rgba(209,180,135,0.32)]',
  secondary:
    'border border-[var(--color-bone)] bg-white/70 text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]',
  ghost: 'text-[var(--color-umber)] hover:text-[var(--color-sand)]',
};

const base =
  'agency-magnetic inline-flex items-center justify-center gap-2 font-sans text-sm font-medium tracking-wide px-5 py-3 rounded-[var(--radius-button)] whitespace-nowrap';

export function Button({ variant = 'primary', children, to, href, className = '', ...rest }: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
