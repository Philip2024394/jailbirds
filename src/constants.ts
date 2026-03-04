import { FoodItem, Category, Reward } from './types';

export const CATEGORIES: Category[] = [
  'Burgers',
  'Meal Deals',
  "Sandwich's",
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
    id: 'm2',
    name: 'JailYard Tower Meal',
    category: 'Meal Deals',
    price: 45000,
    shortDescription: 'A crispy, golden chicken fillet topped with melted cheese, fresh sliced tomatoes, crunchy iceberg lettuce, and sliced onions, all packed inside a soft, freshly baked bun.',
    fullDescription: 'Includes:\n- Medium: Tower Burger + 250ml Drink + Medium Fries\n- Large: Tower Burger + 390ml Drink + Large Fries\n\nStep into the yard with the Jail Yard Tower – a stacked-up chicken burger built for serious hunger.\n\nA crispy, golden chicken fillet topped with melted cheese, fresh sliced tomatoes, crunchy iceberg lettuce, and sliced onions, all packed inside a soft, freshly baked bun. Every ingredient is freshly prepared and cooked to order for maximum flavor in every bite.\n\nServed with a hot portion of crispy fries and your choice of refreshing soft drink to complete the combo.\n\n🔥 Bonus: This meal deal also includes a FREE ATM Leather Jailbirds Wallet – tough, stylish, and built to last.\n\nFresh buns. Fresh ingredients. Freshly cooked.\nThe Jail Yard Tower isn’t just a meal… it’s a full yard experience.',
    deliveryCharge: 0,
    deliveryTime: '35-45 min',
    freeGift: 'FREE ATM Leather Jailbirds Wallet',
    image: 'https://ik.imagekit.io/7grri5v7d/chicken%20burger%20mean%20wallets.png'
  },
  {
    id: 'm3',
    name: 'Warden’s Parole Meal',
    category: 'Meal Deals',
    price: 48000,
    shortDescription: 'The Warden’s Parole Meal is built to keep your energy levels on high alert, packed with protein and stacked for serious satisfaction.',
    fullDescription: 'Includes:\n- Medium: Warden’s Parole Burger + 250ml Drink + Medium Fries\n- Large: Warden’s Parole Burger + 390ml Drink + Large Fries\n\nThe Warden’s Parole Meal is built to keep your energy levels on high alert, packed with protein and stacked for serious satisfaction. This burger starts with a freshly pan-fried bun, layered with Jailbirds special sauce, then loaded with golden fries, rich sauced beans, a juicy sausage, and topped with a perfectly fried egg and fried onion. Served with crispy fries, a cold drink of your choice, and a free ATM leather wallet.',
    deliveryCharge: 0,
    deliveryTime: '35-45 min',
    freeGift: 'FREE ATM Leather Jailbirds Wallet',
    image: 'https://ik.imagekit.io/7grri5v7d/wardens%20meal%20dealss.png'
  },
  {
    id: 'm4',
    name: 'Day Break Meal',
    category: 'Meal Deals',
    price: 44000,
    shortDescription: 'The Warden’s Day Break is a powerful meal designed to keep your energy high and your hunger locked down, packed with mouth watering flavours in every bite.',
    fullDescription: 'Includes:\n- Medium: Warden’s Day Break Burger + 250ml Drink + Medium Fries\n- Large: Warden’s Day Break Burger + 390ml Drink + Large Fries\n\nThe Warden’s Day Break is a powerful meal designed to keep your energy high and your hunger locked down, packed with mouth watering flavours in every bite. Built inside a freshly pan-fried bun, it’s layered with Jailbirds special sauce, stacked with golden fries, then creamy coleslaw with rich mayo sauce, followed by a juicy sausage and finished with a perfectly fried egg and fried onions. Served with a side of hot fries, a cold drink of your choice, and a free ATM leather wallet.',
    deliveryCharge: 0,
    deliveryTime: '35-45 min',
    freeGift: 'FREE ATM Leather Jailbirds Wallet',
    image: 'https://ik.imagekit.io/7grri5v7d/wardens%20meal%20dealssx.png'
  },
  {
    id: 'm5',
    name: 'Tower Max Meal',
    category: 'Meal Deals',
    price: 43000,
    shortDescription: 'Jailbirds’ special sauce, golden fries, creamy coleslaw, a juicy chicken burger, a freshly fried egg, and sliced onions, all sealed inside a fresh soft bun.',
    fullDescription: 'Includes:\n- Medium: Tower Max Burger + 250ml Drink + Medium Fries\n- Large: Tower Max Burger + 390ml Drink + Large Fries\n\nThe Tower Max stacks high for serious flavour and is built to crush any appetite. Layered with Jailbirds’ special sauce, golden fries, creamy coleslaw, a juicy chicken burger, a freshly fried egg, and sliced onions, all sealed inside a fresh soft bun.\n\nThis loaded tower meal is served with crispy fries and a cold drink of your choice — the ultimate feed when hunger hits hard.',
    deliveryCharge: 0,
    deliveryTime: '35-45 min',
    freeGift: 'FREE ATM Leather Jailbirds Wallet',
    image: 'https://ik.imagekit.io/7grri5v7d/ssssssssddd.png'
  },
  {
    id: 'm6',
    name: 'Chicken Max Meal',
    category: 'Meal Deals',
    price: 47000,
    shortDescription: 'Stacked high and built for serious appetite, the Chicken Max is loaded with bold Jailbirds flavour from top to bottom.',
    fullDescription: 'Includes:\n- Medium: Chicken Max Burger + 250ml Drink + Medium Fries\n- Large: Chicken Max Burger + 390ml Drink + Large Fries\n\nStacked high and built for serious appetite, the Chicken Max is loaded with bold Jailbirds flavour from top to bottom. It starts with a fresh soft bun, layered with Jailbirds special sauce, followed by crispy golden fries and rich sauced beans. On top sits a juicy chicken burger, melted cheese, a perfectly fried egg, and fresh sliced onion, all sealed with a toasted bun.\n\nServed as a full meal with crispy French fries and a cold drink of your choice — this one delivers big taste in every bite.',
    deliveryCharge: 0,
    deliveryTime: '35-45 min',
    freeGift: 'FREE ATM Leather Jailbirds Wallet',
    image: 'https://ik.imagekit.io/7grri5v7d/ssssssssdddxxxx.png'
  },
  {
    id: 's1',
    name: 'Toasted Chicken',
    category: "Sandwich's",
    price: 28000,
    shortDescription: 'Pressed and toasted to lock in the flavour. This compact, flavour-packed sandwich is loaded with tender seasoned chicken, sweet caramelised onions, fresh tomatoes, and melted cheese.',
    fullDescription: 'Pressed and toasted to lock in the flavour. This compact, flavour-packed sandwich is loaded with tender seasoned chicken, sweet caramelised onions, fresh tomatoes, and melted cheese. Toasted until golden and crispy on the outside, hot, rich, and perfectly melted inside.\n\nWarm, cheesy, and satisfying in every bite.',
    deliveryCharge: 0,
    deliveryTime: '25-35 min',
    freeGift: 'Prison Sticker',
    image: 'https://ik.imagekit.io/7grri5v7d/ssssssssdddxxxxnn.png'
  },
  {
    id: 's2',
    name: 'Smoked Beef Toasted',
    category: "Sandwich's",
    price: 29000,
    shortDescription: 'Pressed and toasted to lock in the flavour. This compact, flavour-packed sandwich is loaded with smoky sliced beef, sweet caramelised onions, fresh tomatoes, and melted cheese.',
    fullDescription: 'Pressed and toasted to lock in the flavour. This compact, flavour-packed sandwich is loaded with smoky sliced beef, sweet caramelised onions, fresh tomatoes, and melted cheese. Grilled until golden and crispy on the outside, hot and rich on the inside.\n\nEvery bite is warm, cheesy, smoky perfection.',
    deliveryCharge: 0,
    deliveryTime: '25-35 min',
    freeGift: 'Prison Sticker',
    image: 'https://ik.imagekit.io/7grri5v7d/smokey%20toastedd.png'
  },
  {
    id: 's3',
    name: 'Special Chicken + Coleslaw',
    category: "Sandwich's",
    price: 38000,
    shortDescription: 'Toasted Special Chicken Sandwich with a fresh coleslaw portion, pressed and toasted to lock in the flavour.',
    fullDescription: 'Toasted Special Chicken Sandwich with a fresh coleslaw portion, pressed and toasted to lock in the flavour. Filled with tender seasoned chicken, sweet caramelised onions, fresh tomatoes, melted cheese, and creamy coleslaw. Crispy outside, soft and savoury inside, delicious in every bite.',
    deliveryCharge: 0,
    deliveryTime: '25-35 min',
    freeGift: 'Prison Sticker',
    image: 'https://ik.imagekit.io/7grri5v7d/smokey%20toasteddss.png?updatedAt=1772631045935'
  },
  {
    id: 's4',
    name: 'Chicken Salad Sandwich',
    category: "Sandwich's",
    price: 38000,
    shortDescription: 'Freshly made with soft white bread layered with creamy mayonnaise, crisp lettuce, and juicy tomatoes.',
    fullDescription: 'Freshly made with soft white bread layered with creamy mayonnaise, crisp lettuce, and juicy tomatoes. Filled with tender grated chicken, sliced cheese, fresh onion, and an extra touch of mayo for rich, smooth flavour, then finished with a top layer of soft bread.\n\nLight, fresh, and satisfying — with the option to enjoy it with a freshly brewed coffee for the perfect combo.',
    deliveryCharge: 0,
    deliveryTime: '25-35 min',
    freeGift: 'Prison Sticker',
    image: 'https://ik.imagekit.io/7grri5v7d/chicken%20sandwichss.png'
  },
  {
    id: 's5',
    name: 'Smoked Beef Salad',
    category: "Sandwich's",
    price: 37000,
    shortDescription: 'Made fresh with soft white bread spread with creamy mayonnaise, layered with crisp lettuce and juicy tomatoes.',
    fullDescription: 'Made fresh with soft white bread spread with creamy mayonnaise, layered with crisp lettuce and juicy tomatoes. Filled with tender cooked smoked beef, sliced cheese, fresh onion, and an extra touch of mayo for a rich, smooth flavour, then topped with a soft layer of bread.\n\nFresh, flavourful, and satisfying — with the option to add a freshly brewed coffee to complete your meal.',
    deliveryCharge: 0,
    deliveryTime: '25-35 min',
    freeGift: 'Prison Sticker',
    image: 'https://ik.imagekit.io/7grri5v7d/smokey%20%20sandwichss.png'
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
