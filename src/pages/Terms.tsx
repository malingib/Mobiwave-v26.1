import { PageBanner } from '@/components/PageBanner';

export function Terms() {
  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <PageBanner
        title="Terms and Conditions"
        subtitle="Terms governing the use of MobiWave Innovations services and platforms."
      />
      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-8 text-gray-700">
          <p>
            By accessing or using MobiWave Innovations services, you agree to these terms. These terms
            apply to all products, APIs, websites, and managed communication services offered by MobiWave.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Service Usage</h2>
            <p>
              You are responsible for using our services in compliance with applicable Kenyan laws, telecom
              regulations, and data protection requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Accounts and Security</h2>
            <p>
              You are responsible for safeguarding account credentials and for all activity that occurs under
              your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Billing and Payment</h2>
            <p>
              Fees are charged according to agreed pricing plans, service contracts, or custom proposals.
              Unpaid balances may lead to service suspension.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact</h2>
            <p>
              For contractual or legal inquiries, contact us at <a className="text-blue-600 hover:underline" href="mailto:info@mobiwave.co.ke">info@mobiwave.co.ke</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
