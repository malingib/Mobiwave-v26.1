import { CreditCard } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function MPesaIntegration() {
  return (
    <ServicePageLayout
      title="M-Pesa Integration"
      subtitle="Seamless Mobile Money Transactions"
      description="Integrate M-Pesa into your business systems with our robust API. Accept payments, disburse funds, and reconcile transactions automatically. Our M-Pesa API supports C2B, B2C, and B2B transactions."
      icon={CreditCard}
      features={[
        'C2B (Customer to Business) payments',
        'B2C (Business to Customer) disbursements',
        'B2B (Business to Business) transfers',
        'Real-time transaction notifications',
        'Automatic reconciliation',
        'Secure API endpoints',
        'Transaction history',
        'Balance queries'
      ]}
      benefits={[
        'Accept payments from 30+ million M-Pesa users',
        'Instant payment confirmations',
        'Secure and PCI-DSS compliant',
        'Detailed transaction reports',
        'Easy API integration',
        '24/7 technical support'
      ]}
      useCases={[
        {
          title: 'E-commerce Payments',
          description: 'Accept M-Pesa payments on your online store.'
        },
        {
          title: 'Bill Payments',
          description: 'Enable customers to pay bills via M-Pesa.'
        },
        {
          title: 'Salary Disbursement',
          description: 'Pay employees and contractors via M-Pesa.'
        },
        {
          title: 'Refund Processing',
          description: 'Process customer refunds quickly and easily.'
        },
        {
          title: 'Loan Disbursement',
          description: 'Disburse loans to customers via M-Pesa.'
        },
        {
          title: 'Subscription Payments',
          description: 'Collect recurring subscription payments automatically.'
        }
      ]}
    />
  );
}
