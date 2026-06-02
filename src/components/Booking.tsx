import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MapPin, FileText, CheckCircle2, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Appointment } from '../types';
import { servicesData } from '../data';

interface BookingProps {
  preFilledOptions: {
    serviceId: string;
    btus: number;
    estimatedPrice: number;
    notes: string;
  } | null;
  onClearPreFill: () => void;
}

// Current simulated local date is May 23, 2026
const CURRENT_YEAR = 2026;
const CURRENT_MONTH = 4; // 0-indexed May = 4
const CURRENT_DAY = 23;

export default function Booking({ preFilledOptions, onClearPreFill }: BookingProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>('instalacao');
  const [selectedDate, setSelectedDate] = useState<string>('2026-05-25'); // Default to next Monday
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('08:00');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Calendar render navigation (May/June 2026)
  const [activeMonth, setActiveMonth] = useState<number>(4); // 4 = May, 5 = June
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Load appointments from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('p22_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      } else {
        // Mock a couple of default friendly appointments to display as sample data
        const mockAppointments: Appointment[] = [
          {
            id: 'mock-1',
            serviceId: 'limpeza',
            serviceName: 'Limpeza & Higienização Completa',
            date: '2026-05-28',
            timeSlot: '14:00',
            clientName: 'Patric Pivetta',
            clientEmail: 'patric.pivetta@gmail.com',
            clientPhone: '(47) 98839-7829',
            clientAddress: 'Rua XV de Novembro, 1500 - Centro, Blumenau - SC',
            notes: 'Aparelho Split de 12.000 BTU precisando de higienização de emergência devido a cheiro de poeira constante.',
            estimatedPrice: 250,
            createdAt: new Date().toISOString(),
          }
        ];
        localStorage.setItem('p22_appointments', JSON.stringify(mockAppointments));
        setAppointments(mockAppointments);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
  }, []);

  // Handle prefilled triggers from the BTU calculator
  useEffect(() => {
    if (preFilledOptions) {
      setSelectedServiceId(preFilledOptions.serviceId);
      setNotes(preFilledOptions.notes);
      
      // Auto scroll down to booking section smoothly
      const element = document.getElementById('agendamento');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preFilledOptions]);

  // Save appointments helper
  const saveAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    try {
      localStorage.setItem('p22_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    const service = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];
    
    // If we have prefilled options matching active service, use computed estimated price. Otherwise standard price.
    const finalPrice = (preFilledOptions && preFilledOptions.serviceId === selectedServiceId)
      ? preFilledOptions.estimatedPrice
      : service.price;

    const newAppointment: Appointment = {
      id: 'app-' + Math.random().toString(36).substr(2, 9),
      serviceId: selectedServiceId,
      serviceName: service.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      clientAddress: address,
      notes: notes,
      btus: preFilledOptions?.btus,
      estimatedPrice: finalPrice,
      createdAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...appointments];
    saveAppointments(updated);

    // Show Success block
    setCreatedAppointment(newAppointment);
    setBookingSuccess(true);

    // Clear form inputs
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNotes('');
    onClearPreFill();
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    saveAppointments(updated);
  };

  // Calendar grid math
  const daysInMonth = (month: number) => {
    return new Date(2026, month + 1, 0).getDate();
  };

  const firstDayOffset = (month: number) => {
    return new Date(2026, month, 1).getDay(); // 0 = Sunday, 1 = Monday etc.
  };

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const handleMonthChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && activeMonth === 4) {
      setActiveMonth(5);
    } else if (direction === 'prev' && activeMonth === 5) {
      setActiveMonth(4);
    }
  };

  // Generate date day buttons
  const renderCalendarDays = () => {
    const totalDays = daysInMonth(activeMonth);
    const offset = firstDayOffset(activeMonth);
    const dayElements = [];

    // Empty spaces for previous month's padding
    for (let i = 0; i < offset; i++) {
      dayElements.push(<div key={`empty-${i}`} className="w-8 h-8 sm:w-10 sm:h-10" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateString = `2026-05-${String(d).padStart(2, '0')}`;
      const dateStringJune = `2026-06-${String(d).padStart(2, '0')}`;
      const currentDateKey = activeMonth === 4 ? dateString : dateStringJune;

      // Disable days in the past (Today is Sat May 23, 2026)
      const isPast = activeMonth === 4 && d < CURRENT_DAY;
      const isSelected = selectedDate === currentDateKey;

      dayElements.push(
        <button
          key={`day-${d}`}
          type="button"
          disabled={isPast}
          onClick={() => setSelectedDate(currentDateKey)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-transform ${
            isPast 
              ? 'text-neutral-600 cursor-not-allowed line-through' 
              : isSelected
                ? 'bg-blue-600 text-white font-bold scale-110 shadow-md shadow-blue-500/20'
                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          {d}
        </button>
      );
    }

    return dayElements;
  };

  return (
    <section id="agendamento" className="py-24 bg-neutral-900 border-t border-neutral-850 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 mb-4">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Agendamento Simplificado</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Reserve o Seu Técnico Online
          </h2>
          <p className="max-w-2xl text-neutral-400 text-base leading-relaxed">
            Escolha o serviço mais adequado, selecione uma data conveniente em nossa folha de agendamento em tempo real e confirme sua visita de forma rápida e segura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar & Form Column */}
          <div className="lg:col-span-8 bg-neutral-950/80 border border-neutral-850 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* SUCCESS FEEDBACK TOAST INTERACTIVE PANEL */}
            {bookingSuccess && createdAppointment ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/30 p-6 sm:p-8 rounded-2xl text-center space-y-4 mb-8"
              >
                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Agendamento Solicitado!</h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    Entraremos em contato via WhatsApp no celular informado para confirmar a disponibilidade final do horário selecionado. Obrigado!
                  </p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-xs max-w-sm mx-auto text-left space-y-2">
                  <p><span className="text-neutral-500 font-bold">Serviço:</span> <span className="text-white font-semibold">{createdAppointment.serviceName}</span></p>
                  <p><span className="text-neutral-500 font-bold">Data:</span> <span className="text-white font-semibold">{createdAppointment.date} às {createdAppointment.timeSlot}</span></p>
                  <p><span className="text-neutral-500 font-bold">Cliente:</span> <span className="text-white font-semibold">{createdAppointment.clientName}</span></p>
                  <p><span className="text-neutral-500 font-bold">Preço Estimado:</span> <span className="text-emerald-400 font-extrabold text-[13px]">R$ {createdAppointment.estimatedPrice}</span></p>
                </div>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Novo Agendamento
                </button>
              </motion.div>
            ) : null}

            {/* Main Form Fields */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Form Inputs (Left) */}
                <div className="space-y-4">
                  
                  {/* Select HVAC service */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Serviço Desejado
                    </label>
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800 text-sm font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    >
                      {servicesData.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Preloaded warning notification info */}
                  {preFilledOptions && preFilledOptions.serviceId === selectedServiceId && (
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-xs flex gap-2 items-center text-blue-300">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                      <span>Preço otimizado com base na sua simulação de BTUs.</span>
                    </div>
                  )}

                  {/* Personal Client Informational Fields */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        required
                        placeholder="Insira seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-900/60 pl-11 pr-4 py-3.5 rounded-xl border border-neutral-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-600 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                        Seu Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="email"
                          required
                          placeholder="exemplo@site.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-neutral-900/60 pl-11 pr-4 py-3.5 rounded-xl border border-neutral-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-600 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                        Celular (WhatsApp)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="tel"
                          required
                          placeholder="(11) 99999-9999"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-neutral-900/60 pl-11 pr-4 py-3.5 rounded-xl border border-neutral-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-600 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Installation / service delivery address physical */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Endereço do Local de Serviço
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        required
                        placeholder="Rua, número, complemento - Bairro, Cidade"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-neutral-900/60 pl-11 pr-4 py-3.5 rounded-xl border border-neutral-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-600 font-medium"
                      />
                    </div>
                  </div>

                </div>

                {/* Date Calendar & Time Picker (Right) */}
                <div className="space-y-4">
                  
                  {/* Monthly Calendar View */}
                  <div className="p-4 bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-4">
                    
                    {/* Month Navigator Header */}
                    <div className="flex justify-between items-center px-1">
                      <span className="font-display font-bold text-sm tracking-wide">
                        {monthNames[activeMonth]} {CURRENT_YEAR}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={activeMonth === 4}
                          onClick={() => handleMonthChange('prev')}
                          className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                        >
                          &lt;
                        </button>
                        <button
                          type="button"
                          disabled={activeMonth === 5}
                          onClick={() => handleMonthChange('next')}
                          className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                        >
                          &gt;
                        </button>
                      </div>
                    </div>

                    {/* Weekdays names grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono font-bold text-neutral-500 tracking-wider">
                      <span>DOM</span>
                      <span>SEG</span>
                      <span>TER</span>
                      <span>QUA</span>
                      <span>QUI</span>
                      <span>SEX</span>
                      <span>SÁB</span>
                    </div>

                    {/* Generated Month Day buttons grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {renderCalendarDays()}
                    </div>
                  </div>

                  {/* Time slot selectors */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Disponibilidade de Horário
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { time: '08:00', label: 'Período Manhã (08:00)' },
                        { time: '10:00', label: 'Período Manhã (10:00)' },
                        { time: '14:00', label: 'Período Tarde (14:00)' },
                        { time: '16:00', label: 'Período Tarde (16:00)' },
                      ].map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`p-3 rounded-xl border text-center transition-colors focus:outline-none text-xs font-semibold ${
                            selectedTimeSlot === slot.time
                              ? 'bg-blue-600 border-blue-500 text-white font-bold'
                              : 'bg-neutral-900/50 border-neutral-800 text-neutral-300 hover:border-neutral-750'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Special instructions textbox */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Instruções Adicionais / Detalhes do Aparelho
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                  <textarea
                    rows={3}
                    placeholder="Ex: Marca do ar condicionado, altura do local, se necessita andaime, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-neutral-900/60 pl-11 pr-4 py-3 rounded-xl border border-neutral-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-600 font-medium"
                  />
                </div>
              </div>

              {/* Confirm Agendar Online CTA button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-4.5 rounded-2xl text-base font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirmar Solicitação de Visita Técnica
              </button>

            </form>
          </div>

          {/* Active Bookings Manager Panel (Right Column) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 shadow-xl space-y-6">
              
              <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 pb-4 border-b border-neutral-900">
                <CalendarIcon className="w-4.5 h-4.5 text-indigo-400" />
                <span>Seus Agendamentos</span>
              </h3>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {appointments.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-neutral-500 bg-neutral-900/20 p-4 rounded-2xl border border-neutral-900">
                    <AlertCircle className="w-8 h-8 text-neutral-600 mx-auto" />
                    <p className="text-xs">Nenhum agendamento ativo.</p>
                    <p className="text-[10px] leading-relaxed">
                      Preencha o formulário ao lado de forma rápida para solicitar sua visita!
                    </p>
                  </div>
                ) : (
                  appointments.map((app) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-neutral-900/60 border border-neutral-800/80 p-4.5 rounded-2xl flex flex-col justify-between gap-3 relative overflow-hidden"
                      key={app.id}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-1">
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                            Visita Pendente
                          </span>
                          <span className="font-mono text-neutral-450 text-[11px] font-bold">
                            R$ {app.estimatedPrice}
                          </span>
                        </div>

                        <div className="text-sm font-bold text-white tracking-tight">
                          {app.serviceName}
                        </div>

                        <div className="space-y-1 text-xs text-neutral-400 font-medium">
                          <p className="flex items-center gap-1.5">
                            <CalendarIcon className="w-3.5 h-3.5 text-blue-400" />
                            {app.date} às {app.timeSlot}
                          </p>
                          <p className="flex items-center gap-1.5 leading-normal">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="line-clamp-1">{app.clientAddress}</span>
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500 font-mono">
                          Código: #{app.id.toUpperCase()}
                        </span>
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors"
                          title="Desmarcar Visita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Helpful general advice badge block */}
              <div className="bg-neutral-900/30 p-4 rounded-2xl border border-neutral-850 flex gap-3 text-xs leading-relaxed text-neutral-400 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Sem pagamento adiantado!</strong> O acerto financeiro é realizado apenas após a vistoria técnica e a conclusão dos testes operacionais do aparelho.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
