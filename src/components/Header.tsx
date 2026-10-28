import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Settings, MessageCircle, MapPin, FileText, Star, UtensilsCrossed, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSettings: () => void;
  currentPhone: string;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSettings,
  currentPhone,
  activeTab = 'todos',
  onSelectTab,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanPhone = sanitizePhoneNumber(currentPhone);

  const navItems = [
    { id: 'todos', label: 'Visão Geral', icon: Compass },
    { id: 'restaurante', label: 'O Restaurante', icon: MapPin },
    { id: 'cardapio', label: 'Cardápio', icon: UtensilsCrossed },
    { id: 'localizacao', label: 'Localização', icon: MapPin },
    { id: 'avaliacoes', label: 'Avaliações', icon: Star },
  ];

  const handleNavClick = (tabId: string) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#12100E]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-[#12100E]/95 via-[#12100E]/75 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Zone 1: Brand Wordmark & Location */}
            <button
              type="button"
              onClick={() => handleNavClick('todos')}
              className="group flex flex-col text-left shrink-0"
            >
              <div className="text-2xl sm:text-3xl font-serif-display tracking-widest text-[#F5EFEB] font-extrabold uppercase transition-opacity hover:opacity-90 flex items-center gap-1.5">
                <span className="text-[#C98A4B]">BATUK</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-mono text-[#DDD5CE]/70 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#C98A4B]" />
                Praia do Lobito
              </span>
            </button>

            {/* Zone 2: Navigation Tabs (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#DDD5CE]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-[#C98A4B] text-white shadow-md'
                      : 'hover:text-white hover:bg-white/5 text-[#DDD5CE]/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: Primary Actions (Touch-friendly) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* WhatsApp direct call / message link */}
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs text-[#8bf7ad] hover:text-white bg-[#25D366]/15 hover:bg-[#25D366]/25 rounded-xl border border-[#25D366]/30 transition-colors"
                title="Conversar diretamente no WhatsApp do Batuk"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="font-mono">{RESTAURANT_INFO.displayPhone}</span>
              </a>

              {/* Settings button */}
              <button
                type="button"
                onClick={onOpenSettings}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#DDD5CE]/80 hover:text-white transition-colors"
                title="Configurar número WhatsApp"
                aria-label="Configurações WhatsApp"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Shopping Bag Button (Minimum 44px touch target) */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-[#F5EFEB] transition-all"
                aria-label={`Ver carrinho com ${cartCount} itens`}
              >
                <ShoppingBag className="w-5 h-5 text-[#C98A4B]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#C98A4B] text-white text-[11px] font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Order Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] text-xs uppercase tracking-wider font-semibold text-white bg-[#C98A4B] hover:bg-[#B37537] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-[#C98A4B]/20 whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Pedir no WhatsApp</span>
              </button>

              {/* Mobile Menu Hamburger (44px target) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 text-[#F5EFEB] border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Abrir menu de navegação"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Optimized for one-hand thumb use) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="fixed inset-y-0 right-0 w-full max-w-[320px] sm:max-w-xs bg-[#191614] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <span className="text-2xl font-serif-display font-bold tracking-widest text-[#F5EFEB]">
                    <span className="text-[#C98A4B]">BATUK</span>
                  </span>
                  <div className="text-[11px] text-[#DDD5CE]/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C98A4B]" />
                    <span>Praia do Lobito, Angola</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-white/70 hover:text-white hover:bg-white/10"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Nav Links matching organized tabs */}
              <div className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between text-base font-semibold py-3 px-3.5 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#C98A4B] text-white shadow-md'
                        : 'text-[#DDD5CE] hover:text-[#C98A4B] hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-60">→</span>
                  </button>
                ))}
              </div>

              {/* Direct Call / Contact Box */}
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-[#DDD5CE]/70 mb-1 font-medium">Atendimento Oficial WhatsApp</div>
                <div className="text-sm font-bold font-mono text-white mb-2">{RESTAURANT_INFO.displayPhone}</div>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#8bf7ad] hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Iniciar conversa agora</span>
                </a>
              </div>
            </div>

            {/* Bottom Actions inside Mobile Drawer */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#C98A4B] text-white font-semibold text-sm uppercase tracking-wider shadow-lg shadow-[#C98A4B]/20 min-h-[48px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ver Pedido ({cartCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 text-white/80 hover:text-white text-xs border border-white/10 min-h-[44px]"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Alterar Número de Teste</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
