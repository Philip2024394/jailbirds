import { LucideIcon } from 'lucide-react';

export type Category = 'Burgers' | 'Meal Deals' | 'HotDogs' | 'Kebabs' | 'Drinks' | 'Trays';

export type SmallDrinkOption = 'Coca Cola' | 'Sprite' | 'Aqua' | 'Fanta';

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

export interface CartCustomization {
  extras: Record<string, number>;
  removals: string[];
  smallDrink?: SmallDrinkOption | null;
}

export interface CartLineItem extends FoodItem {
  lineId: string;
  quantity: number;
  customization: CartCustomization;
}

export interface Reward {
  id: string;
  name: string;
  stickersRequired: number;
  description: string;
  image: string;
}
