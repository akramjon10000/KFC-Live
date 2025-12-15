import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingBag, Gift, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const { items } = useCart();
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${isActive ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center z-40 shadow-[0_-2px_20px_rgba(0,0,0,0.08)]">
      <NavLink to="/" className={navClass}>
        <Home size={22} />
        <span className="text-[10px] font-semibold mt-0.5">Bosh sahifa</span>
      </NavLink>
      <NavLink to="/menu" className={navClass}>
        <UtensilsCrossed size={22} />
        <span className="text-[10px] font-semibold mt-0.5">Menyu</span>
      </NavLink>
      <NavLink to="/cart" className={navClass}>
        <div className="relative">
          <ShoppingBag size={22} />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
              {count}
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold mt-0.5">Savat</span>
      </NavLink>
      <NavLink to="/promotions" className={navClass}>
        <Gift size={22} />
        <span className="text-[10px] font-semibold mt-0.5">Aksiyalar</span>
      </NavLink>
      <NavLink to="/restaurants" className={navClass}>
        <MapPin size={22} />
        <span className="text-[10px] font-semibold mt-0.5">Filiallar</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;