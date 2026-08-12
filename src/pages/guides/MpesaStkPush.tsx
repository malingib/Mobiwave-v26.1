import { GuidePageLayout } from '@/components/GuidePageLayout';

export function MpesaStkPushGuide() {
  return (
    <GuidePageLayout
      title="M-Pesa STK Push API in Kenya"
      subtitle="How Lipa Na M-Pesa STK Push works — the 2026 guide"
      description="STK Push (officially Lipa Na M-Pesa Online) is the pop-up a customer gets on their phone to enter their M-Pesa PIN and pay. This guide explains how the Daraja API STK Push flow works in Kenya, what you need to integrate it, typical use cases, and how MobiWave bundles it with SMS, USSD and WhatsApp on one account."
      breadcrumbLabel="M-Pesa STK Push API"
      updated="August 2026"
      intro="STK Push is the single highest-conversion payment method for Kenyan businesses because the customer never leaves their phone or types a paybill number — the prompt appears, they enter their PIN, and you get a real-time callback. If you sell online, run a SACCO, or collect dues, this is the flow to implement first."
      checklist={[
        'Registered Kenyan business with KRA PIN',
        'Active Safaricom paybill or till number',
        'Daraja app (consumer key + secret) and shortcode',
        'A public CallbackURL Safaricom can reach',
        'A plan for reconciling incoming payments',
        'Customer consent and receipt messaging'
      ]}
      steps={[
        {
          step: '1',
          title: 'Register your Daraja app',
          description: 'Create a Safaricom Daraja application linked to your business, KRA PIN and paybill/till. Daraja registration is free — there is no setup fee to integrate M-Pesa.'
        },
        {
          step: '2',
          title: 'Get keys and the shortcode',
          description: 'Obtain your consumer key, consumer secret and the Lipa Na M-Pesa shortcode, then configure the CallbackURL where Safaricom posts every transaction result.'
        },
        {
          step: '3',
          title: 'Trigger STK Push',
          description: 'When a customer checks out, call the STK Push API with their phone number, amount and reference. Safaricom pushes the PIN prompt to their handset instantly.'
        },
        {
          step: '4',
          title: 'Customer enters PIN',
          description: 'The customer enters their M-Pesa PIN on the SIM pop-up. No app, no internet beyond the standard M-Pesa session. They see a confirmation from Safaricom.'
        },
        {
          step: '5',
          title: 'Receive the callback',
          description: 'Safaricom posts the result (success, cancelled or failed) to your CallbackURL in real time. MobiWave also surfaces it in the reconciliation dashboard.'
        },
        {
          step: '6',
          title: 'Reconcile and notify',
          description: 'Match the payment to the order or invoice, then send an SMS or WhatsApp receipt from the same MobiWave account. Failed attempts are flagged for retry.'
        }
      ]}
      comparison={{
        headers: ['MobiWave', "Africa's Talking", 'Celcom Africa', 'Twilio'],
        note: 'All routes use Safaricom’s official Daraja API; transaction charges follow Safaricom’s published tariff and are separate from any integration fee. Twilio is not a native Daraja reseller in Kenya.',
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
            name: 'Callback / reconciliation',
            cells: [
              { text: 'Dashboard + webhook', highlight: true },
              { text: 'Webhook' },
              { text: 'Webhook' },
              { text: 'N/A' }
            ]
          },
          {
            name: 'Trigger from USSD / SMS',
            cells: [
              { text: 'Yes, bundled', highlight: true },
              { text: 'Add-on' },
              { text: 'Add-on' },
              { text: 'No' }
            ]
          },
          {
            name: 'Setup fee',
            cells: [
              { text: 'Free (Daraja)', highlight: true },
              { text: 'Free' },
              { text: 'Free' },
              { text: 'N/A' }
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
      faqs={[
        {
          question: 'What is M-Pesa STK Push?',
          answer: 'STK Push (Lipa Na M-Pesa Online) is the API call that makes the M-Pesa PIN-entry pop-up appear on a customer’s phone. They enter their PIN to authorise payment, and you receive a real-time result callback.'
        },
        {
          question: 'How much does STK Push cost?',
          answer: 'Registering on Daraja is free. On C2B the customer pays Safaricom’s transaction charge; on B2C the business pays the disbursement fee. Safaricom’s tariff is separate from any integration fee — contact MobiWave for managed/enterprise pricing.'
        },
        {
          question: 'What do I need to integrate STK Push?',
          answer: 'A registered Kenyan business, an active Safaricom paybill or till, a Daraja app (key + secret + shortcode) and a public CallbackURL Safaricom can post results to.'
        },
        {
          question: 'How fast is the callback?',
          answer: 'Typically seconds. Once the customer enters their PIN, Safaricom posts the result to your CallbackURL almost immediately; MobiWave reflects it in the reconciliation dashboard in real time.'
        },
        {
          question: 'Can STK Push work from a USSD menu?',
          answer: 'Yes. MobiWave can fire an STK Push from any step in a USSD menu, so a customer on a feature phone can pay without internet — the menu triggers the prompt and reconciliation closes the loop.'
        },
        {
          question: 'What happens if the customer cancels or it fails?',
          answer: 'Safaricom posts a cancelled or failed result to your callback. MobiWave flags the attempt and you can retry or prompt the customer again; you are not charged for failed STK Push prompts.'
        },
        {
          question: 'Is STK Push secure?',
          answer: 'Yes. It runs on Safaricom’s official Daraja API with signed callbacks and encrypted transport. MobiWave never stores M-Pesa PINs or customer secrets — those live only on the customer’s SIM and Safaricom’s infrastructure.'
        },
        {
          question: 'Can I send a receipt after payment?',
          answer: 'Yes. On the same MobiWave account you can automatically send an SMS or WhatsApp receipt once the callback confirms success.'
        },
        {
          question: 'Do I need a paybill or till?',
          answer: 'Yes. To receive C2B payments you need a registered Safaricom paybill or till. For B2C disbursement you also need a registered business shortcode. MobiWave guides you through obtaining them.'
        },
        {
          question: 'How is MobiWave different from Africa’s Talking?',
          answer: 'Both use Daraja. MobiWave bundles STK Push with bulk SMS, USSD and WhatsApp on one Kenyan account, handles Daraja onboarding, auto-reconciles, and provides 24/7 local phone/WhatsApp support — whereas Africa’s Talking is developer-self-service.'
        }
      ]}
      relatedRoutes={[
        { label: 'M-Pesa Integration', href: '/services/mpesa-integration' },
        { label: 'USSD Codes', href: '/services/ussd-codes' },
        { label: 'Bulk SMS', href: '/services/bulk-sms' }
      ]}
    />
  );
}
