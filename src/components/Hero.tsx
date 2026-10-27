import React from 'react';
import { ArrowDown, MessageCircle, UtensilsCrossed, Star, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface HeroProps {
  onOpenOrder: () => void;
  whatsAppPhone: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, whatsAppPhone }) => {
  const cleanPhone = sanitizePhoneNumber(whatsAppPhone);

  return (
    <section id="inicio" className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-26_at_17.29.01_f71b520f.jpeg"
          alt="Esplanada e passadiço de madeira na areia da praia do Restaurante Batuk no Lobito"
          className="w-full h-full object-cover object-center scale-100 sm:scale-105 motion-safe:transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Gradients ensuring WCAG contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/80 to-[#12100E]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/95 via-[#12100E]/70 to-[#12100E]/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Location & Rating Badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#C98A4B] mb-4">
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-white text-[11px]">
              <MapPin className="w-3 h-3 text-[#C98A4B]" />
              Praia do Lobito, Benguela
            </span>
            <span aria-hidden="true" className="text-white/30 hidden sm:inline">·</span>
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[#f5c358] text-[11px] font-mono">
              <Star className="w-3 h-3 fill-current text-[#f5c358]" />
              4.1 ★ (846 avaliações Google)
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium text-[#F5EFEB] leading-[1.12] tracking-tight mb-5 [text-wrap:balance]">
            O sabor da brasa e do mar na{' '}
            <span className="italic font-normal text-[#C98A4B]">Praia do Lobito</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-[#DDD5CE] leading-relaxed mb-8 max-w-2xl font-light font-sans-body">
            Carnes nobres na grelha, peixe fresco da nossa costa, espetadas de novilho com camarão e pratos que transformam cada refeição numa experiência de frente para o mar.
          </p>

          {/* CTAs with generous touch targets (min 48px height) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[48px] text-xs sm:text-sm font-semibold tracking-wide uppercase text-white bg-[#C98A4B] hover:bg-[#B37537] active:scale-[0.98] rounded-xl transition-all shadow-xl shadow-[#C98A4B]/25 whitespace-nowrap"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Explorar o Menu Digital</span>
            </a>

            <button
              type="button"
              onClick={onOpenOrder}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[48px] text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#F5EFEB] bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-sm transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Fazer Pedido pelo WhatsApp</span>
            </button>
          </div>

          {/* Value Props Strip */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-[#DDD5CE]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#C98A4B] font-medium mb-0.5">Montra de Pescado</div>
              <div className="text-xs sm:text-sm font-semibold text-white">Garoupa, Choco e Polvo no Gelo</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#C98A4B] font-medium mb-0.5">Brasa & Espetadas</div>
              <div className="text-xs sm:text-sm font-semibold text-white">Picanha e Espetada Suspensa</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[11px] uppercase tracking-wider text-[#C98A4B] font-medium mb-0.5">WhatsApp Oficial</div>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold font-mono text-[#8bf7ad] hover:underline"
              >
                {RESTAURANT_INFO.displayPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <a
          href="#destaques"
          className="flex flex-col items-center gap-1 text-white/50 hover:text-[#C98A4B] transition-colors text-[11px] tracking-wider uppercase font-medium"
        >
          <span>Explorar</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
