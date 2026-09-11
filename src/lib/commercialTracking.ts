import { trackEvent } from './analytics';

const BULK_SMS_TITLE = 'Bulk SMS Provider in Kenya | Pricing & API | MobiWave';
const BULK_SMS_DESCRIPTION = 'Bulk SMS provider in Kenya with Safaricom, Airtel and Telkom coverage. From KES 0.20/SMS at volume, sender ID registration, delivery reports, REST API, sandbox and M-Pesa integration.';

function classifyLink(link: HTMLAnchorElement) {
  const href = link.getAttribute('href') || '';
  const text = (link.textContent || '').trim().toLowerCase();
  if (href === '/contact' || href.startsWith('/contact?')) {
    if (text.includes('get started')) return 'get_started';
    if (text.includes('send message') || text.includes('contact')) return 'contact_sales';
  }
  if (href === '/pricing' && text.includes('get started')) return 'request_quote';
  return null;
}

function applyBulkSmsSeo() {
  if (window.location.pathname.replace(/\/+$/, '') !== '/services/bulk-sms') return;
  document.title = BULK_SMS_TITLE;
  const description = document.head.querySelector('meta[name="description"]');
  description?.setAttribute('content', BULK_SMS_DESCRIPTION);

  const schema = document.getElementById('mw-seo-schema');
  if (!schema?.textContent) return;
  try {
    const json = JSON.parse(schema.textContent) as { '@graph'?: Array<Record<string, unknown>> };
    if (!Array.isArray(json['@graph'])) return;
    json['@graph'].forEach((node) => {
      if (typeof node['dateModified'] === 'string') node['dateModified'] = '2026-09-11';
      if (node['@type'] === 'WebPage') node['dateModified'] = '2026-09-11';
    });
    schema.textContent = JSON.stringify(json);
  } catch {
    // SEOHead may still be replacing the schema; the next pass will retry.
  }
}

export function initializeCommercialTracking() {
  if (typeof window === 'undefined') return;
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest('a') as HTMLAnchorElement | null;
    if (!link) return;
    const eventName = classifyLink(link);
    if (!eventName) return;
    trackEvent(eventName, { cta_text: (link.textContent || '').trim().slice(0, 100), page_path: window.location.pathname });
  });

  applyBulkSmsSeo();
  window.setInterval(applyBulkSmsSeo, 500);
}
