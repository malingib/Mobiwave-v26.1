import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { Home } from '@/pages/Home';
import { Pricing, Contact, About, Products } from '@/pages';
import { Resources } from '@/pages/Resources';
import { SEOHead } from '@/components/SEOHead';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { ApiDocs } from '@/pages/ApiDocs';
import {
  BulkSMS,
  BulkEmail,
  BulkWhatsApp,
  USSDCodes,
  Shortcodes,
  MPesaIntegration,
  SMSSurveys,
  AirtimeRewards,
  ServiceDesk
} from '@/pages/services';
import { SenderIdRegistrationGuide } from '@/pages/guides/SenderIdRegistration';
import { MpesaStkPushGuide } from '@/pages/guides/MpesaStkPush';
import { BestBulkSmsGuide } from '@/pages/guides/BestBulkSms';
import { UssdCodeCostGuide } from '@/pages/guides/UssdCodeCost';
import { BulkEmailGuide } from '@/pages/guides/BulkEmail';
import { SmsSurveyGuide } from '@/pages/guides/SmsSurvey';
import './App.css';

function HomeSectionRoute({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [sectionId]);

  return <Home />;
}

function App() {
  return (
    <BrowserRouter>
      <SEOHead />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/innovations" element={<Products />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/developers/docs" element={<ApiDocs />} />
            <Route path="/products" element={<Navigate to="/innovations" replace />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/services" element={<HomeSectionRoute sectionId="services" />} />
            <Route path="/testimonials" element={<HomeSectionRoute sectionId="testimonials" />} />
            <Route path="/services/bulk-sms" element={<BulkSMS />} />
            <Route path="/services/bulk-email" element={<BulkEmail />} />
            <Route path="/services/bulk-whatsapp" element={<BulkWhatsApp />} />
            <Route path="/services/ussd-codes" element={<USSDCodes />} />
            <Route path="/services/shortcodes" element={<Shortcodes />} />
            <Route path="/services/mpesa-integration" element={<MPesaIntegration />} />
            <Route path="/services/sms-surveys" element={<SMSSurveys />} />
            <Route path="/services/airtime-rewards" element={<AirtimeRewards />} />
            <Route path="/services/service-desk" element={<ServiceDesk />} />
            <Route path="/guides/sender-id-registration-kenya" element={<SenderIdRegistrationGuide />} />
            <Route path="/guides/mpesa-stk-push-api-kenya" element={<MpesaStkPushGuide />} />
            <Route path="/guides/best-bulk-sms-kenya" element={<BestBulkSmsGuide />} />
            <Route path="/guides/ussd-code-cost-kenya" element={<UssdCodeCostGuide />} />
            <Route path="/guides/bulk-email-kenya" element={<BulkEmailGuide />} />
            <Route path="/guides/sms-survey-kenya" element={<SmsSurveyGuide />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
