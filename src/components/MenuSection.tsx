import React, { useState, useMemo } from 'react';
import { MenuItem, MENU_CATEGORIES } from '../data/restaurantData';
import { Search, Plus, MessageCircle, Clock, Users, CheckCircle, FileText, LayoutGrid, ScrollText, Printer, ArrowRight } from 'lucide-react';
import { buildSingleItemWhatsAppUrl } from '../utils/whatsapp';
import { OriginalPaperMenu } from './OriginalPaperMenu';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectDish: (item: MenuItem) => void;
  whatsAppPhone: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  onSelectDish,
  whatsAppPhone,
}) => {
  const [viewMode, setViewMode] = useState<'papel' | 'fotos'>('papel');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'todos' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handlePrintPdf = () => {
    setViewMode('papel');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#12100E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C98A4B] font-semibold mb-2">
              <span>Cardápio Oficial BATUK</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>100% Legível em PDF & Digital</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-medium text-[#F5EFEB] leading-tight">
              Menu Gastronómico
            </h2>
            <p className="mt-2 text-xs sm:text-base text-[#DDD5CE]/75 max-w-xl font-light">
              Carta digital oficial estruturada com tipografia de alta legibilidade, preços em AKZ e pedidos imediatos no WhatsApp.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center p-1 bg-[#1C1917] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('papel')}
                className={`flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'papel'
                    ? 'bg-[#C98A4B] text-white shadow-md'
                    : 'text-[#DDD5CE]/75 hover:text-white'
                }`}
              >
                <ScrollText className="w-4 h-4" />
                <span>Carta Oficial (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('fotos')}
                className={`flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'fotos'
                    ? 'bg-[#C98A4B] text-white shadow-md'
                    : 'text-[#DDD5CE]/75 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Catálogo de Pratos</span>
              </button>
            </div>

            {/* Print / Save PDF Button */}
            <button
              type="button"
              onClick={handlePrintPdf}
              className="flex items-center justify-center gap-2 min-h-[42px] px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-colors shadow-md"
              title="Salvar ou Imprimir Carta em PDF"
            >
              <Printer className="w-4 h-4 text-[#C98A4B]" />
              <span>Salvar em PDF</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Pristine Original Paper Menu Replica (Pure high-contrast typography, no raw photos) */}
        {viewMode === 'papel' ? (
          <OriginalPaperMenu
            items={items}
            onAddToCart={onAddToCart}
            onSelectDish={onSelectDish}
            whatsAppPhone={whatsAppPhone}
          />
        ) : (
          /* View Mode 2: Photo Cards Grid of Actual Prepared Dishes */
          <div>
            {/* Search Bar */}
            <div className="mb-6 max-w-md">
              <div className="relative">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar prato, carne ou marisco..."
                  className="w-full pl-10 pr-8 py-2.5 min-h-[44px] rounded-xl bg-[#1C1917] border border-white/10 text-xs sm:text-sm text-[#F5EFEB] placeholder-white/40 focus:outline-none focus:border-[#C98A4B] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar touch-pan-x">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`min-h-[44px] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shrink-0 border select-none ${
                      isActive
                        ? 'bg-[#C98A4B] text-white border-[#C98A4B] shadow-md shadow-[#C98A4B]/20'
                        : 'bg-[#1C1917] text-[#DDD5CE]/80 border-white/10 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl bg-[#1C1917]/50 border border-white/10">
                <p className="text-sm sm:text-base text-[#DDD5CE]">
                  Nenhum prato encontrado com a pesquisa "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('todos');
                  }}
                  className="mt-4 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#C98A4B] text-xs uppercase tracking-wider font-semibold text-white"
                >
                  Ver todos os pratos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredItems.map((dish) => {
                  const singleWhatsAppUrl = buildSingleItemWhatsAppUrl(dish, whatsAppPhone);

                  return (
                    <div
                      key={dish.id}
                      className="group flex flex-col justify-between bg-[#1A1715] border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-[#C98A4B]/40 transition-all duration-300 hover:bg-[#201C19]"
                    >
                      <div>
                        {/* Top Image: Actual food photograph */}
                        <div
                          onClick={() => onSelectDish(dish)}
                          className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-black/40 cursor-pointer"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                          <div className="absolute top-2.5 left-2.5 text-[10px] font-mono tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                            {dish.categoryLabel}
                          </div>

                          {dish.badge && (
                            <div className="absolute top-2.5 right-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#C98A4B] bg-[#12100E]/90 px-2 py-0.5 rounded border border-[#C98A4B]/30">
                              {dish.badge}
                            </div>
                          )}

                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/80">
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3 text-[#C98A4B]" />
                              {dish.prepTime}
                            </span>
                            <span className="flex items-center gap-1 font-mono">
                              <Users className="w-3 h-3 text-[#C98A4B]" />
                              {dish.serves}
                            </span>
                          </div>
                        </div>

                        {/* Dish Title & Description */}
                        <h3
                          onClick={() => onSelectDish(dish)}
                          className="text-base sm:text-lg font-serif-display font-medium text-[#F5EFEB] group-hover:text-[#C98A4B] transition-colors cursor-pointer mb-1.5"
                        >
                          {dish.name}
                        </h3>

                        <p className="text-xs text-[#DDD5CE]/75 leading-relaxed mb-3 line-clamp-2">
                          {dish.shortDesc}
                        </p>

                        {dish.priceNote && (
                          <div className="text-[10px] text-[#8bf7ad] flex items-center gap-1 mb-3">
                            <CheckCircle className="w-3 h-3 text-[#25D366] shrink-0" />
                            <span className="truncate">{dish.priceNote}</span>
                          </div>
                        )}
                      </div>

                      {/* Price & Action Row */}
                      <div className="pt-3 border-t border-white/10 mt-auto">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-[11px] text-[#DDD5CE]/60 uppercase tracking-wider">
                            Preço {dish.unit ? `(${dish.unit})` : ''}
                          </span>
                          <span className="text-base sm:text-lg font-bold font-mono text-[#F5EFEB] tabular-nums">
                            {dish.formattedPrice}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => onAddToCart(dish)}
                            className="w-full flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-semibold text-[#F5EFEB] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#C98A4B]" />
                            <span>Adicionar</span>
                          </button>

                          <a
                            href={singleWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 active:scale-95 border border-[#25D366]/40 text-xs font-semibold text-[#8bf7ad] transition-colors"
                            title="Pedir direto no WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
