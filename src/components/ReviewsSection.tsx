import React from 'react';
import { REAL_CUSTOMER_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, CheckCircle, MapPin, MessageSquareQuote, ThumbsUp, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-14 sm:py-20 bg-[#161311] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C98A4B] font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Avaliações Reais de Clientes · Google Maps</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#F5EFEB] leading-tight">
              A Opinião de Quem Visita o BATUK
            </h2>
            <p className="mt-2 text-xs sm:text-base text-[#DDD5CE]/80 font-light">
              Depoimentos autênticos registados oficialmente no perfil do Google Maps do Restaurante Batuk, na Praia do Lobito.
            </p>
          </div>

          {/* Rating Summary Card (from real screenshot) */}
          <div className="flex items-center gap-4 bg-[#1F1B18] border border-white/10 p-4 sm:p-5 rounded-2xl w-fit shrink-0 shadow-xl">
            <div className="text-4xl sm:text-5xl font-bold font-serif-display text-white">
              {RESTAURANT_INFO.googleRating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#f5c358] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs text-[#DDD5CE]/80 font-medium">
                Mais de <strong className="text-white font-bold">{RESTAURANT_INFO.googleReviewCount} avaliações</strong> no Google
              </div>
              <div className="text-[11px] text-[#25D366] font-mono mt-0.5">
                ● 100% Avaliações Verificadas
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REAL_CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between bg-[#1F1B18] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#C98A4B]/50 transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Author and rating header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {rev.author}
                    </h3>
                    <p className="text-[11px] text-[#DDD5CE]/60 font-mono">{rev.role} · {rev.date}</p>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#f5c358] shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Highlight quote */}
                <div className="mb-3 text-xs font-semibold text-[#E5A869] flex items-center gap-1.5 bg-[#C98A4B]/10 p-2 rounded-lg border border-[#C98A4B]/20">
                  <CheckCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>"{rev.highlight}"</span>
                </div>

                {/* Review body in authentic Portuguese */}
                <p className="text-xs sm:text-sm text-[#DDD5CE]/90 leading-relaxed font-normal">
                  "{rev.text}"
                </p>

                {/* Google review details pill if available */}
                {(rev.noiseLevel || rev.waitTime || rev.priceRange) && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-mono text-[#DDD5CE]/70">
                    {rev.noiseLevel && (
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        Ruído: {rev.noiseLevel}
                      </span>
                    )}
                    {rev.waitTime && (
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        Espera: {rev.waitTime}
                      </span>
                    )}
                    {rev.priceRange && (
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#68e097]">
                        Média: {rev.priceRange}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Source tag */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#DDD5CE]/50">
                <span className="flex items-center gap-1 text-[#C98A4B]">
                  <MapPin className="w-3 h-3 text-[#C98A4B]" />
                  Praia do Lobito
                </span>
                <span className="font-mono">{rev.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
