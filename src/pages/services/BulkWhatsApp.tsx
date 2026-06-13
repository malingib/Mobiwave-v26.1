import { MessageCircle } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function BulkWhatsApp() {
  return (
    <ServicePageLayout
      title="Bulk WhatsApp"
      subtitle="Connect on the World's Favorite Messaging App"
      description="Reach your customers on WhatsApp with rich media messages, notifications, and two-way communication. Our WhatsApp Business API integration enables you to send messages at scale with high engagement rates."
      icon={MessageCircle}
      features={[
        'Rich media messages (images, videos, documents)',
        'Two-way communication',
        'Message templates',
        'Contact management',
        'Delivery tracking',
        'API integration',
        'Automated responses',
        'Analytics dashboard'
      ]}
      benefits={[
        'Higher open rates compared to SMS and email',
        'Rich media support for better engagement',
        'Official WhatsApp Business API',
        'Global reach with local presence',
        'Secure and encrypted messaging',
        '24/7 customer support'
      ]}
      useCases={[
        {
          title: 'Customer Support',
          description: 'Provide instant support through WhatsApp with automated responses.'
        },
        {
          title: 'Order Updates',
          description: 'Send order confirmations, shipping updates, and delivery notifications.'
        },
        {
          title: 'Appointment Reminders',
          description: 'Reduce no-shows with WhatsApp appointment reminders.'
        },
        {
          title: 'Product Catalogs',
          description: 'Share product images and catalogs directly on WhatsApp.'
        },
        {
          title: 'Payment Reminders',
          description: 'Send payment due reminders with payment links.'
        },
        {
          title: 'Feedback Collection',
          description: 'Collect customer feedback through interactive WhatsApp messages.'
        }
      ]}
    />
  );
}
