import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Snowflake, Flame, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [acMode, setAcMode] = useState<'cool' | 'warm'>('cool');
  const [targetTemp, setTargetTemp] = useState<number>(22);

  // Calculate dynamic colors based on target temp and active mode
  const getGlowColor = () => {
    if (acMode === 'cool') {
      if (targetTemp <= 18) return 'bg-cyan-500/20 shadow-cyan-500/30';
      if (targetTemp <= 22) return 'bg-blue-500/15 shadow-blue-500/20';
      return 'bg-teal-500/10 shadow-teal-500/15';
    } else {
      if (targetTemp >= 27) return 'bg-rose-500/20 shadow-rose-500/30';
      return 'bg-amber-500/15 shadow-amber-500/20';
    }
  };

  const getWindColor = () => {
    return acMode === 'cool' ? 'border-cyan-300/40 text-cyan-400' : 'border-amber-400/40 text-amber-500';
  };

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center bg-neutral-950 overflow-hidden pt-28 pb-16">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-1000 ${
          acMode === 'cool' 
            ? 'bg-blue-600/20 translate-x-12 -translate-y-12' 
            : 'bg-amber-600/15 translate-x-12 -translate-y-12'
        }`}></div>
        <div className={`absolute -bottom-12 -left-12 w-[400px] h-[400px] rounded-full blur-[120px] transition-all duration-1000 ${
          acMode === 'cool' 
            ? 'bg-cyan-900/20' 
            : 'bg-rose-950/15'
        }`}></div>
        
        {/* Subtle Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Floating Interactive Breeze elements */}
      {acMode === 'cool' ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute left-[20%] top-[45%] w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rotate-[12deg] animate-breeze-cool-1" />
          <div className="absolute left-[35%] top-[55%] w-44 h-0.5 bg-gradient-to-r from-transparent via-blue-400/35 to-transparent rotate-[10deg] animate-breeze-cool-2" />
          <div className="absolute left-[15%] top-[65%] w-36 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent rotate-[15deg] animate-breeze-cool-3" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute right-[25%] top-[40%] w-40 h-0.5 bg-gradient-to-l from-transparent via-amber-400/25 to-transparent rotate-[-8deg] animate-breeze-warm-1" />
          <div className="absolute right-[15%] top-[60%] w-48 h-0.5 bg-gradient-to-l from-transparent via-rose-400/20 to-transparent rotate-[-12deg] animate-breeze-warm-2" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20 items-center">
        
        {/* Left Editorial Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 mb-6 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest">
              Atendimento em São Paulo & ABC
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Seu Clima <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Perfeito Aqui
            </span>
          </h1>

          <p className="font-sans text-neutral-300 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Na <strong className="text-white font-semibold">P22 Ar Condicionado</strong>, oferecemos serviços especializados de instalação, limpeza profunda e higienização para garantir ar puro e climatização saudável para sua casa ou empresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('calculadora')}
              className="group bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-bold tracking-wide transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 focus:outline-none"
            >
              Simular Orçamento Instante
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onNavigate('servicos')}
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white px-8 py-4 rounded-full text-base font-bold tracking-wide transition-colors flex items-center justify-center gap-2 focus:outline-none"
            >
              Nossos Serviços
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-neutral-900 pt-8 mt-12 w-full max-w-lg">
            <div>
              <div className="text-3xl font-bold font-display text-white mb-1">R$ 250</div>
              <div className="text-xs text-neutral-400 font-medium tracking-wide uppercase">Higienização</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-display text-white mb-1">1 Ano</div>
              <div className="text-xs text-neutral-400 font-medium tracking-wide uppercase">Garantia Instalação</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-display text-white mb-1">100%</div>
              <div className="text-xs text-neutral-400 font-medium tracking-wide uppercase">Garantia de Fábrica</div>
            </div>
          </div>
        </div>

        {/* Right Columns: Interactive AC Interactive Unit Mockup */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className="relative w-full max-w-md">
            
            {/* Soft backdrop radial light casting shadows updates dynamically */}
            <div className={`absolute inset-0 rounded-[2.5rem] blur-[30px] transition-all duration-700 ${getGlowColor()}`} />

            {/* Main Interactive Panel */}
            <div className="relative bg-neutral-900/80 backdrop-blur-md border border-neutral-800 p-6 md:p-8 rounded-[2rem] shadow-2xl overflow-hidden">
              
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
                  Simulador de Funcionamento
                </span>
                
                {/* Mode Selector pills */}
                <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-full border border-neutral-800">
                  <button
                    onClick={() => { setAcMode('cool'); }}
                    className={`p-2 rounded-full transition-all focus:outline-none ${
                      acMode === 'cool' 
                        ? 'bg-blue-600/80 text-white shadow-md' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    title="Modo Refrigeração (Frio)"
                  >
                    <Snowflake className="w-4 h-4 animate-spin-slow" />
                  </button>
                  <button
                    onClick={() => { setAcMode('warm'); }}
                    className={`p-2 rounded-full transition-all focus:outline-none ${
                      acMode === 'warm' 
                        ? 'bg-amber-600/80 text-white shadow-md' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    title="Modo Aquecimento (Quente)"
                  >
                    <Flame className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* AR SPLIT UNIT VISUAL DESIGN */}
              <div className="relative w-full py-6 px-4 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl border border-neutral-700/50 shadow-inner flex flex-col items-center justify-between mb-8">
                
                {/* Branded text and indicators left */}
                <div className="absolute top-3 left-4 flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-neutral-400 font-bold tracking-widest">
                    P22 PRO INVERTER
                  </span>
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                </div>

                {/* Main digital temperature screen right */}
                <div className="absolute top-2 right-4 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800 font-mono flex items-baseline">
                  <span className={`text-xl font-bold tracking-tight ${acMode === 'cool' ? 'text-cyan-400' : 'text-amber-400'}`}>
                    {targetTemp}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-semibold ml-0.5">°C</span>
                </div>

                {/* Decorative grill lines */}
                <div className="w-10/12 h-1 bg-black/40 rounded-full mt-4" />
                <div className="w-10/12 h-1 bg-black/40 rounded-full mt-1.5 mb-6" />

                {/* Deflector blade (air sweep bar) */}
                <motion.div 
                  className="w-11/12 h-2.5 bg-neutral-750 border-t border-neutral-700 rounded-md mt-6 flex items-center justify-between opacity-80"
                  animate={{ rotateX: acMode === 'cool' ? 30 : -25 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="w-2 h-0.5 bg-neutral-600 rounded-full ml-2" />
                  <div className="w-2 h-0.5 bg-neutral-600 rounded-full mr-2" />
                </motion.div>

                {/* Visual air gust lines radiating below based on cool/warm */}
                <div className="absolute top-full left-0 right-0 flex flex-col items-center pt-2 gap-1 overflow-hidden pointer-events-none">
                  {acMode === 'cool' ? (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: [0, 0.6, 0], y: [0, 30, 45], scale: [0.9, 1.1, 1] }} 
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                        className="w-8/12 h-4 bg-gradient-to-b from-cyan-400/20 to-transparent blur-md rounded-full" 
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: [0, 0.4, 0], y: [0, 35, 55], scale: [0.95, 1.15, 1.05] }} 
                        transition={{ repeat: Infinity, duration: 2.2, delay: 0.7, ease: 'easeOut' }}
                        className="w-7/12 h-3.5 bg-gradient-to-b from-blue-400/15 to-transparent blur-md rounded-full" 
                      />
                    </>
                  ) : (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: [0, 0.5, 0], y: [0, 25, 40], scale: [0.95, 1.05, 1] }} 
                        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut' }}
                        className="w-8/12 h-4 bg-gradient-to-b from-amber-400/15 to-transparent blur-md rounded-full" 
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Slider Controller */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-neutral-300">Ajustar Temperatura</span>
                  <span className="font-mono font-bold text-neutral-400">{targetTemp}°C</span>
                </div>
                
                <input
                  type="range"
                  min="16"
                  max="30"
                  value={targetTemp}
                  onChange={(e) => setTargetTemp(Number(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-neutral-950 rounded-lg appearance-none cursor-pointer outline-none border border-neutral-800"
                />

                <div className="flex justify-between text-[11px] text-neutral-400 font-mono pt-1">
                  <span>16°C (Máx Frio)</span>
                  <span>22°C (Eco)</span>
                  <span>30°C (Máx Calor)</span>
                </div>
              </div>

              {/* Status details underneath */}
              <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 gap-4 text-left text-xs bg-neutral-950/40 p-3.5 rounded-xl border border-neutral-800/60">
                <div className="space-y-1">
                  <div className="text-neutral-500 font-medium">Compressor</div>
                  <div className="text-neutral-300 font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    Inverter (Ativo)
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-neutral-500 font-medium">Consumo Atual</div>
                  <div className="text-neutral-300 font-semibold flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
                    {targetTemp === 22 ? 'A++ (Econômico)' : 'A (Variável)'}
                  </div>
                </div>
              </div>

              {/* Click recommendation help text snippet */}
              <p className="text-[11px] text-neutral-400 mt-5 italic text-center">
                ❄️ Clique nos botões de modo para simular frio/calor em tempo real!
              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
