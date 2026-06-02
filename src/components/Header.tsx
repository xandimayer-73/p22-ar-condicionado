import React, { useState, useEffect } from 'react';
import { Wind, Menu, X, Calendar, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavClick: (section: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'calculadora', label: 'Estimador de Orçamento' },
    { id: 'sobre', label: 'Sobre Nós' },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="SITE_HEADER"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-900/90 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleItemClick('inicio')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm group-hover:scale-110 transition-transform duration-300"></div>
            <Wind className="w-8 h-8 text-blue-400 relative z-10 animate-pulse" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white tracking-wider block">
              P22
            </span>
            <span className="text-[10px] text-blue-300 font-mono tracking-widest uppercase block -mt-1">
              AR CONDICIONADO
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-sans text-sm font-medium transition-colors relative py-1 focus:outline-none ${
                activeSection === item.id
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Contact */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+5547996808537"
            className="flex items-center gap-2 text-neutral-300 hover:text-blue-300 text-sm font-medium transition-colors font-mono"
          >
            <PhoneCall className="w-4 h-4 text-blue-400" />
            (47) 99680.8537
          </a>
          <button
            onClick={() => handleItemClick('agendamento')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-md shadow-blue-900/30 hover:shadow-blue-500/20 focus:outline-none"
          >
            <Calendar className="w-4 h-4" />
            Agendar Online
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-4">
          <a
            href="tel:+5547996808537"
            className="p-2 text-neutral-300 hover:text-blue-400"
            aria-label="Ligar"
          >
            <PhoneCall className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 border-b border-neutral-800 absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left font-sans text-base font-medium py-1 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-neutral-800 my-1"></div>
              <button
                onClick={() => handleItemClick('agendamento')}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-semibold tracking-wide transition-all focus:outline-none"
              >
                <Calendar className="w-4 h-4" />
                Agendar Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
