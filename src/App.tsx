import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Flame, 
  Clock, 
  Gift, 
  Truck, 
  ChevronRight, 
  Plus, 
  Minus,
  MapPin,
  MessageSquare,
  History,
  ShieldAlert
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CATEGORIES, MENU_ITEMS, REWARDS } from './constants';
import { Category, FoodItem, CartItem } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
          <span className="font-bold text-xl tracking-tighter italic">THE JAILBIRD</span>
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

const FoodCard = ({ item, onClick }: { item: FoodItem, onClick: () => void, key?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="metallic-steel barbed-wire-border rounded-2xl overflow-hidden group cursor-pointer shadow-2xl flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image Container with Padding */}
      <div className="p-3 pb-0">
        <div className="relative aspect-square overflow-hidden rounded-xl shadow-inner bg-prison-black">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-prison-black/60 to-transparent pointer-events-none" />
          
          {/* Price Tag */}
          <div className="absolute top-2 right-2 bg-prison-black/90 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 shadow-lg">
            <span className="text-prison-orange font-black text-xs md:text-sm industrial-font">Rp {(item.price / 1000).toFixed(0)}k</span>
          </div>

          {/* Bestseller Badge (Simulated) */}
          {item.price > 50000 && (
            <div className="absolute top-2 left-2 bg-prison-orange text-black font-black text-[8px] md:text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-tighter rotate-[-5deg] shadow-lg">
              BESTSELLER
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-sm md:text-lg group-hover:text-prison-orange transition-colors uppercase tracking-tighter industrial-font leading-none">
            {item.name}
          </h3>
          {item.spicyLevel && (
            <div className="flex gap-0.5">
              {[...Array(item.spicyLevel)].map((_, i) => (
                <Flame key={i} className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-red-500" />
              ))}
            </div>
          )}
        </div>
        
        <p className="text-white/50 text-[10px] md:text-xs line-clamp-1 mb-3 font-medium italic">
          {item.shortDescription}
        </p>

        <div className="mt-auto space-y-3">
          {/* Delivery Info */}
          <div className="flex items-center gap-3 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/30">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span>Rp {item.deliveryCharge}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{item.deliveryTime}</span>
            </div>
          </div>

          {/* Add to Lockup Button */}
          <button className="w-full orange-gradient-glow text-black font-black text-[10px] md:text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 uppercase tracking-tighter transition-all active:scale-95 group-hover:brightness-110">
            <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />
            ADD TO LOCKUP
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FoodDrawer = ({ item, onClose, onAddToCart }: { 
  item: FoodItem | null, 
  onClose: () => void,
  onAddToCart: (item: FoodItem) => void
}) => {
  if (!item) return null;

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
        className="relative w-full max-w-2xl bg-prison-grey rounded-t-3xl brutal-border border-white/20 p-6 md:p-8 overflow-y-auto max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-prison-orange text-black rounded-full hover:bg-white transition-colors shadow-lg z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-2xl overflow-hidden brutal-border border-white/10">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-prison-orange text-black px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
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
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">{item.name}</h2>
            <p className="text-prison-orange text-2xl font-bold mb-6">Rp {item.price.toLocaleString()}</p>
            
            <div className="space-y-4 mb-8">
              <p className="text-white/70 leading-relaxed italic">
                {item.fullDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Delivery</p>
                  <p className="text-sm font-bold">Rp {item.deliveryCharge.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Time</p>
                  <p className="text-sm font-bold">{item.deliveryTime}</p>
                </div>
              </div>

              {item.freeGift && (
                <div className="bg-prison-orange/10 p-3 rounded-xl border border-prison-orange/20 flex items-center gap-3">
                  <Gift className="text-prison-orange w-5 h-5" />
                  <div>
                    <p className="text-[10px] text-prison-orange uppercase font-bold">Free Gift</p>
                    <p className="text-sm font-bold">{item.freeGift}</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              className="mt-auto w-full orange-gradient-glow text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-tighter transition-all active:scale-95 hover:brightness-110"
            >
              <ShieldAlert className="w-5 h-5" />
              ADD TO LOCKUP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ onSelectItem }: { onSelectItem: (item: FoodItem) => void }) => {
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
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 -translate-y-12 md:-translate-y-[250px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-prison-orange text-black px-4 py-1 font-bold text-sm mb-6 rotate-[-2deg] brutal-border border-black"
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

          {/* Categories under the handcuffs */}
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 translate-y-32 md:translate-y-[200px]">
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

      {/* Menu Grid */}
      <section id="menu" className="pt-0 pb-12 max-w-7xl mx-auto px-4 scroll-mt-20 -mt-8 md:-mt-16 relative z-30">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard 
                key={item.id} 
                item={item} 
                onClick={() => onSelectItem(item)} 
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

const WardensOffice = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
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

const CartPage = ({ cart, updateQuantity, checkout }: { 
  cart: CartItem[], 
  updateQuantity: (id: string, delta: number) => void,
  checkout: (details: { name: string, address: string }) => void
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = cart.reduce((acc, item) => acc + (item.deliveryCharge), 0);
  const total = subtotal + delivery;

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
            <div key={item.id} className="bg-prison-grey p-4 rounded-2xl brutal-border border-white/10 flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                <p className="text-prison-orange font-bold text-xs">Rp {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
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
              <label className="text-[10px] font-bold text-white/40 uppercase mb-1 block">Cell Block Address (Yogyakarta)</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full address"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-prison-orange transition-colors resize-none"
              />
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
              <span>Rp {delivery.toLocaleString()}</span>
            </div>
            <div className="h-[1px] bg-black/10 my-4" />
            <div className="flex justify-between text-2xl font-black italic">
              <span>TOTAL</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>
          <button 
            disabled={!name || !address}
            onClick={() => checkout({ name, address })}
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
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = ({ name, address }: { name: string, address: string }) => {
    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity})`).join('%0A');
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity) + item.deliveryCharge, 0);
    
    const message = `*NEW ORDER FROM THE JAILBIRD*%0A%0A*Customer:* ${name}%0A*Address:* ${address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total:* Rp ${total.toLocaleString()}%0A%0A_Sent from The Jailbird PWA_`;
    
    // Replace with actual WhatsApp number
    const whatsappNumber = '6281234567890'; 
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
              <HomePage onSelectItem={setSelectedItem} />
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

