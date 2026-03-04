import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Flame, 
  Clock, 
  Gift, 
  ChevronRight, 
  Plus, 
  Minus,
  MapPin,
  MessageSquare,
  History,
  ShieldAlert,
  Check,
  Beef,
  Package,
  UtensilsCrossed,
  Coffee,
  LayoutGrid
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CATEGORIES, MENU_ITEMS, REWARDS } from './constants';
import { Category, FoodItem, CartCustomization, CartLineItem, MealSize, SauceFlavor, SmallDrinkOption } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DELIVERY_ICON_URL = 'https://ik.imagekit.io/7grri5v7d/scooter%20jailbirds.png';
const ETA_ICON_URL = 'https://ik.imagekit.io/7grri5v7d/cooking_s-removebg-preview.png';

type DeliveryZoneId = 'A' | 'B' | 'C';

const STORE_LOCATION = {
  lat: -7.8238,
  lng: 110.4185,
};

const DELIVERY_ZONES: Array<{
  id: DeliveryZoneId;
  label: string;
  fee: number;
  minKm: number;
  maxKm: number;
  minOrder: number;
}> = [
  { id: 'A', label: 'Zone A – Rp 10,000 (0–3 km)', fee: 10_000, minKm: 0, maxKm: 3, minOrder: 0 },
  { id: 'B', label: 'Zone B – Rp 15,000 (3–6 km)', fee: 15_000, minKm: 3, maxKm: 6, minOrder: 50_000 },
  { id: 'C', label: 'Zone C – Rp 20,000 (6–9 km)', fee: 20_000, minKm: 6, maxKm: 9, minOrder: 75_000 },
];

const DEFAULT_DELIVERY_FEE = Math.min(...DELIVERY_ZONES.map(z => z.fee));

const deliveryFeeForZone = (zone: DeliveryZoneId | null) => {
  if (!zone) return DEFAULT_DELIVERY_FEE;
  return DELIVERY_ZONES.find(z => z.id === zone)?.fee ?? DEFAULT_DELIVERY_FEE;
};

const EXTRA_PRICES: Record<string, number> = {
  'Extra Cheese': 5000,
  'Extra Sauce': 4000,
  'Bacon': 8000,
  'Onion': 3000,
  'Cheese': 2200,
  'Tamatoe': 3000,
  'Sausage': 5000,
  'Fried Egg': 3500,
  'Onion (Parole)': 2500,
  'Tamatoe Fried': 3000,
  'Fried Tamatoe': 3000,
  'Sauce': 0,
};

const SAUCE_FLAVORS: SauceFlavor[] = ['Chilli', 'BBQ', 'Cheese', 'Tamatoe', 'Mayonaise'];

const SMALL_DRINK_PRICE = 8000;

const MEAL_SIZES_DEFAULT: Array<{ id: MealSize; label: string; price: number; includes: string }> = [
  { id: 'Medium', label: 'Medium', price: 45_000, includes: '250ml Drink + Medium Fries' },
  { id: 'Large', label: 'Large', price: 53_000, includes: '390ml Drink + Large Fries' },
];

const mealSizesForItem = (item: FoodItem) => {
  if (item.id === 'm2') {
    return [
      { id: 'Medium' as const, label: 'Medium (Rp 45,000)', price: 45_000, includes: 'Tower Burger + 250ml Drink + Medium Fries' },
      { id: 'Large' as const, label: 'Large (Rp 53,000)', price: 53_000, includes: 'Tower Burger + 390ml Drink + Large Fries' },
    ];
  }
  if (item.id === 'm3') {
    return [
      { id: 'Medium' as const, label: 'Medium (Rp 48,000)', price: 48_000, includes: 'Warden’s Parole Burger + 250ml Drink + Medium Fries' },
      { id: 'Large' as const, label: 'Large (Rp 56,000)', price: 56_000, includes: 'Warden’s Parole Burger + 390ml Drink + Large Fries' },
    ];
  }
  if (item.id === 'm4') {
    return [
      { id: 'Medium' as const, label: 'Medium (Rp 46,000)', price: 46_000, includes: 'Warden’s Day Break Burger + 250ml Drink + Medium Fries' },
      { id: 'Large' as const, label: 'Large (Rp 44,000)', price: 44_000, includes: 'Warden’s Day Break Burger + 390ml Drink + Large Fries' },
    ];
  }
  if (item.id === 'm5') {
    return [
      { id: 'Medium' as const, label: 'Medium (Rp 43,000)', price: 43_000, includes: 'Tower Max Burger + 250ml Drink + Medium Fries' },
      { id: 'Large' as const, label: 'Large (Rp 49,000)', price: 49_000, includes: 'Tower Max Burger + 390ml Drink + Large Fries' },
    ];
  }
  if (item.id === 'm6') {
    return [
      { id: 'Medium' as const, label: 'Medium (Rp 47,000)', price: 47_000, includes: 'Chicken Max Burger + 250ml Drink + Medium Fries' },
      { id: 'Large' as const, label: 'Large (Rp 56,000)', price: 56_000, includes: 'Chicken Max Burger + 390ml Drink + Large Fries' },
    ];
  }
  return MEAL_SIZES_DEFAULT.map(s => ({ ...s, label: `${s.id} (Rp ${s.price.toLocaleString()})` }));
};

const mealSizeIncludes = (item: FoodItem, size: MealSize) => (mealSizesForItem(item).find(s => s.id === size)?.includes ?? '');

const toRad = (deg: number) => (deg * Math.PI) / 180;

const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  return R * c;
};

const inferredZoneFromDistance = (distanceKm: number): DeliveryZoneId | null => {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) return null;
  if (distanceKm <= 3) return 'A';
  if (distanceKm <= 6) return 'B';
  if (distanceKm <= 9) return 'C';
  return null;
};

