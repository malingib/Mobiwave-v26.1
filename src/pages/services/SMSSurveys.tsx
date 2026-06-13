import { BarChart3 } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function SMSSurveys() {
  return (
    <ServicePageLayout
      title="SMS Surveys"
      subtitle="Collect Feedback via SMS"
      description="Create and send SMS-based surveys to collect valuable feedback from your customers. Our platform provides real-time results, detailed analytics, and easy survey management."
      icon={BarChart3}
      features={[
        'Easy survey creation',
        'Multiple question types',
        'Real-time responses',
        'Automated follow-ups',
        'Response analytics',
        'Export to Excel/CSV',
        'Scheduled surveys',
        'API integration'
      ]}
      benefits={[
        'High response rates via SMS',
        'Reach customers without internet',
        'Instant feedback collection',
        'Cost-effective research tool',
        'Easy to analyze results',
        'GDPR compliant'
      ]}
      useCases={[
        {
          title: 'Customer Satisfaction',
          description: 'Measure customer satisfaction with products and services.'
        },
        {
          title: 'Product Feedback',
          description: 'Collect opinions on new products and features.'
        },
        {
          title: 'Employee Surveys',
          description: 'Gather feedback from employees on workplace issues.'
        },
        {
          title: 'Market Research',
          description: 'Conduct market research and gather consumer insights.'
        },
        {
          title: 'Event Feedback',
          description: 'Collect feedback after events, webinars, and workshops.'
        },
        {
          title: 'Service Evaluation',
          description: 'Evaluate service quality and identify improvement areas.'
        }
      ]}
    />
  );
}
