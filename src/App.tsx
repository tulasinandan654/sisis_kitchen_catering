import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import CustomMenuBuilder from './components/CustomMenuBuilder';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Packages />
      <CustomMenuBuilder />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
