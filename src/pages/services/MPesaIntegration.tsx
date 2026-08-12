import { CreditCard } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function MPesaIntegration() {
  return (
    <ServicePageLayout
      title="M-Pesa Integration"
      subtitle="Accept, Collect and Disburse Money via Kenya's M-Pesa"
      description="Integrate M-Pesa into your systems with MobiWave on Safaricom's official Daraja API. Trigger STK Push (Lipa Na M-Pesa), receive C2B payments on your paybill or till, run B2C disbursements and B2B transfers, and auto-reconcile every transaction — then bundle SMS, USSD and WhatsApp on one Kenyan account with 24/7 local support."
      icon={CreditCard}
      stats={[
        { value: '30M+', label: 'M-Pesa Users Reached' },
        { value: 'C2B·B2C·B2B', label: 'Full API Coverage' },
        { value: 'KES 0', label: 'Daraja Setup Fee' },
        { value: '24/7', label: 'Nairobi Support' }
      ]}
      features={[
        'STK Push (Lipa Na M-Pesa online) for one-tap checkout',
        'C2B payments on paybill and till with validation + confirmation',
        'B2C disbursements for salaries, refunds and payouts',
        'B2B transfers between registered businesses',
        'Real-time transaction callbacks to your CallbackURL',
        'Automatic reconciliation against incoming payments',
        'Transaction status queries and reversals',
        'Account balance queries',
        'Daraja sandbox plus production keys (no code changes to switch)',
        'Webhook events and a reconciliation dashboard'
      ]}
      benefits={[
        'Reach 30M+ M-Pesa users across Kenya from one integration',
        'Instant payment confirmations with full status visibility',
        'Bank-grade security on Safaricom’s official Daraja API',
        'Detailed transaction reports and audit-ready reconciliation',
        'Simple REST integration with SDKs and a sandbox',
        '24/7 local Nairobi support via phone, email and WhatsApp'
      ]}
      useCases={[
        {
          title: 'E-commerce checkout',
          description: 'Trigger STK Push at checkout so customers pay in seconds from the M-Pesa menu on their phone.'
        },
        {
          title: 'Bill & fee payments',
          description: 'Collect school fees, utility bills, SACCO dues and invoices via C2B with instant confirmation.'
        },
        {
          title: 'Salaries & loan disbursement',
          description: 'Run B2C payouts for salaries, contractor payments, refunds and approved loan disbursements.'
        },
        {
          title: 'Donations & contributions',
          description: 'Capture church, charity and chama contributions through STK Push with automatic receipts.'
        },
        {
          title: 'Subscriptions & recurring',
          description: 'Collect recurring membership and subscription payments with scheduled STK Push prompts.'
        },
        {
          title: 'Marketplace escrow',
          description: 'Hold, release and refund seller payouts with B2C and reversal support built in.'
        },
        {
          title: 'Field & agent float',
          description: 'Top up agents and field staff via B2C, then reconcile against your ledger in real time.'
        },
        {
          title: 'Government & NGO payouts',
          description: 'Disburse grants, stipends and relief funds directly to beneficiaries’ M-Pesa wallets.'
        }
      ]}
      howItWorks={[
        {
          step: '1',
          title: 'Register your Daraja app',
          description: 'MobiWave sets up your Safaricom Daraja application using your registered business, KRA PIN and paybill or till number. Daraja registration is free — there is no setup fee to integrate.'
        },
        {
          step: '2',
          title: 'Get your keys and shortcode',
          description: 'We provision your consumer key, consumer secret and the Lipa Na M-Pesa shortcode, then configure the CallbackURL where Safaricom will post every transaction result.'
        },
        {
          step: '3',
          title: 'Test in the sandbox',
          description: 'Use the Daraja sandbox to simulate STK Push, C2B confirmations, B2C disbursements and reversals with test credentials — validate your callbacks before going live.'
        },
        {
          step: '4',
          title: 'Go live on production',
          description: 'Safaricom approves the production app and we flip your keys to live. Trigger real STK Push, C2B and B2C calls from your app, checkout or USSD flow with no code changes.'
        },
        {
          step: '5',
          title: 'Reconcile automatically',
          description: 'Every transaction streams back via webhook into MobiWave’s reconciliation dashboard. Match payments to orders, customers or invoices and export audit-ready reports.'
        },
        {
          step: '6',
          title: 'Bundle with SMS, USSD & WhatsApp',
          description: 'Add bulk SMS, USSD menus and WhatsApp to the same MobiWave account — confirm payments, send receipts and run reminders from one billing line and one support contact.'
        }
      ]}
      comparisonTable={{
        headers: ['MobiWave', "Africa's Talking", 'Celcom Africa', 'Twilio'],
        note: 'All providers sit on Safaricom’s Daraja API; transaction charges follow Safaricom’s published tariff and are separate from any integration fee. Twilio is not a native Daraja reseller in Kenya.',
        rows: [
          {
            name: 'Native Daraja STK Push',
            cells: [
              { text: 'Yes — native', highlight: true },
              { text: 'Yes' },
              { text: 'Yes (reseller)' },
              { text: 'Limited / not native' }
            ]
          },
          {
            name: 'C2B paybill & till',
            cells: [
              { text: 'Full (validation + confirmation)', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'Not native' }
            ]
          },
          {
            name: 'B2C disbursements',
            cells: [
              { text: 'Yes', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'Not native' }
            ]
          },
          {
            name: 'Automatic reconciliation',
            cells: [
              { text: 'Built-in dashboard + webhooks', highlight: true },
              { text: 'API callbacks' },
              { text: 'API callbacks' },
              { text: 'N/A' }
            ]
          },
          {
            name: 'Sandbox + production keys',
            cells: [
              { text: 'Yes', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'N/A' }
            ]
          },
          {
            name: 'Bundle with SMS, USSD & WhatsApp',
            cells: [
              { text: 'One account', highlight: true },
              { text: 'Add-ons' },
              { text: 'Add-ons' },
              { text: 'Separate products' }
            ]
          },
          {
            name: 'Local 24/7 support',
            cells: [
              { text: 'Phone + WhatsApp', highlight: true },
              { text: 'Developer-only' },
              { text: 'Business hours' },
              { text: 'No local team' }
            ]
          }
        ]
      }}
      pricing={[
        {
          title: 'API Integration',
          price: 'KES 0',
          unit: ' Daraja setup',
          features: [
            'Free Daraja app registration',
            'Consumer key, secret & shortcode',
            'Sandbox + production keys',
            'CallbackURL configuration',
            'Standard support'
          ]
        },
        {
          title: 'Managed Payments',
          price: 'Usage-based',
          unit: '',
          features: [
            'STK Push, C2B & B2C live',
            'Webhook callbacks',
            'Reconciliation dashboard',
            'Safaricom tariff applies per transaction',
            '24/7 support'
          ]
        },
        {
          title: 'Enterprise',
          price: 'Custom',
          unit: '',
          features: [
            'High-volume throughput',
            'Custom SLAs and escalation',
            'Dedicated account manager',
            'Bulk disbursement workflows',
            'Named engineer + onboarding'
          ]
        }
      ]}
      faqs={[
        {
          question: 'How much does M-Pesa API integration cost in Kenya?',
          answer: 'Registering on Safaricom’s Daraja API is free — there is no setup fee to integrate M-Pesa through MobiWave. Beyond that, Safaricom levies transaction charges per its published tariff: on C2B the customer pays the charge, and on B2C the business pays the disbursement fee. MobiWave’s integration and support are quote-based for managed and enterprise volumes — contact us for a tailored plan.'
        },
        {
          question: 'What is Daraja and do I need to register?',
          answer: 'Daraja is Safaricom’s official open-API platform for M-Pesa. You need a Daraja application (consumer key and secret) linked to your registered business, KRA PIN and paybill or till number. MobiWave registers and configures this for you, so you don’t handle the developer-portal paperwork yourself.'
        },
        {
          question: 'Do you support STK Push (Lipa Na M-Pesa)?',
          answer: 'Yes. MobiWave triggers native Lipa Na M-Pesa STK Push from your checkout, CRM, USSD menu or app. The customer gets the SIM pop-up, enters their PIN, and the result posts to your CallbackURL and our reconciliation dashboard in real time.'
        },
        {
          question: 'Can I receive C2B payments on my paybill or till?',
          answer: 'Yes. We support C2B on both paybill and till numbers, including the validation and confirmation URLs so you can accept, validate and record every payment before it settles.'
        },
        {
          question: 'Can I send B2C disbursements and refunds?',
          answer: 'Yes. B2C is used for salaries, contractor payouts, refunds, loans and grants. You can also query transaction status and initiate reversals for failed or erroneous transfers.'
        },
        {
          question: 'How does reconciliation work?',
          answer: 'Every M-Pesa transaction streams back to your CallbackURL via webhook and into MobiWave’s reconciliation dashboard. You match payments to orders, customers or invoices, download audit-ready reports, and keep a complete ledger without manual bank matching.'
        },
        {
          question: 'Is the integration secure?',
          answer: 'Yes. MobiWave runs on Safaricom’s official Daraja API with consumer-key authentication, signed callbacks and encrypted transport. We never store M-Pesa PINs or customer secrets — those live only on the customer’s SIM and Safaricom’s infrastructure.'
        },
        {
          question: 'Do I need a paybill or till number?',
          answer: 'Yes. To receive C2B payments you need a registered Safaricom paybill or till tied to your business. If you don’t have one, MobiWave guides you through obtaining it; for STK Push disbursement only (B2C) a registered business shortcode is also required.'
        },
        {
          question: 'Can M-Pesa be triggered from a USSD menu?',
          answer: 'Yes. MobiWave can fire an STK Push from any step in a USSD menu, so a customer on a feature phone can pay without internet — the menu triggers the pop-up and reconciliation closes the loop back into the session.'
        },
        {
          question: 'How is MobiWave different from Africa’s Talking for M-Pesa?',
          answer: 'Both use Daraja. MobiWave bundles M-Pesa with bulk SMS, USSD and WhatsApp on one Kenyan account, handles Daraja onboarding for you, and provides 24/7 local phone/WhatsApp support plus built-in reconciliation. Africa’s Talking is strong for self-service developer APIs; MobiWave adds the managed onboarding and the multi-channel bundle in a single billing line.'
        }
      ]}
    />
  );
}
