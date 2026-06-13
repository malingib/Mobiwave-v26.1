import { Gift } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function AirtimeRewards() {
  return (
    <ServicePageLayout
      title="Airtime & Data Rewards"
      subtitle="Incentivize Your Customers Instantly"
      description="Reward your customers with instant airtime and data bundles. Perfect for loyalty programs, referral incentives, survey participation, and promotional campaigns. Our platform supports all major networks in Kenya."
      icon={Gift}
      features={[
        'Instant airtime delivery',
        'Data bundle rewards',
        'All major networks supported',
        'Bulk reward processing',
        'Reward scheduling',
        'Delivery tracking',
        'API integration',
        'Detailed reports'
      ]}
      benefits={[
        'Instant gratification for customers',
        'Increase customer loyalty',
        'Drive desired behaviors',
        'Cost-effective incentives',
        'Easy to implement',
        'Real-time delivery confirmation'
      ]}
      useCases={[
        {
          title: 'Loyalty Programs',
          description: 'Reward loyal customers with airtime for repeat purchases.'
        },
        {
          title: 'Referral Rewards',
          description: 'Incentivize customers to refer friends and family.'
        },
        {
          title: 'Survey Incentives',
          description: 'Increase survey response rates with airtime rewards.'
        },
        {
          title: 'Promotional Campaigns',
          description: 'Run promotions with airtime as prizes or rewards.'
        },
        {
          title: 'Employee Recognition',
          description: 'Reward employees for outstanding performance.'
        },
        {
          title: 'Contest Prizes',
          description: 'Offer airtime as prizes for competitions and giveaways.'
        }
      ]}
    />
  );
}
