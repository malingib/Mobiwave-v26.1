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
  faqItems?: { question: string; answer: string }[];
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
const LASTMOD = '2026-08-31';

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
    robots: 'noindex,follow',
  },
  '/privacy': {
    title: 'Privacy Policy | MobiWave Innovations',
    description:
      'Learn how MobiWave Innovations handles personal and business data across our communication and payment services.',
    path: '/privacy',
    robots: 'noindex,follow',
  },
  '/developers/docs': {
    title: 'API Documentation | MobiWave Innovations',
    description: 'Integrate MobiWave SMS, WhatsApp, contact management, profile, and balance APIs with secure bearer-token authentication.',
    path: '/developers/docs',
    type: 'article',
  },
  '/services/bulk-sms': {
    title: 'Best Bulk SMS Provider in Kenya | MobiWave',
    description:
      'Bulk SMS provider in Kenya with Safaricom, Airtel and Telkom coverage. From KES 0.20/SMS at volume, sender ID registration, delivery reports, REST API, sandbox and M-Pesa integration.',
    path: '/services/bulk-sms',
    pageType: 'Service',
    serviceType: 'Bulk SMS and SMS API',
    faqItems: [{
      question: 'How quickly can I get started?',
      answer: 'After you submit your business registration and KRA PIN, MobiWave verifies and activates your account within one business day. Sender ID approval typically takes 1–3 business days, and you can test your integration in the sandbox while approval is in progress.',
    }],
  },
  '/sms-api-kenya': {
    title: 'SMS API Kenya for Alerts, OTPs and Messaging | MobiWave',
    description:
      'Integrate a Kenya-ready SMS API for OTPs, payment receipts, reminders and customer notifications. REST API, delivery webhooks, sender ID support and sandbox testing across Safaricom, Airtel and Telkom.',
    path: '/sms-api-kenya',
    pageType: 'Service',
    serviceType: 'SMS API',
  },
  '/whatsapp-api-pricing-kenya': { title: 'WhatsApp Business API Pricing Kenya | MobiWave', description: 'Understand WhatsApp Business API pricing in Kenya, including Meta conversation charges, templates, setup, automation and local support.', path: '/whatsapp-api-pricing-kenya', pageType: 'Service', serviceType: 'WhatsApp Business API pricing' },
  '/mpesa-daraja-api-kenya': { title: 'M-Pesa Daraja API Integration Kenya | MobiWave', description: 'Integrate Safaricom Daraja for STK Push, C2B, B2C, B2B payments, callbacks and reconciliation with local Kenyan implementation support.', path: '/mpesa-daraja-api-kenya', pageType: 'Service', serviceType: 'M-Pesa Daraja API integration' },
  '/ussd-pricing-kenya': { title: 'USSD Code Pricing Kenya | Shared and Dedicated | MobiWave', description: 'Compare shared and dedicated USSD code pricing in Kenya, setup fees, monthly maintenance, session costs and M-Pesa integration.', path: '/ussd-pricing-kenya', pageType: 'Service', serviceType: 'USSD pricing' },
  '/industries/sacco-communication-kenya': { title: 'SACCO SMS, USSD and M-Pesa Solutions Kenya | MobiWave', description: 'SACCO communication tools for member alerts, payment reminders, statements, USSD self-service and M-Pesa reconciliation in Kenya.', path: '/industries/sacco-communication-kenya', pageType: 'Service', serviceType: 'SACCO communication' },
  '/industries/school-communication-kenya': { title: 'School SMS, WhatsApp and M-Pesa Tools Kenya | MobiWave', description: 'Help Kenyan schools send parent alerts, fee reminders and results notices while automating M-Pesa collections and confirmations.', path: '/industries/school-communication-kenya', pageType: 'Service', serviceType: 'School communication' },
  '/industries/healthcare-communication-kenya': { title: 'Healthcare SMS and Patient Reminders Kenya | MobiWave', description: 'Healthcare communication tools for appointment reminders, patient updates, receipts and accessible messaging in Kenya.', path: '/industries/healthcare-communication-kenya', pageType: 'Service', serviceType: 'Healthcare communication' },
  '/industries/logistics-communication-kenya': { title: 'Logistics SMS and Delivery Notifications Kenya | MobiWave', description: 'Automate logistics delivery alerts, payment confirmations, collection instructions and customer support across Kenya.', path: '/industries/logistics-communication-kenya', pageType: 'Service', serviceType: 'Logistics communication' },
  '/industries/fintech-communication-kenya': { title: 'Fintech SMS, WhatsApp and M-Pesa APIs Kenya | MobiWave', description: 'Connect fintech OTPs, payment notifications, M-Pesa collections, disbursements and customer support through one Kenya-ready platform.', path: '/industries/fintech-communication-kenya', pageType: 'Service', serviceType: 'Fintech communication' },
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
    title: 'USSD Codes Kenya from KES 11,000 | MobiWave',
    description:
      'Kenyan USSD service provider for shared and dedicated codes, payments, surveys and business menus. CAK shortcode registration, M-Pesa STK Push and no-internet access.',
    path: '/services/ussd-codes',
    pageType: 'Service',
    serviceType: 'USSD codes and applications',
  },
  '/services/shortcodes': {
    title: 'SMS Shortcodes Kenya and Sender IDs | MobiWave',
    description:
      'Deploy shared or dedicated SMS shortcodes for two-way communication, campaigns, voting, lead generation, and subscriptions.',
    path: '/services/shortcodes',
    pageType: 'Service',
    serviceType: 'SMS shortcodes and sender IDs',
  },
  '/services/mpesa-integration': {
    title: 'M-Pesa API Integration Kenya | STK Push & Daraja | MobiWave',
    description:
      'Integrate Safaricom Daraja for STK Push, C2B, B2C and B2B payments in Kenya. Local support, auto-reconciliation and SMS, USSD and WhatsApp integrations.',
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
    title: 'Sender ID Registration in Kenya 2026 | CAK Guide | MobiWave',
    description:
      'How to register an SMS sender ID in Kenya under the CAK framework: documents, approval time, cost, and how MobiWave registers your ID across Safaricom, Airtel and Telkom.',
    path: '/guides/sender-id-registration-kenya',
    pageType: 'Article',
  },
  '/guides/mpesa-stk-push-api-kenya': {
    title: 'M-Pesa STK Push API Kenya | Daraja Integration Guide | MobiWave',
    description:
      'M-Pesa STK Push API and Daraja integration guide for Kenya, with code examples, requirements, callbacks, costs, and SMS, USSD and WhatsApp integrations.',
    path: '/guides/mpesa-stk-push-api-kenya',
    pageType: 'Article',
  },
  '/guides/best-bulk-sms-kenya': {
    title: 'Best Bulk SMS Provider in Kenya 2026 | Buyer’s Guide | MobiWave',
    description:
      'How to choose a bulk SMS provider in Kenya: direct interconnects, KES pricing, sender ID registration, delivery reporting and local support.',
    path: '/guides/best-bulk-sms-kenya',
    pageType: 'Article',
  },
  '/guides/ussd-code-cost-kenya': {
    title: 'USSD Code Cost in Kenya 2026 | Shared vs Dedicated | MobiWave',
    description:
      'How much a USSD code costs in Kenya: shared vs dedicated pricing, CAK allocation, end-user session charges, and M-Pesa STK Push from menus.',
    path: '/guides/ussd-code-cost-kenya',
    pageType: 'Article',
  },
  '/guides/bulk-email-kenya': {
    title: 'Bulk Email Marketing in Kenya 2026 | Deliverability Guide | MobiWave',
    description:
      'How to run bulk email marketing in Kenya: SPF, DKIM, DMARC authentication, segmentation, automation, and local delivery best practices.',
    path: '/guides/bulk-email-kenya',
    pageType: 'Article',
  },
  '/guides/sms-survey-kenya': {
    title: 'SMS Surveys in Kenya 2026 | Two-way Feedback Guide | MobiWave',
    description:
      'How to run SMS surveys in Kenya: two-way flows, branching questions, response rates, real-time analytics and compliance considerations.',
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
    // Normalize trailing slashes before resolving route SEO. Without this,
    // /services/bulk-email/ fell back to the homepage SEO configuration.
    const pathname = location.pathname === '/'
      ? '/'
      : location.pathname.replace(/\/+$/, '');
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

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: BUSINESS_NAME,
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        telephone: PHONE,
        email: EMAIL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: CITY,
          addressRegion: REGION,
          addressCountry: 'KE',
          streetAddress: POSTAL,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: LAT,
          longitude: LNG,
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: BUSINESS_NAME,
        publisher: { '@id': organizationId },
        inLanguage: 'en-KE',
      },
    ];

    if (config.pageType === 'Service') {
      graph.push({
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: config.title.split(' | ')[0],
        serviceType: config.serviceType,
        provider: { '@id': organizationId },
        areaServed: { '@type': 'Country', name: 'Kenya' },
        url: canonical,
      });
    }

    if (config.pageType === 'Article') {
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: config.title,
        description: config.description,
        mainEntityOfPage: canonical,
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
        dateModified: LASTMOD,
        datePublished: LASTMOD,
        image: [DEFAULT_IMAGE],
        inLanguage: 'en-KE',
      });
    }

    if (config.faqItems?.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: config.faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }

    if (breadcrumbItems.length) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      });
    }

    graph.push({
      '@type': config.pageType ?? 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: config.title,
      description: config.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'en-KE',
      dateModified: LASTMOD,
    });

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [location.pathname]);

  return null;
}
