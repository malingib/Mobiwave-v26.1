import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { Home } from '@/pages/Home';
import { SEOHead } from '@/components/SEOHead';
import './App.css';

const Pricing = lazy(() => import('@/pages/Pricing').then(({ Pricing }) => ({ default: Pricing })));
const Contact = lazy(() => import('@/pages/Contact').then(({ Contact }) => ({ default: Contact })));
const About = lazy(() => import('@/pages/About').then(({ About }) => ({ default: About })));
const Products = lazy(() => import('@/pages/Products').then(({ Products }) => ({ default: Products })));
const Resources = lazy(() => import('@/pages/Resources').then(({ Resources }) => ({ default: Resources })));
const Terms = lazy(() => import('@/pages/Terms').then(({ Terms }) => ({ default: Terms })));
const Privacy = lazy(() => import('@/pages/Privacy').then(({ Privacy }) => ({ default: Privacy })));
const ApiDocs = lazy(() => import('@/pages/ApiDocs').then(({ ApiDocs }) => ({ default: ApiDocs })));
const BulkSMS = lazy(() => import('@/pages/services/BulkSMS').then(({ BulkSMS }) => ({ default: BulkSMS })));
const BulkEmail = lazy(() => import('@/pages/services/BulkEmail').then(({ BulkEmail }) => ({ default: BulkEmail })));
const BulkWhatsApp = lazy(() => import('@/pages/services/BulkWhatsApp').then(({ BulkWhatsApp }) => ({ default: BulkWhatsApp })));
const USSDCodes = lazy(() => import('@/pages/services/USSDCodes').then(({ USSDCodes }) => ({ default: USSDCodes })));
const Shortcodes = lazy(() => import('@/pages/services/Shortcodes').then(({ Shortcodes }) => ({ default: Shortcodes })));
const MPesaIntegration = lazy(() => import('@/pages/services/MPesaIntegration').then(({ MPesaIntegration }) => ({ default: MPesaIntegration })));
const SMSSurveys = lazy(() => import('@/pages/services/SMSSurveys').then(({ SMSSurveys }) => ({ default: SMSSurveys })));
const AirtimeRewards = lazy(() => import('@/pages/services/AirtimeRewards').then(({ AirtimeRewards }) => ({ default: AirtimeRewards })));
const ServiceDesk = lazy(() => import('@/pages/services/ServiceDesk').then(({ ServiceDesk }) => ({ default: ServiceDesk })));
const SenderIdRegistrationGuide = lazy(() => import('@/pages/guides/SenderIdRegistration').then(({ SenderIdRegistrationGuide }) => ({ default: SenderIdRegistrationGuide })));
const MpesaStkPushGuide = lazy(() => import('@/pages/guides/MpesaStkPush').then(({ MpesaStkPushGuide }) => ({ default: MpesaStkPushGuide })));
const BestBulkSmsGuide = lazy(() => import('@/pages/guides/BestBulkSms').then(({ BestBulkSmsGuide }) => ({ default: BestBulkSmsGuide })));
const UssdCodeCostGuide = lazy(() => import('@/pages/guides/UssdCodeCost').then(({ UssdCodeCostGuide }) => ({ default: UssdCodeCostGuide })));
const BulkEmailGuide = lazy(() => import('@/pages/guides/BulkEmail').then(({ BulkEmailGuide }) => ({ default: BulkEmailGuide })));
const SmsSurveyGuide = lazy(() => import('@/pages/guides/SmsSurvey').then(({ SmsSurveyGuide }) => ({ default: SmsSurveyGuide })));

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
          <Suspense fallback={null}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
