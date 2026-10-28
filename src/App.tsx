/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MENU_ITEMS, MenuItem, RESTAURANT_INFO } from './data/restaurantData';
import { CartItem } from './utils/whatsapp';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { DishDetailModal } from './components/DishDetailModal';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WhatsAppSettingsModal } from './components/WhatsAppSettingsModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Check, UtensilsCrossed, MapPin, Star, Compass, LayoutGrid, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'todos' | 'restaurante' | 'cardapio' | 'localizacao' | 'avaliacoes'>('todos');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('batuk_cart_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [whatsAppPhone, setWhatsAppPhone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('batuk_whatsapp_v3');
      return saved || RESTAURANT_INFO.defaultPhone;
    } catch {
      return RESTAURANT_INFO.defaultPhone;
    }
  });

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('batuk_cart_v3', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync phone to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('batuk_whatsapp_v3', whatsAppPhone);
    } catch {
      // ignore
    }
  }, [whatsAppPhone]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (dish: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === dish.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === dish.id ? { ...c, quantity: c.quantity + quantity } : c
        );
      }
      return [...prev, { item: dish, quantity }];
    });
    showToast(`"${dish.name}" adicionado à sacola!`);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === dishId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== dishId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  const tabsConfig = [
    { id: 'todos', label: 'Visão Geral', icon: LayoutGrid, desc: 'Apresentação do Batuk' },
    { id: 'restaurante', label: 'O Restaurante', icon: Compass, desc: 'Espaço e Equipa' },
    { id: 'cardapio', label: 'Cardápio', icon: UtensilsCrossed, desc: 'Pratos & Opção PDF' },
    { id: 'localizacao', label: 'Localização', icon: MapPin, desc: 'Praia do Lobito & Mapa' },
    { id: 'avaliacoes', label: 'Avaliações', icon: Star, desc: '4.1 ★ no Google' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F5EFEB] flex flex-col font-sans-body selection:bg-[#C98A4B] selection:text-white overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#1F1B18] border border-[#C98A4B]/40 text-white shadow-2xl shadow-black/80 animate-slideIn max-w-[90vw]">
          <div className="w-5 h-5 rounded-full bg-[#C98A4B] flex items-center justify-center text-white text-xs shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium truncate">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-semibold text-[#C98A4B] hover:underline shrink-0"
          >
            Ver Pedido
          </button>
        </div>
      )}

      {/* Header with reactive active tab */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentPhone={whatsAppPhone}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId as any)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenOrder={() => {
            setActiveTab('cardapio');
            setIsCartOpen(true);
          }}
          whatsAppPhone={whatsAppPhone}
        />

        {/* Organized Section Tabs Bar (Sticky Nav on Desktop & Mobile) */}
        <section className="sticky top-[60px] sm:top-[68px] z-30 bg-[#161310]/95 backdrop-blur-md border-y border-white/10 py-3 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {tabsConfig.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#C98A4B] text-white shadow-lg shadow-[#C98A4B]/25 scale-102 font-bold'
                        : 'bg-white/5 text-[#DDD5CE]/80 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#C98A4B]'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* TAB VIEW 1: O RESTAURANTE (Dedicated Pure Restaurant Space) */}
        {activeTab === 'restaurante' && (
          <div className="animate-fadeIn">
            <AboutSection />
            <GallerySection />
            <div className="py-10 bg-[#14110F] text-center border-t border-white/5">
              <div className="max-w-xl mx-auto px-4">
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white mb-2">
                  Pronto para nos visitar na Praia do Lobito?
                </h3>
                <p className="text-xs sm:text-sm text-[#DDD5CE]/70 mb-5">
                  Estamos abertos todos os dias das 12:00 às 23:30 na Avenida de Lisboa.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('localizacao')}
                    className="px-5 py-2.5 rounded-xl bg-[#C98A4B] text-white text-xs uppercase tracking-wider font-bold shadow-md hover:bg-[#B37537] transition-all"
                  >
                    Ver Localização & Mapa
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cardapio')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs uppercase tracking-wider font-semibold border border-white/15 hover:bg-white/15 transition-all"
                  >
                    Ver Cardápio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB VIEW 2: CARDÁPIO (Digital Catalog + PDF Menu View) */}
        {activeTab === 'cardapio' && (
          <div className="animate-fadeIn">
            <FeaturedDishes
              items={MENU_ITEMS}
              onAddToCart={(dish) => handleAddToCart(dish, 1)}
              onSelectDish={(dish) => setSelectedDish(dish)}
              whatsAppPhone={whatsAppPhone}
            />
            <MenuSection
              items={MENU_ITEMS}
              onAddToCart={(dish) => handleAddToCart(dish, 1)}
              onSelectDish={(dish) => setSelectedDish(dish)}
              whatsAppPhone={whatsAppPhone}
            />
          </div>
        )}

        {/* TAB VIEW 3: LOCALIZAÇÃO & COMO CHEGAR (Dedicated Tab with Real Google Maps) */}
        {activeTab === 'localizacao' && (
          <div className="animate-fadeIn">
            <LocationSection whatsAppPhone={whatsAppPhone} />
          </div>
        )}

        {/* TAB VIEW 4: AVALIAÇÕES (100% Portuguese Google Reviews) */}
        {activeTab === 'avaliacoes' && (
          <div className="animate-fadeIn">
            <ReviewsSection />
          </div>
        )}

        {/* TAB VIEW 5: VISÃO GERAL (NO PDF MENU, NO PRICES EMBLEM - Pure Elegance) */}
        {activeTab === 'todos' && (
          <div className="animate-fadeIn">
            {/* Featured Dishes Carousel with actual food plates */}
            <FeaturedDishes
              items={MENU_ITEMS}
              onAddToCart={(dish) => handleAddToCart(dish, 1)}
              onSelectDish={(dish) => setSelectedDish(dish)}
              whatsAppPhone={whatsAppPhone}
            />

            {/* Clean Invitation Banner to Cardápio */}
            <section className="py-8 bg-[#181512] border-y border-white/10 text-center">
              <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h3 className="text-base sm:text-lg font-serif-display font-bold text-white">
                    Deseja explorar todos os pratos e opções?
                  </h3>
                  <p className="text-xs text-[#DDD5CE]/70 mt-0.5">
                    Aceda ao nosso Cardápio completo com carnes, mariscos, espetadas e opção em PDF.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('cardapio')}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C98A4B] hover:bg-[#B37537] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
                >
                  <span>Abrir Cardápio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* O Restaurante (Espaço, Praia, Sala Climatizada) */}
            <AboutSection />

            {/* Galeria Real do Batuk */}
            <GallerySection />

            {/* Dedicated Location & Google Maps Section */}
            <LocationSection whatsAppPhone={whatsAppPhone} />

            {/* Avaliações Reais no Google (100% PT) */}
            <ReviewsSection />

            {/* Conversão Final */}
            <CtaSection
              onOpenOrder={() => setIsCartOpen(true)}
              whatsAppPhone={whatsAppPhone}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenOrder={() => setIsCartOpen(true)}
        whatsAppPhone={whatsAppPhone}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsAppPhone={whatsAppPhone}
      />

      {/* Dish Details Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
        whatsAppPhone={whatsAppPhone}
      />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        whatsAppPhone={whatsAppPhone}
      />

      {/* Mobile-First Bottom Navigation Bar & Sticky Order Drawer */}
      <MobileBottomBar
        cart={cart}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        whatsAppPhone={whatsAppPhone}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId as any)}
      />

      {/* Settings Modal to customize WhatsApp number */}
      <WhatsAppSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentPhone={whatsAppPhone}
        onSavePhone={(newPhone) => setWhatsAppPhone(newPhone)}
      />
    </div>
  );
}
