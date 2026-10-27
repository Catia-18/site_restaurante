import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/restaurantData';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedPhoto(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const prevPhoto = () => {
    const nextIdx = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(GALLERY_ITEMS[nextIdx]);
  };

  const nextPhoto = () => {
    const nextIdx = (currentIndex + 1) % GALLERY_ITEMS.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(GALLERY_ITEMS[nextIdx]);
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#171412] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C98A4B] font-semibold mb-2">
            <span>Fotografias Autênticas</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Praia do Lobito</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-medium text-[#F5EFEB] leading-tight mb-3 [text-wrap:balance]">
            Galeria do Restaurante BATUK.
          </h2>
          <p className="text-xs sm:text-base text-[#DDD5CE]/75 font-light">
            O ambiente à beira-mar, os pratos servidos nas tábuas rústicas, a montra de peixe fresco e as noites quentes no Lobito.
          </p>
        </div>

        {/* Gallery Grid (Mobile-First: 1 col on 320px, 2 col on sm, 3 col on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {GALLERY_ITEMS.map((item, idx) => {
            const isWide = idx === 0 || idx === 5;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(item, idx)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-black/40 border border-white/10 hover:border-[#C98A4B]/50 transition-all duration-300 aspect-[4/3] ${
                  isWide ? 'sm:col-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Overlay Details */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      {item.category}
                    </span>
                    <div className="min-w-[36px] min-h-[36px] rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    {item.tag && (
                      <span className="text-[9px] font-semibold tracking-wider uppercase text-[#C98A4B] block mb-1">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-serif-display font-medium text-[#F5EFEB] mb-0.5 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#DDD5CE]/75 line-clamp-1 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal with Mobile Safe Controls */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (Touch target >= 44px) */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-12 right-0 flex items-center justify-center min-w-[44px] min-h-[44px] text-white/80 hover:text-white transition-colors"
              aria-label="Fechar foto ampliada"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev / Next Buttons */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-colors z-20"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-colors z-20"
              aria-label="Foto seguinte"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Viewer */}
            <div className="w-full max-h-[70vh] sm:max-h-[75vh] overflow-hidden rounded-2xl border border-white/10 bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption */}
            <div className="mt-3 sm:mt-4 text-center px-4">
              <div className="text-[11px] font-mono text-[#C98A4B] uppercase tracking-wider mb-0.5">
                {selectedPhoto.category} {selectedPhoto.tag ? `· ${selectedPhoto.tag}` : ''}
              </div>
              <h3 className="text-base sm:text-xl font-serif-display text-white">{selectedPhoto.title}</h3>
              <p className="text-xs text-white/70 mt-1 max-w-lg mx-auto">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
