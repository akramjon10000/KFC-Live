import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, Clock, MapPin, Truck, Star, ChevronRight, Gift } from 'lucide-react';
import AddressModal from '../components/AddressModal';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentAddress, setCurrentAddress } = useAuth();
  const { products } = useMenu();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const popularItems = products.filter(i => i.popular);


  const categories = [
    { id: 'buckets', name: 'Basketlar', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400', emoji: '🍗' },
    { id: 'burgers', name: 'Burgerlar', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', emoji: '🍔' },
    { id: 'chicken', name: 'Tvisterlar', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=400', emoji: '🌯' },
    { id: 'snacks', name: 'Sneklar', img: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=400', emoji: '🍟' },
    { id: 'drinks', name: 'Ichimliklar', img: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&q=80&w=400', emoji: '🥤' },
    { id: 'sauces', name: 'Souslar', img: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&q=80&w=400', emoji: '🥫' },
  ];

  const handleCategoryClick = (id: string) => {
    navigate('/menu', { state: { category: id } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with Address */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="px-4 md:px-12 lg:px-16 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* KFC Logo */}
              <div className="w-12 h-12 kfc-gradient rounded-xl flex items-center justify-center text-white font-black italic text-lg tracking-tighter shadow-lg shadow-red-200 lg:hidden">
                KFC
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Truck size={10} className="text-red-600" />
                    {orderType === 'delivery' ? 'Yetkazib berish' : 'Olib ketish'}
                  </span>
                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">25-40 min</span>
                </div>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="flex items-center gap-1 text-slate-900 font-bold text-sm md:text-base text-left group"
                >
                  <MapPin size={14} className="text-red-600 flex-shrink-0" />
                  <span className="truncate max-w-[180px] md:max-w-none border-b border-dashed border-slate-300 group-hover:border-red-600 transition-colors">
                    {currentAddress || "Manzilingizni tanlang"}
                  </span>
                  <ChevronDown size={14} className="text-red-600 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Working Hours & Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                <Clock size={12} className="text-red-600" />
                <span className="font-medium">09:00 - 23:00</span>
              </div>
              <div
                className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate('/profile')}
              >
                <img src="https://ui-avatars.com/api/?name=KFC&background=E4002B&color=fff&bold=true" alt="Avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onConfirm={(addr) => {
          setCurrentAddress(addr);
          setIsAddressModalOpen(false);
        }}
      />

      <div className="px-4 md:px-12 lg:px-16 py-6 space-y-8">

        {/* Delivery Toggle */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-full flex shadow-md border border-slate-100 relative w-full max-w-xs">
            <button
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all z-10 ${orderType === 'delivery' ? 'text-white' : 'text-slate-500'}`}
              onClick={() => setOrderType('delivery')}
            >
              🚗 Yetkazish
            </button>
            <button
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all z-10 ${orderType === 'pickup' ? 'text-white' : 'text-slate-500'}`}
              onClick={() => setOrderType('pickup')}
            >
              🏪 Olib ketish
            </button>
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] kfc-gradient rounded-full transition-all duration-300 shadow-lg ${orderType === 'delivery' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
            ></div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" style={{ minHeight: '320px' }}>
          {/* Background with KFC Red Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-800"></div>

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          {/* Animated Glowing Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -left-10 w-32 h-32 bg-orange-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-10 right-1/3 w-48 h-48 bg-red-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-12 py-8 md:py-12">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center max-w-lg">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-900 text-xs md:text-sm font-black px-4 py-2 rounded-full shadow-lg" style={{ animation: 'bounce 2s infinite' }}>
                  <span className="text-base">🔥</span> SUPER TAKLIF
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-none tracking-tight mb-3" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                50% <span className="text-yellow-400">CHEGIRMA</span>
              </h1>

              {/* Description */}
              <p className="text-white/90 text-sm md:text-lg font-medium mb-6 max-w-md leading-relaxed">
                Birinchi buyurtmangizga maxsus chegirma. Promo kod:
                <span className="inline-block ml-2 font-black bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/30">KFC50</span>
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/menu')}
                className="group/btn bg-white text-red-600 font-black text-sm md:text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all w-fit flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Buyurtma berish
                  <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover/btn:opacity-100 transition-opacity font-black">
                  Buyurtma berish <ChevronRight size={20} />
                </span>
              </button>
            </div>

            {/* Right Side - Large KFC Chicken Image */}
            <div className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-80 lg:w-[450px] xl:w-[500px] h-full items-center justify-center group-hover:scale-110 transition-transform duration-700">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glowing Circle Behind */}
                <div className="absolute w-72 lg:w-96 h-72 lg:h-96 bg-gradient-radial from-yellow-400/50 via-orange-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-64 lg:w-80 h-64 lg:h-80 bg-white/10 rounded-full"></div>

                {/* Main Chicken Image - KATTA */}
                <img
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800"
                  alt="KFC Chicken Bucket"
                  className="relative w-full max-w-[400px] lg:max-w-[480px] h-auto object-contain z-10"
                  style={{
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    transform: 'rotate(-5deg)'
                  }}
                />
              </div>
            </div>

            {/* Mobile Image - Kattaroq */}
            <div className="md:hidden absolute right-0 bottom-0 w-40 h-40">
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400"
                alt="KFC Chicken"
                className="relative w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))' }}
              />
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-red-900/50 to-transparent"></div>

          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Truck size={20} className="text-green-600" />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-800">Bepul yetkazish</p>
            <p className="text-[10px] md:text-xs text-slate-500">50,000+ so'm</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock size={20} className="text-orange-600" />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-800">25-40 daqiqa</p>
            <p className="text-[10px] md:text-xs text-slate-500">O'rtacha vaqt</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Star size={20} className="text-yellow-600" />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-800">4.8 reyting</p>
            <p className="text-[10px] md:text-xs text-slate-500">10,000+ sharh</p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-slate-900 text-xl md:text-2xl">Kategoriyalar</h2>
            <button onClick={() => navigate('/menu')} className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline">
              Barchasi <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-lg hover:border-red-200 hover:-translate-y-1 transition-all group"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl mb-2 overflow-hidden relative">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-2xl mb-1">{cat.emoji}</span>
                <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-black text-slate-900 text-xl md:text-2xl">Mashhur taomlar</h2>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">TOP</span>
            </div>
            <button onClick={() => navigate('/menu')} className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline">
              Barchasi <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
            {popularItems.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

        {/* Voice AI Promo */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-600 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-white/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Gift size={20} className="text-white" />
              <span className="text-white/90 text-xs font-bold uppercase">Maxsus taklif</span>
            </div>
            <h3 className="text-white font-black text-xl md:text-2xl">Ovozli AI bilan buyurtma bering!</h3>
            <p className="text-white/80 text-sm mt-1">Mikrofon tugmasini bosing va o'zbekcha gapiring</p>
          </div>
          <div className="text-5xl md:text-6xl animate-bounce">🎤</div>
        </div>

      </div>
    </div>
  );
};

export default Home;