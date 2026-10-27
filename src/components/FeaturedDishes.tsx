import React from 'react';
import { MenuItem } from '../data/restaurantData';
import { MessageCircle, Plus, Eye, Clock, Users, CheckCircle2 } from 'lucide-react';
import { buildSingleItemWhatsAppUrl } from '../utils/whatsapp';

interface FeaturedDishesProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectDish: (item: MenuItem) => void;
  whatsAppPhone: string;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  items,
  onAddToCart,
  onSelectDish,
  whatsAppPhone,
}) => {
  const featured = items.filter((item) => item.isFeatured).slice(0, 4);

  return (
    <section id="destaques" className="py-16 sm:py-24 bg-[#171412] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C98A4B] font-semibold mb-2">
            <span>Especialidades da Casa</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Menu Verificado</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-medium text-[#F5EFEB] leading-tight mb-3 [text-wrap:balance]">
            Os sabores que merecem a tua atenção.
          </h2>
          <p className="text-sm sm:text-base text-[#DDD5CE]/80 font-light font-sans-body">
            Pratos preparados com a autenticidade da nossa brasa e do mar do Lobito. Preços comprovados no menu oficial e fatura de atendimento do BATUK.
          </p>
        </div>

        {/* Featured Grid (Single column on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featured.map((dish) => {
            const singleWhatsAppUrl = buildSingleItemWhatsAppUrl(dish, whatsAppPhone);

            return (
              <div
                key={dish.id}
                className="group relative flex flex-col bg-[#1F1B18] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C98A4B]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70"
              >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div
                  onClick={() => onSelectDish(dish)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18] via-transparent to-transparent opacity-80" />

                  {dish.badge && (
                    <div className="absolute top-3 left-3 bg-[#12100E]/90 backdrop-blur-md border border-white/15 text-[#C98A4B] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                      {dish.badge}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDish(dish);
                    }}
                    className="absolute top-3 right-3 min-w-[36px] min-h-[36px] rounded-lg bg-black/60 backdrop-blur-sm text-white/80 hover:text-white flex items-center justify-center transition-opacity"
                    title="Ver detalhes do prato"
                    aria-label={`Ver detalhes de ${dish.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-[#DDD5CE]/60 mb-2">
                      <span className="text-[#C98A4B] font-medium uppercase tracking-wider">{dish.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-[#C98A4B]" />
                        {dish.prepTime}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectDish(dish)}
                      className="text-base sm:text-lg font-serif-display font-medium text-[#F5EFEB] group-hover:text-[#C98A4B] transition-colors cursor-pointer mb-2 line-clamp-2"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs text-[#DDD5CE]/75 line-clamp-2 leading-relaxed mb-3">
                      {dish.shortDesc}
                    </p>

                    {/* Price status note */}
                    {dish.priceNote && (
                      <div className="flex items-center gap-1 text-[10px] text-[#8bf7ad] mb-3">
                        <CheckCircle2 className="w-3 h-3 text-[#25D366] shrink-0" />
                        <span className="truncate">{dish.priceNote}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Price Row with Tabular Nums */}
                    <div className="flex items-baseline justify-between pt-3 border-t border-white/10 mb-3">
                      <span className="text-xs text-[#DDD5CE]/60 uppercase tracking-wider">Valor</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-[#F5EFEB] tabular-nums">
                        {dish.formattedPrice}
                      </span>
                    </div>

                    {/* Mobile Touch Action Buttons (Min height 44px) */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onAddToCart(dish)}
                        className="flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-semibold text-[#F5EFEB] transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#C98A4B]" />
                        <span>Adicionar</span>
                      </button>

                      <a
                        href={singleWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 active:scale-95 border border-[#25D366]/40 text-xs font-semibold text-[#8bf7ad] transition-colors"
                        title="Pedir este prato diretamente pelo WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>Pedir Já</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
