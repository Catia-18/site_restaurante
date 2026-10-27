import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Waves, Car, Compass, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface LocationSectionProps {
  whatsAppPhone?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  whatsAppPhone = RESTAURANT_INFO.defaultPhone,
}) => {
  const [copied, setCopied] = useState(false);
  const cleanPhone = sanitizePhoneNumber(whatsAppPhone);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Restaurante+Batuk+Praia+do+Lobito+Benguela+Angola`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.displayPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="localizacao" className="py-12 sm:py-20 bg-[#14110F] text-[#F5EFEB] relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C98A4B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C98A4B]/15 border border-[#C98A4B]/30 text-xs uppercase tracking-widest text-[#E5A869] font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C98A4B]" />
            <span>Localização Oficial & Acesso</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-tight">
            Onde Estamos na Praia do Lobito
          </h2>
          <p className="mt-3 text-xs sm:text-base text-[#DDD5CE]/80 font-light max-w-xl mx-auto">
            Localização privilegiada na Avenida de Lisboa com acesso direto à areia, esplanada panorâmica e sala climatizada.
          </p>
        </div>

        {/* Main Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Interactive / Visual Map Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#1C1815] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden relative">
            {/* Top Bar simulating verified Google Maps business card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white">
                    Restaurante Batuk
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#25D366]/20 text-[#68e097] border border-[#25D366]/40">
                    Aberto agora
                  </span>
                </div>
                <p className="text-xs text-[#DDD5CE]/70 mt-0.5 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#C98A4B] shrink-0" />
                  <span>Avenida de Lisboa, Praia do Lobito, Benguela</span>
                </p>
              </div>

              {/* Rating summary */}
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 shrink-0 w-fit">
                <span className="text-base font-bold text-white">4.1</span>
                <div className="flex text-[#F5C358]">
                  {'★'.repeat(4)}{'☆'}
                </div>
                <span className="text-xs text-[#DDD5CE]/70 font-mono">(846 avaliações)</span>
              </div>
            </div>

            {/* Stylized Beachfront Map Graphic */}
            <div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden border border-white/15 bg-[#1F272B] shadow-inner flex items-center justify-center group">
              {/* Ocean Blue Waves Texture on North/West side */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#123040] via-[#1a2d36] to-[#26201b]" />

              {/* Beach Sand Strip */}
              <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#3a3026] via-[#2d241d] to-transparent opacity-80" />

              {/* Ocean Wave Lines */}
              <div className="absolute top-4 left-6 text-cyan-400/30 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400/50" />
                <span>Oceano Atlântico · Praia do Lobito</span>
              </div>

              {/* Street road line */}
              <div className="absolute top-28 left-0 right-0 h-10 bg-[#161311] border-y border-white/10 flex items-center justify-between px-6 transform -rotate-1 shadow-md">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                  Av. de Lisboa (Restinga do Lobito)
                </span>
                <span className="text-[9px] font-mono uppercase text-white/30 hidden sm:inline">
                  Sentido Farol
                </span>
              </div>

              {/* Neighboring Reference Pins */}
              <div className="absolute top-20 left-8 sm:left-14 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 text-[10px] text-white/70 shadow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span>Prédio do Sol Bar</span>
              </div>

              <div className="absolute top-44 left-10 sm:left-20 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 text-[10px] text-white/70 shadow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span>Angelo's Restaurante</span>
              </div>

              {/* Wooden Walkway Graphic to the sea */}
              <div className="absolute top-36 right-16 sm:right-28 w-12 h-28 bg-[#8a684b]/40 border-x-2 border-dashed border-[#d8aa79]/60 flex flex-col items-center justify-around py-2">
                <span className="text-[8px] uppercase tracking-tighter font-mono text-[#d8aa79] font-bold rotate-90 whitespace-nowrap">
                  Passadiço
                </span>
              </div>

              {/* BATUK Main PIN (Pulsing and highlighted) */}
              <div className="absolute top-24 right-16 sm:right-28 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-[#C98A4B] rounded-full animate-ping opacity-60" />
                  <div className="relative w-11 h-11 rounded-full bg-[#E53935] border-2 border-white flex items-center justify-center text-white shadow-2xl">
                    <MapPin className="w-6 h-6 fill-white text-[#E53935]" />
                  </div>
                </div>

                {/* Pin Tooltip */}
                <div className="mt-2 bg-[#1C1815] border-2 border-[#C98A4B] px-3 py-1.5 rounded-xl shadow-2xl text-center">
                  <div className="text-xs font-serif-display font-bold text-white tracking-wider">
                    RESTAURANTE BATUK
                  </div>
                  <div className="text-[10px] text-[#C98A4B] font-mono font-medium">
                    Esplanada Pé na Areia
                  </div>
                </div>
              </div>

              {/* Overlay Open in Google Maps button */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-[#1A120B] text-xs font-bold shadow-xl hover:bg-[#F5EFEB] active:scale-95 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E53935]" />
                <span>Abrir Rota no Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#1A120B]/60" />
              </a>
            </div>

            {/* Quick Action Buttons Row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Call direct */}
              <a
                href={`tel:+244941678866`}
                className="flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#C98A4B] hover:bg-[#B37537] active:scale-98 text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#C98A4B]/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Ligar 941 678 866</span>
              </a>

              {/* Open Maps */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-98 text-white text-xs font-bold border border-white/15 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#C98A4B]" />
                <span>Como Chegar</span>
              </a>

              {/* Copy Phone */}
              <button
                type="button"
                onClick={handleCopyPhone}
                className="flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-98 text-[#DDD5CE] text-xs font-medium border border-white/10 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#25D366]" />
                    <span className="text-[#25D366] font-bold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#DDD5CE]/70" />
                    <span>Copiar Contacto</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Column 2: Practical Details & Restaurant Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Box 1: Schedule & Timing */}
            <div className="bg-[#1C1815] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C98A4B]/15 border border-[#C98A4B]/30 flex items-center justify-center text-[#C98A4B]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Horário de Funcionamento</h4>
                  <p className="text-xs text-[#25D366] font-medium">Aberto todos os dias</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-[#DDD5CE]">
                  <span>Segunda a Domingo</span>
                  <strong className="text-white font-mono">12:00 – 23:30</strong>
                </div>
                <div className="flex items-center justify-between text-[#DDD5CE]">
                  <span>Almoço & Menu do Dia</span>
                  <span className="font-mono text-[#DDD5CE]/80">12:00 – 16:00</span>
                </div>
                <div className="flex items-center justify-between text-[#DDD5CE]">
                  <span>Jantar & Brasa Noturna</span>
                  <span className="font-mono text-[#DDD5CE]/80">19:00 – 23:30</span>
                </div>
              </div>
            </div>

            {/* Box 2: Beach Access & Parking */}
            <div className="bg-[#1C1815] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C98A4B]/15 border border-[#C98A4B]/30 flex items-center justify-center text-[#C98A4B]">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Acesso à Praia & Instalações</h4>
                  <p className="text-xs text-[#DDD5CE]/70">Pé na areia no Lobito</p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-[#DDD5CE]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Passadiço Privativo:</strong> Caminho em madeira iluminado ligando as mesas diretamente à praia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Estacionamento:</strong> Lugares fáceis e seguros na Avenida de Lisboa, em frente ao restaurante.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Ambientes:</strong> Esplanada lounge exterior com brisa marítima e sala interior climatizada.</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Note from Google Reviews ("Visitors love...") */}
            <div className="bg-gradient-to-br from-[#241E19] to-[#1C1815] border border-[#C98A4B]/30 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E5A869] uppercase tracking-wider mb-1.5">
                <Compass className="w-4 h-4 text-[#C98A4B]" />
                <span>Dica dos Visitantes (Google Maps)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#DDD5CE]/90 italic leading-relaxed">
                "Os clientes adoram a esplanada descontraída em frente à praia ao pôr do sol, o aroma irresistível da picanha na brasa e a pesca fresca pesada na montra."
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#DDD5CE]/60 font-mono">
                <span>Praia do Lobito · Benguela</span>
                <span className="text-[#25D366] font-semibold">Classificação 4.1 ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
