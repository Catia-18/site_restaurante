import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  cartCount: number;
  onOpenCart: () => void;
  whatsAppPhone: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  cartCount,
  onOpenCart,
  whatsAppPhone,
}) => {
  const cleanPhone = sanitizePhoneNumber(whatsAppPhone);

  const handleClick = (e: React.MouseEvent) => {
    if (cartCount > 0) {
      e.preventDefault();
      onOpenCart();
    }
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* If cart has items, show brief tooltip badge (Desktop only, mobile has sticky bar) */}
      {cartCount > 0 && (
        <button
          type="button"
          onClick={onOpenCart}
          className="hidden lg:flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#1A1715] border border-white/20 text-xs text-[#F5EFEB] shadow-xl backdrop-blur-md hover:border-[#C98A4B] transition-all animate-bounce"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#C98A4B]" />
          <span>{cartCount} {cartCount === 1 ? 'prato na sacola' : 'pratos na sacola'}</span>
        </button>
      )}

      <a
        href={cartCount > 0 ? '#' : `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá, BATUK! Gostaria de consultar o menu do dia e fazer um pedido.')}`}
        onClick={handleClick}
        target={cartCount > 0 ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Falar com o Restaurante BATUK no WhatsApp (941 678 866)"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        
        {/* Unread badge if cart items */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#C98A4B] text-white text-[10px] font-bold border-2 border-[#12100E]">
            {cartCount}
          </span>
        )}
      </a>
    </div>
  );
};
