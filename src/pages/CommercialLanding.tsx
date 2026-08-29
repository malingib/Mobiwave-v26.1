import { MessageCircle, CreditCard, Smartphone, Landmark, GraduationCap, HeartPulse, Truck, Users } from 'lucide-react';
import { ServicePageLayout } from '@/components/ServicePageLayout';

type LandingProps = {
  title: string;
  bannerTitle: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  useCases: { title: string; description: string }[];
  relatedRoutes?: { label: string; href: string }[];
};

function CommercialLanding({ title, bannerTitle, subtitle, description, icon: Icon, features, useCases, relatedRoutes }: LandingProps) {
  return <ServicePageLayout
    title={title}
    bannerTitle={bannerTitle}
    subtitle={subtitle}
    description={description}
    icon={Icon}
    stats={[{ value: 'Kenya', label: 'Local delivery' }, { value: 'API', label: 'Ready to integrate' }, { value: 'KES', label: 'Local billing' }, { value: '24/7', label: 'Human support' }]}
    features={features}
    benefits={[
      'Get implementation guidance from a Kenya-based team',
      'Connect messaging, payments and customer journeys in one account',
      'Use transparent KES pricing and practical rollout support',
      'Monitor delivery, responses and payment outcomes from one platform',
      'Start with a sandbox or consultation before committing to production',
    ]}
    useCases={useCases}
    relatedRoutes={relatedRoutes}
    howItWorks={[
      { step: '1', title: 'Tell us the outcome', description: 'Share your volumes, customer journey, networks and integration requirements.' },
      { step: '2', title: 'Test the flow', description: 'Get implementation guidance, API credentials and a sandbox where applicable.' },
      { step: '3', title: 'Connect your system', description: 'Use REST endpoints, callbacks and webhooks to connect your application.' },
      { step: '4', title: 'Go live with support', description: 'We verify the production setup and remain available when your traffic matters.' },
    ]}
    faqs={[
      { question: `Who is ${title} for?`, answer: `It is designed for Kenyan organisations that need reliable ${title.toLowerCase()} with local onboarding, billing and support.` },
      { question: 'Can I connect this to my existing system?', answer: 'Yes. MobiWave provides API and webhook integration support, with implementation help for common business systems.' },
      { question: 'Can I combine this with SMS, USSD or M-Pesa?', answer: 'Yes. The platform is designed for connected customer journeys across messaging, payments and offline channels.' },
    ]}
  />;
}

export function WhatsappApiPricingKenya() { return <CommercialLanding title="WhatsApp API Pricing Kenya" bannerTitle="WhatsApp Business API Pricing in Kenya | MobiWave" subtitle="Plan WhatsApp messaging costs before you launch" description="Understand Meta conversation charges, templates, setup support and integration costs for WhatsApp Business API in Kenya. MobiWave helps you model the right customer journey, connect your systems and launch with local support." icon={MessageCircle} features={['Official WhatsApp Business Platform onboarding', 'Marketing, utility and authentication template guidance', 'Meta conversation cost planning by category and destination', 'Rich media, buttons, quick replies and two-way support', 'REST API, webhooks and CRM integration', 'SMS fallback for customers who do not respond on WhatsApp', 'Opt-in and consent records for ODPC-aligned messaging']} useCases={[{ title: 'Payment notifications', description: 'Send receipts, reminders and payment support messages with a clear WhatsApp journey.' }, { title: 'Customer support', description: 'Route inbound conversations to your team with automation and human handoff.' }, { title: 'Sales and offers', description: 'Use approved templates, segmentation and rich media to move customers from interest to action.' }]} relatedRoutes={[{ label: 'Explore WhatsApp messaging', href: '/services/bulk-whatsapp' }, { label: 'Read SMS fallback options', href: '/services/bulk-sms' }]} />; }

export function MpesaDarajaApiKenya() { return <CommercialLanding title="M-Pesa Daraja API" bannerTitle="M-Pesa Daraja API Integration Kenya | MobiWave" subtitle="Launch STK Push, C2B and B2C flows with implementation support" description="Connect Safaricom Daraja to your checkout, billing or operations system. MobiWave supports STK Push, C2B, B2C, B2B, callbacks, status queries and reconciliation for Kenyan businesses." icon={CreditCard} features={['STK Push and Lipa Na M-Pesa Online', 'C2B validation and confirmation callbacks', 'B2C payouts, refunds and disbursements', 'B2B transfers and transaction status queries', 'CallbackURL configuration and retry handling', 'Sandbox-to-production implementation checklist', 'Automatic payment reconciliation with SMS receipts']} useCases={[{ title: 'E-commerce checkout', description: 'Prompt customers to approve payment without leaving your checkout flow.' }, { title: 'SACCO and school collections', description: 'Match member or parent payments to accounts and issue confirmations automatically.' }, { title: 'Payouts and refunds', description: 'Disburse funds to customers, agents or beneficiaries and track the outcome.' }]} relatedRoutes={[{ label: 'Read the STK Push guide', href: '/guides/mpesa-stk-push-api-kenya' }, { label: 'View M-Pesa integration service', href: '/services/mpesa-integration' }]} />; }

