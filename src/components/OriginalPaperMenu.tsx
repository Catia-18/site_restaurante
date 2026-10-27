import React, { useState } from 'react';
import { MICA_MENU_SHEETS, MicaMenuSheet, RESTAURANT_INFO, MenuItem } from '../data/restaurantData';
import { Plus, MessageCircle, Printer, Download, Eye, FileText, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';
import { formatKwanzas } from '../utils/whatsapp';

interface OriginalPaperMenuProps {
  items?: MenuItem[];
  onAddToCart?: (item: MenuItem) => void;
  onSelectDish?: (item: MenuItem) => void;
  whatsAppPhone: string;
}

export const OriginalPaperMenu: React.FC<OriginalPaperMenuProps> = ({
  items,
  onAddToCart,
  onSelectDish,
  whatsAppPhone,
}) => {
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);
  const [viewAllSheets, setViewAllSheets] = useState(false);
  const [printed, setPrinted] = useState(false);

  const currentSheet = MICA_MENU_SHEETS[selectedSheetIndex];

  const handlePrint = () => {
    setPrinted(true);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleQuickAdd = (sheetItem: { name: string; price: string }) => {
    if (!onAddToCart) return;
    // Extract numerical price
    const num = parseInt(sheetItem.price.replace(/\D/g, ''), 10) || 5000;
    const tempItem: MenuItem = {
      id: `paper-${sheetItem.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: sheetItem.name,
      shortDesc: sheetItem.name,
      fullDesc: `${sheetItem.name} — Selecionado da Carta Oficial de Papel / Capa Mica`,
      price: num,
      formattedPrice: sheetItem.price,
      priceStatus: 'fatura_confirmada',
      category: 'carnes_grelhadas',
      categoryLabel: 'Carta Oficial',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_17.29.08_28813561.jpeg',
      prepTime: '20 min',
      serves: '1 pessoa',
    };
    onAddToCart(tempItem);
  };

  const renderSingleSheet = (sheet: MicaMenuSheet, isMulti: boolean = false) => {
    return (
      <div
        key={sheet.id}
        className={`relative bg-[#F4EDE2] text-[#1A120B] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D8C7B4] overflow-hidden ${
          isMulti ? 'mb-10' : ''
        }`}
        style={{
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(180, 150, 120, 0.3)',
        }}
      >
        {/* Paper Texture Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(#261D15 0.75px, transparent 0.75px)`,
            backgroundSize: '18px 18px',
          }}
        />

        {/* Vintage Turquoise Binder Clip Graphic (matching user photograph with turquoise clip) */}
        <div className="flex flex-col items-center mb-6 relative z-10">
          <div className="w-14 sm:w-16 h-3.5 sm:h-4 bg-[#1B7085] rounded-t-sm shadow-md flex items-center justify-center border-t border-l border-r border-[#309DB7]">
            <div className="w-8 h-1 bg-[#47BFDD] rounded-full opacity-80" />
          </div>
          <div className="w-20 sm:w-24 h-6 sm:h-7 border-2 border-[#155A6B] rounded-b-md bg-[#1B7085] shadow-inner flex items-center justify-center relative">
            <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-[0.25em] uppercase text-white drop-shadow">
              BATUK
            </span>
            <div className="absolute -bottom-2 w-8 h-3 border-b-2 border-x-2 border-[#155A6B] rounded-b-sm bg-transparent" />
          </div>
        </div>

        {/* Header exact like the physical menu sheet */}
        <div className="text-center pb-5 border-b-2 border-[#2C2117]/30 mb-8 relative z-10">
          <h3 className="text-3xl sm:text-5xl font-serif-display font-black tracking-widest lowercase text-[#1A120B]">
            batuk
          </h3>
          <span className="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase text-[#3D2C20] font-bold block mt-1">
            RESTAURANTE & BAR · PRAIA DO LOBITO
          </span>
          <div className="inline-block mt-3 px-3 py-1 rounded-full bg-[#1A120B]/10 text-xs font-mono font-bold text-[#1A120B] uppercase tracking-wider">
            {sheet.title}
          </div>
          <p className="text-[11px] font-mono text-[#5A4537] mt-1.5 font-medium">
            {sheet.subtitle} · Valores Oficiais em AKZ
          </p>
        </div>

        {/* Items Grid with ultra-visible, high-contrast, large typography */}
        <div className="space-y-4 relative z-10">
          {sheet.items.map((item, idx) => {
            const singleMsg = encodeURIComponent(
              `Olá Restaurante BATUK! Gostaria de pedir: *${item.name}* (${item.price}) da Carta Oficial.`
            );
            const waUrl = `https://wa.me/${whatsAppPhone}?text=${singleMsg}`;

            return (
              <div
                key={idx}
                className="group py-3 border-b border-[#2C2117]/15 hover:bg-[#1A120B]/[0.03] transition-colors rounded-xl px-2 sm:px-3"
              >
                {/* Line 1: Name and Price with dotted leader */}
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-base sm:text-xl font-serif-display font-bold text-[#1A120B] group-hover:text-[#9A4E00] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </div>

                  {/* High contrast dotted leader */}
                  <div className="hidden sm:block flex-1 border-b-2 border-dotted border-[#2C2117]/40 mx-3 self-center translate-y-1" />

                  {/* Price in ultra bold tabular font */}
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-xl font-mono font-black text-[#1A120B] tabular-nums tracking-tight">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Line 2: Description and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1.5">
                  <p className="text-xs sm:text-sm text-[#3E3127] font-normal leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 mt-1 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      className="flex items-center gap-1 min-h-[38px] px-3 py-1.5 rounded-lg bg-[#1A120B]/10 hover:bg-[#1A120B]/20 active:scale-95 text-[#1A120B] text-xs font-bold transition-all"
                      title="Adicionar à sacola de pedidos"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#9A4E00]" />
                      <span>Adicionar</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 min-h-[38px] px-3 py-1.5 rounded-lg bg-[#1F8B4C] hover:bg-[#186E3C] active:scale-95 text-white text-xs font-bold transition-all"
                      title="Pedir direto no WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>

                {item.note && (
                  <div className="text-[11px] font-mono font-semibold text-[#1F8B4C] mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#1F8B4C] shrink-0" />
                    <span>{item.note}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer of the physical sheet */}
        <div className="mt-8 pt-5 border-t-2 border-[#2C2117]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A4537] relative z-10">
          <div className="font-serif-display italic font-medium text-center sm:text-left">
            {sheet.footerNote || '"Obrigado pela preferência no Restaurante Batuk."'}
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#1A120B] font-bold">
            <span>Página {sheet.pageNumber} de {MICA_MENU_SHEETS.length}</span>
            <span className="text-[#9A4E00]">·</span>
            <span>Tel: {RESTAURANT_INFO.displayPhone}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Top Controls: Folhas Navigation & PDF Print Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#1F1B18] border border-white/10 p-4 sm:p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C98A4B] uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Carta Oficial em Papel · Capa de Mica Original</span>
          </div>
          <h3 className="text-base sm:text-xl font-serif-display font-bold text-white">
            Menus Originais Fotografados no Restaurante
          </h3>
          <p className="text-xs text-[#DDD5CE]/70">
            Todas as folhas da capa transparente refeitas em tipografia nítida e de fácil leitura.
          </p>
        </div>

        {/* Action buttons: Print / Download PDF & View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setViewAllSheets(!viewAllSheets)}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold border transition-all ${
              viewAllSheets
                ? 'bg-[#C98A4B] text-white border-[#C98A4B]'
                : 'bg-white/5 text-[#DDD5CE] border-white/15 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{viewAllSheets ? 'Ver Folha a Folha' : 'Ver Todas as Folhas'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold border border-white/20 transition-all shadow-md"
            title="Imprimir ou Salvar em PDF"
          >
            <Printer className="w-4 h-4 text-[#C98A4B]" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Sheet Tabs Bar (Selector for the 6 Sheets) */}
      {!viewAllSheets && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {MICA_MENU_SHEETS.map((sheet, index) => (
            <button
              key={sheet.id}
              type="button"
              onClick={() => setSelectedSheetIndex(index)}
              className={`min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-serif-display font-bold rounded-xl border transition-all shrink-0 whitespace-nowrap flex items-center gap-2 ${
                selectedSheetIndex === index
                  ? 'bg-[#C98A4B] text-white border-[#C98A4B] shadow-lg shadow-[#C98A4B]/20 scale-102'
                  : 'bg-[#1C1815] text-[#DDD5CE] border-white/10 hover:bg-white/5'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-mono">
                {sheet.pageNumber}
              </span>
              <span>{sheet.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Paper Menu Replica Rendering */}
      <div className="max-w-4xl mx-auto">
        {viewAllSheets ? (
          <div>
            {MICA_MENU_SHEETS.map((sheet) => renderSingleSheet(sheet, true))}
          </div>
        ) : (
          <div>
            {renderSingleSheet(currentSheet)}

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedSheetIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedSheetIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-[#DDD5CE] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Folha Anterior</span>
              </button>

              <span className="text-xs font-mono text-[#DDD5CE]/70">
                Folha {selectedSheetIndex + 1} de {MICA_MENU_SHEETS.length}
              </span>

              <button
                type="button"
                onClick={() => setSelectedSheetIndex((prev) => Math.min(MICA_MENU_SHEETS.length - 1, prev + 1))}
                disabled={selectedSheetIndex === MICA_MENU_SHEETS.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#C98A4B] text-white text-xs font-bold hover:bg-[#B37537] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md"
              >
                <span>Próxima Folha</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
