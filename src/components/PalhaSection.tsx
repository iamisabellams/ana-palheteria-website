import { motion } from 'motion/react';
import { MenuItem } from '../types';

interface PalhaSectionProps {
  especiais: MenuItem;
  tradicionais: MenuItem;
  onAddToOrder?: (item: MenuItem) => void;
}

export default function PalhaSection({ especiais, tradicionais, onAddToOrder }: PalhaSectionProps) {
  return (
    <div className="bg-white/65 backdrop-blur-xs card-border rounded-[2.5rem] p-6 sm:p-10 soft-shadow relative overflow-hidden" id="palha-italiana">
      {/* Delicate outer borders */}
      <div className="absolute inset-2 border border-brand-pink-accent/30 rounded-[2rem] pointer-events-none" />

      {/* Decorative top pink line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-pink-dark via-brand-gold to-brand-brown-light" />

      {/* Section Title */}
      <div className="text-center mb-10 relative">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown tracking-tight">
          Palha Italiana
        </h2>
        <span className="font-cursive text-xl text-brand-pink-dark/80 block -mt-1 mb-2">
          (tamanho festa)
        </span>
        <div className="flex justify-center items-center gap-2 select-none">
          <span className="w-12 h-[1px] bg-brand-pink-dark/30" />
          <span className="text-brand-pink-dark text-xs">♥</span>
          <span className="w-12 h-[1px] bg-brand-pink-dark/30" />
        </div>
      </div>

      {/* Grid Layout (3 segments on desktop, stacked on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        
        {/* Left Segment: Sabores Especiais */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full justify-between p-6 bg-brand-pink/25 rounded-[2rem] border border-brand-pink-accent/50 text-center lg:text-left"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown">
                Especiais
              </h3>
              <span className="text-[10px] sm:text-xs font-bold bg-[#E91E63]/10 text-brand-pink-deep px-3 py-1 rounded-full border border-brand-pink-accent/20 uppercase tracking-wider">
                Gourmet
              </span>
            </div>

            {/* List */}
            <ul className="space-y-3 mb-6 text-sm text-brand-brown-light font-sans inline-block lg:block text-left">
              {especiais.flavors.map((flavor, index) => (
                <li key={index} className="flex items-center gap-2.5 group cursor-default">
                  <span className="text-brand-pink-dark text-xs">♥</span>
                  <span className="group-hover:text-brand-brown transition-colors">
                    {flavor}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-brand-pink-accent/20">
            <div className="flex items-baseline justify-between mb-3 text-left">
              <span className="text-xs text-brand-brown-light uppercase font-semibold">Preço:</span>
              <div className="text-right">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-pink-deep">
                  R$ {especiais.pricePerHundred.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-brand-brown-light block font-medium">o cento</span>
              </div>
            </div>

            {onAddToOrder && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToOrder(especiais)}
                className="w-full bg-brand-pink-dark hover:bg-brand-pink-deep text-white font-sans text-xs font-bold py-3 px-5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer soft-shadow hover:scale-[1.02]"
                id="btn-add-palha-especial"
              >
                <span>+ Adicionar Especial</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Center Segment: Round Graphic Frame of Palhas */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative p-2 bg-gradient-to-tr from-brand-pink-dark to-[#D7CCC8] rounded-full max-w-[260px] sm:max-w-[280px] w-full shadow-md aspect-square flex items-center justify-center">
            <div className="absolute inset-1.5 bg-white rounded-full" />
            <div className="relative rounded-full overflow-hidden aspect-square w-full h-full border border-brand-brown/10 bg-brand-cream-dark">
              <img
                src={especiais.imageUrl}
                alt="Palha Italiana Artesanal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 select-none"
              />
            </div>
            {/* Soft decorative hearts floating slightly outside */}
            <span className="absolute -top-3 -right-3 text-brand-pink-dark text-xl animate-float filter drop-shadow-xs">💖</span>
            <span className="absolute -bottom-2 -left-3 text-brand-pink text-2xl animate-float filter drop-shadow-xs" style={{ animationDelay: '1.5s' }}>💝</span>
          </div>
        </div>

        {/* Right Segment: Sabores Tradicionais */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col h-full justify-between p-6 bg-[#FFF9F9] rounded-[2rem] border border-brand-pink-accent/50 text-center lg:text-left"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown">
                Tradicionais
              </h3>
              <span className="text-[10px] sm:text-xs font-bold bg-[#8D6E63]/10 text-brand-brown-light px-3 py-1 rounded-full border border-brand-brown/10 uppercase tracking-wider">
                Clássico
              </span>
            </div>

            {/* List */}
            <ul className="space-y-3 mb-6 text-sm text-brand-brown-light font-sans inline-block lg:block text-left">
              {tradicionais.flavors.map((flavor, index) => (
                <li key={index} className="flex items-center gap-2.5 group cursor-default">
                  <span className="text-brand-pink-dark text-xs">♥</span>
                  <span className="group-hover:text-brand-brown transition-colors">
                    {flavor}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-brand-pink-accent/20">
            <div className="flex items-baseline justify-between mb-3 text-left">
              <span className="text-xs text-brand-brown-light uppercase font-semibold">Preço:</span>
              <div className="text-right">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-pink-deep">
                  R$ {tradicionais.pricePerHundred.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-brand-brown-light block font-medium">o cento</span>
              </div>
            </div>

            {onAddToOrder && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToOrder(tradicionais)}
                className="w-full bg-brand-pink-dark hover:bg-brand-pink-deep text-white font-sans text-xs font-bold py-3 px-5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer soft-shadow hover:scale-[1.02]"
                id="btn-add-palha-tradicional"
              >
                <span>+ Adicionar Tradicional</span>
              </motion.button>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
