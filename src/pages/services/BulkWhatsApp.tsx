import { MessageCircle } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function BulkWhatsApp() {
  return (
    <ServicePageLayout
        title="Bulk WhatsApp"
        subtitle="Official WhatsApp messaging for your business"
        description="Send customer updates, campaigns and support messages through the official WhatsApp Business API. MobiWave helps with onboarding, templates and local support, with optional links to SMS, USSD and M-Pesa."
        icon={MessageCircle}
        features={[
          'Official WhatsApp Business API access',
          'Campaigns, templates and rich-media messages',
          'Two-way customer conversations and delivery reporting',
          'API access and webhooks on supported plans',
          'AI assistant and chatbot automation on Pro and Enterprise',
          'Local onboarding and support'
        ]}
        benefits={[
          'One clear monthly subscription, with Meta message charges separate',
          'Choose a plan based on team size and automation needs',
          'Get help with setup and message-template approval',
          'Connect WhatsApp with your other MobiWave communication services'
        ]}
        useCases={[
          {
            title: 'Customer updates',
            description: 'Send order, delivery, appointment and service notifications.'
          },
          {
            title: 'Campaigns and offers',
            description: 'Share approved promotional templates, product details and rich media with opted-in customers.'
          },
          {
            title: 'Customer support',
            description: 'Handle replies in two-way conversations and route messages to your team.'
          },
          {
            title: 'Payments and reminders',
            description: 'Send payment reminders and links that can connect customers to M-Pesa flows.'
          }
        ]}
        pricing={[
          {
            title: 'Starter',
            price: 'KES 2,000',
            unit: '/ month',
            features: ['2 users', 'Official WhatsApp Business API', 'Standard inbox and delivery reporting', 'Optional setup: KES 2,000']
          },
          {
            title: 'Basic',
            price: 'KES 4,000',
            unit: '/ month',
            features: ['4 users', 'Official WhatsApp Business API', 'API access and webhooks', 'Optional setup: KES 4,000']
          },
          {
            title: 'Pro',
            price: 'KES 8,000',
            unit: '/ month',
            features: ['10 users', 'API access and webhooks', 'AI assistant and chatbot automation', 'Optional setup: KES 8,000']
          },
          {
            title: 'Enterprise',
            price: 'KES 20,000',
            unit: '/ month',
            features: ['Unlimited users', 'API access and integrations', 'AI assistant and chatbot automation', 'Optional setup: KES 30,000', 'Dedicated support arrangements']
          }
        ]}
        faqs={[
          {
            question: 'Are WhatsApp message charges included in the subscription?',
            answer: 'No. The monthly subscription covers access to the MobiWave platform. Meta WhatsApp message charges are billed separately and can vary by message category, destination and current Meta rates.'
          },
          {
            question: 'Are contacts and campaigns capped?',
            answer: 'There are no fixed plan caps on contacts or campaigns. Platform safeguards and applicable WhatsApp messaging policies still apply.'
          },
          {
            question: 'Is setup compulsory?',
            answer: 'No. Setup is optional. If requested, the one-time fee is KES 2,000 for Starter, KES 4,000 for Basic, KES 8,000 for Pro and KES 30,000 for Enterprise.'
          },
          {
            question: 'Which plans include automation?',
            answer: 'AI assistant and chatbot automation are included with Pro and Enterprise. Flow Builder is not included in any plan. Custom chatbot development can be scoped separately at KES 50,000.'
          },
          {
            question: 'What is required for outbound messages?',
            answer: 'Messages sent outside the 24-hour customer service window generally require a Meta-approved template. Customers must also have opted in to receive messages.'
          }
        ]}
        ctaDescription="Compare plans and continue onboarding on MobiWave WA."
        ctaPrimaryHref="https://wap.mobiwave.co.ke"
        ctaPrimaryLabel="Open MobiWave WA"
        ctaShowContactDetails={false}
        ctaShowSecondaryAction={false}
    />
  );
}
