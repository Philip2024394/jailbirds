import { FoodItem, Category, Reward } from './types';

export const CATEGORIES: Category[] = [
  'Burgers',
  'Meal Deals',
  'HotDogs',
  'Kebabs',
  'Drinks',
  'Trays'
];

export const MENU_ITEMS: FoodItem[] = [
  {
    id: 'b1',
    name: 'The Solitary Burger',
    category: 'Burgers',
    price: 45000,
    shortDescription: 'Double beef patty with secret "shack" sauce.',
    fullDescription: 'Our signature double beef patty burger, seasoned with prison-grade spices, topped with melted cheddar, caramelized onions, and our top-secret solitary sauce. Served on a toasted brioche bun.',
    deliveryCharge: 5000,
    spicyLevel: 1,
    deliveryTime: '25-35 min',
    freeGift: 'Prison Sticker',
    image: 'https://picsum.photos/seed/burger1/600/600'
  },
  {
    id: 'b2',
    name: 'Maximum Security Stack',
    category: 'Burgers',
    price: 65000,
    shortDescription: 'Triple patty, triple cheese, triple trouble.',
    fullDescription: 'For the hungriest inmates. Three premium beef patties, triple layers of American cheese, crispy bacon, jalapenos, and spicy mayo. Not for the faint of heart.',
    deliveryCharge: 5000,
    spicyLevel: 2,
    deliveryTime: '30-40 min',
    freeGift: 'Extra Napkins',
    image: 'https://picsum.photos/seed/burger2/600/600'
  },
  {
    id: 'm1',
    name: 'The Warden\'s Meal',
    category: 'Meal Deals',
    price: 85000,
    shortDescription: 'Burger, Fries, Drink & a Mystery Gift.',
    fullDescription: 'The ultimate combo. Choose any signature burger, comes with a large portion of our seasoned "Barbed Wire" fries, a cold drink of your choice, and a mystery gift from the Warden.',
    deliveryCharge: 0,
    deliveryTime: '35-45 min',
    freeGift: 'Mystery Item',
    image: 'https://picsum.photos/seed/meal1/600/600'
  },
  {
    id: 'h1',
    name: 'Chain Gang Dog',
    category: 'HotDogs',
    price: 35000,
    shortDescription: 'Jumbo sausage with mustard and relish.',
    fullDescription: 'A massive 8-inch beef frankfurter topped with classic yellow mustard, sweet pickle relish, and diced onions. Simple, effective, classic.',
    deliveryCharge: 5000,
    deliveryTime: '20-30 min',
    freeGift: 'Sticker',
    image: 'https://picsum.photos/seed/hotdog1/600/600'
  },
  {
    id: 'k1',
    name: 'The Fugitive Kebab',
    category: 'Kebabs',
    price: 55000,
    shortDescription: 'Succulent lamb with garlic sauce.',
    fullDescription: 'Thinly sliced marinated lamb, wrapped in a warm flatbread with fresh lettuce, tomatoes, onions, and a generous drizzle of our homemade garlic yogurt sauce.',
    deliveryCharge: 5000,
    spicyLevel: 1,
    deliveryTime: '25-35 min',
    freeGift: 'Mini Salad',
    image: 'https://picsum.photos/seed/kebab1/600/600'
  },
  {
    id: 't1',
    name: 'Lockdown Tray',
    category: 'Trays',
    price: 120000,
    shortDescription: 'Feeds 3-4 inmates. Variety of everything.',
    fullDescription: 'A massive sharing tray containing 2 mini burgers, 2 hot dogs, a pile of kebabs, and a mountain of fries. Perfect for a cell block party.',
    deliveryCharge: 10000,
    spicyLevel: 2,
    deliveryTime: '45-60 min',
    freeGift: '4x Stickers',
    image: 'https://picsum.photos/seed/tray1/600/600'
  },
  {
    id: 'b3',
    name: 'The Snitch Burger',
    category: 'Burgers',
    price: 42000,
    shortDescription: 'Chicken breast with spicy slaw.',
    fullDescription: 'Crispy fried chicken breast, spicy cabbage slaw, pickles, and honey mustard sauce. It tells on your hunger.',
    deliveryCharge: 5000,
    spicyLevel: 1,
    deliveryTime: '20-30 min',
    freeGift: 'Sticker',
    image: 'https://picsum.photos/seed/burger3/600/600'
  },
  {
    id: 'b4',
    name: 'Solitary Mushroom',
    category: 'Burgers',
    price: 48000,
    shortDescription: 'Vegetarian patty with portobello.',
    fullDescription: 'A thick grilled portobello mushroom, swiss cheese, arugula, and truffle mayo. Even vegetarians get locked up.',
    deliveryCharge: 5000,
    deliveryTime: '25-35 min',
    freeGift: 'Sticker',
    image: 'https://picsum.photos/seed/burger4/600/600'
  },
  {
    id: 'h2',
    name: 'The Yard Dog',
    category: 'HotDogs',
    price: 38000,
    shortDescription: 'Chili cheese dog with jalapenos.',
    fullDescription: 'Beef frankfurter topped with spicy beef chili, melted cheddar cheese, and fresh jalapenos. Hotter than the yard in July.',
    deliveryCharge: 5000,
    spicyLevel: 3,
    deliveryTime: '20-30 min',
    freeGift: 'Sticker',
    image: 'https://picsum.photos/seed/hotdog2/600/600'
  },
  {
    id: 'd1',
    name: 'Prison Hooch',
    category: 'Drinks',
    price: 15000,
    shortDescription: 'Homemade fruit punch (Non-alcoholic).',
    fullDescription: 'Our special blend of tropical fruits, served ice cold. Refreshing enough to make you forget you\'re in the mess hall.',
    deliveryCharge: 2000,
    deliveryTime: '10-15 min',
    freeGift: 'Sticker',
    image: 'https://picsum.photos/seed/drink1/600/600'
  },
  {
    id: 'd2',
    name: 'Black Coffee',
    category: 'Drinks',
    price: 12000,
    shortDescription: 'Strong, dark, and bitter.',
    fullDescription: 'Just like the warden\'s heart. Premium local beans, roasted dark and served hot.',
    deliveryCharge: 2000,
    deliveryTime: '10-15 min',
    freeGift: 'Sticker',
    image: 'https://picsum.photos/seed/drink2/600/600'
  }
];

export const REWARDS: Reward[] = [
  {
    id: 'r1',
    name: 'Free Solitary Burger',
    stickersRequired: 10,
    description: 'Redeem 10 stickers for our signature burger.',
    image: 'https://picsum.photos/seed/reward1/400/400'
  },
  {
    id: 'r2',
    name: 'The Jailbird Hoodie',
    stickersRequired: 50,
    description: 'Exclusive orange hoodie with "Inmate" branding.',
    image: 'https://picsum.photos/seed/reward2/400/400'
  },
  {
    id: 'r3',
    name: 'Lifetime 10% Discount',
    stickersRequired: 100,
    description: 'Become a "Trusty" and get 10% off every order forever.',
    image: 'https://picsum.photos/seed/reward3/400/400'
  }
];
