import type { ComponentProps } from 'react';

type SocialIconProps = ComponentProps<'svg'>;

export function InstagramIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.8 9.4v10" />
      <path d="M4.8 5.4h.01" />
      <path d="M10 19.4v-10" />
      <path d="M10 13.9c0-2.5 1.7-4.8 4.4-4.8 2.5 0 4.1 1.7 4.1 4.7v5.6" />
    </svg>
  );
}
