import { GuidePageLayout } from '@/components/GuidePageLayout';

export function UssdCodeCostGuide() {
  return (
    <GuidePageLayout
      title="USSD Code Cost in Kenya (2026)"
      subtitle="Extension pricing, session charges and usage costs"
      description="USSD extension pricing in Kenya, prepaid and postpaid plans, setup and monthly fees, typical per-session charges, separately billed SMS, and the CAK allocation process."
      breadcrumbLabel="USSD Code Cost"
      updated="August 2026"
      intro="USSD works on feature phones without mobile data. Budget separately for your extension setup fee, monthly subscription, USSD session charges and SMS usage. Session charges are typically paid by the subscriber to their mobile carrier; SMS usage is billed separately at the applicable rate."
      checklist={[
        'Decision: shared (sub-keyword) or dedicated (own code)',
        'Registered Kenyan business + KRA PIN',
        'Signed CAK shortcode application letter',
        'Budget for the service fee (not just setup)',
        'Plan for the end-user per-session charge',
        'API or webhook for your menu logic'
      ]}
      steps={[
        {
          step: '1',
          title: 'Pick shared or dedicated',
          description: 'Choose the extension length and billing model that fits your service. Prepaid is available for 2-, 3- and 4-digit extensions; postpaid is available for 1- and 2-digit extensions.'
        },
        {
          step: '2',
          title: 'Budget the service fee',
          description: 'Prepaid setup is KES 5,000 for 2–4 digit extensions. Monthly fees: KES 8,000 (2 digits), KES 6,000 (3 digits), and KES 4,000 (4 digits). Postpaid setup is KES 10,000 for 1- or 2-digit extensions; monthly fees are KES 45,000 (1 digit) and KES 35,000 (2 digits).'
        },
        {
          step: '3',
          title: 'Apply through the CAK',
          description: 'Shortcodes are allocated by the Communications Authority of Kenya. MobiWave prepares and submits the application with your business documents so you skip the paperwork.'
        },
        {
          step: '4',
          title: 'Account for end-user cost',
          description: 'USSD sessions typically cost KES 1–5 per session, depending on network and session length. The carrier generally charges this to the subscriber. SMS usage is billed separately at the applicable SMS rate; neither usage charge is included in the setup or monthly subscription.'
        },
        {
          step: '5',
          title: 'Build in the test-bed',
          description: 'Use a test environment to develop menus and validate sessions before real traffic reaches your systems. Confirm any test-bed fee and VAT treatment in your quotation.'
        },
        {
          step: '6',
          title: 'Go live and bundle',
          description: 'Point menus at your API, then add M-Pesa STK Push, SMS and WhatsApp from the same MobiWave account for one billing line.'
        }
      ]}
      comparison={{
        headers: ['MobiWave', "Africa's Talking", 'Celcom Africa', 'Twilio'],
        note: 'Extension setup and monthly fees exclude usage. USSD session charges are typically KES 1–5 per session depending on network and session length; SMS usage is billed separately. Confirm VAT and the applicable SMS rate in your quotation.',
        rows: [
          {
            name: 'Prepaid extension (2 digits)',
            cells: [
              { text: 'KES 5,000 setup + KES 8,000/mo', highlight: true },
              { text: 'Available (quote)' },
              { text: 'Available' },
              { text: 'Not supported' }
            ]
          },
          {
            name: 'Prepaid extension (3 digits)',
            cells: [
              { text: 'KES 5,000 setup + KES 6,000/mo', highlight: true },
              { text: 'Available (quote)' },
              { text: 'Available' },
              { text: 'Not supported' }
            ]
          },
          { name: 'Prepaid extension (4 digits)', cells: [{ text: 'KES 5,000 setup + KES 4,000/mo', highlight: true }, { text: 'Available (quote)' }, { text: 'Available' }, { text: 'Not supported' }] },
          { name: 'Postpaid extension (1 digit)', cells: [{ text: 'KES 10,000 setup + KES 45,000/mo', highlight: true }, { text: 'Available (quote)' }, { text: 'Available' }, { text: 'Not supported' }] },
          { name: 'Postpaid extension (2 digits)', cells: [{ text: 'KES 10,000 setup + KES 35,000/mo', highlight: true }, { text: 'Available (quote)' }, { text: 'Available' }, { text: 'Not supported' }] },
          {
            name: 'Test-bed',
            cells: [
              { text: 'KES 32,000 / 30 days', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'N/A' }
            ]
          },
          {
            name: 'USSD session charge (per session)',
            cells: [
              { text: 'Typically KES 1–5; billed to subscriber', highlight: true },
              { text: 'Billed to subscriber' },
              { text: 'Billed to subscriber' },
              { text: 'N/A' }
            ]
          },
          {
            name: 'M-Pesa STK from menu',
            cells: [
              { text: 'Native, bundled', highlight: true },
              { text: 'Add-on' },
              { text: 'Yes' },
              { text: 'No' }
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
          question: 'How much does a USSD extension cost in Kenya?',
          answer: 'Prepaid: KES 5,000 setup for 2–4 digit extensions, then KES 8,000/month (2 digits), KES 6,000/month (3 digits), or KES 4,000/month (4 digits). Postpaid: KES 10,000 setup plus KES 45,000/month for 1 digit or KES 35,000/month for 2 digits. Postpaid is not offered for 3- or 4-digit extensions. Confirm VAT treatment in your quotation.'
        },
        {
          question: 'Who pays the per-session charge?',
          answer: 'USSD sessions typically cost KES 1–5 per session, depending on the mobile network and session length, and are generally charged by the carrier to the subscriber. This is separate from the extension setup and monthly subscription. SMS usage is billed separately at the applicable SMS rate.'
        },
        {
          question: 'Is shared or dedicated cheaper?',
          answer: 'Compare the extension length and billing model. Prepaid supports 2-, 3- and 4-digit extensions; postpaid supports 1- and 2-digit extensions only. Session and SMS usage are separate charges.'
        },
        {
          question: 'How long does it take to get a code?',
          answer: 'Shared codes can be live within days on MobiWave’s pool. Dedicated codes need CAK approval, typically several weeks. Build in the test-bed in parallel.'
        },
        {
          question: 'Do I need a CAK application?',
          answer: 'Yes — shortcodes are allocated by the Communications Authority of Kenya. MobiWave handles the application for you with your business registration and letterhead.'
        },
        {
          question: 'Can I collect M-Pesa inside USSD?',
          answer: 'Yes. MobiWave triggers an STK Push from any menu step and reconciles the result, so a feature-phone user can pay without internet.'
        },
        {
          question: 'Do users need internet?',
          answer: 'No. USSD runs over the GSM signalling channel on every phone — the core advantage for rural and low-connectivity audiences.'
        },
        {
          question: 'Can menus be in Swahili?',
          answer: 'Yes. Multi-language menus including Swahili are supported, selectable by the subscriber in the first level.'
        },
        {
          question: 'Is there an API?',
          answer: 'Yes. Each menu step calls your REST endpoint with the session id and input; MobiWave manages session state, timeouts and analytics.'
        },
        {
          question: 'How is MobiWave different from Africa’s Talking for USSD?',
          answer: 'Both provide USSD. MobiWave bundles M-Pesa STK Push, SMS and WhatsApp on one account with managed CAK onboarding and 24/7 local support; Africa’s Talking is developer-self-service.'
        }
      ]}
      relatedRoutes={[
        { label: 'USSD Codes', href: '/services/ussd-codes' },
        { label: 'M-Pesa STK Push API', href: '/guides/mpesa-stk-push-api-kenya' },
        { label: 'Shortcodes & Sender IDs', href: '/services/shortcodes' }
      ]}
    />
  );
}
