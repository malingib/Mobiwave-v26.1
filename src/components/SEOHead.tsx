import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'Service' | 'Article';
  robots?: string;
  serviceType?: string;
};

const SITE_URL = 'https://mobiwave.co.ke';
const DEFAULT_IMAGE = `${SITE_URL}/branding/mw-logo.png`;
const DEFAULT_IMAGE_WIDTH = 819;
const DEFAULT_IMAGE_HEIGHT = 305;
const BUSINESS_NAME = 'MobiWave Innovations';
const PHONE = '+254736427842';
const EMAIL = 'info@mobiwave.co.ke';
const CITY = 'Kilifi';
const REGION = 'KE-04';
const LAT = -3.6305;
const LNG = 39.8497;
const POSTAL = 'Titanic Building, 1st Floor, Room 2';
const LASTMOD = '2026-08-08';

const ROUTE_SEO: Record<string, SeoConfig> = {
  '/': {
    title: 'Bulk SMS, USSD & WhatsApp API Kenya | MobiWave',
    description:
      'Kenya-based communication platform headquartered in Kilifi. Bulk SMS across Safaricom, Airtel & Telkom, M-Pesa integration, USSD menus, and WhatsApp — built for SACCOs, hospitals, schools, and government.',
    path: '/',
  },
  '/about': {
    title: 'About MobiWave Innovations | Telecom Solutions in Kenya',
    description:
      'Learn about MobiWave Innovations, our mission, and how we help Kenyan businesses communicate and grow through reliable telecom solutions.',
    path: '/about',
    pageType: 'AboutPage',
  },
  '/contact': {
    title: 'Contact MobiWave Innovations',
    description:
      'Get in touch with MobiWave Innovations for bulk messaging, USSD, M-Pesa integration, and enterprise communication support.',
    path: '/contact',
    pageType: 'ContactPage',
  },
  '/pricing': {
    title: 'MobiWave Pricing | Transparent Communication Service Plans',
    description:
      'Explore simple and transparent pricing for bulk SMS, USSD, shortcodes, WhatsApp messaging, and business communication services.',
    path: '/pricing',
  },
  '/resources': {
    title: 'Resources & Guides | MobiWave Kenya',
    description:
      'Practical how-to guides for Kenyan business communication — sender ID registration, M-Pesa STK Push integration, and choosing a bulk SMS provider.',
    path: '/resources',
    pageType: 'WebPage',
  },
  '/innovations': {
    title: 'MobiWave Innovations Hub | Products and Solutions',
    description:
      'Discover MobiWave products and digital innovations tailored for healthcare, education, enterprise operations, and customer engagement.',
    path: '/innovations',
  },
  '/terms': {
    title: 'Terms and Conditions | MobiWave Innovations',
    description:
      'Read the terms and conditions governing use of MobiWave Innovations communication services and digital platforms.',
    path: '/terms',
  },
  '/privacy': {
    title: 'Privacy Policy | MobiWave Innovations',
    description:
      'Learn how MobiWave Innovations handles personal and business data across our communication and payment services.',
    path: '/privacy',
  },
  '/developers/docs': {
    title: 'API Documentation | MobiWave Innovations',
    description: 'Integrate MobiWave SMS, WhatsApp, contact management, profile, and balance APIs with secure bearer-token authentication.',
    path: '/developers/docs',
    type: 'article',
  },
  '/services/bulk-sms': {
    title: 'Bulk SMS Kenya from KES 0.20/SMS | SMS API for Safaricom, Airtel, Telkom | MobiWave',
    description:
      'Kenyan bulk SMS provider with direct Safaricom, Airtel and Telkom interconnects. From KES 0.20/SMS at volume, free sender ID registration, 99.9% delivery, REST API + sandbox, and native M-Pesa STK Push — comparison vs Africa’s Talking, Celcom Africa and Twilio.',
    path: '/services/bulk-sms',
    pageType: 'Service',
    serviceType: 'Bulk SMS and SMS API',
  },
  '/services/bulk-email': {
    title: 'Bulk Email Marketing Platform Kenya | MobiWave',
    description:
      'Launch professional bulk email campaigns with high deliverability, segmentation, automation workflows, and campaign analytics.',
    path: '/services/bulk-email',
    pageType: 'Service',
    serviceType: 'Bulk email marketing',
  },
  '/services/bulk-whatsapp': {
    title: 'WhatsApp Business API Kenya for Customer Messaging | MobiWave',
    description:
      'Engage customers with WhatsApp business messaging for support, reminders, notifications, and rich media communication at scale.',
    path: '/services/bulk-whatsapp',
    pageType: 'Service',
    serviceType: 'WhatsApp Business API',
  },
  '/services/ussd-codes': {
    title: 'USSD Codes Kenya from KES 11,000 | USSD Menus, Payments & Surveys | MobiWave',
    description:
      'Kenyan USSD service provider with shared codes from KES 11,000 setup + KES 8,000/mo and dedicated codes at KES 40,000/mo +VAT. CAK shortcode registration handled for you, M-Pesa STK Push inside menus, works on every phone with no internet.',
    path: '/services/ussd-codes',
    pageType: 'Service',
    serviceType: 'USSD codes and applications',
  },
  '/services/shortcodes': {
    title: 'SMS Shortcodes Kenya and Sender IDs for Businesses | MobiWave',
    description:
      'Deploy shared or dedicated SMS shortcodes for two-way communication, campaigns, voting, lead generation, and subscriptions.',
    path: '/services/shortcodes',
    pageType: 'Service',
    serviceType: 'SMS shortcodes and sender IDs',
  },
  '/services/mpesa-integration': {
    title: 'M-Pesa API Integration Kenya | STK Push, C2B, B2C & Daraja | MobiWave',
    description:
      'MobiWave integrates Safaricom Daraja for STK Push (Lipa Na M-Pesa), C2B, B2C and B2B on one Kenyan account. Free Daraja setup, auto-reconciliation, 24/7 local support — bundle SMS, USSD and WhatsApp.',
    path: '/services/mpesa-integration',
    pageType: 'Service',
    serviceType: 'M-Pesa API integration',
  },
  '/services/sms-surveys': {
    title: 'SMS Surveys and Customer Feedback Platform Kenya | MobiWave',
    description:
      'Collect customer and market feedback via SMS surveys with real-time tracking, analytics, and high response rates.',
    path: '/services/sms-surveys',
    pageType: 'Service',
    serviceType: 'SMS surveys and customer feedback',
  },
  '/services/airtime-rewards': {
    title: 'Airtime and Data Rewards API Kenya | MobiWave',
    description:
      'Reward customers instantly with airtime and data incentives for campaigns, referrals, surveys, and loyalty programs.',
    path: '/services/airtime-rewards',
    pageType: 'Service',
    serviceType: 'Airtime and data rewards',
  },
  '/services/service-desk': {
    title: 'Customer Service Desk Software Kenya | MobiWave',
    description:
      'Unify customer support across SMS, email, and WhatsApp to improve response times and service quality from one desk.',
    path: '/services/service-desk',
    pageType: 'Service',
    serviceType: 'Customer service desk software',
  },
  '/guides/sender-id-registration-kenya': {
    title: 'Sender ID Registration in Kenya 2026 | CAK SMS Sender ID Guide | MobiWave',
    description:
      'How to register an SMS sender ID in Kenya under the CAK framework: documents, approval time, cost, and how MobiWave registers your ID across Safaricom, Airtel and Telkom for free.',
    path: '/guides/sender-id-registration-kenya',
    pageType: 'Article',
  },
  '/guides/mpesa-stk-push-api-kenya': {
    title: 'M-Pesa STK Push API Kenya 2026 | Lipa Na M-Pesa Online Guide | MobiWave',
    description:
      'How M-Pesa STK Push (Lipa Na M-Pesa Online) works in Kenya: the Daraja API flow, what you need to integrate, callbacks, costs, and how MobiWave bundles it with SMS, USSD and WhatsApp.',
    path: '/guides/mpesa-stk-push-api-kenya',
    pageType: 'Article',
  },
  '/guides/best-bulk-sms-kenya': {
    title: 'Best Bulk SMS Provider in Kenya 2026 | Buyer’s Guide | MobiWave',
    description:
      'How to choose the best bulk SMS provider in Kenya: direct interconnects, KES pricing, sender ID registration, delivery reporting and local support — comparison of MobiWave, Africa’s Talking, Celcom and Twilio.',
    path: '/guides/best-bulk-sms-kenya',
    pageType: 'Article',
  },
  '/guides/ussd-code-cost-kenya': {
    title: 'USSD Code Cost in Kenya 2026 | Shared vs Dedicated Pricing | MobiWave',
    description:
      'How much a USSD code costs in Kenya: shared (KES 11,000 setup + KES 8,000/mo) vs dedicated (KES 40,000 + KES 40,000/mo), CAK allocation, end-user per-session charges, and M-Pesa STK Push from menus.',
    path: '/guides/ussd-code-cost-kenya',
    pageType: 'Article',
  },
  '/guides/bulk-email-kenya': {
    title: 'Bulk Email Marketing in Kenya 2026 | Deliverability Guide | MobiWave',
    description:
      'How to run bulk email marketing in Kenya: SPF, DKIM, DMARC authentication, segmentation, automation, and how MobiWave bundles email with SMS, WhatsApp and M-Pesa on one local account.',
    path: '/guides/bulk-email-kenya',
    pageType: 'Article',
  },
  '/guides/sms-survey-kenya': {
    title: 'SMS Surveys in Kenya 2026 | Two-way Feedback Guide | MobiWave',
    description:
      'How to run SMS surveys in Kenya: two-way flows, branching questions, response rates, real-time analytics and CAK/ODPC compliance — bundled with SMS, USSD and WhatsApp.',
    path: '/guides/sms-survey-kenya',
    pageType: 'Article',
  },
  '/services': {
    title: 'Business Communication Services | MobiWave',
    description: 'Explore MobiWave business communication services, including bulk SMS, WhatsApp, USSD, M-Pesa integrations, email, and customer support tools.',
    path: '/',
    robots: 'noindex,follow',
  },
  '/testimonials': {
    title: 'MobiWave Customer Stories',
    description: 'See how organisations use MobiWave communication and customer engagement solutions.',
    path: '/',
    robots: 'noindex,follow',
  },
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
}

