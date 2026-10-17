import { MessageCircle } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { WhatsAppRateCard } from '@/components/WhatsAppRateCard';

export function BulkWhatsApp() {
  return (
    <>
    <ServicePageLayout
      title="Bulk WhatsApp"
      subtitle="Reach Customers on Kenya's Most-Used Messaging App"
      description="Engage customers on WhatsApp with the official WhatsApp Business API, powered by MobiWave. Send rich media, notifications, two-way support and payment reminders at scale — with template approval, delivery tracking and 24/7 local support on one Kenyan account that also bundles SMS, USSD and M-Pesa."
      icon={MessageCircle}
      stats={[
        { value: '2B+', label: 'WhatsApp Users' },
        { value: '24h', label: 'Service Window' },
        { value: 'Media+Docs', label: 'Rich Messages' },
        { value: '24/7', label: 'Nairobi Support' }
      ]}
      features={[
        'Official WhatsApp Business API (green tick eligible)',
        'Rich media: images, video, documents and location',
        'Pre-approved message templates for outbound alerts',
        'Two-way conversational support in one thread',
        'Delivery and read receipts with tracking',
        'REST API + webhook integration',
        'AI assistant and chatbot automation on Pro and Enterprise plans; no Flow Builder on any plan',
        'Analytics dashboard with funnel and drop-off',
        'Opt-in ledger for consent and ODPC compliance',
        'Bundled with SMS, USSD and M-Pesa on one account'
      ]}
      benefits={[
        'Far higher open rates than email and often above SMS',
        'Rich media and interactive menus drive real engagement',
        'Official, encrypted WhatsApp Business API — no bans',
        'Global reach with a local Kenyan support team',
        'End-to-end encrypted, secure customer conversations',
        '24/7 customer support via phone, email and WhatsApp'
      ]}
      useCases={[
        {
          title: 'Customer support',
          description: 'Resolve queries in a two-way WhatsApp thread with automated replies and human hand-off.'
        },
        {
          title: 'Order & delivery updates',
          description: 'Send confirmations, dispatch notices and delivery alerts with live tracking links.'
        },
        {
          title: 'Appointment reminders',
          description: 'Cut no-shows with WhatsApp reminders carrying calendar links and one-tap reschedule.'
        },
        {
          title: 'Product catalogs',
          description: 'Share product images, price lists and catalogs directly inside the chat.'
        },
        {
          title: 'Payment reminders',
          description: 'Prompt overdue payments with a deep link to M-Pesa STK Push in the same flow.'
        },
        {
          title: 'Feedback & NPS',
          description: 'Run interactive surveys and Net Promoter Score collection with quick-reply buttons.'
        },
        {
          title: 'Onboarding & OTP',
          description: 'Deliver welcome sequences and one-time passwords over a channel users actually check.'
        },
        {
          title: 'Loyalty & offers',
          description: 'Push personalized promotions, loyalty balances and redeemable coupon codes.'
        }
      ]}
      howItWorks={[
        {
          step: '1',
          title: 'Create your WhatsApp Business profile',
          description: 'MobiWave sets up your WhatsApp Business Account (WABA) and verifies your business with Meta — including display name and the green verification tick where eligible.'
        },
        {
          step: '2',
          title: 'Register and verify your number',
          description: 'We connect your business phone number to the API, complete the Meta verification handshake, and confirm it is ready to send.'
        },
        {
          step: '3',
          title: 'Submit message templates',
          description: 'Outbound messages outside a 24-hour window must use Meta-approved templates. We help you draft and submit them (marketing, utility, authentication) for approval.'
        },
        {
          step: '4',
          title: 'Collect opt-ins',
          description: 'Capture WhatsApp opt-in from your website, checkout, USSD or SMS so every conversation is consented and ODPC-aligned. We keep the opt-in ledger for you.'
        },
        {
          step: '5',
          title: 'Send and automate',
          description: 'Trigger templates via API or dashboard, automate replies with quick-reply menus, and let webhooks route inbound messages to your CRM or support desk.'
        },
        {
          step: '6',
          title: 'Measure and bundle',
          description: 'Track delivery, reads and drop-off in the analytics dashboard, and connect WhatsApp to SMS, USSD and M-Pesa on the same MobiWave account and billing line.'
        }
      ]}
      comparisonTable={{
        headers: ['MobiWave', "Africa's Talking", 'Twilio', 'Meta (direct)'],
        note: 'All routes go through the official WhatsApp Business API. WhatsApp charges per 24-hour conversation per Meta’s published rate; that is separate from any integration fee. Meta direct requires you to manage the full BSP relationship yourself.',
        rows: [
          {
            name: 'Official WhatsApp Business API',
            cells: [
              { text: 'Yes — managed BSP', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'Yes (self-managed)' }
            ]
          },
          {
            name: 'Template creation & approval',
            cells: [
              { text: 'Handled for you', highlight: true },
              { text: 'Self-service' },
              { text: 'Self-service' },
              { text: 'Self-service' }
            ]
          },
          {
            name: 'Rich media & quick replies',
            cells: [
              { text: 'Yes', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'Yes' }
            ]
          },
          {
            name: 'Two-way conversation routing',
            cells: [
              { text: 'Webhook + dashboard', highlight: true },
              { text: 'Webhook' },
              { text: 'Webhook' },
              { text: 'Webhook' }
            ]
          },
          {
            name: 'Bundle with SMS, USSD & M-Pesa',
            cells: [
              { text: 'One account', highlight: true },
              { text: 'Add-ons' },
              { text: 'Separate products' },
              { text: 'No' }
            ]
          },
          {
            name: 'Local 24/7 support',
            cells: [
              { text: 'Phone + WhatsApp', highlight: true },
              { text: 'Developer-only' },
              { text: 'No local team' },
              { text: 'No local team' }
            ]
          }
        ]
      }}
      pricing={[
        {
          title: 'Starter',
          price: 'KES 2,000',
          unit: '/ month',
          features: [
            'Official WhatsApp Business API',
            '2 users',
            'Unlimited contacts, campaigns and platform messages',
            'Standard inbox and delivery reporting',
            'AI assistant: ✕',
            'Chatbot automation: ✕',
            'Optional one-time setup: KES 2,000'
          ]
        },
        {
          title: 'Basic',
          price: 'KES 4,000',
          unit: '/ month',
          features: [
            'Official WhatsApp Business API',
            '4 users',
            'Unlimited contacts, campaigns and platform messages',
            'API access and customer webhooks',
            'AI assistant: ✕',
            'Chatbot automation: ✕',
            'Optional one-time setup: KES 4,000'
          ]
        },
        {
          title: 'Pro',
          price: 'KES 8,000',
          unit: '/ month',
          features: [
            'Official WhatsApp Business API',
            '10 users',
            'Unlimited contacts, campaigns and platform messages',
            'API access and webhooks',
            'AI assistant: ✓',
            'Chatbot automation: ✓',
            'Optional one-time setup: KES 8,000'
          ]
        },
        {
          title: 'Enterprise',
          price: 'KES 20,000',
          unit: '/ month',
          features: [
            'Official WhatsApp Business API',
            'Unlimited users',
            'Unlimited contacts, campaigns and platform messages',
            'API access, webhooks and integrations',
            'AI assistant: ✓',
            'Chatbot automation: ✓',
            'Optional one-time setup: KES 30,000',
            'Dedicated support and custom service arrangements'
          ]
        }
      ]}
      faqs={[
        {
          question: 'What are MobiWave WhatsApp subscription prices?',
          answer: 'Starter is KES 2,000 per month, Basic is KES 4,000 per month, Pro is KES 8,000 per month and Enterprise is KES 20,000 per month. Optional one-time setup is KES 2,000 for Starter, KES 4,000 for Basic, KES 8,000 for Pro and KES 30,000 for Enterprise. Contacts, campaigns and platform messaging have no fixed plan caps. Meta message charges are billed separately.'
        },
        {
          question: 'How much does custom chatbot development cost?',
          answer: 'Custom chatbot development is available as a separately scoped service at KES 50,000. Pro and Enterprise subscriptions include chatbot automation capabilities; custom development scope and integrations are confirmed before work starts.'
        },
        {
          question: 'What is the difference between WhatsApp Business App and the API?',
          answer: 'The WhatsApp Business App is a single-phone interface for small shops. The WhatsApp Business API (what MobiWave provides) is the official, scalable platform for sending to many customers, automating replies, integrating with your systems and getting the verified green tick — without bans from unofficial bulk tools.'
        },
        {
          question: 'Do I need pre-approved message templates?',
          answer: 'Yes — any outbound message sent outside a 24-hour customer service window must use a Meta-approved template (marketing, utility or authentication). MobiWave drafts and submits these for you and stores approved versions so you can reuse them.'
        },
        {
          question: 'Can customers reply and get two-way support?',
          answer: 'Yes. When a customer messages you, you get a 24-hour service window to reply freely with any content. Inbound messages arrive via webhook and can be routed to your CRM or support desk for human or automated replies.'
        },
        {
          question: 'How do I get the green verification tick?',
          answer: 'The verified green tick is granted by Meta based on business authenticity and brand recognition. MobiWave prepares and submits the verification request with your business documents and guides you through the requirements.'
        },
        {
          question: 'Is WhatsApp messaging secure and compliant?',
          answer: 'Yes. The WhatsApp Business API is end-to-end encrypted and official. We also maintain an opt-in ledger so every conversation is consented, supporting ODPC data-protection alignment in Kenya.'
        },
        {
          question: 'Can I send images, video and documents?',
          answer: 'Yes. Rich media — images, video, documents and location — is supported in both templates and two-way conversations, making WhatsApp far richer than plain SMS.'
        },
        {
          question: 'Can WhatsApp trigger an M-Pesa payment?',
          answer: 'Yes. A WhatsApp reminder can include a deep link that fires an M-Pesa STK Push, so the customer pays without leaving the conversation. Both channels run on the same MobiWave account.'
        },
        {
          question: 'Do you support Swahili?',
          answer: 'Yes. Templates and automated replies can be written in Swahili or English, and you can localize content per audience segment.'
        },
        {
          question: 'How is MobiWave different from Africa’s Talking for WhatsApp?',
          answer: 'Both provide the official API. MobiWave bundles WhatsApp with bulk SMS, USSD and M-Pesa on one Kenyan account, handles template approval and onboarding for you, and offers 24/7 local phone/WhatsApp support plus built-in analytics. Africa’s Talking is strong for self-service developer APIs; MobiWave adds managed onboarding and the multi-channel bundle.'
        }
      ]}
    />
    <section className="border-y border-slate-200 bg-slate-50 py-12">
      <div className="container-custom mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready to use MobiWave WA?</h2>
        <p className="max-w-2xl text-slate-600">Open the MobiWave WA platform to get started with WhatsApp Business messaging and customer conversations.</p>
        <a href="https://wap.mobiwave.co.ke" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0084ff] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0068d6]">
          Launch MobiWave WA <MessageCircle className="h-4 w-4" />
        </a>
      </div>
    </section>
    <WhatsAppRateCard />
    </>
  );
}
