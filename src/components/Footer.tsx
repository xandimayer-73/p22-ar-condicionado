import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageSquare, Shield, Lock, FileText, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavClick: (section: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;

    // Simulate database subscription
    setSubscribed(true);
    setShowToast(true);
    setNewsEmail('');

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <footer className="relative bg-neutral-950 text-neutral-400 text-sm font-sans pt-20 pb-10 border-t border-neutral-850">
      
      {/* Toast Feedback for newsletter subscription */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/30"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <div className="text-xs font-bold font-mono tracking-wide uppercase text-emerald-100">Newsletter</div>
              <div className="text-sm font-medium">Inscrição efetuada com sucesso!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Left Column: Brand, Address & Contact Details */}
        <div className="md:col-span-5 space-y-6 text-left">
          <div className="space-y-2">
            <h4 className="font-display text-2xl font-black text-white tracking-widest uppercase">
              P22 Ar Condicionado
            </h4>
            <p className="text-xs text-neutral-500 font-medium font-mono uppercase tracking-widest">
              Conforto e qualidade em climatização
            </p>
          </div>

          <p className="text-neutral-400 leading-relaxed max-w-sm">
            Especialistas em montagem, limpeza de turbina e serpentina, recargas de gás ecológico e manutenção geral de sistemas residenciais e corporativos.
          </p>

          <div className="space-y-3.5 text-neutral-300 text-xs sm:text-sm font-medium">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Rua Prates, 194 - Bom Retiro, São Paulo - SP, 01121-000</span>
            </div>
            <a href="tel:+5547988397829" className="flex items-center gap-3 hover:text-blue-300 transition-colors">
              <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>(47) 988397829</span>
            </a>
            <a href="mailto:info@meusite.com" className="flex items-center gap-3 hover:text-blue-300 transition-colors">
              <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span>info@meusite.com</span>
            </a>
          </div>
        </div>

        {/* Middle Column: Useful Quick links */}
        <div className="md:col-span-3 space-y-5 text-left">
          <h5 className="text-white text-xs font-mono font-bold tracking-widest uppercase">
            Links Técnicos
          </h5>
          <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-neutral-400">
            {[
              { label: 'Instalação split', id: 'servicos' },
              { label: 'Higienização química', id: 'servicos' },
              { label: 'Fazer orçamento', id: 'calculadora' },
              { label: 'Fale Conosco', id: 'sobre' },
              { label: 'Agendar Visita', id: 'agendamento' },
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavClick(link.id)}
                  className="hover:text-blue-300 transition-colors text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Newsletter Subscription & Social Networks */}
        <div className="md:col-span-4 space-y-6 text-left">
          <div className="space-y-2">
            <h5 className="text-white text-xs font-mono font-bold tracking-widest uppercase">
              Assine Nossa Newsletter
            </h5>
            <p className="text-xs text-neutral-500">
              Receba dicas de uso, novidades inverter e cupons especiais de manutenção periódica.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-3.5">
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Insira seu melhor email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 flex-grow"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-3.5 rounded-xl transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
                title="Assinar"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
            
            <label className="flex items-start gap-2 text-[11px] text-neutral-500 cursor-pointer select-none">
              <input type="checkbox" required defaultChecked className="mt-0.5 accent-blue-500" />
              <span>Desejo assinar e concordo com a política de envio de dicas de climatização da P22.</span>
            </label>
          </form>

          {/* Social Networks List as raw icons */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 block">
              Redes Sociais:
            </span>
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, label: 'Facebook', href: 'https://facebook.com/wix' },
                { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', href: 'https://instagram.com/wix' },
                { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://twitter.com/wix' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-850 hover:border-neutral-750 text-neutral-400 hover:text-white transition-colors flex items-center justify-center"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Corporate Policies and legal terms block */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-4 items-center text-xs text-neutral-500">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 md:justify-start">
          <a href="#" className="hover:underline hover:text-neutral-400">Política de Privacidade</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-neutral-400">Termos e Condições</a>
          <span>•</span>
          <a href="#" className="hover:underline hover:text-neutral-400">Política de Reembolso</a>
        </div>
        <div className="md:text-right font-mono text-[11px]">
          &copy; {new Date().getFullYear()} by P22arcondicionado. Powered and secured by Wix.
        </div>
      </div>

      {/* WHATSAPP FLOATING DECORATIVE WIDGET (Supreme Craftsmanship touch) */}
      <div className="fixed bottom-6 left-6 z-40 max-w-[280px]">
        <div className="bg-neutral-950 border border-emerald-950/60 shadow-xl shadow-emerald-950/20 p-3 rounded-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <a
            href="https://wa.me/5547988397829" 
            target="_blank" 
            rel="noreferrer noopener"
            className="w-10 h-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
            title="Falar no WhatsApp"
          >
            <MessageSquare className="w-5.5 h-5.5 text-white" />
          </a>
          <div className="text-left leading-tight">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400 block mb-0.5">Visita Urgente</span>
            <a 
              href="https://wa.me/5547988397829" 
              target="_blank" 
              rel="noreferrer noopener" 
              className="text-xs font-bold text-white hover:underline block"
            >
              Fale pelo WhatsApp
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
