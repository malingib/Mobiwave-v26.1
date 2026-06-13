import { Hash } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function Shortcodes() {
  return (
    <ServicePageLayout
      title="SMS Shortcodes"
      subtitle="Easy-to-Remember Numbers for Engagement"
      description="Use premium shortcodes for two-way SMS communication. Perfect for voting campaigns, lead generation, customer feedback, and subscription services. Our shortcodes work across all major networks in Kenya."
      icon={Hash}
      features={[
        'Easy to remember',
        'Works across all networks',
        'Two-way communication',
        'Real-time message processing',
        'Keyword management',
        'Auto-responses',
        'Detailed analytics',
        'API integration'
      ]}
      benefits={[
        'Increase customer engagement',
        'Generate leads effectively',
        'Collect valuable feedback',
        'Build subscriber lists',
        'Run successful campaigns',
        'Professional brand image'
      ]}
      useCases={[
        {
          title: 'Voting Campaigns',
          description: 'Run SMS voting for competitions, elections, and polls.'
        },
        {
          title: 'Lead Generation',
          description: 'Capture leads through SMS keyword responses.'
        },
        {
          title: 'Customer Feedback',
          description: 'Collect ratings and reviews via SMS shortcodes.'
        },
        {
          title: 'Subscription Services',
          description: 'Enable customers to subscribe to updates and alerts.'
        },
        {
          title: 'Contest Entries',
          description: 'Allow customers to enter contests and giveaways.'
        },
        {
          title: 'Information Requests',
          description: 'Provide instant information via keyword responses.'
        }
      ]}
      pricing={[
        {
          title: 'Shared Short-Code',
          price: 'KES 2,500',
          unit: '/network +VAT',
          features: [
            'Cost-effective solution',
            'Monthly renewal: KES 5,000 +VAT',
            '1 week waiting period',
            'Authorisation letter required',
            'List of preferred codes'
          ]
        },
        {
          title: 'Dedicated Short-Code',
          price: 'KES 15,000',
          unit: '/network +VAT',
          features: [
            'Exclusive shortcode',
            'Monthly rental: KES 15,000 +VAT',
            'Complete control',
            '1 week waiting period',
            'Authorisation letter required'
          ]
        }
      ]}
    />
  );
}
