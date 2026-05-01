import React, { useState } from 'react';
import { Lead } from '../types';
import { generateWhatsAppLink, saveLeadToSheet } from '../services/sheetService';
import { GeminiAssistant } from './GeminiAssistant';

interface Props {
  referrerId: string;
}

export const LandingPage: React.FC<Props> = ({ referrerId }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);

    const lead: Lead = {
      name,
      phone,
      referrerId,
      timestamp: Date.now()
    };

    // 1. Save to Google Sheets (Async - don't block user if it fails)
    saveLeadToSheet(lead).catch(console.error);

    // 2. Generate WhatsApp Link
    const waLink = generateWhatsAppLink(lead);

    setIsSubmitting(false);
    setSubmitted(true);

    // 3. Redirect to WhatsApp with a slight delay to show success state
    setTimeout(() => {
        window.location.href = waLink;
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-6 font-sans">
        <div className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">¡Solicitud Recibida!</h2>
          <p className="text-green-700 mb-6 text-sm">
            Te estamos redirigiendo a WhatsApp para finalizar tu cita con la unidad {referrerId}.
          </p>
          <div className="animate-pulse text-xs text-green-600 font-semibold uppercase tracking-wide">
            Redirigiendo...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans">
      {/* Navbar / Trust Badge */}
      <div className="absolute top-0 w-full z-20 flex justify-between items-center p-4">
         <div className="bg-white/90 backdrop-blur text-slate-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Taxi Seguro: {referrerId}
         </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-20 pb-24 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-400 opacity-10 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
        
        <div className="max-w-md mx-auto text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-1 tracking-tight">¡Felicidades!</h1>
          <p className="text-blue-100 text-sm font-medium mb-6 opacity-90">
            Has desbloqueado una promoción exclusiva
          </p>
          
          <div className="bg-white text-slate-800 p-6 rounded-3xl shadow-xl transform transition-transform hover:scale-105 duration-300 border-b-4 border-blue-900/10">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Cupón Digital</div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-6xl font-black text-blue-600 tracking-tighter">10%</span>
                <span className="text-xl font-bold text-blue-600">OFF</span>
            </div>
            <div className="w-full h-px bg-slate-100 my-3"></div>
            <p className="font-bold text-lg text-slate-700 leading-tight">Limpieza Dental Completa</p>
            <div className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                <span>+</span> Valoración GRATIS
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md mx-auto px-6 -mt-12 relative z-20 pb-24">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase ml-1 mb-1">Nombre Completo</label>
              <input
                required
                type="text"
                placeholder="Tu nombre aquí"
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 text-slate-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase ml-1 mb-1">Teléfono Móvil</label>
              <input
                required
                type="tel"
                placeholder="315 XXXXXXX"
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 text-slate-700"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200/50 transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Procesando...</span>
              ) : (
                <>
                  <span className="text-2xl group-hover:rotate-12 transition-transform">🎁</span> 
                  <span>Canjear Descuento Ahora</span>
                </>
              )}
            </button>
            
            <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed px-4">
              Al hacer clic, se abrirá WhatsApp con tus datos para agendar la cita. 
              El descuento es válido presentando el mensaje.
            </p>
          </form>
        </div>
      </div>

      <GeminiAssistant />
    </div>
  );
};