const cartLineItemSubtotal = (item: CartLineItem) => {
  const extrasTotal = (Object.entries(item.customization.extras) as [string, number][])?.reduce(
    (acc, [k, v]) => acc + (EXTRA_PRICES[k] ?? 0) * (v ?? 0),
    0
  );
  const drinkTotal = item.customization.smallDrink ? SMALL_DRINK_PRICE : 0;

  const mealSizeTotal = (() => {
    if (item.category !== 'Meal Deals') return 0;
    const size = item.customization.mealSize ?? 'Medium';
    const price = (mealSizesForItem(item).find(s => s.id === size)?.price ?? item.price);
    return Math.max(0, price - item.price);
  })();

  const perUnit = item.price + extrasTotal + drinkTotal + mealSizeTotal;
  return perUnit * item.quantity;
};

const CATEGORY_ICONS: Record<Category, React.ComponentType<{ className?: string }>> = {
  'Burgers': Beef,
  'Meal Deals': Package,
  'HotDogs': Flame,
  'Kebabs': UtensilsCrossed,
  'Drinks': Coffee,
  'Trays': LayoutGrid,
};

// --- Components ---

const Navbar = ({ activePage, setActivePage, cartCount }: { 
  activePage: string, 
  setActivePage: (p: string) => void,
  cartCount: number 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'THE MESS HALL' },
    { id: 'warden', label: "THE WARDEN'S OFFICE" },
    { id: 'story', label: 'THE JAILBIRD STORY' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-prison-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 bg-prison-orange flex items-center justify-center rounded-sm rotate-3 brutal-border">
            <ShieldAlert className="text-black w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tighter italic">Jailbirds</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "text-sm font-bold tracking-widest transition-colors hover:text-prison-orange",
                activePage === item.id ? "text-prison-orange" : "text-white/60"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setActivePage('cart')}
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-prison-orange text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full brutal-border border-black">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isOpen ? "bg-prison-orange text-black" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-prison-black border-b border-white/10 p-4 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "text-left font-bold tracking-widest py-2",
                  activePage === item.id ? "text-prison-orange" : "text-white/60"
                )}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FoodCard = ({ item, onClick, selectedZone }: { item: FoodItem, onClick: () => void, selectedZone: DeliveryZoneId | null, key?: string }) => {
  const deliveryFee = useMemo(() => deliveryFeeForZone(selectedZone), [selectedZone]);
  return (
    <div className="barbed-wire-card-wrapper barbed-wire-border rounded-2xl">
      <motion.div
        whileHover={{ y: -5 }}
        className="metallic-steel rounded-2xl overflow-hidden group cursor-pointer shadow-2xl flex flex-col h-full relative"
        onClick={onClick}
      >
      {/* Image Container with Padding */}
      <div className="p-3 pb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-inner bg-prison-black">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-prison-black/85 via-prison-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)] pointer-events-none" />
          
          {/* Price Tag */}
          <div className="absolute top-2 right-2 bg-prison-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
            <span className="text-prison-orange font-black text-xs md:text-sm industrial-font">Rp {(item.price / 1000).toFixed(0)}k</span>
          </div>

          <div className="absolute top-2 left-2 flex items-center gap-2">
            <span className="bg-prison-orange text-black px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest brutal-border border-black shadow-lg">
              {item.category}
            </span>
            {item.spicyLevel && (
              <div className="flex gap-0.5 bg-prison-black/70 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1 shadow-lg">
                {[...Array(item.spicyLevel)].map((_, i) => (
                  <Flame key={i} className="w-3 h-3 text-red-500 fill-red-500" />
                ))}
              </div>
            )}
          </div>

          {/* Bestseller Badge (Simulated) */}
          {item.price > 50000 && (
            <div className="absolute bottom-2 left-2 bg-prison-orange text-black font-black text-[8px] md:text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-tighter rotate-[-5deg] shadow-lg brutal-border border-black">
              BESTSELLER
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-black text-sm md:text-lg group-hover:text-prison-orange transition-colors uppercase tracking-tighter industrial-font leading-tight line-clamp-2">
            {item.name}
          </h3>
        </div>
        
        <p className="text-white/55 text-[10px] md:text-xs line-clamp-3 mb-3 font-medium italic">
          {item.shortDescription}
        </p>

        <div className="mt-auto space-y-3">
          {/* Delivery Info */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 flex items-center gap-2">
              <img
                src={DELIVERY_ICON_URL}
                alt="Delivery"
                className="w-[32px] h-[32px] object-contain opacity-60 -scale-x-100"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Delivery</p>
                <p className="text-[10px] font-black text-white/70 truncate">Rp {deliveryFee.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 flex items-center gap-2">
              <img
                src={ETA_ICON_URL}
                alt="ETA"
                className="w-[29px] h-[29px] object-contain opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40">ETA</p>
                <p className="text-[10px] font-black text-white/70 truncate">{item.deliveryTime}</p>
              </div>
            </div>
          </div>

          {/* Add to Lockup Button */}
          <button className="w-full orange-gradient-glow text-black font-black text-[10px] md:text-xs py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-tighter transition-all active:scale-[0.98] group-hover:brightness-110 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />
            ADD TO LOCKUP
          </button>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

const FoodDrawer = ({ item, onClose, onAddToCart, selectedZone }: { 
  item: FoodItem | null, 
  onClose: () => void,
  onAddToCart: (item: FoodItem, customization: CartCustomization, quantity: number) => void,
  selectedZone: DeliveryZoneId | null
}) => {
  if (!item) return null;

  const deliveryFee = useMemo(() => deliveryFeeForZone(selectedZone), [selectedZone]);

  const isMealDeal = item.category === 'Meal Deals';
  const showSmallDrinkAddOn = !isMealDeal && item.category !== 'Drinks';

  const EXTRA_OPTIONS = useMemo(() => {
    if (item.id === 'm2') return ['Onion', 'Cheese', 'Tamatoe'];
    if (item.id === 'm3') return ['Sausage', 'Fried Egg', 'Onion (Parole)', 'Tamatoe Fried', 'Extra Sauce'];
    if (item.id === 'm5') return ['Fried Egg', 'Fried Tamatoe', 'Sauce'];
    if (item.id === 'm6') return ['Cheese', 'Fried Tamatoe', 'Sauce'];
    return ['Extra Cheese', 'Extra Sauce', 'Bacon'];
  }, [item.id]);

  const REMOVAL_OPTIONS = useMemo(() => {
    if (item.id === 'm2') return ['Cheese', 'Onion', 'Tamatoes', 'Lettuce', 'Sauce'];
    if (item.id === 'm3') return ['Fried Egg', 'Sauced Beans', 'Fries', 'Jailbirds Sauce'];
    if (item.id === 'm5') return ['Fried Egg', 'Fried Onion', 'Fries', 'Jailbirds Sauce'];
    if (item.id === 'm6') return ['Fried Egg', 'Cheese', 'Fried Onion', 'Beans', 'Jailbirds Sauce'];
    return ['No Onions', 'No Pickles', 'No Mayo'];
  }, [item.id]);
  const SMALL_DRINK_OPTIONS: SmallDrinkOption[] = ['Coca Cola', 'Sprite', 'Aqua', 'Fanta'];

  const SMALL_DRINK_ICONS: Record<SmallDrinkOption, string> = {
    'Coca Cola': `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#b91c1c"/><text x="16" y="21" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="white">C</text></svg>')}`,
    'Sprite': `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#16a34a"/><text x="16" y="21" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="white">S</text></svg>')}`,
    'Aqua': `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0284c7"/><text x="16" y="21" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="white">A</text></svg>')}`,
    'Fanta': `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#ea580c"/><text x="16" y="21" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="white">F</text></svg>')}`,
  };

  const [extrasSelected, setExtrasSelected] = useState<Record<string, boolean>>({});
  const [removals, setRemovals] = useState<Record<string, boolean>>({});
  const [smallDrink, setSmallDrink] = useState<SmallDrinkOption | null>(null);
  const [mealSize, setMealSize] = useState<MealSize>('Medium');
  const [mealDrink, setMealDrink] = useState<SmallDrinkOption | null>(null);
  const [extraSauceFlavor, setExtraSauceFlavor] = useState<SauceFlavor | ''>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setExtrasSelected(
      EXTRA_OPTIONS.reduce<Record<string, boolean>>((acc, opt) => {
        acc[opt] = false;
        return acc;
      }, {})
    );
    setRemovals(
      REMOVAL_OPTIONS.reduce<Record<string, boolean>>((acc, opt) => {
        acc[opt] = false;
        return acc;
      }, {})
    );
    setSmallDrink(null);
    setExtraSauceFlavor('');
    setQuantity(1);
  }, [EXTRA_OPTIONS, REMOVAL_OPTIONS, item.id]);

  useEffect(() => {
    if (!isMealDeal) return;
    setMealSize('Medium');
    setMealDrink(null);
  }, [isMealDeal, item.id]);

  useEffect(() => {
    if (!EXTRA_OPTIONS.includes('Extra Sauce') || !extrasSelected['Extra Sauce']) {
      setExtraSauceFlavor('');
    }
  }, [extrasSelected, EXTRA_OPTIONS]);

  const selectedExtras = useMemo(() => {
    return (Object.entries(extrasSelected) as [string, boolean][]).filter(([, v]) => v).map(([k]) => k);
  }, [extrasSelected]);

  const selectedRemovals = useMemo(() => {
    return (Object.entries(removals) as [string, boolean][]).filter(([, v]) => v).map(([k]) => k);
  }, [removals]);

  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((acc, k) => acc + (EXTRA_PRICES[k] ?? 0), 0);
  }, [selectedExtras]);

  const drinkTotal = useMemo(() => {
    return showSmallDrinkAddOn && smallDrink ? SMALL_DRINK_PRICE : 0;
  }, [SMALL_DRINK_PRICE, showSmallDrinkAddOn, smallDrink]);

  const mealSizeTotal = useMemo(() => {
    if (!isMealDeal) return 0;
    const sizePrice = mealSizesForItem(item).find(s => s.id === mealSize)?.price ?? item.price;
    return Math.max(0, sizePrice - item.price);
  }, [isMealDeal, item.price, mealSize]);

  const lineTotal = useMemo(() => {
    return (item.price + mealSizeTotal + extrasTotal + drinkTotal) * quantity;
  }, [drinkTotal, extrasTotal, item.price, mealSizeTotal, quantity]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl bg-prison-grey/80 backdrop-blur-xl rounded-t-3xl brutal-border border-white/20 overflow-y-auto max-h-[90vh] shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-prison-orange text-black rounded-full hover:bg-white transition-colors shadow-lg z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-4 md:p-6">
          <div className="relative rounded-2xl overflow-hidden brutal-border border-white/10 shadow-inner">
            <div className="aspect-[4/3] bg-prison-black">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-prison-black/85 via-prison-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-prison-orange text-black px-2 py-0.5 text-[10px] font-black uppercase rounded-sm brutal-border border-black shadow-lg">
                    {item.category}
                  </span>
                  {item.spicyLevel && (
                    <div className="flex gap-0.5">
                      {[...Array(item.spicyLevel)].map((_, i) => (
                        <Flame key={i} className="w-3 h-3 text-red-500 fill-red-500" />
                      ))}
                    </div>
                  )}
                </div>
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none truncate">
                  {item.name}
                </h2>
              </div>
              <div className="flex-shrink-0 bg-prison-black/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg">
                <p className="text-prison-orange text-lg md:text-2xl font-black">Rp {item.price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 md:p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <p className="text-white/75 leading-relaxed italic text-sm md:text-base">
                {item.fullDescription}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={DELIVERY_ICON_URL}
                      alt="Delivery"
                      className="w-[32px] h-[32px] object-contain opacity-60 -scale-x-100"
                      referrerPolicy="no-referrer"
                    />
                    <p className="text-[10px] text-white/40 uppercase font-black">Delivery</p>
                  </div>
                  <p className="text-sm font-black">Rp {deliveryFee.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={ETA_ICON_URL}
                      alt="Time"
                      className="w-[29px] h-[29px] object-contain opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <p className="text-[10px] text-white/40 uppercase font-black">Time</p>
                  </div>
                  <p className="text-sm font-black">{item.deliveryTime}</p>
                </div>
              </div>

              {item.freeGift && (
                <div className="mt-4 bg-prison-orange/10 p-3 rounded-xl border border-prison-orange/20 flex items-center gap-3">
                  <Gift className="text-prison-orange w-5 h-5" />
                  <div>
                    <p className="text-[10px] text-prison-orange uppercase font-black">Free Gift</p>
                    <p className="text-sm font-black">{item.freeGift}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 md:p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Quantity</p>
                  <p className="text-xs text-white/50 font-bold italic">Choose how many to add</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-white/10 rounded-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="p-2 hover:bg-white/10 rounded-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {isMealDeal && (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 md:p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="mb-3">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Meal Size</p>
                  <p className="text-xs text-white/50 font-bold italic">Medium or Large</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {mealSizesForItem(item).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setMealSize(s.id)}
                      className={cn(
                        "text-left px-3 py-2 rounded-xl border text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-between gap-2",
                        mealSize === s.id
                          ? "bg-prison-orange text-black border-black"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-prison-orange/40"
                      )}
                    >
                      <span className="truncate">{s.id}</span>
                      <span
                        className={cn(
                          "text-[10px] font-black",
                          mealSize === s.id ? "text-black/70" : "text-white/40"
                        )}
                      >
                        Rp {s.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isMealDeal && (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 md:p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="mb-3">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Soft Drink (Required)</p>
                  <p className="text-xs text-white/50 font-bold italic">Choose 1 for your meal</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SMALL_DRINK_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMealDrink(opt)}
                      className={cn(
                        "text-left px-3 py-2 rounded-xl border text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2",
                        mealDrink === opt
                          ? "bg-prison-orange text-black border-black"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-prison-orange/40"
                      )}
                    >
                      <img src={SMALL_DRINK_ICONS[opt]} alt={opt} className="w-5 h-5 rounded" />
                      <span className="truncate flex-grow">{opt}</span>
                    </button>
                  ))}
                </div>
                {!mealDrink && (
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-300">
                    Please select a soft drink for this meal.
                  </div>
                )}
              </div>
            )}

            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 md:p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="mb-3">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Extras</p>
                <p className="text-xs text-white/50 font-bold italic">Tap to add upgrades</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {EXTRA_OPTIONS.map((opt) => {
                  const checked = !!extrasSelected[opt];
                  return (
                    <label
                      key={opt}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-3 py-2 cursor-pointer transition-colors",
                        checked
                          ? "bg-prison-orange/15 border-prison-orange/40"
                          : "bg-white/5 border-white/10 hover:border-prison-orange/40"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "w-5 h-5 rounded-md border flex items-center justify-center",
                            checked
                              ? "bg-prison-orange border-black"
                              : "bg-transparent border-white/30"
                          )}
                        >
                          {checked && <Check className="w-3.5 h-3.5 text-black" />}
                        </span>
                        <span className="font-black text-sm uppercase tracking-tight truncate">{opt}</span>
                      </div>
                      <span className={cn(
                        "text-xs font-black uppercase tracking-widest",
                        checked ? "text-prison-orange" : "text-white/40"
                      )}>
                        +Rp {(EXTRA_PRICES[opt] ?? 0).toLocaleString()}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setExtrasSelected(prev => ({ ...prev, [opt]: !prev[opt] }))}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>

              {EXTRA_OPTIONS.includes('Extra Sauce') && extrasSelected['Extra Sauce'] && (
                <div className="mt-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Sauce Selection</label>
                  <select
                    value={extraSauceFlavor}
                    onChange={(e) => setExtraSauceFlavor(e.target.value as SauceFlavor | '')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
                  >
                    <option value="" disabled>Select sauce</option>
                    {SAUCE_FLAVORS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-md p-4 md:p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="mb-3">
                <p className="text-[10px] text-red-200 uppercase font-black tracking-widest">Remove Items</p>
                <p className="text-xs text-red-100/70 font-bold italic">We’ll leave it out</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {REMOVAL_OPTIONS.map((opt) => {
                  const checked = !!removals[opt];
                  return (
                    <label
                      key={opt}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-3 py-2 cursor-pointer transition-colors",
                        checked
                          ? "bg-red-500/30 border-red-400/50"
                          : "bg-white/5 border-red-500/20 hover:border-red-400/60"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "w-5 h-5 rounded-md border flex items-center justify-center",
                            checked
                              ? "bg-red-500 border-black"
                              : "bg-transparent border-red-200/40"
                          )}
                        >
                          {checked && <Check className="w-3.5 h-3.5 text-black" />}
                        </span>
                        <span className="font-black text-sm uppercase tracking-tight truncate">{opt}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setRemovals(prev => ({ ...prev, [opt]: !prev[opt] }))}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {showSmallDrinkAddOn && (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 md:p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="mb-3">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Small Drink (250ml)</p>
                  <p className="text-xs text-white/50 font-bold italic">Optional add-on</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SMALL_DRINK_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSmallDrink(prev => (prev === opt ? null : opt))}
                      className={cn(
                        "text-left px-3 py-2 rounded-xl border text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2",
                        smallDrink === opt
                          ? "bg-prison-orange text-black border-black"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-prison-orange/40"
                      )}
                    >
                      <img src={SMALL_DRINK_ICONS[opt]} alt={opt} className="w-5 h-5 rounded" />
                      <span className="truncate flex-grow">{opt}</span>
                      <span className={cn(
                        "text-[10px] font-black",
                        smallDrink === opt ? "text-black/70" : "text-white/40"
                      )}>
                        +Rp {SMALL_DRINK_PRICE.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 left-0 right-0 mt-6 pb-4">
            {(isMealDeal || selectedExtras.length > 0 || selectedRemovals.length > 0 || (showSmallDrinkAddOn && smallDrink)) && (
              <div className="mb-3 bg-prison-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-3">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Selected</p>
                <div className="text-xs font-bold text-white/75 space-y-1">
                  {isMealDeal && (
                    <div>
                      Meal: {mealSize} ({mealSizeIncludes(item, mealSize)}){mealDrink ? ` • ${mealDrink}` : ''}
                    </div>
                  )}
                  {selectedExtras.length > 0 && (
                    <div>
                      + {selectedExtras.map(e => e === 'Extra Sauce' && extraSauceFlavor ? `Extra Sauce: ${extraSauceFlavor}` : e).join(', ')}
                    </div>
                  )}
                  {selectedRemovals.length > 0 && (
                    <div>
                      - {selectedRemovals.join(', ')}
                    </div>
                  )}
                  {showSmallDrinkAddOn && smallDrink && (
                    <div>
                      + Small Drink 250ml: {smallDrink}
                    </div>
                  )}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                if (isMealDeal && !mealDrink) return;
                if (EXTRA_OPTIONS.includes('Extra Sauce') && extrasSelected['Extra Sauce'] && !extraSauceFlavor) return;
                const customization: CartCustomization = {
                  extras: Object.fromEntries(
                    (Object.entries(extrasSelected) as [string, boolean][]) 
                      .filter(([, v]) => v)
                      .map(([k]) => [k, 1])
                  ) as Record<string, number>,
                  removals: (Object.entries(removals) as [string, boolean][]).filter(([, v]) => v).map(([k]) => k),
                  smallDrink: showSmallDrinkAddOn ? smallDrink : null,
                  mealSize: isMealDeal ? mealSize : null,
                  mealDrink: isMealDeal ? mealDrink : null,
                  extraSauceFlavor: (EXTRA_OPTIONS.includes('Extra Sauce') && extrasSelected['Extra Sauce']) ? (extraSauceFlavor || null) : null,
                };

                onAddToCart(item, customization, quantity);
                onClose();
              }}
              disabled={(isMealDeal && !mealDrink) || (EXTRA_OPTIONS.includes('Extra Sauce') && extrasSelected['Extra Sauce'] && !extraSauceFlavor)}
              className="w-full orange-gradient-glow text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-tighter transition-all active:scale-[0.99] hover:brightness-110 shadow-2xl"
            >
              <ShieldAlert className="w-5 h-5" />
              ADD TO LOCKUP • Rp {lineTotal.toLocaleString()}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ onSelectItem, selectedZone }: { onSelectItem: (item: FoodItem) => void; selectedZone: DeliveryZoneId | null }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Burgers');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full z-0">
          <img 
            src="https://ik.imagekit.io/7grri5v7d/jailbirds%20food%20main%20image.png" 
            className="w-full h-auto opacity-80 block"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-black via-prison-black/20 to-transparent" />
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 translate-y-[46px] md:-translate-y-[150px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-prison-orange text-black px-4 py-1 font-bold text-sm mb-6 rotate-[-2deg] brutal-border border-black -translate-y-[150px]"
            >
              YOGYAKARTA'S MOST WANTED
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-8xl font-black italic tracking-tighter mb-6 uppercase drop-shadow-2xl"
            >
              GUILTY OF <span className="text-prison-orange">GREAT TASTE</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl mx-auto text-white text-lg md:text-xl font-bold italic mb-8 drop-shadow-lg"
            >
              "Food so good, it should be illegal. Serving the best rations in Yogyakarta City since the great escape of '23."
            </motion.p>
          </div>

          {/* Categories under the handcuffs — desktop only */}
          <div className="absolute inset-0 z-40 hidden md:flex flex-col items-center justify-center text-center px-4 translate-y-32 md:translate-y-[200px]">
            <div className="flex items-center gap-3 overflow-x-auto py-6 max-w-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    "px-6 py-3 m-1 rounded-full font-bold text-sm whitespace-nowrap transition-all brutal-border shadow-xl",
                    activeCategory === cat 
                      ? "bg-prison-orange text-black border-black ring-2 ring-prison-orange orange-glow" 
                      : "bg-prison-black/60 backdrop-blur-md text-white border-white/20 hover:border-prison-orange"
                  )}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="flex items-center gap-4 text-white/20 font-mono text-xs uppercase tracking-[0.5em] rotate-90 origin-left">
            <span>EST. 2023</span>
            <div className="w-20 h-[1px] bg-white/20" />
            <span>YOGYAKARTA</span>
          </div>
        </div>
      </section>

      {/* Menu Grid — mobile-first: menu pulled up; desktop: normal spacing */}
      <section id="menu" className="pt-0 pb-12 md:pb-12 max-w-7xl mx-auto px-4 md:px-4 scroll-mt-20 -mt-[80px] md:mt-6 relative z-30">
        <div className="min-h-[60vh] md:min-h-0">
          {/* Menu cards area — full width frame, no clipping */}
          <div id="menu-cards" className="min-w-0 overflow-visible">
            {/* Mobile: category label */}
            <div className="md:hidden mb-2">
              <h2 className="text-prison-orange font-black text-lg uppercase tracking-tighter industrial-font">
                {activeCategory}
              </h2>
              <div className="mt-2 -mx-4 px-4 overflow-x-auto max-w-full">
                <div className="flex items-center gap-2 w-max pr-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all brutal-border whitespace-nowrap",
                        activeCategory === cat
                          ? "bg-prison-orange text-black border-black"
                          : "bg-prison-black/60 text-white/70 border-white/10"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 overflow-visible">
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 280, delay: index * 0.03 }}
                    className="h-full"
                  >
                    <FoodCard 
                      item={item} 
                      onClick={() => onSelectItem(item)} 
                      selectedZone={selectedZone}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const WardensOffice = () => {
  return (
    <div
      className="pt-32 pb-20 min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('https://ik.imagekit.io/7grri5v7d/jailbirds%20food%20main%20imagessss.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black italic mb-4 uppercase tracking-tighter">
          THE <span className="text-prison-orange">WARDEN'S</span> OFFICE
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto italic">
          "Collect stickers with every order. Trade your good behavior for exclusive rewards and contraband."
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {REWARDS.map((reward) => (
          <div key={reward.id} className="bg-prison-grey brutal-border border-white/10 p-6 rounded-2xl flex flex-col">
            <div className="aspect-square rounded-xl overflow-hidden mb-6 brutal-border border-white/5">
              <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold uppercase">{reward.name}</h3>
              <div className="bg-prison-orange text-black px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                <History className="w-3 h-3" />
                {reward.stickersRequired} STICKERS
              </div>
            </div>
            <p className="text-white/60 text-sm italic mb-8 flex-grow">{reward.description}</p>
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-prison-orange hover:text-black transition-colors">
              REDEEM REWARD
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-prison-orange p-8 md:p-12 rounded-3xl brutal-border border-black flex flex-col md:flex-row items-center gap-8">
        <div className="flex-grow text-black">
          <h2 className="text-4xl font-black italic uppercase mb-2">CHECK YOUR BALANCE</h2>
          <p className="font-bold opacity-70">Enter your inmate ID (Phone Number) to see your stickers.</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <input 
            type="text" 
            placeholder="0812-XXXX-XXXX" 
            className="bg-white/20 border-2 border-black/20 rounded-xl px-6 py-4 text-black font-bold placeholder:text-black/40 focus:outline-none focus:border-black"
          />
          <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-colors">
            CHECK
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

const StoryPage = () => {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black italic mb-8 uppercase tracking-tighter">
          THE <span className="text-prison-orange">JAILBIRD</span> STORY
        </h1>
        <div className="aspect-video rounded-3xl overflow-hidden brutal-border border-white/10 mb-12">
          <img src="https://picsum.photos/seed/story/1200/800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        
        <div className="space-y-8 text-lg text-white/80 font-light leading-relaxed italic">
          <p>
            It all started in the basement of a high-security facility in the heart of Yogyakarta. Our founder, known only as "The Chef," was serving a 10-year sentence for "excessive use of flavor."
          </p>
          <p>
            While others were planning escapes with tunnels and files, The Chef was perfecting the ultimate burger seasoning. He knew that the only way to truly be free was to share his culinary contraband with the world.
          </p>
          <div className="bg-prison-grey p-8 rounded-2xl border-l-4 border-prison-orange">
            <p className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">"THE GREAT ESCAPE"</p>
            <p>On a rainy Tuesday in 2023, the kitchen doors were left unlocked. The Chef didn't just leave; he took the entire spice rack and the secret sauce recipe with him.</p>
          </div>
          <p>
            Today, The Jailbird stands as a monument to those who refuse to eat boring food. We don't just serve burgers; we serve freedom. Every patty is hand-pressed, every sauce is made from scratch, and every order is a small act of rebellion against the ordinary.
          </p>
          <p>
            Welcome to the Mess Hall. You're among friends here. Just don't ask about the secret ingredient.
          </p>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, updateQuantity, selectedZone, onSelectedZoneChange, checkout }: { 
  cart: CartLineItem[], 
  updateQuantity: (lineId: string, delta: number) => void,
  selectedZone: DeliveryZoneId | null,
  onSelectedZoneChange: (zone: DeliveryZoneId | null) => void,
  checkout: (details: {
    name: string;
    customerWhatsapp: string;
    address: string;
    kecamatan?: string;
    zone: DeliveryZoneId;
    pin: { lat: number; lng: number };
    distanceKm: number;
    deliveryFee: number;
  }) => void
}) => {
  const [name, setName] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [address, setAddress] = useState('');

  const [kecamatan, setKecamatan] = useState('');
  const [zone, setZone] = useState<DeliveryZoneId | ''>('');
  const [pinLat, setPinLat] = useState('');
  const [pinLng, setPinLng] = useState('');

  useEffect(() => {
    setZone(selectedZone ?? '');
  }, [selectedZone]);

  const pin = useMemo(() => {
    const lat = Number(pinLat);
    const lng = Number(pinLng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  }, [pinLat, pinLng]);

  const distanceKm = useMemo(() => {
    if (!pin) return null;
    return haversineKm(STORE_LOCATION, pin);
  }, [pin]);

  const inferredZone = useMemo(() => {
    if (distanceKm == null) return null;
    return inferredZoneFromDistance(distanceKm);
  }, [distanceKm]);

  const subtotal = cart.reduce((acc, item) => acc + cartLineItemSubtotal(item), 0);

  const selectedZoneConfig = useMemo(() => {
    if (!zone) return null;
    return DELIVERY_ZONES.find(z => z.id === zone) ?? null;
  }, [zone]);

  const deliveryFee = selectedZoneConfig ? selectedZoneConfig.fee : 0;
  const total = subtotal + deliveryFee;

  const zoneMismatch = useMemo(() => {
    if (!zone) return false;
    if (distanceKm == null) return false;
    const expected = inferredZoneFromDistance(distanceKm);
    return expected !== zone;
  }, [zone, distanceKm]);

  const deliveryUnavailable = useMemo(() => {
    if (distanceKm == null) return false;
    return inferredZoneFromDistance(distanceKm) == null;
  }, [distanceKm]);

  const minOrderNotReached = useMemo(() => {
    if (!selectedZoneConfig) return false;
    return subtotal < selectedZoneConfig.minOrder;
  }, [selectedZoneConfig, subtotal]);

  const normalizedCustomerWhatsapp = useMemo(() => {
    return customerWhatsapp.replace(/[^0-9]/g, '');
  }, [customerWhatsapp]);

  const blockingMessage = useMemo(() => {
    if (!name.trim() || !address.trim()) return null;
    if (!normalizedCustomerWhatsapp) return 'Customer WhatsApp number is required.';
    if (!zone) return 'Delivery zone is required.';
    if (!pin) return 'Please enter your map pin coordinates (latitude & longitude).';
    if (distanceKm == null) return 'Unable to calculate distance. Please check your pin coordinates.';
    if (deliveryUnavailable) return 'Delivery unavailable beyond 9 km.';
    if (zoneMismatch) return 'Selected zone does not match your location. Please choose correct zone.';
    if (minOrderNotReached) return 'Minimum order for your zone has not been reached.';
    return null;
  }, [address, deliveryUnavailable, distanceKm, minOrderNotReached, name, normalizedCustomerWhatsapp, pin, zone, zoneMismatch]);

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <div className="w-24 h-24 bg-prison-grey rounded-full flex items-center justify-center mx-auto mb-6 brutal-border border-white/10">
          <ShoppingBag className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-3xl font-bold uppercase mb-4">YOUR TRAY IS EMPTY</h2>
        <p className="text-white/40 italic mb-8">Get back to the mess hall and grab some rations.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <h2 className="text-4xl font-black italic uppercase mb-8 tracking-tighter">YOUR RATIONS</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.lineId} className="bg-prison-grey p-4 rounded-2xl brutal-border border-white/10 flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                <p className="text-prison-orange font-bold text-xs">Rp {item.price.toLocaleString()}</p>

                {(Object.keys(item.customization.extras).length > 0 || item.customization.removals.length > 0 || item.customization.smallDrink || item.customization.mealSize || item.customization.mealDrink || item.customization.extraSauceFlavor) && (
                  <div className="mt-2 text-[10px] text-white/50 font-bold uppercase tracking-widest space-y-1">
                    {(item.category === 'Meal Deals' && (item.customization.mealSize || item.customization.mealDrink)) && (
                      <div>
                        {(() => {
                          const size = item.customization.mealSize ?? 'Medium';
                          return `Meal: ${size} (${mealSizeIncludes(item, size)})${item.customization.mealDrink ? ` • ${item.customization.mealDrink}` : ''}`;
                        })()}
                      </div>
                    )}
                    {Object.keys(item.customization.extras).length > 0 && (
                      <div>
                        + {Object.entries(item.customization.extras).map(([k, v]) => {
                          if (k === 'Extra Sauce' && item.customization.extraSauceFlavor) return `Extra Sauce: ${item.customization.extraSauceFlavor}${v > 1 ? ` x${v}` : ''}`;
                          return `${k}${v > 1 ? ` x${v}` : ''}`;
                        }).join(', ')}
                      </div>
                    )}
                    {item.customization.removals.length > 0 && (
                      <div>
                        - {item.customization.removals.join(', ')}
                      </div>
                    )}
                    {item.customization.smallDrink && (
                      <div>
                        + Small Drink 250ml: {item.customization.smallDrink}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.lineId, -1)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.lineId, 1)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-prison-grey p-6 rounded-2xl brutal-border border-white/10">
          <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-prison-orange" />
            DELIVERY DETAILS
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Inmate Name</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Customer WhatsApp Number (Required)</label>
              <input
                value={customerWhatsapp}
                onChange={(e) => setCustomerWhatsapp(e.target.value)}
                placeholder="Example: +62 812 3456 7890"
                inputMode="tel"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Cell Block Address (Yogyakarta)</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full address"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">District / Kecamatan (Optional)</label>
              <input
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
                placeholder="Example: Banguntapan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Delivery Zone (Required)</label>
              <select
                value={zone}
                onChange={(e) => {
                  const next = (e.target.value as DeliveryZoneId | '');
                  setZone(next);
                  onSelectedZoneChange(next || null);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
              >
                <option value="" disabled>Select your zone</option>
                {DELIVERY_ZONES.map(z => (
                  <option key={z.id} value={z.id}>{z.label}</option>
                ))}
              </select>
              {zone && inferredZone && zone !== inferredZone && (
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-300">
                  Selected zone does not match your location. Please choose correct zone.
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Google Maps Pin (Latitude / Longitude)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={pinLat}
                  onChange={(e) => setPinLat(e.target.value)}
                  placeholder="Latitude (e.g. -7.82380)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
                />
                <input
                  value={pinLng}
                  onChange={(e) => setPinLng(e.target.value)}
                  placeholder="Longitude (e.g. 110.41850)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors"
                />
              </div>
              {distanceKm != null && (
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Distance from kitchen: {distanceKm.toFixed(2)} km
                </div>
              )}
              {deliveryUnavailable && (
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-300">
                  Delivery unavailable beyond 9 km.
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Proof of Payment</p>
              <p className="text-xs font-bold text-white/70 italic mt-1">
                After payment, please send a screenshot of your transfer directly in WhatsApp chat.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-prison-orange p-6 rounded-2xl brutal-border border-black text-black">
          <h3 className="text-xl font-bold uppercase mb-6">ORDER SUMMARY</h3>
          <div className="space-y-2 mb-6 font-bold">
            <div className="flex justify-between opacity-70">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between opacity-70">
              <span>Delivery Charge</span>
              <span>Rp {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="h-[1px] bg-black/10 my-4" />
            <div className="flex justify-between text-2xl font-black italic">
              <span>TOTAL</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>

          {blockingMessage && (
            <div className="mb-4 bg-black/10 border border-black/15 rounded-xl p-3 text-[11px] font-black uppercase tracking-widest">
              {blockingMessage}
            </div>
          )}
          <button 
            disabled={!!blockingMessage}
            onClick={() => {
              if (!zone || !pin || distanceKm == null || !selectedZoneConfig) return;
              checkout({
                name: name.trim(),
                customerWhatsapp: normalizedCustomerWhatsapp,
                address: address.trim(),
                kecamatan: kecamatan.trim() || undefined,
                zone,
                pin,
                distanceKm,
                deliveryFee: selectedZoneConfig.fee,
              });
            }}
            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            ORDER VIA WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<DeliveryZoneId | null>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (item: FoodItem, customization: CartCustomization, quantity: number) => {
    setCart(prev => {
      const hasCustomization = Object.keys(customization.extras).length > 0 || customization.removals.length > 0 || !!customization.smallDrink || !!customization.mealSize || !!customization.mealDrink;

      const qty = Math.max(1, Math.min(10, quantity || 1));

      if (!hasCustomization) {
        const existing = prev.find(i => i.id === item.id && Object.keys(i.customization.extras).length === 0 && i.customization.removals.length === 0 && !i.customization.smallDrink && !i.customization.mealSize && !i.customization.mealDrink);
        if (existing) {
          return prev.map(i => i.lineId === existing.lineId ? { ...i, quantity: i.quantity + qty } : i);
        }
      }

      const lineId = `${item.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      return [...prev, {
        ...item,
        lineId,
        quantity: qty,
        customization: {
          extras: customization.extras,
          removals: customization.removals,
          smallDrink: customization.smallDrink ?? null,
          mealSize: customization.mealSize ?? null,
          mealDrink: customization.mealDrink ?? null,
          extraSauceFlavor: customization.extraSauceFlavor ?? null,
        }
      }];
    });
  };

  const updateQuantity = (lineId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.lineId === lineId) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = (details: {
    name: string;
    customerWhatsapp: string;
    address: string;
    kecamatan?: string;
    zone: DeliveryZoneId;
    pin: { lat: number; lng: number };
    distanceKm: number;
    deliveryFee: number;
  }) => {
    const { name, customerWhatsapp, address, kecamatan, zone, pin, distanceKm, deliveryFee } = details;
    const itemsList = cart.map(item => {
      const extras = (Object.entries(item.customization.extras) as [string, number][])?.map(([k, v]) => {
        if (k === 'Extra Sauce' && item.customization.extraSauceFlavor) return `Extra Sauce: ${item.customization.extraSauceFlavor}${v > 1 ? ` x${v}` : ''}`;
        return `${k}${v > 1 ? ` x${v}` : ''}`;
      });
      const removals = item.customization.removals;
      const smallDrinkLine = item.customization.smallDrink ? [`Small Drink 250ml: ${item.customization.smallDrink}`] : [];
      const mealLines = item.category === 'Meal Deals'
        ? [
            `Meal Size: ${item.customization.mealSize ?? 'Medium'} (${mealSizeIncludes(item, item.customization.mealSize ?? 'Medium')})`,
            ...(item.customization.mealDrink ? [`Meal Drink: ${item.customization.mealDrink}`] : []),
          ]
        : [];
      const options = [...extras.map(e => `+ ${e}`), ...removals.map(r => `- ${r}`), ...smallDrinkLine.map(s => `+ ${s}`)];
      const optionLines = [...mealLines.map(m => `+ ${m}`), ...options];
      const optionsText = optionLines.length > 0 ? `%0A  ${optionLines.join('%0A  ')}` : '';
      return `- ${item.name} (x${item.quantity})${optionsText}`;
    }).join('%0A');

    const itemsSubtotal = cart.reduce((acc, item) => acc + cartLineItemSubtotal(item), 0);
    const total = itemsSubtotal + deliveryFee;

    const deliveryLines = [
      `*Delivery Zone:* Zone ${zone}`,
      `*Pin:* ${pin.lat}, ${pin.lng}`,
      `*Distance:* ${distanceKm.toFixed(2)} km`,
      `*Delivery Fee:* Rp ${deliveryFee.toLocaleString()}`,
    ];
    if (kecamatan) deliveryLines.splice(1, 0, `*Kecamatan:* ${kecamatan}`);
    
    const message = `*NEW ORDER FROM THE JAILBIRD*%0A%0A*Customer:* ${name}%0A*Customer WA:* ${customerWhatsapp}%0A*Address:* ${address}%0A%0A${deliveryLines.join('%0A')}%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* Rp ${itemsSubtotal.toLocaleString()}%0A*Total:* Rp ${total.toLocaleString()}%0A%0A_Sent from The Jailbird PWA_`;
    
    const whatsappNumber = '6281392000050';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-prison-black selection:bg-prison-orange selection:text-black overflow-x-hidden">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartCount={cartCount} 
      />

      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomePage onSelectItem={setSelectedItem} selectedZone={selectedDeliveryZone} />
            </motion.div>
          )}
          {activePage === 'warden' && (
            <motion.div
              key="warden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <WardensOffice />
            </motion.div>
          )}
          {activePage === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StoryPage />
            </motion.div>
          )}
          {activePage === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CartPage 
                cart={cart} 
                updateQuantity={updateQuantity} 
                selectedZone={selectedDeliveryZone}
                onSelectedZoneChange={setSelectedDeliveryZone}
                checkout={handleCheckout} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <FoodDrawer 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onAddToCart={addToCart}
            selectedZone={selectedDeliveryZone}
          />
        )}
      </AnimatePresence>

      <footer className="bg-prison-grey border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-prison-orange flex items-center justify-center rounded-sm rotate-3 brutal-border border-black">
              <ShieldAlert className="text-black w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tighter italic">THE JAILBIRD</span>
          </div>
          <div className="flex gap-8 text-white/40 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-prison-orange">Instagram</a>
            <a href="#" className="hover:text-prison-orange">TikTok</a>
            <a href="#" className="hover:text-prison-orange">Location</a>
          </div>
          <p className="text-white/20 text-[10px] font-mono">© 2023 THE JAILBIRD YOGYAKARTA. NO ESCAPE FROM FLAVOR.</p>
        </div>
      </footer>
    </div>
  );
}

