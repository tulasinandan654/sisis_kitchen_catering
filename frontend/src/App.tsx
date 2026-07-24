import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import About from './components/About';
import Services from './components/Services';
import Packages from './components/Packages';
import CustomMenuBuilder from './components/CustomMenuBuilder';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileCallBar from './components/MobileCallBar';
import { ArrowLeft } from 'lucide-react';
import './App.css';

const HomePage = () => (
  <>
    <Header />
    <Hero />
    <TrustBadges />
    <About />
    <Services />
    <Packages />
    <CustomMenuBuilder />
    <Gallery />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
  </>
);

const CustomMenuPage = () => (
  <>
    <Header />
    <section className="bg-orange-50 border-b border-orange-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 text-sm font-medium mb-4"
          data-testid="custom-menu-back-home"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Build Your Custom Catering Menu
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Pick your favourite dishes, tell us about your event, and we'll send you a personalised
          quote within a few hours.
        </p>
      </div>
    </section>
    <CustomMenuBuilder />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-menu" element={<CustomMenuPage />} />
          <Route path="/build-menu" element={<CustomMenuPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <WhatsAppButton />
        <MobileCallBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
