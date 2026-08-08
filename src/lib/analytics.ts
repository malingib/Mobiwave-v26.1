type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export const GA_MEASUREMENT_ID = 'G-G3K9EHFW8M';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

export function trackPageView(path: string, title?: string) {
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  window.gtag?.('event', name, params);
}
