import { motion } from 'motion/react';
import { Calendar, Heart } from 'lucide-react';

export default function ImportantInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto py-4" id="informacoes">
      {/* Policy 1: Pre-order & Signal */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-brand-pink/25 card-border rounded-[2.5rem] p-6 sm:p-8 text-center md:text-left flex flex-col md:flex-row items-center gap-5 soft-shadow hover-soft-shadow relative overflow-hidden"
      >
        <div className="absolute inset-1.5 border border-brand-pink-accent/30 rounded-[2rem] pointer-events-none" />
        <div className="bg-white p-4 rounded-2xl text-brand-pink-dark border border-brand-pink-accent/40 shadow-xs shrink-0 flex items-center justify-center">
          <Calendar size={28} className="animate-pulse" />
        </div>
        <div className="space-y-1 relative z-10">
          <h4 className="font-serif text-lg font-bold text-brand-brown">
            Sinal de Confirmação
          </h4>
          <p className="text-sm font-sans text-brand-brown-light leading-relaxed">
            As encomendas são feitas com antecedência mediante o pagamento de um sinal correspondente a <strong className="text-brand-pink-deep font-semibold">50% do valor total</strong> do pedido.
          </p>
        </div>
      </motion.div>

      {/* Policy 2: Dividable Hundreds */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-brand-cream-dark/40 card-border rounded-[2.5rem] p-6 sm:p-8 text-center md:text-left flex flex-col md:flex-row items-center gap-5 soft-shadow hover-soft-shadow relative overflow-hidden"
      >
        <div className="absolute inset-1.5 border border-brand-pink-accent/30 rounded-[2rem] pointer-events-none" />
        <div className="bg-white p-4 rounded-2xl text-brand-pink-dark border border-brand-pink-accent/40 shadow-xs shrink-0 flex items-center justify-center">
          <Heart size={28} className="fill-brand-pink-dark stroke-brand-pink-dark" />
        </div>
        <div className="space-y-1 relative z-10">
          <h4 className="font-serif text-lg font-bold text-brand-brown">
            Sabores Combinados
          </h4>
          <p className="text-sm font-sans text-brand-brown-light leading-relaxed">
            Cada cento comprado <strong className="text-brand-pink-deep font-semibold">pode ser dividido em até 2 sabores</strong> diferentes da mesma categoria de doces. É opcional!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
