import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'brigadeiros_tradicionais',
    name: 'Sabores Tradicionais',
    category: 'brigadeiros',
    type: 'tradicionais',
    pricePerHundred: 160,
    flavors: ['Brigadeiro', 'Casadinho', 'Cajuzinho', 'Coco', 'Morango'],
    imageUrl: '/src/assets/images/brigadeiros_tradicionais_1779224965172.png'
  },
  {
    id: 'brigadeiros_especiais',
    name: 'Sabores Especiais',
    category: 'brigadeiros',
    type: 'especiais',
    pricePerHundred: 180,
    flavors: [
      'Queijo com Goiabada',
      'Queijo',
      'Prestígio',
      'Ninho',
      'Uva',
      'Nozes'
    ],
    imageUrl: '/src/assets/images/brigadeiros_especiais_1779224983193.png'
  },
  {
    id: 'palhas_especiais',
    name: 'Sabores Especiais',
    category: 'palhas',
    type: 'especiais',
    pricePerHundred: 180,
    flavors: ['Ninho com Nutella', 'Oreo', 'Prestígio', 'Paçoca'],
    imageUrl: '/src/assets/images/palha_italiana_1779224996901.png'
  },
  {
    id: 'palhas_tradicionais',
    name: 'Sabores Tradicionais',
    category: 'palhas',
    type: 'tradicionais',
    pricePerHundred: 160,
    flavors: ['Brigadeiro', 'Ninho'],
    imageUrl: '/src/assets/images/palha_italiana_1779224996901.png'
  }
];

export const ORDER_WHATSAPP_NUMBER = '5524992501154';
export const DISPLAY_PHONE = '(24) 99250-1154';
