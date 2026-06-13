import { Headphones } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function ServiceDesk() {
  return (
    <ServicePageLayout
      title="Service Desk"
      subtitle="Unified Customer Support Platform"
      description="Manage all customer interactions from a single platform. Our Service Desk solution brings together SMS, email, WhatsApp, and voice channels for streamlined customer support and improved response times."
      icon={Headphones}
      features={[
        'Multi-channel support (SMS, Email, WhatsApp)',
        'Ticket management system',
        'Agent collaboration tools',
        'Automated responses',
        'Customer history tracking',
        'Performance analytics',
        'SLA monitoring',
        'Knowledge base integration'
      ]}
      benefits={[
        'Unified view of all customer interactions',
        'Faster response times',
        'Improved customer satisfaction',
        'Better team collaboration',
        'Detailed performance insights',
        'Scalable for growing teams'
      ]}
      useCases={[
        {
          title: 'Customer Support',
          description: 'Handle customer inquiries across all channels from one platform.'
        },
        {
          title: 'Technical Support',
          description: 'Manage technical issues and track resolution progress.'
        },
        {
          title: 'Sales Inquiries',
          description: 'Respond to sales questions and track leads effectively.'
        },
        {
          title: 'Complaint Management',
          description: 'Track and resolve customer complaints efficiently.'
        },
        {
          title: 'Order Support',
          description: 'Help customers with order-related questions and issues.'
        },
        {
          title: 'Account Management',
          description: 'Assist customers with account-related inquiries.'
        }
      ]}
    />
  );
}
