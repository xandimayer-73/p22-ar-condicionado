import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Thermometer, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, Calendar, X, Clock } from 'lucide-react';
import { ServiceItem } from '../types';
import { servicesData } from '../data';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [filter, setFilter] = useState<'all' | 'instalacao' | 'limpeza' | 'manutencao'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = servicesData.filter((svc) => {
    if (filter === 'all') return true;
    return svc.id === filter;
  });

  const getSvcIcon = (id: string) => {
    switch (id) {
      case 'instalacao':
        return <Snowflake className="w-6 h-6 text-blue-400" />;
      case 'limpeza':
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
      case 'manutencao':
        return <Thermometer className="w-6 h-6 text-indigo-400" />;
      default:
        return <Snowflake className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="servicos" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 mb-4">
            <Snowflake className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Serviços Especializados</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Climatização Sob Medida Para Você
          </h2>
          <p className="max-w-2xl text-neutral-400 text-base leading-relaxed">
            Oferecemos soluções completas com alta qualidade técnica. Escolha um dos nossos serviços de climatização recomendados para ver os detalhes completos do procedimento.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 bg-neutral-900 border border-neutral-800 rounded-full max-w-sm sm:max-w-md">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'instalacao', label: 'Instalação' },
              { id: 'limpeza', label: 'Limpeza' },
              { id: 'manutencao', label: 'Manutenção' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all focus:outline-none ${
                  filter === btn.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-neutral-450 hover:text-neutral-250 hover:bg-neutral-850'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((svc) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                key={svc.id}
                className="bg-neutral-900 border border-neutral-800/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg hover:shadow-xl group"
              >
                <div>
                  {/* Top line with Icon & Price badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                      {getSvcIcon(svc.id)}
                    </div>
                    <span className="text-emerald-400 text-sm font-bold font-mono bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                      {svc.basePriceText}
                    </span>
                  </div>

                  {/* Header Title & Tagline */}
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-xs font-mono font-medium text-neutral-450 tracking-wider mb-4">
                    {svc.tagline}
                  </p>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom Trigger options */}
                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => setSelectedService(svc)}
                    className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                  >
                    <span>O Que Inclui?</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => onSelectService(svc.id)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 focus:outline-none shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar serviço
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detailed Service Checklist Modal on Grid card click */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl text-left"
              >
                
                {/* Close Button Header */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-950 border border-neutral-800 focus:outline-none"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center justify-center">
                    {getSvcIcon(selectedService.id)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">{selectedService.name}</h4>
                    <span className="text-xs text-blue-300 font-mono tracking-wide">{selectedService.tagline}</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {selectedService.description}
                </p>

                {/* Fast Facts Row */}
                <div className="flex gap-4 p-3 bg-neutral-950 rounded-xl border border-neutral-850 text-xs font-mono mb-6 items-center">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Tempo estimado: <span className="text-white font-bold">{selectedService.duration}</span>
                  </div>
                </div>

                {/* Steps/Features lists checklist */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    Procedimento Passo a Passo:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal">
                        <CheckCircle2 className="w-4.5 h-4.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action inside modal details */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-neutral-950 hover:bg-neutral-850 text-white font-semibold py-3.5 px-4 rounded-xl text-sm transition-colors text-center"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => {
                      onSelectService(selectedService.id);
                      setSelectedService(null);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4.5 h-4.5" />
                    Agendar agora
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
