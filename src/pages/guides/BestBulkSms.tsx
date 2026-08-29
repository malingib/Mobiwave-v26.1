import { GuidePageLayout } from '@/components/GuidePageLayout';

export function BestBulkSmsGuide() {
  return (
    <GuidePageLayout
      title="Best Bulk SMS Provider in Kenya (2026)"
      subtitle="How to choose a bulk SMS provider — a buyer's guide"
      description="Choosing a bulk SMS provider in Kenya comes down to delivery reliability, direct carrier interconnects, transparent KES pricing, sender ID registration, and local support. This guide compares what matters, lists the leading providers, and explains why direct interconnects and CAK-aligned compliance beat cheap grey routes."
      breadcrumbLabel="Best Bulk SMS Kenya"
      updated="August 2026"
      intro="The Kenyan bulk SMS market is crowded, and the cheapest per-SMS rate is often a grey route that gets blocked. The right question is not 'who is cheapest' but 'who delivers reliably, compliantly, and supports me locally.' This guide breaks down the decision."
      checklist={[
        'Direct interconnect with Safaricom, Airtel and Telkom (not grey route)',
        'Transparent KES per-SMS pricing with no hidden setup fees',
        'Free CAK sender ID registration included',
        'Real-time delivery reports per MSISDN',
        'REST API + SDKs and a usable dashboard',
        'Local 24/7 support you can actually reach'
      ]}
      steps={[
        {
          step: '1',
          title: 'Check the route quality',
          description: 'Ask whether the provider has direct interconnects to all three networks. Grey routes are cheaper but get filtered, so your OTPs and alerts silently fail. Direct interconnect is the single biggest reliability factor.'
        },
        {
          step: '2',
          title: 'Compare total cost, not headline rate',
          description: 'Look past the per-SMS number: setup fees, sender ID registration charges, minimum commits and failed-delivery billing. MobiWave starts at KES 0.20/SMS at volume with no setup or admin fees.'
        },
        {
          step: '3',
          title: 'Confirm sender ID registration',
          description: 'A registered sender ID is required for reliable delivery. Choose a provider that handles CAK registration on all three networks for you at no extra admin fee.'
        },
        {
          step: '4',
          title: 'Test delivery and reporting',
          description: 'Use a sandbox to send to test numbers and verify per-MSISDN delivery reports and webhooks. If you cannot see who received a message, you cannot trust the channel.'
        },
        {
          step: '5',
          title: 'Evaluate support and compliance',
          description: 'Confirm local support hours and ODPC/CAK alignment (opt-in ledger, 07:00–19:00 promotional window). A provider that only offers developer tickets will slow your non-technical teams.'
        },
        {
          step: '6',
          title: 'Check the bundle',
          description: 'If you also need M-Pesa, WhatsApp, USSD or airtime, one account with unified billing and support is simpler and often cheaper than stitching several vendors together.'
        }
      ]}
      comparison={{
        headers: ['MobiWave', "Africa's Talking", 'Celcom Africa', 'Twilio'],
        note: 'Pricing reflects publicly listed Kenya rates as of August 2026. Volume and contract discounts available on request. Twilio rates shown are approximate USD-converted.',
        rows: [
          {
            name: 'Promotional SMS (Safaricom)',
            cells: [
              { text: 'KES 0.25', highlight: true },
              { text: 'KES 0.40' },
              { text: 'KES 0.40' },
              { text: '~KES 5.85' }
            ]
          },
          {
            name: 'Transactional SMS (Safaricom)',
            cells: [
              { text: 'KES 0.30', highlight: true },
              { text: 'KES 0.60' },
              { text: 'KES 0.60' },
              { text: '~KES 5.85' }
            ]
          },
          {
            name: 'Direct interconnect (3 networks)',
            cells: [
              { text: 'Yes', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'Via aggregator' }
            ]
          },
          {
            name: 'Sender ID registration',
            cells: [
              { text: 'Free, handled for you', highlight: true },
              { text: 'KES 7,000 / network' },
              { text: 'KES 7,000 / network' },
              { text: 'Via aggregator' }
            ]
          },
          {
            name: 'M-Pesa + WhatsApp + USSD bundle',
            cells: [
              { text: 'One account', highlight: true },
              { text: 'Add-ons' },
              { text: 'Add-ons' },
              { text: 'Separate' }
            ]
          },
          {
            name: 'Local 24/7 support',
            cells: [
              { text: 'Phone + WhatsApp', highlight: true },
              { text: 'Developer-only' },
              { text: 'Business hours' },
              { text: 'No local team' }
            ]
          }
        ]
      }}
      faqs={[
        {
          question: 'Who is the best bulk SMS provider in Kenya?',
          answer: 'It depends on your needs. For reliable delivery with direct interconnects, transparent KES pricing and local support, MobiWave, Africa’s Talking and Celcom Africa are the main Kenyan players. MobiWave bundles M-Pesa, WhatsApp and USSD on one account with free sender ID registration and 24/7 local support.'
        },
        {
          question: 'How much does bulk SMS cost in Kenya in 2026?',
          answer: 'MobiWave charges KES 0.20–0.35 per SMS depending on volume, with no setup or admin fees. Africa’s Talking and Celcom list around KES 0.40 for promotional and KES 0.60 for transactional on Safaricom; Twilio converts to roughly KES 5.85. Always compare total cost, not headline rate.'
        },
        {
          question: 'What is a grey route and why avoid it?',
          answer: 'A grey route sends SMS through indirect international paths to appear local, bypassing interconnection agreements. Networks filter these aggressively, so messages get delayed or blocked — bad for OTPs and alerts. Direct interconnect is the reliable choice.'
        },
        {
          question: 'Why does sender ID registration matter?',
          answer: 'Registered sender IDs are trusted by the networks and deliver reliably; unregistered or fake IDs are increasingly blocked. MobiWave registers your ID across Safaricom, Airtel and Telkom during onboarding at no extra admin fee.'
        },
        {
          question: 'How do I know messages are delivered?',
          answer: 'Use a provider with real-time, per-MSISDN delivery reports and webhook callbacks. MobiWave streams status to the dashboard and your webhook so you always know who received (and who didn’t) a message.'
        },
        {
          question: 'Is bulk SMS still effective vs WhatsApp?',
          answer: 'Yes — SMS reaches every phone, including feature phones with no data, which WhatsApp cannot. The best approach is often both: SMS for universal reach and critical alerts, WhatsApp for rich, conversational engagement.'
        },
        {
          question: 'Can I send SMS via API?',
          answer: 'Yes. MobiWave’s REST API accepts single or bulk recipients (up to 1,000 per call) with Node, PHP, Python and cURL SDKs, plus a sandbox for testing before go-live.'
        },
        {
          question: 'Are there compliance rules for bulk SMS in Kenya?',
          answer: 'Yes. The CAK framework restricts promotional SMS to roughly 07:00–19:00 and requires opt-in consent; ODPC expects an opt-in ledger. MobiWave enforces the window by default and maintains the ledger for you.'
        },
        {
          question: 'Should I bundle SMS with other channels?',
          answer: 'If you also need M-Pesa, WhatsApp, USSD or airtime, a single account with unified billing and support is simpler and often cheaper than managing several vendors — and lets you trigger, say, an M-Pesa STK Push from an SMS flow.'
        },
        {
          question: 'How do I get started with MobiWave?',
          answer: 'Sign up with your Kenyan business registration and KRA PIN, let MobiWave register your sender ID, test in the sandbox, then send via dashboard or API. Contact us and we activate your account within one business day.'
        }
      ]}
      relatedRoutes={[
        { label: 'Bulk SMS Kenya service', href: '/services/bulk-sms' },
        { label: 'Sender ID Registration', href: '/guides/sender-id-registration-kenya' },
        { label: 'M-Pesa STK Push API', href: '/guides/mpesa-stk-push-api-kenya' }
      ]}
    />
  );
}
