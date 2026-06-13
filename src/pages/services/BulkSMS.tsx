import { MessageSquare } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function BulkSMS() {
  return (
    <ServicePageLayout
      title="Bulk SMS"
      subtitle="Reach Your Customers Instantly"
      description="Send SMS messages to thousands of customers instantly with our reliable and affordable bulk SMS service. Whether you need to send promotional messages, alerts, or notifications, our platform ensures high delivery rates and real-time tracking."
      icon={MessageSquare}
      features={[
        'High delivery rates (99.9%)',
        'Personalized sender ID',
        'Real-time delivery reports',
        'Message scheduling',
        'API integration',
        'Two-way messaging',
        'Contact management',
        'Campaign analytics'
      ]}
      benefits={[
        'Instant delivery to all major networks in Kenya',
        'Cost-effective pricing starting at KES 0.20 per SMS',
        'Easy-to-use web interface and API',
        '24/7 technical support',
        'Secure and reliable platform',
        'No setup fees or hidden charges'
      ]}
      useCases={[
        {
          title: 'Marketing Campaigns',
          description: 'Promote your products and services to a large audience with targeted SMS campaigns.'
        },
        {
          title: 'Appointment Reminders',
          description: 'Reduce no-shows by sending automated appointment reminders to your customers.'
        },
        {
          title: 'Payment Reminders',
          description: 'Send payment due dates and reminders to improve collections.'
        },
        {
          title: 'OTP & Verification',
          description: 'Secure your applications with one-time passwords and verification codes.'
        },
        {
          title: 'Emergency Alerts',
          description: 'Quickly notify customers of important updates or emergencies.'
        },
        {
          title: 'Customer Engagement',
          description: 'Keep customers informed with order updates, delivery notifications, and more.'
        }
      ]}
      pricing={[
        {
          title: 'Small Business',
          price: 'KES 0.35',
          unit: '/SMS',
          features: [
            '1 - 50,000 SMS/month',
            'Personalized sender ID',
            'Delivery reports',
            '24/7 support',
            'API access'
          ]
        },
        {
          title: 'Medium Business',
          price: 'KES 0.30',
          unit: '/SMS',
          features: [
            '50,001 - 500,000 SMS/month',
            '24/7 priority support',
            'API access',
            'Message scheduling'
          ]
        },
        {
          title: 'Large Business',
          price: 'KES 0.25',
          unit: '/SMS',
          features: [
            '500,001 - 2,000,000 SMS/month',
            '24/7 priority support',
            'API access',
            'Message scheduling',
            'Dedicated account manager'
          ]
        },
        {
          title: 'Enterprise',
          price: 'KES 0.20',
          unit: '/SMS',
          features: [
            'Above 2,000,000 SMS/month',
            'Dedicated account manager',
            '24/7 priority support',
            'API access',
            'Message scheduling',
            'Custom integration support'
          ]
        }
      ]}
    />
  );
}
