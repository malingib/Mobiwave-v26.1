import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

const SITE_URL = 'https://mobiwave.co.ke';
const DEFAULT_IMAGE = `${SITE_URL}/branding/mw-logo.png`;

const ROUTE_SEO: Record<string, SeoConfig> = {
  '/': {
    title: 'MobiWave Innovations | Business Communication Solutions',
    description:
      'Scale customer communication with bulk SMS, email campaigns, WhatsApp messaging, USSD services, and M-Pesa integrations.',
    path: '/',
  },
  '/about': {
    title: 'About MobiWave Innovations | Telecom Solutions in Kenya',
    description:
      'Learn about MobiWave Innovations, our mission, and how we help Kenyan businesses communicate and grow through reliable telecom solutions.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact MobiWave Innovations',
    description:
      'Get in touch with MobiWave Innovations for bulk messaging, USSD, M-Pesa integration, and enterprise communication support.',
    path: '/contact',
  },
  '/pricing': {
    title: 'MobiWave Pricing | Transparent Communication Service Plans',
    description:
      'Explore simple and transparent pricing for bulk SMS, USSD, shortcodes, WhatsApp messaging, and business communication services.',
    path: '/pricing',
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
  '/services/bulk-sms': {
    title: 'Bulk SMS Services in Kenya | MobiWave',
    description:
      'Send reliable bulk SMS campaigns, alerts, OTPs, and notifications across Kenyan networks with enterprise-grade delivery and analytics.',
    path: '/services/bulk-sms',
  },
  '/services/bulk-email': {
    title: 'Bulk Email Marketing Services | MobiWave',
    description:
      'Launch professional bulk email campaigns with high deliverability, segmentation, automation workflows, and campaign analytics.',
    path: '/services/bulk-email',
  },
  '/services/bulk-whatsapp': {
    title: 'Bulk WhatsApp Messaging | MobiWave',
    description:
      'Engage customers with WhatsApp business messaging for support, reminders, notifications, and rich media communication at scale.',
    path: '/services/bulk-whatsapp',
  },
  '/services/ussd-codes': {
    title: 'USSD Code Solutions in Kenya | MobiWave',
    description:
      'Build interactive USSD services for onboarding, payments, surveys, and customer self-service without internet dependency.',
    path: '/services/ussd-codes',
  },
  '/services/shortcodes': {
    title: 'SMS Shortcode Services | MobiWave',
    description:
      'Deploy shared or dedicated SMS shortcodes for two-way communication, campaigns, voting, lead generation, and subscriptions.',
    path: '/services/shortcodes',
  },
  '/services/mpesa-integration': {
    title: 'M-Pesa API Integration Services | MobiWave',
    description:
      'Integrate M-Pesa workflows for C2B, B2C, and B2B payments, collections, disbursements, and automated reconciliation.',
    path: '/services/mpesa-integration',
  },
  '/services/sms-surveys': {
    title: 'SMS Survey Platform | MobiWave',
    description:
      'Collect customer and market feedback via SMS surveys with real-time tracking, analytics, and high response rates.',
    path: '/services/sms-surveys',
  },
  '/services/airtime-rewards': {
    title: 'Airtime and Data Reward System | MobiWave',
    description:
      'Reward customers instantly with airtime and data incentives for campaigns, referrals, surveys, and loyalty programs.',
    path: '/services/airtime-rewards',
  },
  '/services/service-desk': {
    title: 'Omnichannel Service Desk Platform | MobiWave',
    description:
      'Unify customer support across SMS, email, and WhatsApp to improve response times and service quality from one desk.',
    path: '/services/service-desk',
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

    upsertMeta('meta[name="description"]', { name: 'description', content: config.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: config.type ?? 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'MobiWave Innovations' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: config.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: config.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
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

    const schemaPayload = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MobiWave Innovations',
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+254736427842',
          contactType: 'customer support',
          areaServed: 'KE',
        },
        sameAs: [],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'MobiWave Innovations',
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: config.title,
        description: config.description,
        url: canonical,
      },
    ];
    schema.textContent = JSON.stringify(schemaPayload);
  }, [location.pathname]);

  return null;
}
