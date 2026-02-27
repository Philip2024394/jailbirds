import { LucideIcon } from 'lucide-react';

export type Category = 'Burgers' | 'Meal Deals' | 'HotDogs' | 'Kebabs' | 'Drinks' | 'Trays';

export interface FoodItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  shortDescription: string;
  fullDescription: string;
  deliveryCharge: number;
  spicyLevel?: 1 | 2 | 3;
  deliveryTime: string;
  freeGift?: string;
  image: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Reward {
  id: string;
  name: string;
  stickersRequired: number;
  description: string;
  image: string;
}
