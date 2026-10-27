import React from 'react';
import { Home, UtensilsCrossed, FileText, MapPin, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { formatKwanzas, sanitizePhoneNumber } from '../utils/whatsapp';
import { CartItem } from '../utils/whatsapp';

interface MobileBottomBarProps {
  cart: CartItem[];
  cartCount: number;
  onOpenCart: () => void;
  whatsAppPhone: string;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  cart,
  cartCount,
  onOpenCart,
  whatsAppPhone,
  activeTab = 'todos',
  onSelectTab,
}) => {
  const cleanPhone = sanitizePhoneNumber(whatsAppPhone);
  const total = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-auto">
      {/* If cart has items: Compact Sticky Order Strip */}
      {cartCount > 0 ? (
        <div className="bg-[#191614]/95 backdrop-blur-md border-t border-white/15 px-4 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+0.6rem)] shadow-2xl">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 text-left"
            >
              <div className="relative w-10 h-10 rounded-xl bg-[#C98A4B]/20 text-[#C98A4B] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C98A4B] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div>
                <div className="text-[11px] text-[#DDD5CE]/70 leading-none">Total estimado</div>
                <div className="text-sm font-bold font-mono text-white tabular-nums leading-tight">
                  {formatKwanzas(total)}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#25D366]/25"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Concluir Pedido</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Cart: Thumb-Friendly Organized Navigation Dock */
        <nav
          className="bg-[#141210]/95 backdrop-blur-md border-t border-white/10 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.4rem)] shadow-2xl"
          aria-label="Navegação móvel"
        >
          <div className="grid grid-cols-5 gap-1 max-w-md mx-auto items-center">
            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('restaurante')}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                activeTab === 'restaurante' ? 'text-[#C98A4B]' : 'text-[#DDD5CE]/70 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">O Espaço</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('carta_pdf')}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                activeTab === 'carta_pdf' ? 'text-[#C98A4B]' : 'text-[#DDD5CE]/70 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">Carta PDF</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('menu_digital')}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                activeTab === 'menu_digital' ? 'text-[#C98A4B]' : 'text-[#DDD5CE]/70 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">Menu</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('localizacao')}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                activeTab === 'localizacao' ? 'text-[#C98A4B]' : 'text-[#DDD5CE]/70 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">Local</span>
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex flex-col items-center justify-center py-1 text-[#DDD5CE]/70 hover:text-[#C98A4B] active:text-[#C98A4B] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">Sacola</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};
