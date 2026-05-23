import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculator from './components/Calculator';
import About from './components/About';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  
  // Captures prefilled options triggered from the BTU calculator receipt
  const [preFilledBooking, setPreFilledBooking] = useState<{
    serviceId: string;
    btus: number;
    estimatedPrice: number;
    notes: string;
  } | null>(null);

  // Smooth scroll helper to selected section
  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-fill booking with computed choices and scroll automatically
  const handlePreFillBooking = (options: {
    serviceId: string;
    btus: number;
    estimatedPrice: number;
    notes: string;
  }) => {
    setPreFilledBooking(options);
    setActiveSection('agendamento');
    setTimeout(() => {
      const element = document.getElementById('agendamento');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClearPreFill = () => {
    setPreFilledBooking(null);
  };

  // Simple intersection observer to highlight header links as you scroll
  useEffect(() => {
    const handleScrollDetect = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ['inicio', 'servicos', 'calculadora', 'sobre', 'agendamento'];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollDetect);
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white antialiased selection:bg-blue-500/30 selection:text-white">
      {/* Global Translucent Floating Header */}
      <Header onNavClick={handleScrollToSection} activeSection={activeSection} />

      {/* Main Single Page Sections */}
      <main className="space-y-0">
        
        {/* Hero Section with cooling modes wind sweep effects */}
        <Hero onNavigate={handleScrollToSection} />

        {/* Services detail lists grids */}
        <Services onSelectService={(serviceId) => {
          // Direct booking trigger
          setPreFilledBooking({
            serviceId,
            btus: 12000, // Standard default
            estimatedPrice: serviceId === 'limpeza' ? 250 : serviceId === 'manutencao' ? 400 : 690,
            notes: `Reserva direta para o serviço de ${serviceId === 'limpeza' ? 'Limpeza & Higienização' : serviceId === 'manutencao' ? 'Manutenção Preventiva' : 'Instalação de Ar Condicionado'}.`
          });
          handleScrollToSection('agendamento');
        }} />

        {/* BTU and pricing interactive calculator */}
        <Calculator onPreFillBooking={handlePreFillBooking} />

        {/* Expandable FAQs and our company certified values */}
        <About />

        {/* Interactive Booking Calendar Scheduler */}
        <Booking 
          preFilledOptions={preFilledBooking} 
          onClearPreFill={handleClearPreFill} 
        />

      </main>

      {/* Corporate details and newsletter subscription forms */}
      <Footer onNavClick={handleScrollToSection} />
    </div>
  );
}

