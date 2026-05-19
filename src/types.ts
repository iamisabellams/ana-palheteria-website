export interface MenuItem {
  id: string;
  name: string;
  category: 'brigadeiros' | 'palhas';
  type: 'tradicionais' | 'especiais';
  pricePerHundred: number;
  flavors: string[];
  imageUrl: string;
}

export interface OrderItem {
  id: string; // unique code for the added cento
  menuItemId: string;
  name: string;
  price: number;
  flavor1: string;
  flavor2: string;
  quantity: number;
}