export function UssdPricingKenya() { return <CommercialLanding title="USSD Pricing Kenya" bannerTitle="USSD Code Pricing in Kenya | Shared and Dedicated Options" subtitle="Choose a USSD model that fits your audience and budget" description="Compare shared and dedicated USSD options in Kenya, including setup, monthly maintenance, session costs, test-bed requirements and M-Pesa integration. MobiWave helps you design and launch menus that work on every phone." icon={Smartphone} features={['Shared and dedicated shortcode options', 'CAK application and carrier provisioning support', 'Feature-phone and no-internet reach', 'Multi-level English and Swahili menus', 'REST API, session state and callbacks', 'Per-session analytics and drop-off reporting', 'M-Pesa STK Push from a USSD menu step']} useCases={[{ title: 'Rural customer services', description: 'Reach users who have basic phones or limited mobile-data access.' }, { title: 'Payments and collections', description: 'Combine menu navigation with M-Pesa payment prompts and confirmations.' }, { title: 'Surveys and registration', description: 'Collect structured responses, applications and member information interactively.' }]} relatedRoutes={[{ label: 'View USSD services', href: '/services/ussd-codes' }, { label: 'Read the USSD cost guide', href: '/guides/ussd-code-cost-kenya' }]} />; }

function IndustryLanding({ title, bannerTitle, subtitle, description, icon, service, related }: { title: string; bannerTitle: string; subtitle: string; description: string; icon: React.ElementType; service: string; related: { label: string; href: string }[] }) {
  return <CommercialLanding title={title} bannerTitle={bannerTitle} subtitle={subtitle} description={description} icon={icon} features={[`${service} with local Kenyan onboarding`, 'Automated SMS, WhatsApp and M-Pesa notifications', 'USSD journeys for customers without internet', 'Delivery, response and reconciliation reporting', 'Consent, opt-out and customer data controls', 'REST APIs and webhooks for your existing systems']} useCases={[{ title: 'Reminders and alerts', description: 'Automate timely customer messages from your operational systems.' }, { title: 'Collections and payments', description: 'Connect payment prompts, confirmations and follow-up messages.' }, { title: 'Customer self-service', description: 'Give customers simple, accessible ways to check, register or respond.' }]} relatedRoutes={related} />;
}

export function SaccoCommunicationKenya() { return <IndustryLanding title="SACCO Communication Solutions" bannerTitle="SACCO SMS, USSD and M-Pesa Communication in Kenya" subtitle="Keep members informed and collections moving" description="Connect SACCO member communication, payment reminders, statements and self-service through SMS, USSD, WhatsApp and M-Pesa integrations built for Kenyan organisations." icon={Users} service="SACCO communication" related={[{ label: 'Bulk SMS for Kenya', href: '/services/bulk-sms' }, { label: 'M-Pesa Daraja API', href: '/mpesa-daraja-api-kenya' }]} />; }
export function SchoolCommunicationKenya() { return <IndustryLanding title="School Communication Solutions" bannerTitle="School Fees SMS, WhatsApp and M-Pesa Tools in Kenya" subtitle="Help schools reach parents and reconcile payments" description="Send fee reminders, results notices, attendance alerts and parent updates while connecting M-Pesa collections and automated confirmations." icon={GraduationCap} service="school communication" related={[{ label: 'M-Pesa integration', href: '/services/mpesa-integration' }, { label: 'SMS API Kenya', href: '/sms-api-kenya' }]} />; }
export function HealthcareCommunicationKenya() { return <IndustryLanding title="Healthcare Communication Solutions" bannerTitle="Healthcare SMS, WhatsApp and Patient Reminders in Kenya" subtitle="Reduce missed appointments and improve patient follow-up" description="Use SMS, WhatsApp and payment integrations for appointment reminders, patient updates, receipts and accessible health communication across Kenya." icon={HeartPulse} service="healthcare communication" related={[{ label: 'WhatsApp messaging', href: '/services/bulk-whatsapp' }, { label: 'SMS surveys', href: '/services/sms-surveys' }]} />; }
export function LogisticsCommunicationKenya() { return <IndustryLanding title="Logistics Communication Solutions" bannerTitle="Logistics SMS, WhatsApp and Delivery Notifications in Kenya" subtitle="Keep customers informed from dispatch to delivery" description="Automate delivery alerts, collection instructions, payment confirmations and customer support across SMS, WhatsApp, USSD and M-Pesa." icon={Truck} service="logistics communication" related={[{ label: 'SMS API Kenya', href: '/sms-api-kenya' }, { label: 'WhatsApp messaging', href: '/services/bulk-whatsapp' }]} />; }
export function FintechCommunicationKenya() { return <IndustryLanding title="Fintech Communication Solutions" bannerTitle="Fintech SMS, WhatsApp and M-Pesa APIs in Kenya" subtitle="Build trusted payment and customer journeys" description="Connect OTPs, payment notifications, M-Pesa collections, disbursements and customer support through one Kenya-ready communications platform." icon={Landmark} service="fintech communication" related={[{ label: 'M-Pesa Daraja API', href: '/mpesa-daraja-api-kenya' }, { label: 'SMS API Kenya', href: '/sms-api-kenya' }]} />; }
