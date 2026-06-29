import { siteConfig } from '@/config/siteConfig';

type GtagCommand =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer?: GtagCommand[];
    gtag?: (...args: GtagCommand) => void;
  }
}

const GA_SCRIPT_ID = 'ga4-gtag-js';
let gtagInitialized = false;

export function getAnalyticsMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID || siteConfig.analytics.gaMeasurementId;
}

export function installGoogleAnalytics(measurementId: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...args: GtagCommand) => {
      window.dataLayer?.push(args);
    });

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  if (!gtagInitialized) {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
    gtagInitialized = true;
  }
}

export function trackPageView(measurementId: string, pagePath: string) {
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
    send_to: measurementId,
  });
}

export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
  const measurementId = getAnalyticsMeasurementId();
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    send_to: measurementId,
    ...parameters,
  });
}
