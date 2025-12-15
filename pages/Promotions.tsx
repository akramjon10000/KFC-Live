import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Percent, Gift, Ticket } from 'lucide-react';

const PROMOTIONS = [
    {
        id: 1,
        title: '50% chegirma',
        description: 'Birinchi buyurtmangizga maxsus chegirma. Promo kod: KFC50',
        code: 'KFC50',
        validUntil: '31.12.2024',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600',
        color: 'from-red-500 to-orange-500',
    },
    {
        id: 2,
        title: 'Bepul yetkazish',
        description: '50,000 so\'mdan ortiq buyurtmalarga bepul yetkazib berish',
        code: null,
        validUntil: 'Doimiy aksiya',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
        color: 'from-green-500 to-emerald-500',
    },
    {
        id: 3,
        title: '2+1 Burger',
        description: '2 ta burger oling, 3-nchisi bepul! Faqat hafta oxirlarida',
        code: 'BURGER21',
        validUntil: '15.01.2025',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
        color: 'from-yellow-500 to-amber-500',
    },
    {
        id: 4,
        title: 'Tug\'ilgan kun',
        description: 'Tug\'ilgan kuningizda bepul desert! Profilingizda sanani ko\'rsating',
        code: null,
        validUntil: 'Doimiy aksiya',
        image: 'https://images.unsplash.com/photo-1513639776629-7b611d22f654?auto=format&fit=crop&q=80&w=600',
        color: 'from-purple-500 to-pink-500',
    },
    {
        id: 5,
        title: 'Oilaviy savat',
        description: 'Savat L + 2 ta ichimlik faqat 160,000 so\'m',
        code: 'FAMILY',
        validUntil: '31.01.2025',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=600',
        color: 'from-blue-500 to-cyan-500',
    },
];

const Promotions = () => {
    const navigate = useNavigate();

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        alert(`"${code}" nusxalandi!`);
    };

    return (
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                    <Gift className="text-red-600" size={28} />
                    Aksiyalar
                </h1>
                <p className="text-slate-500 text-sm mt-1">Maxsus takliflar va chegirmalar</p>
            </div>

            {/* Featured Promo */}
            <div className="relative bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl overflow-hidden shadow-xl mb-6 group cursor-pointer" onClick={() => navigate('/menu')}>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative z-10 p-6 md:p-10 flex items-center justify-between">
                    <div>
                        <span className="bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full mb-3 inline-block animate-pulse">
                            🔥 ENG YAXSHI TAKLIF
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-2">50% Chegirma</h2>
                        <p className="text-white/80 text-sm md:text-base mb-4">Birinchi buyurtmangizga. Promo kod: <span className="font-black bg-white/20 px-2 py-1 rounded">KFC50</span></p>
                        <button className="bg-white text-red-600 font-black px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                            Buyurtma berish <ChevronRight size={18} />
                        </button>
                    </div>
                    <div className="hidden md:block text-8xl animate-bounce">🍗</div>
                </div>
            </div>

            {/* Promo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROMOTIONS.map(promo => (
                    <div
                        key={promo.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group"
                    >
                        {/* Image */}
                        <div className="relative h-36 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-80`}></div>
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl md:text-3xl font-black text-white text-center uppercase drop-shadow-lg">{promo.title}</h3>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <p className="text-slate-600 text-sm mb-3">{promo.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Clock size={12} />
                                    <span>{promo.validUntil}</span>
                                </div>

                                {promo.code ? (
                                    <button
                                        onClick={() => copyCode(promo.code!)}
                                        className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors"
                                    >
                                        <Ticket size={12} />
                                        {promo.code}
                                    </button>
                                ) : (
                                    <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg font-bold text-xs">Avtomatik</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-slate-100 rounded-2xl p-6 text-center">
                <Percent size={40} className="text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-lg mb-2">Ko'proq chegirmalar olish uchun</h3>
                <p className="text-slate-600 text-sm mb-4">Telegram kanalimizga obuna bo'ling va maxsus promo kodlar oling</p>
                <button className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors">
                    📱 Telegram kanal
                </button>
            </div>

            {/* Bottom Spacing */}
            <div className="h-24 lg:h-0"></div>
        </div>
    );
};

export default Promotions;
