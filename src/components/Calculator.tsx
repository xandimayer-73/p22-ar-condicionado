import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator as CalcIcon, CheckCircle2, ChevronRight, HelpCircle, RefreshCw, ShoppingCart, Tag } from 'lucide-react';
import { EstimatorInput, EstimatorResult } from '../types';

interface CalculatorProps {
  onPreFillBooking: (options: {
    serviceId: string;
    btus: number;
    estimatedPrice: number;
    notes: string;
  }) => void;
}

export default function Calculator({ onPreFillBooking }: CalculatorProps) {
  // Direct inputs
  const [width, setWidth] = useState<number>(4);
  const [length, setLength] = useState<number>(4);
  const [solarExposure, setSolarExposure] = useState<EstimatorInput['solarExposure']>('morning');
  const [people, setPeople] = useState<number>(2);
  const [appliances, setAppliances] = useState<number>(2);
  const [acType, setAcType] = useState<EstimatorInput['acType']>('split');

  // Service options
  const [installChecked, setInstallChecked] = useState<boolean>(true);
  const [cleaningChecked, setCleaningChecked] = useState<boolean>(false);
  const [maintenanceChecked, setMaintenanceChecked] = useState<boolean>(false);

  const [result, setResult] = useState<EstimatorResult | null>(null);

  useEffect(() => {
    const calculatedArea = width * length;
    
    // BTU computation logic
    // Factor based on sun exposure
    // Morning: 600 BTUs / m²
    // Afternoon: 800 BTUs / m²
    // Full Sun: 1000 BTUs / m²
    let btuFactor = 600;
    if (solarExposure === 'afternoon') btuFactor = 800;
    if (solarExposure === 'full') btuFactor = 1000;

    let baseBtu = calculatedArea * btuFactor;

    // Occupants calculation (first person is usually covered by base, each additional adds 600 BTUs)
    const extraPeopleBtu = Math.max(0, people - 1) * 600;

    // Appliances calculation (each adds 600 BTUs)
    const appliancesBtu = appliances * 600;

    const totalBtus = baseBtu + extraPeopleBtu + appliancesBtu;

    // Ideal commercial models suggestions
    let recommendedModel = '9.000 BTU';
    if (totalBtus > 9000) recommendedModel = '12.000 BTU';
    if (totalBtus > 12000) recommendedModel = '18.000 BTU';
    if (totalBtus > 18000) recommendedModel = '24.000 BTU';
    if (totalBtus > 24000) recommendedModel = '30.000 BTU';
    if (totalBtus > 30000) recommendedModel = '36.000 BTU (Piso Teto)';

    // Pricing calculation
    // Installation rates vary based on BTU size
    let installPrice = 0;
    if (installChecked) {
      if (totalBtus <= 12000) installPrice = 690;
      else if (totalBtus <= 18000) installPrice = 890;
      else installPrice = 1150;
    }

    // Cleaning rates (R$ 250 flat)
    const cleaningPrice = cleaningChecked ? 250 : 0;

    // Maintenance rates (R$ 400 flat)
    const maintenancePrice = preventiveMaintenancePrice(totalBtus);

    // Multi-service discounts
    // 2 services selected -> 10% discount
    // 3 services selected -> 15% discount
    let discountPercent = 0;
    const servicesCount = [installChecked, cleaningChecked, maintenanceChecked].filter(Boolean).length;
    if (servicesCount === 2) discountPercent = 0.10;
    if (servicesCount === 3) discountPercent = 0.15;

    const subtotal = installPrice + cleaningPrice + maintenancePrice;
    const discountAmount = Math.round(subtotal * discountPercent);
    const total = subtotal - discountAmount;

    setResult({
      btus: totalBtus,
      recommendedAcPower: recommendedModel,
      servicesSelected: {
        installation: installChecked,
        cleaning: cleaningChecked,
        maintenance: maintenanceChecked,
      },
      priceBreakdown: {
        installation: installPrice,
        cleaning: cleaningPrice,
        maintenance: maintenancePrice,
        discount: discountAmount,
        total: total,
      }
    });
  }, [width, length, solarExposure, people, appliances, acType, installChecked, cleaningChecked, maintenanceChecked]);

  // Helper function to calculate maintenance price based on BTUs
  function preventiveMaintenancePrice(btus: number) {
    if (!maintenanceChecked) return 0;
    if (btus <= 18000) return 400;
    return 550; // larger commercial preventive maintenance is slightly more
  }

  const handlePreFill = () => {
    if (!result) return;
    
    // Find first checked service or fallback
    let serviceId = 'instalacao';
    if (cleaningChecked) serviceId = 'limpeza';
    if (maintenanceChecked && !cleaningChecked && !installChecked) serviceId = 'manutencao';

    const serviceLabels = [];
    if (installChecked) serviceLabels.push('Instalação');
    if (cleaningChecked) serviceLabels.push('Limpeza/Higienização');
    if (maintenanceChecked) serviceLabels.push('Manutenção');

    const notesSummary = `Estimativa de Carga Térmica: ${result.btus.toLocaleString('pt') || 0} BTUs (${result.recommendedAcPower}). Serviços solicitados: ${serviceLabels.join(', ')}. Local do aparelho: ambiente de ${width}x${length}m (${width * length}m²).`;

    onPreFillBooking({
      serviceId,
      btus: result.btus,
      estimatedPrice: result.priceBreakdown.total,
      notes: notesSummary,
    });
  };

  return (
    <section id="calculadora" className="py-24 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title and Intro */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-4">
            <CalcIcon className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Cálculo de Carga Térmica</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Estimador Inteligente de Potência e Orçamentos
          </h2>
          <p className="max-w-2xl text-neutral-400 text-base leading-relaxed">
            Insira os dados do seu ambiente abaixo. Nosso sistema calculará automaticamente o total de <strong className="text-white">BTUs</strong> necessários e apresentará uma estimativa real dos custos para cada serviço.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-neutral-950/80 border border-neutral-850 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 pb-4 border-b border-white/5">
              <span>Dimensionamento do Ambiente</span>
            </h3>

            {/* Area Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase font-mono block">
                  Largura do Cômodo: <span className="text-white text-sm font-sans">{width} metros</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase font-mono block">
                  Comprimento do Cômodo: <span className="text-white text-sm font-sans">{length} metros</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Display computed Area badge */}
            <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 flex items-center justify-between text-sm">
              <span className="text-neutral-400 font-medium">Área total calculada:</span>
              <span className="font-mono font-bold text-blue-400">{width * length} m²</span>
            </div>

            {/* Solar Exposure Radio Grid */}
            <div className="space-y-3 text-left">
              <label className="text-xs font-bold text-neutral-400 uppercase font-mono block">
                Exposição Solar & Incidência de Luz
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'morning', label: 'Sol da Manhã (Suave)', desc: 'Requer menos refrigeração' },
                  { id: 'afternoon', label: 'Sol da Tarde (Forte)', desc: 'Exposição moderada a alta' },
                  { id: 'full', label: 'Sol o Dia Todo (Intenso)', desc: 'Mais quente e exposto' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSolarExposure(option.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all focus:outline-none ${
                      solarExposure === option.id
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                        : 'bg-neutral-900/20 border-neutral-800 text-neutral-400 hover:border-neutral-750'
                    }`}
                  >
                    <div className="text-sm font-bold block mb-0.5">{option.label}</div>
                    <div className="text-[10px] text-neutral-400 leading-tight block">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* People & Electronic Appliances count controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase font-mono block">
                  Número de Ocupantes Permanentes: <span className="text-white text-sm font-sans">{people}</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={people <= 1}
                    onClick={() => setPeople(p => Math.max(1, p - 1))}
                    className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-bold flex items-center justify-center focus:outline-none disabled:opacity-40"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeople(p => p + 1)}
                    className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-bold flex items-center justify-center focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase font-mono block">
                  Aparelhos Eletrônicos (TV, PC): <span className="text-white text-sm font-sans">{appliances}</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={appliances <= 0}
                    onClick={() => setAppliances(a => Math.max(0, a - 1))}
                    className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-bold flex items-center justify-center focus:outline-none disabled:opacity-40"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppliances(a => a + 1)}
                    className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-bold flex items-center justify-center focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Select Services desired */}
            <div className="pt-6 border-t border-white/5 space-y-3 text-left">
              <label className="text-xs font-bold text-neutral-400 uppercase font-mono block mb-1">
                Serviços de Climatização Selecionados
              </label>
              
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  {
                    id: 'install',
                    checked: installChecked,
                    onChange: setInstallChecked,
                    title: 'Serviço de Instalação Profissional',
                    desc: 'Mão de obra qualificada e tubulação de cobre premium inclusa'
                  },
                  {
                    id: 'cleaning',
                    checked: cleaningChecked,
                    onChange: setCleaningChecked,
                    title: 'Procedimento Higienização & Química Completa',
                    desc: 'Otimização térmica interna, eliminando bactérias e ácaros'
                  },
                  {
                    id: 'maintenance',
                    checked: maintenanceChecked,
                    onChange: setMaintenanceChecked,
                    title: 'Manutenção Geral Preventiva (Gás Check)',
                    desc: 'Controles eletrônicos, verificação de pressão do gás refrigerante'
                  }
                ].map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => svc.onChange(!svc.checked)}
                    className={`p-4 rounded-xl border text-left transition-all focus:outline-none flex items-start gap-3.5 w-full ${
                      svc.checked
                        ? 'bg-blue-600/10 border-blue-500 text-white'
                        : 'bg-neutral-900/10 border-neutral-800 text-neutral-400 hover:border-neutral-750'
                    }`}
                  >
                    <div className="mt-1 flex items-center justify-center">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        svc.checked ? 'bg-blue-500 border-blue-400 text-white' : 'border-neutral-700'
                      }`}>
                        {svc.checked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold block mb-0.5">{svc.title}</div>
                      <div className="text-xs text-neutral-400 leading-tight block">{svc.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Calculator Output & Receipt Receipt-style Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Calculated Results Panel */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              {/* Subtle top decoration badge */}
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

              <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-4 text-center">
                Resultado do Dimensionamento
              </h4>

              {result && (
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Big Power Output */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider block">
                      Potência Térmica Necessária
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold font-display text-blue-400 tracking-tight block">
                      {result.btus.toLocaleString('pt') || 0}
                      <span className="text-lg font-medium ml-1">BTU/h</span>
                    </span>
                  </div>

                  {/* Recommendation badge */}
                  <div className="bg-neutral-900 border border-neutral-800/80 px-4 py-3 rounded-2xl w-full flex items-center justify-between text-sm">
                    <span className="text-neutral-400 font-medium">Aparelho Sugerido:</span>
                    <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                      {result.recommendedAcPower}
                    </span>
                  </div>

                  {/* Receipt breakdown */}
                  <div className="w-full space-y-3 pt-6 border-t border-white/5">
                    <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase text-left block">
                      Orçamento Estimado
                    </span>

                    <div className="space-y-2 text-sm font-medium">
                      {result.priceBreakdown.installation > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Instalação {result.recommendedAcPower}</span>
                          <span className="font-mono text-neutral-200">R$ {result.priceBreakdown.installation}</span>
                        </div>
                      )}
                      
                      {result.priceBreakdown.cleaning > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Limpeza & Esterilização</span>
                          <span className="font-mono text-neutral-200">R$ {result.priceBreakdown.cleaning}</span>
                        </div>
                      )}
                      
                      {result.priceBreakdown.maintenance > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Manutenção (Gás Check)</span>
                          <span className="font-mono text-neutral-200">R$ {result.priceBreakdown.maintenance}</span>
                        </div>
                      )}

                      {/* No services warning */}
                      {[installChecked, cleaningChecked, maintenanceChecked].filter(Boolean).length === 0 && (
                        <p className="text-xs text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-center">
                          Nenhum serviço selecionado. Selecione pelo menos uma opção à esquerda para estimar custos.
                        </p>
                      )}

                      {/* Multi-service Discount coupon block */}
                      {result.priceBreakdown.discount > 0 && (
                        <div className="flex justify-between items-center text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                          <span className="flex items-center gap-1.5 text-xs font-bold">
                            <Tag className="w-3.5 h-3.5" />
                            Cupom Multi-Serviço
                          </span>
                          <span className="font-mono text-xs font-bold">- R$ {result.priceBreakdown.discount}</span>
                        </div>
                      )}
                    </div>

                    {/* Final Net Total */}
                    <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-neutral-800">
                      <span className="text-sm font-bold text-white">Preço Total Estimado:</span>
                      <span className="text-3xl font-extrabold font-display text-emerald-400 font-mono tracking-tight">
                        R$ {result.priceBreakdown.total}
                      </span>
                    </div>

                  </div>

                  {/* Agendar button forwards selections instantly */}
                  <button
                    onClick={handlePreFill}
                    disabled={[installChecked, cleaningChecked, maintenanceChecked].filter(Boolean).length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-4.5 rounded-2xl text-base font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Agendar Agora com este Orçamento
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-neutral-500 leading-normal">
                    *Os valores são estimativos e podem variar dependendo da complexidade do local (ex: altura excedente da condensadora ou furos adicionais na alvenaria).
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
