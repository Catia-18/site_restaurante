import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, MapPin, Clock, MessageCircle, Instagram, Facebook, ArrowUp, Star } from 'lucide-react';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface FooterProps {
  onOpenOrder: () => void;
  whatsAppPhone: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrder, whatsAppPhone }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = sanitizePhoneNumber(whatsAppPhone);

  return (
    <footer id="contactos" className="bg-[#0C0B0A] text-[#DDD5CE] border-t border-white/10 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4">
            <a href="#inicio" className="text-2xl font-serif-display font-bold tracking-widest text-white uppercase block mb-3">
              <span className="text-[#C98A4B]">BATUK</span>
            </a>
            <p className="text-xs sm:text-sm text-[#DDD5CE]/75 font-light leading-relaxed mb-4 max-w-sm">
              Cozinha autêntica de brasa e mar de frente para as águas da Praia do Lobito. Cortes nobres, peixe fresco da costa e a hospitalidade tradicional de Benguela.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#f5c358] mb-5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-white">4.1 no Google Maps</span>
              <span className="text-[#DDD5CE]/50">({RESTAURANT_INFO.googleReviewCount} avaliações)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#C98A4B] transition-colors"
                aria-label="Instagram BATUK"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#C98A4B] transition-colors"
                aria-label="Facebook BATUK"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] transition-colors"
                aria-label="WhatsApp oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contacts & Address */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C98A4B] mb-4">
              Morada & Contactos
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C98A4B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{RESTAURANT_INFO.address}</p>
                  <p className="text-[11px] text-[#DDD5CE]/60 mt-0.5">{RESTAURANT_INFO.locationDetails}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C98A4B] shrink-0" />
                <a
                  href={`tel:+${cleanPhone}`}
                  className="text-white hover:text-[#C98A4B] transition-colors font-mono font-medium"
                >
                  +{cleanPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8bf7ad] hover:underline font-mono"
                >
                  {RESTAURANT_INFO.displayPhone} (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Schedule */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C98A4B] mb-4">
              Horário de Abertura
            </h4>
            <div className="space-y-2 text-xs">
              {RESTAURANT_INFO.schedule.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#DDD5CE]/75">{item.days}</span>
                  <span className="text-white font-mono">{item.hours}</span>
                </div>
              ))}
              <p className="text-[11px] text-[#DDD5CE]/50 pt-2">
                Aberto para almoço, pôr do sol na praia e jantares de esplanada.
              </p>
            </div>
          </div>

          {/* Column 4: Shortcuts */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C98A4B] mb-4">
                Navegação
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#destaques" className="hover:text-white transition-colors">Destaques</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Menu Digital</a></li>
                <li><a href="#avaliacoes" className="hover:text-white transition-colors">Avaliações Google</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre o Batuk</a></li>
                <li><a href="#galeria" className="hover:text-white transition-colors">Galeria de Fotos</a></li>
              </ul>
            </div>

            <div className="mt-5 pt-3">
              <button
                type="button"
                onClick={onOpenOrder}
                className="w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-[#C98A4B] hover:bg-[#B37537] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md text-center"
              >
                Fazer Pedido
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DDD5CE]/70">
          <div className="text-center sm:text-left space-y-1">
            <p>© {new Date().getFullYear()} Restaurante BATUK · Praia do Lobito, Benguela, Angola.</p>
            <p className="text-[#C98A4B] font-medium tracking-wide">
              Todos os direitos reservados a Cátia Catumbela.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors py-1"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
