import React from 'react';
import { Flame, ShieldCheck, Waves, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 sm:py-24 bg-[#12100E] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C98A4B] font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-[#C98A4B]" />
              <span>Restaurante & Bar BATUK</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Praia do Lobito</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-display font-medium text-[#F5EFEB] leading-[1.15] mb-5 [text-wrap:balance]">
              Mais do que uma refeição. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C98A4B]">Um momento para saborear à beira-mar.</span>
            </h2>

            <div className="space-y-3.5 text-xs sm:text-base text-[#DDD5CE]/85 leading-relaxed font-light">
              <p>
                Localizado na prestigiada <strong className="font-semibold text-white">Avenida de Lisboa, na Praia do Lobito</strong>, o restaurante <strong className="font-semibold text-white">BATUK</strong> é o ponto de encontro perfeito entre o ar fresco do oceano e os aromas irresistíveis da nossa brasa a lenha.
              </p>
              <p>
                Com um passadiço de madeira que liga o restaurante diretamente ao areal, proporcionamos um ambiente acolhedor onde se saboreia o peixe fresco da costa — como a garoupa, o pargo e o polvo — preparado no ponto e servido com guarnições tradicionais.
              </p>
              <p>
                As nossas espetadas suspensas à mesa e os cortes de picanha nobre conquistaram clientes locais e viajantes de todo o mundo. Aqui, cada pedido é tratado com dedicação, hospitalidade genuína e rigor.
              </p>
            </div>

            {/* Pillars */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C98A4B]">
                  <Waves className="w-4 h-4" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Pé na Areia</h4>
                <p className="text-[11px] text-[#DDD5CE]/70">Passadiço de madeira com acesso direto à água.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C98A4B]">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Grelha a Lenha</h4>
                <p className="text-[11px] text-[#DDD5CE]/70">Picanha na brasa e espetadas suspensas de novilho.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C98A4B]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Montra do Mar</h4>
                <p className="text-[11px] text-[#DDD5CE]/70">Pescado fresco selecionado e pesado no momento.</p>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dining Room with Black Diners Celebrating */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-black/40 shadow-2xl">
              <img
                src="/assets/images/batuk_diners_indoor_black_1793036175984.jpg"
                alt="Clientes a saborear uma refeição no Restaurante Batuk"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/95 bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                <span className="text-[#C98A4B] font-bold block text-[10px] uppercase font-mono tracking-wider">
                  Ambiente BATUK
                </span>
                Sala Climatizada & Convivência
              </div>
            </div>

            {/* Column 2: Team Hospitality & Elegant Dining Room */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40 shadow-xl">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-26_at_17.29.09_246b9e13.jpeg"
                  alt="Colaborador do Batuk fardado em atendimento de excelência"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                  Hospitalidade & Serviço de Excelência
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40 shadow-xl">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-26_at_17.29.10_38f24b2d.jpeg"
                  alt="Sala interior com madeiras nobres e iluminação acolhedora"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                  Sala de Jantar & Decoração Acolhedora
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