function upsertLinkCanonical(href: string) {
  let tag = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || '/';
    const config = ROUTE_SEO[pathname] ?? ROUTE_SEO['/'];
    const canonical = `${SITE_URL}${config.path}`;

    document.title = config.title;
    upsertLinkCanonical(canonical);
    trackPageView(pathname, config.title);

    upsertMeta('meta[name="description"]', { name: 'description', content: config.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: config.robots ?? 'index,follow' });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#0084ff' });

    // Geographic / local SEO signals
    upsertMeta('meta[name="geo.region"]', { name: 'geo.region', content: REGION });
    upsertMeta('meta[name="geo.placename"]', { name: 'geo.placename', content: CITY });
    upsertMeta('meta[name="geo.position"]', { name: 'geo.position', content: `${LAT};${LNG}` });
    upsertMeta('meta[name="ICBM"]', { name: 'ICBM', content: `${LAT}, ${LNG}` });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: config.type ?? 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: BUSINESS_NAME });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_KE' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: config.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: config.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: String(DEFAULT_IMAGE_WIDTH) });
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: String(DEFAULT_IMAGE_HEIGHT) });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'MobiWave Innovations brand logo' });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: config.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: config.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE });
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: 'MobiWave Innovations brand logo' });

    let schema = document.getElementById('mw-seo-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'mw-seo-schema';
      schema.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schema);
    }

    const organizationId = `${SITE_URL}/#organization`;
    const websiteId = `${SITE_URL}/#website`;

    const breadcrumbItems = pathname === '/'
      ? []
      : [
          { name: 'Home', item: `${SITE_URL}/` },
          ...(pathname.startsWith('/services/')
            ? [{ name: 'Services', item: `${SITE_URL}/services` }]
            : []),
          { name: config.title.split(' | ')[0], item: canonical },
        ];

    const schemaPayload: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': organizationId,
        name: BUSINESS_NAME,
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        image: DEFAULT_IMAGE,
        slogan: 'Reliable business communication for Africa',
        priceRange: 'KSh',
        address: {
          '@type': 'PostalAddress',
          streetAddress: POSTAL,
          addressLocality: CITY,
          addressRegion: 'Kilifi County',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: LAT,
          longitude: LNG,
        },
        areaServed: [
          { '@type': 'Country', name: 'Kenya' },
          { '@type': 'City', name: 'Kilifi' },
          { '@type': 'City', name: 'Mombasa' },
          { '@type': 'City', name: 'Nairobi' },
        ],
        telephone: PHONE,
        email: EMAIL,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: PHONE,
          email: EMAIL,
          contactType: 'customer support',
          areaServed: 'KE',
          availableLanguage: ['English', 'Swahili'],
        },
        sameAs: [
          'https://x.com/mobiwave_ke',
          'https://www.linkedin.com/company/mobiwave-kenya',
          'https://www.facebook.com/p/MobiWave-Innovations-Ltd-61569833317922/',
          'https://instagram.com/mobiwave_ke',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': websiteId,
        name: BUSINESS_NAME,
        url: SITE_URL,
        inLanguage: 'en-KE',
      },
      {
        '@context': 'https://schema.org',
        '@type': config.pageType ?? 'WebPage',
        '@id': `${canonical}#webpage`,
        name: config.title,
        description: config.description,
        url: canonical,
        inLanguage: 'en-KE',
        dateModified: LASTMOD,
        isPartOf: { '@id': websiteId },
        publisher: { '@id': organizationId },
        breadcrumb: breadcrumbItems.length > 0 ? { '@id': `${canonical}#breadcrumb` } : undefined,
      },
    ];

    if (breadcrumbItems.length > 0) {
      schemaPayload.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      });
    }

    if (config.pageType === 'Service') {
      schemaPayload.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: config.serviceType ?? config.title,
        description: config.description,
        url: canonical,
        areaServed: { '@type': 'Country', name: 'Kenya' },
        provider: { '@id': organizationId },
        serviceType: config.serviceType ?? config.title,
      });
    }
    schema.textContent = JSON.stringify(schemaPayload);
  }, [location.pathname]);

  return null;
}
