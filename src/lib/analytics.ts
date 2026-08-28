type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export const GA_MEASUREMENT_ID = 'G-G3K9EHFW8M';

const trackedLinkEvents: Record<string, string> = {
  whatsapp: 'whatsapp_click',
  tel: 'phone_click',
  mailto: 'email_click',
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __mwAnalyticsClickTracking?: boolean;
  }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined') return;

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }

  if (window.__mwAnalyticsClickTracking) return;
  window.__mwAnalyticsClickTracking = true;

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest('a') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const scheme = href.split(':', 1)[0].toLowerCase();
    const eventName = trackedLinkEvents[scheme];

    if (eventName) {
      trackEvent(eventName, {
        link_url: href,
        link_text: (link.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname,
      });
      return;
    }

    const normalized = href.toLowerCase();
    if (normalized.includes('wa.me/') || normalized.includes('whatsapp.com/')) {
      trackEvent('whatsapp_click', {
        link_url: href,
        link_text: (link.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname,
      });
    }
  });
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
