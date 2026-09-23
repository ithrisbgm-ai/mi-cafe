export type Category = 'All' | 'Hot Coffee' | 'Cold Coffee' | 'Tea' | 'Snacks' | 'Desserts';

export interface Product {
  id: string;
  name: string;
  category: 'Hot Coffee' | 'Cold Coffee' | 'Tea' | 'Snacks' | 'Desserts';
  price: number;
  description: string;
  image: string;
  badge?: string;
  prepTime?: string;
  isVegetarian?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderType = 'Pickup' | 'Dine In';

export interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  orderType: OrderType;
  tableNumber: string;
  notes: string;
}

export interface OrderPayload {
  orderId: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  orderType: OrderType;
  tableNumber: string;
  items: string;
  total: number;
  notes: string;
  status: string;
}

export interface OrderConfirmationData {
  orderId: string;
  total: number;
  date: string;
  time: string;
  customerName: string;
  orderType: OrderType;
  tableNumber: string;
  items: string;
  savedToGoogleSheets: boolean;
}
