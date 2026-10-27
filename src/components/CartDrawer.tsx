import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, Copy, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, OrderDetails, buildCartWhatsAppUrl, formatKwanzas } from '../utils/whatsapp';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  whatsAppPhone: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsAppPhone,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine-in'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  const orderDetails: OrderDetails = {
    customerName,
    orderType,
    deliveryAddress,
    notes,
  };

  const whatsAppUrl = buildCartWhatsAppUrl(cart, whatsAppPhone, orderDetails);

  const handleCopyMessage = () => {
    try {
      const urlObj = new URL(whatsAppUrl);
      const text = urlObj.searchParams.get('text') || '';
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#191614] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header (Safe top padding) */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+1rem)]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C98A4B]/20 text-[#C98A4B] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif-display font-medium text-white">
                  O Teu Pedido BATUK
                </h3>
                <p className="text-xs text-[#DDD5CE]/60">
                  {cart.length === 0
                    ? 'A tua sacola está vazia'
                    : `${cart.length} ${cart.length === 1 ? 'prato selecionado' : 'pratos diferentes'}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar sacola"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-medium text-white mb-1">Ainda não escolheste pratos</h4>
                <p className="text-xs text-[#DDD5CE]/60 max-w-xs mx-auto mb-6">
                  Navega pelo menu do BATUK e adiciona as tuas opções de peixe fresco, carnes na brasa ou espetadas.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl bg-[#C98A4B] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  <span>Explorar Pratos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#DDD5CE]/60 uppercase tracking-wider">
                    <span>Itens Selecionados</span>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-red-400 hover:text-red-300 font-normal normal-case py-1"
                    >
                      Esvaziar tudo
                    </button>
                  </div>

                  {cart.map((c) => (
                    <div
                      key={c.item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <img
                        src={c.item.image}
                        alt={c.item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs sm:text-sm font-medium text-white truncate">{c.item.name}</h5>
                        <div className="text-xs text-[#C98A4B] font-mono tabular-nums mt-0.5">
                          {formatKwanzas(c.item.price * c.quantity)}
                        </div>
                      </div>

                      {/* Stepper (Min touch size 40px) */}
                      <div className="flex items-center gap-1 bg-black/50 rounded-xl p-1 border border-white/10 shrink-0">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(c.item.id, -1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white">
                          {c.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(c.item.id, 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(c.item.id)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors shrink-0"
                        title="Remover prato"
                        aria-label="Remover prato"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Options */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#C98A4B]">
                    Detalhes para a Cozinha & Entrega
                  </h4>

                  {/* Delivery mode */}
                  <div>
                    <label className="text-xs text-[#DDD5CE]/70 block mb-1.5">
                      Modalidade do Pedido
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`min-h-[44px] py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                          orderType === 'delivery'
                            ? 'bg-[#C98A4B]/20 border-[#C98A4B] text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        Entrega
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('takeaway')}
                        className={`min-h-[44px] py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                          orderType === 'takeaway'
                            ? 'bg-[#C98A4B]/20 border-[#C98A4B] text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        Takeaway
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('dine-in')}
                        className={`min-h-[44px] py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                          orderType === 'dine-in'
                            ? 'bg-[#C98A4B]/20 border-[#C98A4B] text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        Na Esplanada
                      </button>
                    </div>
                  </div>

                  {/* Customer name */}
                  <div>
                    <label className="text-xs text-[#DDD5CE]/70 block mb-1">
                      O teu nome
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C98A4B]"
                    />
                  </div>

                  {/* Address or Table */}
                  <div>
                    <label className="text-xs text-[#DDD5CE]/70 block mb-1">
                      {orderType === 'delivery'
                        ? 'Endereço de entrega no Lobito / Ponto de referência'
                        : orderType === 'takeaway'
                        ? 'Hora prevista para recolha no restaurante'
                        : 'Número da mesa ou preferência na esplanada'}
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={
                        orderType === 'delivery'
                          ? 'Ex: Bairro da Caponte, Rua 4, Casa 18'
                          : orderType === 'takeaway'
                          ? 'Ex: Vou levantar às 13h30'
                          : 'Ex: Mesa perto da areia'
                      }
                      className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C98A4B]"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs text-[#DDD5CE]/70 block mb-1">
                      Observações especiais (ponto da carne, sem jindungo, etc.)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Picanha mal passada, molho à parte..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C98A4B] resize-none"
                    />
                  </div>
                </div>

                {/* Notice */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#DDD5CE]/70 space-y-1">
                  <p className="font-semibold text-white">Atendimento WhatsApp do BATUK:</p>
                  <p>
                    O botão abaixo abre o WhatsApp com a mensagem formatada. A gerência confirma a ordem e partilha as coordenadas de pagamento.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer with Total & Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-white/10 bg-[#141210] space-y-3 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#DDD5CE]/60 uppercase tracking-wider block">
                    Total Estimado
                  </span>
                  <span className="text-[10px] text-[#DDD5CE]/40">
                    (Valores em Kwanzas)
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#F5EFEB] tabular-nums">
                  {formatKwanzas(total)}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="col-span-1 flex items-center justify-center gap-1 min-h-[48px] py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  title="Copiar texto do pedido"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span className="text-[11px] font-medium">{copied ? 'Copiado' : 'Copiar'}</span>
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-3 flex items-center justify-center gap-2 min-h-[48px] py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#25D366]/25 transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="truncate">Enviar Pedido no WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
