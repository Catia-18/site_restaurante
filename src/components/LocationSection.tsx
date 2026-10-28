import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Waves, ExternalLink, Copy, Check, MessageCircle } from 'lucide-react';
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
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=Restaurante+Batuk+Praia+do+Lobito+Benguela+Angola&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.displayPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="localizacao" className="py-12 sm:py-20 bg-[#14110F] text-[#F5EFEB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C98A4B]/15 border border-[#C98A4B]/30 text-xs uppercase tracking-widest text-[#E5A869] font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C98A4B]" />
            <span>Localização no Google Maps</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-bold text-white tracking-tight">
            Restaurante BATUK na Praia do Lobito
          </h2>
          <p className="mt-3 text-xs sm:text-base text-[#DDD5CE]/80 font-light max-w-xl mx-auto">
            {RESTAURANT_INFO.address}. Acesso pedonal à areia, esplanada panorâmica e sala climatizada.
          </p>
        </div>

        {/* Main Location Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Real Interactive Google Maps Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#1C1815] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden">
            {/* Header with verified rating */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white">
                    Restaurante Batuk
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#25D366]/20 text-[#68e097] border border-[#25D366]/40">
                    Aberto agora
                  </span>
                </div>
                <p className="text-xs text-[#DDD5CE]/70 mt-1 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#C98A4B] shrink-0" />
                  <span>Avenida de Lisboa, Praia do Lobito, Benguela</span>
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 shrink-0 w-fit">
                <span className="text-base font-bold text-white">4.1</span>
                <div className="flex text-[#F5C358]">
                  {'★'.repeat(4)}{'☆'}
                </div>
                <span className="text-xs text-[#DDD5CE]/70 font-mono">(846 avaliações)</span>
              </div>
            </div>

            {/* Real Interactive Google Maps Embed */}
            <div className="relative w-full rounded-xl overflow-hidden border border-white/15 bg-black shadow-inner">
              <iframe
                title="Localização do Restaurante BATUK no Google Maps"
                src={googleMapsEmbedUrl}
                className="w-full h-[280px] sm:h-[350px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:+244941678866`}
                className="flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#C98A4B] hover:bg-[#B37537] active:scale-98 text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#C98A4B]/20 transition-all text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Ligar 941 678 866</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-98 text-white text-xs font-bold border border-white/15 transition-all text-center"
              >
                <Navigation className="w-4 h-4 text-[#C98A4B]" />
                <span>Como Chegar</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>

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

          {/* Column 2: Practical Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Box 1: Schedule */}
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
                  <span>Almoço & Cardápio do Dia</span>
                  <span className="font-mono text-[#DDD5CE]/80">12:00 – 16:00</span>
                </div>
                <div className="flex items-center justify-between text-[#DDD5CE]">
                  <span>Jantar & Brasa Noturna</span>
                  <span className="font-mono text-[#DDD5CE]/80">19:00 – 23:30</span>
                </div>
              </div>
            </div>

            {/* Box 2: Beach Access & Facilities */}
            <div className="bg-[#1C1815] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C98A4B]/15 border border-[#C98A4B]/30 flex items-center justify-center text-[#C98A4B]">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Acesso & Instalações</h4>
                  <p className="text-xs text-[#DDD5CE]/70">Praia do Lobito</p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-[#DDD5CE]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Passadiço de Madeira:</strong> Ligação direta da esplanada até ao areal da praia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Estacionamento:</strong> Lugares fáceis e seguros na Avenida de Lisboa em frente ao restaurante.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Ambientes:</strong> Esplanada lounge exterior com brisa do mar e sala interior climatizada.</span>
                </li>
              </ul>
            </div>

            {/* Box 3: WhatsApp Direct Contact */}
            <div className="bg-gradient-to-br from-[#241E19] to-[#1C1815] border border-[#C98A4B]/30 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#E5A869] uppercase tracking-wider">
                  Pedidos & Reservas
                </span>
                <span className="text-xs text-[#25D366] font-mono font-bold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </span>
              </div>
              <p className="text-xs text-[#DDD5CE]/90 mb-3">
                Faz o teu pedido com antecedência ou reserva mesa pelo WhatsApp oficial:
              </p>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp ({RESTAURANT_INFO.displayPhone})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
