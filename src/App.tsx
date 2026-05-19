import { useState } from 'react';
import { motion } from 'motion/react';
import { MenuItem, OrderItem } from './types';
import { MENU_ITEMS, ORDER_WHATSAPP_NUMBER, DISPLAY_PHONE } from './data';
import Logo from './components/Logo';
import SweetsCard from './components/SweetsCard';
import PalhaSection from './components/PalhaSection';
import OrderBuilder from './components/OrderBuilder';
import ImportantInfo from './components/ImportantInfo';
import { MessageCircle, Phone, Instagram, MapPin, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  // Find individual Palha Italiana entries
  const palhasEspeciais = MENU_ITEMS.find(
    item => item.category === 'palhas' && item.type === 'especiais'
  ) || MENU_ITEMS[2];

  const palhasTradicionais = MENU_ITEMS.find(
    item => item.category === 'palhas' && item.type === 'tradicionais'
  ) || MENU_ITEMS[3];

  // Store brigadeiros
  const brigadeiros = MENU_ITEMS.filter(item => item.category === 'brigadeiros');

  // Callback to add a hundred-pack (cento) to the builder basket
  const handleAddToOrder = (menuItem: MenuItem) => {
    // Generate a unique ID for this specific cento config so users can order multiples of the same category with different flavor selections!
    const newOrder: OrderItem = {
      id: `${menuItem.id}_${Date.now()}`,
      menuItemId: menuItem.id,
      name: menuItem.name + ' (' + (menuItem.category === 'brigadeiros' ? 'Brigadeiros' : 'Palhas') + ')',
      price: menuItem.pricePerHundred,
      flavor1: menuItem.flavors[0],
      flavor2: '', // Defaults to Apenas 1 Sabor (100%)
      quantity: 1
    };

    setOrders(prev => [...prev, newOrder]);

    // Smooth scroll down to the builder block so users see their confectionery selection added
    setTimeout(() => {
      const el = document.getElementById('encomenda-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Callback to update an order item configuration (flavor changes or quantities)
  const handleUpdateOrder = (updatedItem: OrderItem) => {
    setOrders(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  // Callback to delete an order item
  const handleRemoveOrder = (itemId: string) => {
    setOrders(prev => prev.filter(item => item.id !== itemId));
  };

  // Clear all selections
  const handleClearOrder = () => {
    setOrders([]);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-brand-brown relative overflow-x-hidden selection:bg-brand-pink-accent selection:text-brand-pink-deep">
      
      {/* Delicate vector ambient illustrations in the page background */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-cream-dark/20 pointer-events-none z-0" />
      <div className="absolute top-10 left-10 text-brand-pink-accent/40 text-4xl select-none animate-float">✿</div>
      <div className="absolute top-80 right-10 text-brand-pink-accent/20 text-5xl select-none animate-float" style={{ animationDelay: '2s' }}>★</div>
      <div className="absolute bottom-40 left-16 text-brand-pink-accent/30 text-4xl select-none animate-float" style={{ animationDelay: '3s' }}>♥</div>

      {/* Hero Header Area */}
      <header className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        {/* Dynamic Logo badge */}
        <Logo />

        {/* Brand Slogan */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-lg sm:text-2xl italic text-brand-brown-light tracking-wide mt-6 max-w-lg"
        >
          “Doces artesanais feitos com carinho”
        </motion.p>

        {/* Decorative divider line */}
        <div className="w-24 h-0.5 bg-brand-pink-accent my-6 flex justify-center items-center relative select-none">
          <Heart size={10} className="text-brand-pink-dark absolute bg-[#FFF9F6] px-0.5" />
        </div>

        {/* Main CTA: Fazer Encomenda */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={`https://wa.me/${ORDER_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-brand-pink-dark hover:bg-brand-pink-deep text-white font-sans font-bold text-base sm:text-lg rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            id="hero-cta-direct-whatsapp"
          >
            <MessageCircle size={22} className="fill-white group-hover:scale-110 transition-transform" />
            <span>Fazer Encomenda</span>
          </a>

          <a 
            href="#encomenda-form"
            className="text-xs sm:text-sm font-sans font-semibold text-brand-brown-light hover:text-brand-pink-dark hover:underline transition-colors py-2 px-3"
          >
            Configurar Meus Sabores 🍰
          </a>
        </motion.div>
      </header>

      {/* Main Content Sections - Bento Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 pb-24 relative z-10 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Premium Sweet Showcase (Span 8) */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            
            {/* Brigadeiros Showcase Card-Block */}
            <section id="category-brigadeiros" className="space-y-8 bg-white/40 card-border rounded-[2.5rem] p-6 sm:p-10 soft-shadow">
              <div className="text-center md:text-left md:pl-4">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown tracking-tight">
                  Nossos Brigadeiros
                </h2>
                <p className="font-cursive text-xl text-brand-pink-dark/80 block mt-1">
                  gourmet feitos com ingredientes selecionados
                </p>
                <div className="flex justify-center md:justify-start items-center gap-2 mt-2 select-none">
                  <span className="w-12 h-[1px] bg-brand-pink-dark/30" />
                  <span className="text-brand-pink-dark text-xs">♥</span>
                  <span className="w-12 h-[1px] bg-brand-pink-dark/30" />
                </div>
              </div>

              {/* Cards Grid inside bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {brigadeiros.map(item => (
                  <SweetsCard 
                    key={item.id} 
                    item={item} 
                    onAddToOrder={handleAddToOrder} 
                  />
                ))}
              </div>
            </section>

            {/* Palha Italiana Section Container */}
            <section id="category-palhas">
              <PalhaSection 
                especiais={palhasEspeciais} 
                tradicionais={palhasTradicionais} 
                onAddToOrder={handleAddToOrder}
              />
            </section>

          </div>

          {/* Right Column: Interactive Basket Hub (Span 4) - Sticky on Desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-8">
            
            {/* Interactive Order Selection & Message Builder */}
            <section className="scroll-mt-20">
              <div className="bg-brand-pink/20 rounded-[2.5rem] p-4 mb-4 text-center">
                <span className="text-xs uppercase tracking-widest font-extrabold text-brand-pink-deep bg-white px-3.5 py-1.5 rounded-full shadow-2xs card-border">
                  ✨ Seu Pedido Ideal
                </span>
                <p className="text-[11px] text-brand-brown-light font-medium mt-3 leading-relaxed px-2">
                  Combine livremente sabores de brigadeiros e palhas nos centos escolhidos!
                </p>
              </div>

              <OrderBuilder 
                orders={orders}
                menuItems={MENU_ITEMS}
                onUpdateOrder={handleUpdateOrder}
                onRemoveOrder={handleRemoveOrder}
                onClearOrder={handleClearOrder}
              />
            </section>

            {/* Policies Box Information Area */}
            <section id="confectionery-policies">
              <ImportantInfo />
            </section>

          </div>

        </div>
      </main>

      {/* Footer Area with contact items */}
      <footer className="bg-brand-brown text-brand-cream border-t border-brand-pink-accent/20 py-12 relative z-10" id="contato">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
          
          {/* Sweet title brand inside footer */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold tracking-wider">Ana Palha</span>
            <span className="font-cursive text-xl text-brand-pink-accent -mt-1">Doceria Artesanal</span>
          </div>

          {/* Details & Contacts */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm text-brand-cream/80 font-sans justify-center items-center">
            <a 
              href={`https://wa.me/${ORDER_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={16} />
              <span>{DISPLAY_PHONE}</span>
            </a>
            
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Resende, RJ (Atendimento sob encomenda)</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 pt-2">
            <a 
              href={`https://wa.me/${ORDER_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-brand-pink-dark/20 hover:bg-brand-pink-dark rounded-full transition-all duration-300 transform hover:scale-115 text-brand-pink"
              title="Conversar no WhatsApp"
            >
              <MessageCircle size={18} className="fill-current" />
            </a>
          </div>

          {/* Decorative Divider */}
          <span className="text-brand-pink-accent/20 text-xs">♥ ♥ ♥</span>

          <p className="text-[11px] text-brand-cream-dark/60 font-sans tracking-wide">
            © {new Date().getFullYear()} Ana Palha Doceria Artesanal • Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* 5. Floating Action Button: fixed in the bottom right corner */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 select-none hidden sm:block"
      >
        <a
          href={`https://wa.me/${ORDER_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          title="Fazer Encomenda no WhatsApp"
          id="floating-whatsapp-trigger"
        >
          <MessageCircle size={24} className="fill-white" />
          <span className="font-sans text-sm font-bold pr-1">Fazer Encomenda</span>
        </a>
      </motion.div>

      {/* Floating icon button for small screens */}
      <div className="fixed bottom-5 right-5 z-55 sm:hidden select-none">
        <a
          href={`https://wa.me/${ORDER_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-[#25D366] text-white p-3.5 rounded-full shadow-lg"
          title="Falar no WhatsApp"
        >
          <MessageCircle size={24} className="fill-white" />
        </a>
      </div>

    </div>
  );
}
