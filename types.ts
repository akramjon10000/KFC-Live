export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burgers' | 'buckets' | 'chicken' | 'drinks' | 'snacks' | 'sauces';
  popular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  phone: string;
  name?: string;
  addresses?: Address[];
  telegramId?: number; // Added for Telegram integration
}

export interface Address {
  label: string; // e.g., "Home"
  lat: number;
  lng: number;
  details: string; // Floor, entrance
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'new' | 'cooking' | 'delivering' | 'completed';
  date: string;
}

export type ToolFn = (args: any) => any;

// Note: Telegram types are now in types/telegram.ts