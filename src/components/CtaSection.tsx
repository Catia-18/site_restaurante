import React from 'react';
import { MessageCircle, ShoppingBag, UtensilsCrossed, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface CtaSectionProps {
  onOpenOrder: () => void;
  whatsAppPhone: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenOrder, whatsAppPhone }) => {
  const cleanPhone = sanitizePhoneNumber(whatsAppPhone);

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#171412] to-[#12100E] border-t border-white/5 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-26_at_17.29.04_7d08fe3a.jpeg"
          alt="Esplanada na praia do Lobito"
          className="w-full h-full object-cover filter blur-sm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#12100E]/85" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C98A4B] font-semibold mb-3">
          <span>Pedidos & Takeaway</span>
          <span aria-hidden="true" className="text-white/30">·</span>
          <span>WhatsApp Oficial</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-medium text-[#F5EFEB] leading-tight mb-4 [text-wrap:balance]">
          Já escolheste o teu próximo sabor favorito?
        </h2>

        <p className="text-sm sm:text-lg text-[#DDD5CE]/80 max-w-2xl mx-auto mb-8 font-light font-sans-body">
          Escolhe o que mais te apetece e faz o teu pedido de forma simples e rápida pelo WhatsApp <strong className="text-white font-mono">{RESTAURANT_INFO.displayPhone}</strong>.
          A nossa equipa no Lobito confirma o teu pedido e prepara tudo com o máximo frescor.
        </p>

        {/* Action Buttons (Min height 48px) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto sm:max-w-none">
          <button
            type="button"
            onClick={onOpenOrder}
            className="flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#25D366]/20 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Fazer o meu pedido agora</span>
          </button>

          <a
            href="#menu"
            className="flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C98A4B]" />
            <span>Rever Menu Digital</span>
          </a>
        </div>

        <div className="mt-8 text-[11px] sm:text-xs text-[#DDD5CE]/60 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span>Sem taxas escondidas</span>
          <span aria-hidden="true">·</span>
          <span>Atendimento humano em tempo real</span>
          <span aria-hidden="true">·</span>
          <span>Pagamento por Multicaixa Express / Transferência</span>
        </div>
      </div>
    </section>
  );
};
