import { Mail } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function BulkEmail() {
  return (
    <ServicePageLayout
      title="Bulk Email"
      subtitle="Professional Email Marketing at Scale"
      description="Send professional email campaigns to your customers with our powerful bulk email service. Our platform ensures high deliverability rates, detailed analytics, and easy campaign management."
      ctaDescription="Ready to transform your business communication? Contact us today to learn more about our Bulk Email service."
      icon={Mail}
      features={[
        'High deliverability rates',
        'Custom email templates',
        'Email scheduling',
        'A/B testing',
        'Click and open tracking',
        'Bounce management',
        'List segmentation',
        'Automation workflows'
      ]}
      benefits={[
        'Reach customers directly in their inbox',
        'Professional email templates included',
        'Detailed campaign analytics',
        'GDPR compliant',
        'Integration with popular CRMs',
        'Dedicated IP options available'
      ]}
      useCases={[
        {
          title: 'Newsletter Campaigns',
          description: 'Keep your audience engaged with regular newsletters and updates.'
        },
        {
          title: 'Product Launches',
          description: 'Announce new products and services to your customer base.'
        },
        {
          title: 'Promotional Offers',
          description: 'Send special offers and discounts to drive sales.'
        },
        {
          title: 'Event Invitations',
          description: 'Invite customers to events, webinars, and workshops.'
        },
        {
          title: 'Welcome Series',
          description: 'Automate welcome emails for new subscribers and customers.'
        },
        {
          title: 'Transactional Emails',
          description: 'Send order confirmations, receipts, and shipping notifications.'
        }
      ]}
    />
  );
}
