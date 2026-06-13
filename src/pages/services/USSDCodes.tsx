import { Smartphone } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function USSDCodes() {
  return (
    <ServicePageLayout
      title="USSD Codes"
      subtitle="Interactive Menus Without Internet"
      description="Create interactive USSD menus that work on any mobile phone without internet access. Perfect for mobile banking, surveys, and customer self-service in areas with limited connectivity."
      icon={Smartphone}
      features={[
        'Works on all mobile phones',
        'No internet required',
        'Custom menu flows',
        'Real-time responses',
        'Multi-language support',
        'API integration',
        'Session management',
        'Detailed analytics'
      ]}
      benefits={[
        'Reach customers in areas with poor internet',
        'Instant menu responses',
        'Cost-effective for businesses and customers',
        'Easy to use for all demographics',
        'Secure transactions',
        '24/7 availability'
      ]}
      useCases={[
        {
          title: 'Mobile Banking',
          description: 'Enable balance checks, transfers, and payments via USSD.'
        },
        {
          title: 'Customer Surveys',
          description: 'Collect feedback through interactive USSD questionnaires.'
        },
        {
          title: 'Information Services',
          description: 'Provide product information, prices, and availability.'
        },
        {
          title: 'Account Management',
          description: 'Allow customers to manage accounts and subscriptions.'
        },
        {
          title: 'Voting Systems',
          description: 'Conduct polls and voting campaigns via USSD.'
        },
        {
          title: 'Registration Services',
          description: 'Enable customer registration and enrollment via USSD.'
        }
      ]}
      pricing={[
        {
          title: 'Dedicated USSD',
          price: 'KES 110,000',
          unit: ' +VAT',
          features: [
            'Up-front fee: KES 40,000 +VAT',
            'Monthly fee: KES 40,000 +VAT',
            'Dedicated USSD code',
            'Full customization',
            'Customer charged for access',
            '24/7 support',
            'API integration'
          ]
        },
        {
          title: 'Test-Bed Service',
          price: 'KES 32,000',
          unit: ' +VAT',
          features: [
            '30-day test environment',
            'Development access',
            'Testing capabilities',
            'Extension: KES 32,000 +VAT',
            'Technical support'
          ]
        },
        {
          title: 'Shared USSD',
          price: 'KES 11,000',
          unit: ' setup +VAT',
          features: [
            'Shared USSD code',
            'Monthly fee: KES 8,000 +VAT',
            'Cost-effective',
            'Standard support'
          ]
        }
      ]}
    />
  );
}
