import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Clock, Award, Sparkles, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { valuesData, faqsData } from '../data';

export default function About() {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-cyan-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-teal-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="sobre" className="py-24 bg-neutral-900 border-t border-neutral-850 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Text values description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              <Award className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">História & Compromisso</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              P22 Ar Condicionado: Garantindo o Conforto Térmico da sua Família
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
              <p>
                A <strong className="text-white font-semibold">P22arcondicionado</strong> é uma empresa especializada no planejamento e execução de instalação, manutenção corretiva, visitas de reparo e higienização geral avançada de aparelhos e condensadoras de ar condicionado.
              </p>
              <p>
                Oferecemos serviços altamente qualificados por meio de técnicos certificados e formados sob as principais marcas parceiras como Daikin, LG Inverter, Fujitsu, Carrier, Samsung e Elgin. Mais do que ajustar a temperatura, nós focamos na qualidade do ar que você e sua equipe respiram diariamente.
              </p>
              <p>
                Nossa missão é alinhar eficiência térmica e redução de consumo elétrico de forma transparente. Por isso, oferecemos estimativas sinceras de orçamentos e damos garantia total em cada visita executada no Vale do Itajaí e Litoral Catarinense.
              </p>
            </div>

            {/* Quick checkmarks list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                'Equipamentos de medição de última geração',
                'Instalação limpa com capas protetoras',
                'Uso exclusivo de serpentinas de cobre',
                'Técnicos uniformizados e identificados'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image placeholders matching Wix original pictures */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative group overflow-hidden rounded-2xl border border-neutral-800 shadow-lg aspect-square">
              <img
                src="https://static.wixstatic.com/media/decdf8_4768faedfe88416b896e20cb77e84d96~mv2.jpg"
                alt="Instalação de condensadoras"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Qualidade Técnica</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group overflow-hidden rounded-2xl border border-neutral-800 shadow-lg aspect-[4/3]">
                <img
                  src="https://static.wixstatic.com/media/decdf8_3a41de717b264735a5b9a561fc0f28c3~mv2.jpg"
                  alt="Limpeza interna evaporadora"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Higienização Química</span>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-2xl border border-neutral-800 shadow-lg aspect-[4/3]">
                <img
                  src="https://static.wixstatic.com/media/decdf8_8b27bc4c950c48c6a9127595f95c1b0d~mv2.jpg"
                  alt="Profissional checando pressões de gás"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Manutenção</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Values Showcase section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {valuesData.map((val, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-4 text-left hover:border-neutral-750 transition-all shadow-md"
            >
              <div className="p-3 bg-neutral-900 border border-neutral-850 rounded-xl w-fit">
                {getIconComponent(val.icon)}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-white tracking-tight">{val.title}</h4>
                <p className="text-xs text-neutral-450 leading-relaxed font-sans">{val.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Expandable FAQ's Accordion section */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              Perguntas Frequentes (FAQ)
            </div>
            <h3 className="font-display text-2xl font-extrabold mt-2 text-white">Tire Suas Dúvidas Técnicas</h3>
          </div>

          <div className="space-y-2.5">
            {faqsData.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-950 border border-neutral-850 rounded-2xl transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-100 tracking-tight">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5 bg-neutral-950/40 text-xs sm:text-sm text-neutral-400 font-medium"
                      >
                        <p className="px-6 py-4 leading-relaxed text-left">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
