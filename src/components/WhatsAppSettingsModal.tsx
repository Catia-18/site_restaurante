import React, { useState } from 'react';
import { X, Check, Phone, Info } from 'lucide-react';
import { sanitizePhoneNumber } from '../utils/whatsapp';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface WhatsAppSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhone: string;
  onSavePhone: (newPhone: string) => void;
}

export const WhatsAppSettingsModal: React.FC<WhatsAppSettingsModalProps> = ({
  isOpen,
  onClose,
  currentPhone,
  onSavePhone,
}) => {
  const [phoneInput, setPhoneInput] = useState(currentPhone);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = sanitizePhoneNumber(phoneInput);
    if (cleaned.length >= 7) {
      onSavePhone(cleaned);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 700);
    }
  };

  const handleResetToDefault = () => {
    setPhoneInput(RESTAURANT_INFO.defaultPhone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#191614] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2 text-white">
            <Phone className="w-4 h-4 text-[#C98A4B]" />
            <h3 className="text-base font-serif-display font-medium">WhatsApp Oficial BATUK</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center min-w-[40px] min-h-[40px] rounded-lg text-white/50 hover:text-white"
            aria-label="Fechar configurações"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-xs text-[#DDD5CE]/75 leading-relaxed">
            Número padrão configurado para o atendimento do <strong className="text-white">BATUK (Lobito)</strong>: <span className="font-mono text-[#8bf7ad]">941 678 866</span>. Podes também testar com qualquer outro número de telemóvel.
          </p>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-[#DDD5CE]/70 font-medium">
                Número de WhatsApp
              </label>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-[11px] text-[#C98A4B] hover:underline"
              >
                Restaurar 941678866
              </button>
            </div>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Ex: 941678866 ou 244941678866"
              className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-black/50 border border-white/10 text-sm text-white font-mono placeholder-white/30 focus:outline-none focus:border-[#C98A4B]"
            />
            <span className="text-[11px] text-[#DDD5CE]/50 mt-1 block">
              Link de envio: https://wa.me/{sanitizePhoneNumber(phoneInput || '244941678866')}
            </span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-[#DDD5CE]/70">
            <Info className="w-4 h-4 text-[#C98A4B] shrink-0 mt-0.5" />
            <span>
              Todos os botões de pedido e o botão flutuante adaptar-se-ão automaticamente.
            </span>
          </div>

          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 rounded-xl bg-[#C98A4B] hover:bg-[#B37537] text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#C98A4B]/20"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Guardado!</span>
                </>
              ) : (
                <span>Guardar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
