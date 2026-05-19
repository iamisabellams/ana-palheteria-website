import { motion, AnimatePresence } from 'motion/react';
import { OrderItem, MenuItem } from '../types';
import { ORDER_WHATSAPP_NUMBER, DISPLAY_PHONE } from '../data';
import { Trash2, ShoppingBag, MessageCircle, AlertCircle } from 'lucide-react';

interface OrderBuilderProps {
  orders: OrderItem[];
  menuItems: MenuItem[];
  onUpdateOrder: (updated: OrderItem) => void;
  onRemoveOrder: (id: string) => void;
  onClearOrder: () => void;
}

export default function OrderBuilder({
  orders,
  menuItems,
  onUpdateOrder,
  onRemoveOrder,
  onClearOrder,
}: OrderBuilderProps) {
  // Compute prices
  const totalAmount = orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const depositAmount = totalAmount * 0.50;
  const totalCentos = orders.reduce((sum, item) => sum + item.quantity, 0);

  // Get flavors for a specific menu item ID
  const getFlavorsForMenuItem = (menuItemId: string): string[] => {
    const item = menuItems.find(m => m.id === menuItemId);
    return item ? item.flavors : [];
  };

  // Build the whatsapp message
  const handleCheckout = () => {
    if (orders.length === 0) return;

    let text = `Olá Ana Palha Doceria Artesanal! Gostaria de fazer uma encomenda:\n\n*📋 DETALHES DO PEDIDO:*\n`;

    orders.forEach((item, index) => {
      const isDivided = item.flavor2 && item.flavor2 !== '' && item.flavor2 !== item.flavor1;
      text += `\n*${index + 1}) ${item.quantity}x Cento de ${item.name}*\n`;
      if (isDivided) {
        text += `   • Sabor 1: 50% ${item.flavor1}\n`;
        text += `   • Sabor 2: 50% ${item.flavor2}\n`;
      } else {
        text += `   • Sabor: 100% ${item.flavor1}\n`;
      }
      text += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    text += `\n*🌟 TOTALIZAÇÃO:*\n`;
    text += `• Total de doces: ${totalCentos * 100} unidades (${totalCentos} ${totalCentos === 1 ? 'cento' : 'centos'})\n`;
    text += `• *Valor Total:* R$ ${totalAmount.toFixed(2).replace('.', ',')}\n`;
    text += `• *Sinal de 50% para confirmação:* R$ ${depositAmount.toFixed(2).replace('.', ',')}\n\n`;
    text += `_Encomenda feita através do catálogo online. Aguardo sua confirmação dos dados de entrega e forma de pagamento!_ ​​❤️`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white/65 backdrop-blur-xs card-border rounded-[2.5rem] p-6 sm:p-8 soft-shadow relative" id="encomenda-form">
      {/* Delicate inner border */}
      <div className="absolute inset-1.5 border border-brand-pink-accent/25 rounded-[2rem] pointer-events-none" />

      {/* Header of building assistant */}
      <div className="relative flex items-center justify-between mb-6 pb-4 border-b border-brand-pink-accent/20">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink p-3 rounded-full text-brand-pink-deep">
            <ShoppingBag size={22} className="animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown">
              Sua Cesta
            </h3>
            <p className="text-xs text-brand-brown-light font-medium">Monte seus centos artesanais</p>
          </div>
        </div>

        {orders.length > 0 && (
          <button
            onClick={onClearOrder}
            className="text-xs text-brand-pink-dark hover:text-brand-pink-deep transition-colors flex items-center gap-1 font-semibold hover:underline cursor-pointer"
          >
            Limpar tudo
          </button>
        )}
      </div>

      <div className="relative">
        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            /* Empty Basket Display */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10 px-4 flex flex-col items-center"
            >
              <div className="text-brand-pink-accent/80 text-5xl mb-4 select-none">💝</div>
              <p className="font-serif text-lg font-semibold text-brand-brown mb-2">
                Sua cesta está vazia
              </p>
              <p className="text-sm text-brand-brown-light max-w-sm leading-relaxed mb-6">
                Clique em <strong className="text-brand-pink-dark font-semibold">"+ Adicionar Encomenda"</strong> nos cards de doces acima para adicionar centos e escolher seus sabores prediletos.
              </p>
            </motion.div>
          ) : (
            /* Selected Centos configurations */
            <div className="space-y-6">
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {orders.map((item) => {
                  const availableFlavors = getFlavorsForMenuItem(item.menuItemId);
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 sm:p-5 bg-white/90 card-border rounded-2xl relative group"
                    >
                      {/* Delete button positioned nicely */}
                      <button
                        onClick={() => onRemoveOrder(item.id)}
                        className="absolute top-4 right-4 text-brand-brown-light/40 hover:text-brand-pink-deep transition-colors p-1.5 hover:bg-brand-pink rounded-lg cursor-pointer"
                        title="Remover cento"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="pr-8">
                        {/* Cento identifier */}
                        <h4 className="font-serif text-base font-bold text-brand-brown">
                          Cento de {item.name}
                        </h4>
                        <p className="text-xs text-brand-pink-dark font-bold mb-3">
                          R$ {item.price.toFixed(2).replace('.', ',')} cada
                        </p>

                        {/* Flavor Selector Dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          {/* Flavor Selector 1 */}
                          <div>
                            <label className="block text-[10px] font-bold text-brand-brown-light uppercase tracking-wide mb-1">
                              Sabor Principal (50% ou 100%):
                            </label>
                            <select
                              value={item.flavor1}
                              onChange={(e) => onUpdateOrder({ ...item, flavor1: e.target.value })}
                              className="w-full bg-brand-cream/50 border border-brand-pink-accent/60 rounded-xl p-2.5 text-xs text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-pink-dark focus:border-brand-pink-dark bg-none font-medium cursor-pointer"
                            >
                              {availableFlavors.map((flavor) => (
                                <option key={flavor} value={flavor}>
                                  {flavor}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Flavor Selector 2 */}
                          <div>
                            <label className="block text-[10px] font-bold text-brand-brown-light uppercase tracking-wide mb-1">
                              Segundo Sabor (Opcional - 50%):
                            </label>
                            <select
                              value={item.flavor2}
                              onChange={(e) => onUpdateOrder({ ...item, flavor2: e.target.value })}
                              className="w-full bg-brand-cream/50 border border-brand-pink-accent/60 rounded-xl p-2.5 text-xs text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-pink-dark focus:border-brand-pink-dark font-medium cursor-pointer"
                            >
                              <option value="">Apenas 1 Sabor (100%)</option>
                              {availableFlavors.map((flavor) => (
                                <option key={flavor} value={flavor}>
                                  {flavor}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Quantity and subtotal line */}
                        <div className="flex items-center justify-between pt-3 border-t border-brand-pink-accent/20">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-brand-brown-light uppercase tracking-wider">
                              Quantidade de Centos:
                            </span>
                            <div className="flex items-center border border-brand-pink-accent/60 rounded-full bg-white overflow-hidden shadow-2xs">
                              <button
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    onUpdateOrder({ ...item, quantity: item.quantity - 1 });
                                  }
                                }}
                                className="px-3 py-1.5 text-brand-brown-light hover:bg-brand-pink hover:text-brand-pink-deep transition-colors font-bold text-xs cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-semibold text-brand-brown select-none min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateOrder({ ...item, quantity: item.quantity + 1 })}
                                className="px-3 py-1.5 text-brand-brown-light hover:bg-brand-pink hover:text-brand-pink-deep transition-colors font-bold text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] uppercase tracking-wide font-medium text-brand-brown-light block">Subtotal:</span>
                            <p className="font-serif text-base font-bold text-brand-brown">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Rules and guidelines alert warning */}
              <div className="bg-brand-pink/35 card-border rounded-2xl p-4 text-xs text-brand-brown-light flex items-start gap-3">
                <AlertCircle className="text-brand-pink-dark mt-0.5 shrink-0" size={16} />
                <div className="space-y-1 leading-relaxed">
                  <p className="font-semibold text-brand-brown">Políticas da Doceria:</p>
                  <p>✔ Encomendas com antecedência mediante sinal de 50%.</p>
                  <p>✔ Cada cento pode ser dividido em até 2 sabores.</p>
                </div>
              </div>

              {/* Total Summary */}
              <div className="border-t border-brand-pink-accent/20 pt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-brand-brown-light font-medium">Soma dos Centos ({totalCentos}):</span>
                  <span className="font-semibold text-brand-brown">
                    R$ {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-[#E91E63] font-semibold bg-brand-pink/20 p-2.5 rounded-xl border border-brand-pink-accent/25">
                  <span className="flex items-center gap-1.5">
                    Sinal Necessário (50%):
                  </span>
                  <span>R$ {depositAmount.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-serif text-lg font-bold text-brand-brown">A pagar no total:</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-extrabold text-brand-brown">
                      R$ {totalAmount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout / Whatsapp Submission button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-base font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer"
              >
                <MessageCircle size={20} className="fill-white" />
                <span>Enviar Encomenda no WhatsApp</span>
              </motion.button>
              
              <p className="text-[11px] text-center text-brand-brown-light/80 block mt-2">
                O botão acima gera um texto pré-formatado e abre o contato direto <strong className="text-brand-pink-deep">{DISPLAY_PHONE}</strong>
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
