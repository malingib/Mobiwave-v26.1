import { Check, X } from 'lucide-react';

const plans = [
  { name: 'Basic', contacts: '5,000', campaigns: '5', messages: '500', users: '2', ai: false, webhooks: false, chatbot: false, flow: false, setup: 'KES 5,000', monthly: 'KES 5,000', development: '—' },
  { name: 'Pro', contacts: '10,000', campaigns: '30', messages: '5,000', users: '10', ai: true, webhooks: true, chatbot: true, flow: false, setup: 'KES 10,000', monthly: 'KES 10,000', development: 'KES 50,000' },
  { name: 'Enterprise', contacts: 'Unlimited', campaigns: 'Unlimited', messages: 'Unlimited', users: 'Unlimited', ai: true, webhooks: true, chatbot: true, flow: true, setup: 'KES 20,000', monthly: 'KES 30,000', development: 'KES 50,000' },
];
const features = [
  ['Official WhatsApp Business API', 'official'], ['Contacts', 'contacts'], ['Campaigns', 'campaigns'],
  ['Messages per month', 'messages'], ['Users', 'users'], ['API access', 'official'],
  ['AI assistant', 'ai'], ['Webhooks', 'webhooks'], ['Chatbot', 'chatbot'], ['Flow builder', 'flow'],
  ['Optional one-time setup fee', 'setup'], ['Monthly subscription', 'monthly'], ['One-time chatbot development', 'development'],
] as const;
const messageRates = [
  ['Marketing', '$0.0225', 'KES 2.91'],
  ['Utility (list rate)', '$0.0040', 'KES 0.52'],
  ['Authentication (list rate)', '$0.0040', 'KES 0.52'],
  ['Authentication — International', 'N/A', 'N/A'],
  ['Service (customer-initiated)', 'Free', 'Free'],
];
const tiers = [
  ['0–100,000 utility / 0–300,000 authentication', '0%', '$0.0040', 'KES 0.52'],
  ['100,001–1,000,000 utility / 300,001–2,000,000 authentication', '5%', '$0.0038', 'KES 0.49'],
  ['1,000,001–4,500,000 utility / 2,000,001–10,000,000 authentication', '10%', '$0.0036', 'KES 0.47'],
  ['4,500,001–40,000,000 utility / 10,000,001–20,000,000 authentication', '15%', '$0.0034', 'KES 0.44'],
  ['40,000,001–80,000,000 utility / 20,000,001–40,000,000 authentication', '20%', '$0.0032', 'KES 0.41'],
  ['80,000,001+ utility / 40,000,001+ authentication', '25%', '$0.0030', 'KES 0.39'],
];

export function WhatsAppRateCard() {
  return <section className="section-padding" id="whatsapp-rate-card">
    <div className="container-custom space-y-12">
      <header className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">Effective July 2026</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0a1a25] sm:text-4xl">WhatsApp Business API — Subscription Rate Card</h2>
        <p className="mt-4 text-[#5b6b78]">Subscription charges are separate from Meta message charges. All subscription prices are in Kenya Shillings (KES).</p>
      </header>
      <div>
        <h3 className="mb-4 text-2xl font-bold text-[#0a1a25]">1. Subscription plans</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-50"><tr><th className="p-3">Feature</th>{plans.map(p => <th key={p.name} className="p-3">{p.name}</th>)}</tr></thead>
            <tbody>{features.map(([label, key]) => <tr key={key} className="border-t border-slate-200">
              <th className="p-3 font-semibold text-slate-800">{label}</th>
              {plans.map(p => { const value = key === 'official' ? true : p[key]; const bool = typeof value === 'boolean'; return <td key={p.name} className="p-3 text-slate-700">{bool ? (value ? <Check aria-label="Included" className="h-4 w-4 text-emerald-600" /> : <X aria-label="Not included" className="h-4 w-4 text-slate-400" />) : value === 'official' ? <Check aria-label="Included" className="h-4 w-4 text-emerald-600" /> : value}</td>; })}
            </tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#5b6b78]">Chatbot development is a one-time build fee, separate from the monthly subscription. Setup fees are optional. Monthly message and campaign allowances apply by plan.</p>
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-bold text-[#0a1a25]">2. WhatsApp message rates — Kenya</h3>
        <p className="mb-4 text-sm leading-6 text-[#5b6b78]">This supplied July 2026 rate card places Kenya in Meta’s “Rest of Africa” tier. KES conversions use an indicative USD/KES rate of 129.5. Confirm current Meta rates before invoicing.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-slate-50"><tr>{['Category', 'Rate (USD)', 'Indicative rate (KES)'].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>{messageRates.map(row => <tr key={row[0]} className="border-t border-slate-200">{row.map((v, i) => <td key={i} className="p-3">{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-bold text-[#0a1a25]">3. Utility & authentication volume tiers</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-50"><tr>{['Monthly message volume', 'Discount vs. list', 'Rate (USD)', 'Indicative rate (KES)'].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>{tiers.map(row => <tr key={row[0]} className="border-t border-slate-200">{row.map((v, i) => <td key={i} className="p-3">{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#5b6b78]">Marketing messages are shown at a flat rate without volume tiers. Actual billed KES amounts may vary with Meta’s exchange rate and applicable taxes. Rates and regional classification should be verified against Meta’s current rate card.</p>
      </div>
      <div className="rounded-xl border border-slate-200 p-5 sm:p-6">
        <p className="font-bold text-[#0a1a25]">MOBIWAVE INNOVATIONS LTD</p>
        <p className="mt-1 text-sm text-[#5b6b78]">Empowering Communications, One Wave at a Time</p>
        <p className="mt-3 text-sm text-[#0a1a25]">Paybill: <strong>4184791</strong> — MOBIWAVE INNOVATIONS LTD</p>
      </div>
    </div>
  </section>;
}