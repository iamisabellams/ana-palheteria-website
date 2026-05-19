import { motion } from 'motion/react';
import { MenuItem } from '../types';

interface SweetsCardProps {
  key?: string;
  item: MenuItem;
  onAddToOrder?: (item: MenuItem) => void;
}

export default function SweetsCard({ item, onAddToOrder }: SweetsCardProps) {
  const isEspecial = item.type === 'especiais';
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/65 backdrop-blur-xs card-border rounded-[2.5rem] overflow-hidden soft-shadow hover-soft-shadow transition-all duration-300 flex flex-col h-full relative"
      id={`card-${item.id}`}
    >
      {/* Decorative Top Line */}
      <div className={`h-1.5 w-full ${isEspecial ? 'bg-gradient-to-r from-brand-pink-dark to-brand-gold' : 'bg-brand-brown-light/40'}`} />

      {/* Image container with subtle gradient overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream/40">
        <img
          src={item.imageUrl}
          alt={`Deliciosos doces gourmet - ${item.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle Category Tag */}
        <span className="absolute top-4 left-4 bg-white/95 text-brand-brown font-serif text-xs px-3 py-1.5 rounded-full card-border shadow-xs font-semibold uppercase tracking-wider select-none">
          {item.category === 'brigadeiros' ? 'Brigadeiro' : 'Palha Italiana'}
        </span>
      </div>

      {/* Sweet Card Details */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
        <div>
          {/* Card Title & Style */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown tracking-tight">
              {item.name}
            </h3>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
              isEspecial 
                ? 'bg-brand-pink text-brand-pink-deep border border-brand-pink-accent/40' 
                : 'bg-brand-cream-dark text-brand-brown-light border border-brand-gold/40'
            }`}>
              {item.type}
            </span>
          </div>

          {/* Flavor Listing with custom sweet heart indicators */}
          <ul className="space-y-2.5 mb-6" id={`list-${item.id}`}>
            {item.flavors.map((flavor, index) => (
              <li 
                key={index} 
                className="flex items-center text-sm text-brand-brown-light font-sans group cursor-default"
              >
                <span className="text-brand-pink-dark text-xs mr-2 relative group-hover:scale-125 transition-transform">
                  ♥
                </span>
                <span className="group-hover:text-brand-brown transition-colors">
                  {flavor}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing tag & Interactive call to action */}
        <div className="pt-4 border-t border-brand-pink-accent/20 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-brand-brown-light uppercase tracking-wider font-semibold">Preço:</span>
            <div className="text-right">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-pink-deep">
                R$ {item.pricePerHundred.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs text-brand-brown-light block tracking-tight font-medium">o cento</span>
            </div>
          </div>

          {onAddToOrder && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddToOrder(item)}
              className="w-full mt-2 bg-brand-pink-dark hover:bg-brand-pink-deep text-white font-sans text-sm font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer soft-shadow hover:scale-[1.02] whitespace-nowrap"
              id={`btn-add-${item.id}`}
            >
              <span>+ Adicionar Encomenda</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
