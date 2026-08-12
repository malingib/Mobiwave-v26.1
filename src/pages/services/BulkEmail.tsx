import { Mail } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function BulkEmail() {
  return (
    <ServicePageLayout
      title="Bulk Email"
      subtitle="Professional Email Campaigns with High Deliverability"
      description="Launch professional bulk email campaigns with MobiWave — high deliverability, list segmentation, automation workflows and campaign analytics. Reach inboxes (not spam), personalize at scale, and connect email to your SMS, WhatsApp and M-Pesa flows on one Kenyan account with 24/7 local support."
      icon={Mail}
      stats={[
        { value: 'High', label: 'Deliverability' },
        { value: 'Segmentation', label: 'Lists' },
        { value: 'Automation', label: 'Workflows' },
        { value: '24/7', label: 'Nairobi Support' }
      ]}
      features={[
        'High-deliverability SMTP and API sending',
        'List segmentation and personalization',
        'Drag-and-drop email templates',
        'Automation workflows and drip sequences',
        'A/B testing of subject lines',
        'Real-time open and click tracking',
        'Bounce and unsubscribe handling',
        'SPF, DKIM and DMARC alignment',
        'Webhook events for every engagement',
        'Bundled with SMS, WhatsApp and M-Pesa'
      ]}
      benefits={[
        'Land in the inbox with authenticated, aligned sending',
        'Target the right segment with personalized content',
        'Automate nurture and transactional email without code',
        'Measure what works with open, click and conversion data',
        'Stay compliant with easy unsubscribe and consent',
        '24/7 local Nairobi support via phone and WhatsApp'
      ]}
      useCases={[
        {
          title: 'Newsletters',
          description: 'Send regular branded newsletters to segmented subscriber lists.'
        },
        {
          title: 'Promotions & offers',
          description: 'Run targeted sales campaigns with personalized coupons and CTAs.'
        },
        {
          title: 'Transactional email',
          description: 'Deliver receipts, statements and order confirmations reliably.'
        },
        {
          title: 'Drip onboarding',
          description: 'Automate welcome and education sequences that nurture new users.'
        },
        {
          title: 'Event invitations',
          description: 'Invite, remind and follow up on webinars and in-person events.'
        },
        {
          title: 'Re-engagement',
          description: 'Win back lapsed customers with targeted win-back flows.'
        },
        {
          title: 'Transactional + SMS fallback',
          description: 'Send email first, then auto-follow with SMS for critical alerts.'
        },
        {
          title: 'Surveys & NPS',
          description: 'Distribute CSAT and NPS surveys and track completion.'
        }
      ]}
      howItWorks={[
        {
          step: '1',
          title: 'Authenticate your domain',
          description: 'We help you set up SPF, DKIM and DMARC on your sending domain so mail is trusted and lands in the inbox rather than spam.'
        },
        {
          step: '2',
          title: 'Import and segment',
          description: 'Bring your lists via API or CSV, then segment by behavior, location or lifecycle stage for targeted sends.'
        },
        {
          step: '3',
          title: 'Build the campaign',
          description: 'Use drag-and-drop templates or the API. Personalize with merge fields and preview before sending.'
        },
        {
          step: '4',
          title: 'Automate',
          description: 'Create workflows — welcome drips, cart recovery, reminders — triggered by events or schedules.'
        },
        {
          step: '5',
          title: 'Send and track',
          description: 'Monitor delivery, opens, clicks and unsubscribes in real time, and A/B test subject lines to lift performance.'
        },
        {
          step: '6',
          title: 'Connect channels',
          description: 'Tie email to SMS, WhatsApp and M-Pesa on one MobiWave account — e.g. email a receipt, then confirm via SMS.'
        }
      ]}
      comparisonTable={{
        headers: ['MobiWave', 'Mailchimp', 'SendGrid', 'Local ISPs'],
        note: 'MobiWave bundles email with SMS, WhatsApp and M-Pesa on one Kenyan account and provides 24/7 local support. Global ESPs are self-service and lack local payment and channel bundling.',
        rows: [
          {
            name: 'Deliverability tooling',
            cells: [
              { text: 'SPF/DKIM/DMARC + warmup', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'Basic' }
            ]
          },
          {
            name: 'Automation workflows',
            cells: [
              { text: 'Yes', highlight: true },
              { text: 'Yes (paid tiers)' },
              { text: 'Yes' },
              { text: 'No' }
            ]
          },
          {
            name: 'Bundle with SMS & M-Pesa',
            cells: [
              { text: 'One account', highlight: true },
              { text: 'No' },
              { text: 'No' },
              { text: 'No' }
            ]
          },
          {
            name: 'Local KES billing & support',
            cells: [
              { text: 'Yes, 24/7', highlight: true },
              { text: 'USD, no local team' },
              { text: 'USD, no local team' },
              { text: 'Limited' }
            ]
          }
        ]
      }}
      pricing={[
        {
          title: 'Starter',
          price: 'Usage-based',
          unit: '',
          features: [
            'Authenticated sending',
            'List segmentation',
            'Templates + tracking',
            'Per-email rate applies',
            'Standard support'
          ]
        },
        {
          title: 'Growth',
          price: 'Usage-based',
          unit: '',
          features: [
            'Everything in Starter',
            'Automation workflows',
            'A/B testing',
            'Webhook events',
            '24/7 support'
          ]
        },
        {
          title: 'Enterprise',
          price: 'Custom',
          unit: '',
          features: [
            'High-volume sending',
            'Dedicated IP option',
            'Custom SLAs',
            'CRM integrations',
            'Dedicated account manager'
          ]
        }
      ]}
      faqs={[
        {
          question: 'How much does bulk email cost in Kenya?',
          answer: 'MobiWave bills email on a per-email usage basis, with volume discounts as you scale. There are no setup fees. Because email is billed in USD by most global providers, our local KES billing is often simpler for Kenyan businesses — contact us for current rates.'
        },
        {
          question: 'Will my emails land in the inbox?',
          answer: 'We set up SPF, DKIM and DMARC on your sending domain and guide you through warmup, so mail is authenticated and trusted. Good list hygiene and easy unsubscribe keep your reputation high and deliverability strong.'
        },
        {
          question: 'Can I automate email sequences?',
          answer: 'Yes. Build drip sequences and event-triggered workflows — welcome, onboarding, cart recovery, reminders — without writing code, with branching based on opens and clicks.'
        },
        {
          question: 'Do you support personalization and segmentation?',
          answer: 'Yes. Segment lists by behavior, location or lifecycle, and personalize subject lines and body content with merge fields for each recipient.'
        },
        {
          question: 'Can email connect to SMS and WhatsApp?',
          answer: 'Yes. On one MobiWave account you can email first and auto-follow with SMS or WhatsApp for critical alerts, or confirm a transaction across channels.'
        },
        {
          question: 'How do you handle unsubscribes and compliance?',
          answer: 'Every campaign includes one-click unsubscribe and we honor opt-outs immediately, supporting data-protection and anti-spam expectations. Bounce and complaint handling is automatic.'
        },
        {
          question: 'Can I track opens and clicks?',
          answer: 'Yes. Real-time open, click and bounce tracking is built in, with A/B testing of subject lines so you can improve performance over time.'
        },
        {
          question: 'Do you support transactional email via API?',
          answer: 'Yes. Send transactional mail (receipts, statements, OTPs) over SMTP or REST API with webhook events for every engagement.'
        },
        {
          question: 'Is my sending domain protected?',
          answer: 'Yes. We align SPF, DKIM and DMARC on your domain and can provide a dedicated IP for enterprise volumes to isolate your reputation.'
        },
        {
          question: 'How is MobiWave different from Mailchimp or SendGrid?',
          answer: 'Those are excellent global ESPs but are self-service, billed in USD and lack local Kenyan payment and channel bundling. MobiWave adds local KES billing, 24/7 Kenyan support, and bundles email with SMS, WhatsApp and M-Pesa on one account.'
        }
      ]}
    />
  );
}
