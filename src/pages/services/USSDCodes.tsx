import { Smartphone } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function USSDCodes() {
  return (
    <ServicePageLayout
      title="USSD Codes"
      subtitle="Interactive Menus That Work on Every Phone in Kenya"
      description="Build interactive USSD menus that run on any mobile phone — no internet, no smartphone, no app. MobiWave provisions shared and dedicated USSD shortcodes through the Communications Authority of Kenya (CAK), wires them to your REST API, and lets you trigger M-Pesa STK Push from any menu step. Perfect for banking, payments, surveys and customer self-service in areas with limited connectivity."
      icon={Smartphone}
      stats={[
        { value: 'KES 5,000', label: 'Prepaid setup for 2–4 digit extensions' },
        { value: 'KES 4,000+', label: 'Monthly prepaid from' },
        { value: 'Prepaid & postpaid', label: 'Billing options' },
        { value: 'All phones', label: 'No Internet Needed' }
      ]}
      features={[
        'Works on every GSM phone — feature phones included, no data or app',
        'No internet required; menus run over the carrier signalling channel',
        'Custom multi-level menu flows with branching logic',
        'Real-time session responses and live input capture',
        'Swahili and English menu localization out of the box',
        'REST API + webhook integration with session state management',
        'Per-session analytics and drop-off reporting',
        'Shared and dedicated shortcodes to fit any budget',
        'M-Pesa STK Push triggered from any menu step',
        'Sandbox test-bed for building and validating menus before go-live'
      ]}
      benefits={[
        'Reach customers in rural and low-connectivity areas where smartphones and data are scarce',
        'Instant menu responses with no app install or onboarding friction',
        'Cost-effective for both your business and your customers',
        'Secure, carrier-grade transactions on Safaricom, Airtel and Telkom',
        'Collect M-Pesa payments inside the same menu flow — no channel switching',
        '24/7 local Nairobi support via phone, email and WhatsApp'
      ]}
      useCases={[
        {
          title: 'Mobile banking & wallets',
          description: 'Balance checks, mini-statements, transfers and PIN changes via USSD on any phone.'
        },
        {
          title: 'M-Pesa collections',
          description: 'Trigger STK Push inside a USSD menu for contributions, dues, airtime top-up and bill pay.'
        },
        {
          title: 'Customer surveys',
          description: 'Run interactive USSD questionnaires and polls with branching questions and instant scoring.'
        },
        {
          title: 'Information services',
          description: 'Deliver crop prices, exam results, clinic schedules and product availability without data.'
        },
        {
          title: 'Account management',
          description: 'Let customers register, subscribe, pause or upgrade services entirely through the menu.'
        },
        {
          title: 'Voting & registration',
          description: 'Conduct elections, membership drives and event check-in with one-tap confirmations.'
        },
        {
          title: 'Loyalty & rewards',
          description: 'Redeem points, check balances and claim airtime or data rewards from the menu.'
        },
        {
          title: 'Agricultural advisory',
          description: 'Push weather alerts and farming tips to smallholder farmers on the simplest handsets.'
        }
      ]}
      howItWorks={[
        {
          step: '1',
          title: 'Choose shared or dedicated',
          description: 'Choose prepaid or postpaid billing for your USSD extension. Prepaid extensions of 2–4 digits have a KES 5,000 setup fee; monthly fees are KES 8,000 for 2 digits, KES 6,000 for 3 digits, and KES 4,000 for 4 digits. Postpaid rates depend on extension length. For postpaid sessions, Safaricom is KES 1.50 (monthly usage KES 0–19,999), KES 1.50 (KES 20,000–99,999), KES 1.25 (KES 100,000–399,999) and KES 1.25 (KES 400,000+); Airtel is KES 1.50, KES 1.40, KES 1.30 and KES 1.25 across those tiers. Session and SMS usage are billed separately.'
        },
        {
          step: '2',
          title: 'Apply through the CAK',
          description: 'Shortcodes are allocated by the Communications Authority of Kenya. MobiWave prepares and submits the application with your business registration and a signed company letterhead, so you skip the paperwork.'
        },
        {
          step: '3',
          title: 'Carrier provisioning',
          description: 'Safaricom, Airtel and Telkom provision the code on their signalling infrastructure. Shared codes can be live within days; dedicated codes follow CAK approval, which typically takes several weeks.'
        },
        {
          step: '4',
          title: 'Build in the test-bed',
          description: 'Use the 30-day Safaricom test-bed (KES 22,400) to develop menus, wire your API and validate session flows before real traffic reaches your systems. Other networks may have different test-bed availability and fees.'
        },
        {
          step: '5',
          title: 'Go live',
          description: 'Point your menus at your REST endpoint or webhook. Real subscriber sessions flow through, with per-session analytics and drop-off reporting in the MobiWave dashboard.'
        },
        {
          step: '6',
          title: 'Bundle with M-Pesa, SMS & WhatsApp',
          description: 'Add M-Pesa STK Push, bulk SMS, WhatsApp and airtime rewards from the same MobiWave account — one billing line, one support contact.'
        }
      ]}
      comparisonTable={{
        headers: ['MobiWave', "Other USSD providers", 'Celcom Africa', 'Twilio'],
        note: 'Fixed prices include the KES 5,000 MobiWave surcharge. The surcharge does not apply to session charges. SMS is billed separately; confirm VAT treatment in your quotation.',
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
          {
            name: 'Prepaid extension (4 digits)', cells: [{ text: 'KES 5,000 setup + KES 4,000/mo', highlight: true }, { text: 'Available (quote)' }, { text: 'Available' }, { text: 'Not supported' }] },
          { name: 'Postpaid extension (1 digit)', cells: [{ text: 'KES 10,000 setup + KES 45,000/mo', highlight: true }, { text: 'Available (quote)' }, { text: 'Available' }, { text: 'Not supported' }] },
          { name: 'Postpaid extension (2 digits)', cells: [{ text: 'KES 10,000 setup + KES 35,000/mo', highlight: true }, { text: 'Available (quote)' }, { text: 'Available' }, { text: 'Not supported' }] },
          { name: 'Dedicated code — Safaricom', cells: [{ text: 'KES 150,000 setup + KES 75,000/mo (*XXX#) or KES 63,000/mo (*XXX*X# and longer)', highlight: true }, { text: 'Quote' }, { text: 'Quote' }, { text: 'Quote' }] },
          { name: 'Dedicated code — Airtel', cells: [{ text: 'KES 121,000 setup + KES 51,400/mo', highlight: true }, { text: 'Quote' }, { text: 'Quote' }, { text: 'Quote' }] },
          { name: 'Dedicated code — Telkom', cells: [{ text: 'KES 108,900 setup + KES 45,600/mo; KES 28,500 one-off session deposit', highlight: true }, { text: 'Quote' }, { text: 'Quote' }, { text: 'Quote' }] },
          { name: 'Dedicated code — Equitel', cells: [{ text: 'KES 65,000 setup + KES 63,000/mo', highlight: true }, { text: 'Quote' }, { text: 'Quote' }, { text: 'Quote' }] },
          { name: 'USSD session charge (prepaid)', cells: [{ text: 'KES 1 carrier charge to subscriber + KES 0.25 platform fee/session; no surcharge', highlight: true }, { text: 'Varies' }, { text: 'Varies' }, { text: 'N/A' }] },
          { name: 'USSD session charge (postpaid)', cells: [{ text: 'Safaricom: KES 1.50 / 1.50 / 1.25 / 1.25; Airtel: KES 1.50 / 1.40 / 1.30 / 1.25 across usage tiers', highlight: true }, { text: 'Varies' }, { text: 'Varies' }, { text: 'N/A' }] },
          { name: 'Dedicated code test-bed (30 days)', cells: [{ text: 'Safaricom KES 22,400; Equitel KES 20,000; other networks on request', highlight: true }, { text: 'Quote' }, { text: 'Quote' }, { text: 'N/A' }] },
          {
            name: 'Test-bed / sandbox',
            cells: [
              { text: 'KES 22,400 / 30 days (Safaricom)', highlight: true },
              { text: 'Yes' },
              { text: 'Yes' },
              { text: 'N/A' }
            ]
          },
          {
            name: 'M-Pesa STK Push from menu',
            cells: [
              { text: 'Native, bundled', highlight: true },
              { text: 'Yes (add-on)' },
              { text: 'Yes' },
              { text: 'No' }
            ]
          },
          {
            name: 'CAK shortcode application',
            cells: [
              { text: 'Handled for you', highlight: true },
              { text: 'Self-service docs' },
              { text: 'Assisted' },
              { text: 'No local team' }
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
          },
          {
            name: 'Bundle with SMS & WhatsApp',
            cells: [
              { text: 'One account', highlight: true },
              { text: 'Add-ons' },
              { text: 'Add-ons' },
              { text: 'Separate products' }
            ]
          }
        ]
      }}
      pricingTabs={[
        { label: 'Prepaid', pricing: [
          { title: '2-digit extension', price: 'KES 8,000', unit: '/ month', features: ['Setup fee: KES 5,000', 'Prepaid billing', 'Carrier charge KES 1/session paid by subscriber + KES 0.25 platform session fee; no fixed-fee surcharge applies', 'SMS usage billed separately'] },
          { title: '3-digit extension', price: 'KES 6,000', unit: '/ month', features: ['Setup fee: KES 5,000', 'Prepaid billing', 'Session usage charged separately', 'SMS usage charged separately'] },
          { title: '4-digit extension', price: 'KES 4,000', unit: '/ month', features: ['Setup fee: KES 5,000', 'Prepaid billing', 'Session usage charged separately', 'SMS usage charged separately'] }
        ]},
        { label: 'Postpaid', pricing: [
          { title: '1-digit extension', price: 'KES 45,000', unit: '/ month', features: ['Setup fee: KES 10,000', 'Postpaid billing', 'Session charges billed separately', 'SMS usage billed separately'] },
          { title: '2-digit extension', price: 'KES 35,000', unit: '/ month', features: ['Setup fee: KES 10,000', 'Postpaid billing', 'Session charges billed separately', 'SMS usage billed separately'] }
        ]}
      ]}
      faqs={[
        {
          question: 'How much does a USSD code cost in Kenya in 2026?',
          answer: 'Prepaid extensions cost KES 5,000 setup, then KES 8,000/month for a 2-digit extension, KES 6,000/month for 3 digits, or KES 4,000/month for 4 digits. Postpaid is available only for 1-digit extensions (KES 10,000 setup + KES 45,000/month) and 2-digit extensions (KES 10,000 setup + KES 35,000/month). Prepaid sessions: KES 1 carrier charge paid by the subscriber plus KES 0.25 platform fee per session. Postpaid session rates depend on network and monthly usage tier. SMS is billed separately. Fixed service fees include a KES 5,000 MobiWave surcharge; no surcharge is added to per-session charges.'
        },
        {
          question: 'How do I apply for a USSD shortcode from the CAK?',
          answer: 'USSD shortcodes in Kenya are allocated by the Communications Authority of Kenya (CAK). MobiWave handles the application on your behalf using your business registration, KRA PIN and a signed, stamped authorisation letter on company letterhead. Dedicated codes require CAK approval; shared codes run on MobiWave’s pre-approved pool so they can go live much faster.'
        },
        {
          question: 'How long does it take to get a USSD code live?',
          answer: 'Shared USSD codes can be live within a few days once your menus are built. Dedicated codes must pass CAK approval and carrier provisioning, which typically takes several weeks. We recommend starting on the test-bed in parallel so development is finished the moment the code is allocated.'
        },
        {
          question: 'What is the difference between shared and dedicated USSD?',
          answer: 'A shared code puts your service on a sub-keyword of MobiWave’s allocated shortcode (e.g. *XYZ*5#) — cheaper and faster, ideal for pilots and SMEs. A dedicated code is yours alone (e.g. *123#), fully branded and unrestricted, suited to banks, SACCOs and nationwide programs that need top-of-mind recall.'
        },
        {
          question: 'Do my customers pay to use the USSD menu?',
          answer: 'For prepaid sessions, the carrier charges the subscriber KES 1 per session directly on airtime, plus a KES 0.25 platform fee per session. For postpaid, your business pays the applicable network session rate based on usage tier. The KES 5,000 surcharge applies only to fixed fees, never to session charges.'
        },
        {
          question: 'Can I collect M-Pesa payments inside a USSD menu?',
          answer: 'Yes. MobiWave can trigger an M-Pesa STK Push from any step in your USSD flow — for contributions, dues, airtime top-up or bill payment — and reconcile the result back into the same session via webhook. No third-party aggregator required.'
        },
        {
          question: 'Do users need internet or a smartphone for USSD?',
          answer: 'No. USSD runs over the GSM signalling channel on every feature phone and smartphone alike. That is its core advantage: you reach customers who have no data, no smartphone and no app — the majority of subscribers in many Kenyan counties.'
        },
        {
          question: 'Can the menus be in Swahili?',
          answer: 'Yes. MobiWave USSD supports multi-language menus, including Swahili and English, with the language selectable by the subscriber inside the first menu level.'
        },
        {
          question: 'Is there an API to power the menus?',
          answer: 'Yes. Each menu step calls your REST endpoint (or webhook) with the session id and user input; you return the next screen. MobiWave manages session state, timeouts and analytics so your backend stays simple.'
        },
        {
          question: 'What are the USSD session charges?',
          answer: 'Prepaid sessions comprise a KES 1 carrier charge paid by the subscriber and a KES 0.25 platform fee per session. Postpaid rates are charged to the code owner and vary by network and monthly usage tier. The KES 5,000 surcharge is not applied to session charges.'
        }
      ]}
    />
  );
}
