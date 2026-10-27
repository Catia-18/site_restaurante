import React, { useState } from 'react';
import { MenuItem } from '../data/restaurantData';
import { X, Clock, Users, Plus, Minus, MessageCircle, ShoppingBag, Check, CheckCircle2 } from 'lucide-react';
import { buildSingleItemWhatsAppUrl, formatKwanzas } from '../utils/whatsapp';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  whatsAppPhone: string;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  whatsAppPhone,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!dish) return null;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 900);
  };

  const totalPrice = dish.price * quantity;
  const singleWhatsAppUrl = buildSingleItemWhatsAppUrl(dish, whatsAppPhone, quantity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#1A1715] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Touch target >= 44px) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-black/70 hover:bg-black text-white transition-colors"
          aria-label="Fechar detalhes do prato"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto">
          {/* Dish Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black/40">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715] via-transparent to-transparent" />
            
            {dish.badge && (
              <div className="absolute top-4 left-4 bg-[#C98A4B] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-md shadow-lg">
                {dish.badge}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#DDD5CE]/60 mb-2">
              <span className="text-[#C98A4B] font-semibold uppercase tracking-wider">
                {dish.categoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#C98A4B]" />
                {dish.prepTime}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5 text-[#C98A4B]" />
                {dish.serves}
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif-display font-medium text-[#F5EFEB] mb-2 leading-tight">
              {dish.name}
            </h2>

            {/* Price Note Indicator */}
            {dish.priceNote && (
              <div className="inline-flex items-center gap-1.5 text-xs text-[#8bf7ad] bg-[#25D366]/10 px-2.5 py-1 rounded-md border border-[#25D366]/20 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>{dish.priceNote}</span>
              </div>
            )}

            <p className="text-xs sm:text-base text-[#DDD5CE]/85 leading-relaxed mb-6 font-light">
              {dish.fullDesc}
            </p>

            {dish.ingredients && dish.ingredients.length > 0 && (
              <div className="mb-6 pt-5 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-[#C98A4B] font-semibold mb-2.5">
                  Ingredientes & Preparo na Brasa
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#DDD5CE]/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Price */}
            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#DDD5CE]/60 block mb-1.5">Quantidade</span>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-white text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-[#DDD5CE]/60 block mb-0.5">Total deste prato</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#F5EFEB] tabular-nums">
                  {formatKwanzas(totalPrice)}
                </span>
              </div>
            </div>

            {/* Action Buttons (Min height 48px for easy thumb tap) */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 min-h-[48px] py-3 px-4 rounded-xl bg-[#C98A4B] hover:bg-[#B37537] active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#C98A4B]/20 transition-all"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar à Sacola</span>
                  </>
                )}
              </button>

              <a
                href={singleWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 min-h-[48px] py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 active:scale-[0.98] border border-[#25D366]/40 text-[#8bf7ad] font-semibold text-xs uppercase tracking-wider transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
