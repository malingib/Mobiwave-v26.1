import { PageBanner } from '@/components/PageBanner';

export function Privacy() {
  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <PageBanner
        title="Privacy Policy"
        subtitle="How MobiWave Innovations collects, uses, and protects your information."
      />
      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-8 text-gray-700">
          <p>
            MobiWave Innovations is committed to handling personal and business data responsibly and in line
            with applicable data protection requirements.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Information We Collect</h2>
            <p>
              We may collect contact details, account information, and service usage data required to deliver,
              secure, and improve our communication services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Data</h2>
            <p>
              Data is used to provide requested services, support clients, process transactions, and maintain
              platform reliability and security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Security and Retention</h2>
            <p>
              We apply technical and organizational safeguards to protect data and retain records only as long
              as necessary for operational, legal, or contractual obligations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact</h2>
            <p>
              For privacy requests, contact us at <a className="text-blue-600 hover:underline" href="mailto:info@mobiwave.co.ke">info@mobiwave.co.ke</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
