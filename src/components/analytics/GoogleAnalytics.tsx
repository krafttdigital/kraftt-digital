import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalyticsMeasurementId, installGoogleAnalytics, trackPageView } from '@/utils/analytics';

export function GoogleAnalytics() {
  const location = useLocation();
  const measurementId = getAnalyticsMeasurementId();

  useEffect(() => {
    if (!measurementId) return undefined;

    installGoogleAnalytics(measurementId);

    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    const timer = window.setTimeout(() => {
      trackPageView(measurementId, pagePath);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname, location.search, measurementId]);

  return null;
}
