import React from 'react';
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
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
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
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}

export default App;
