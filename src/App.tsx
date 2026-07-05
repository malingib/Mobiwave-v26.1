import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { Home } from '@/pages/Home';
import { Pricing, Contact, About, Products } from '@/pages';
import { SEOHead } from '@/components/SEOHead';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
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
            <Route path="/products" element={<Navigate to="/innovations" replace />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
