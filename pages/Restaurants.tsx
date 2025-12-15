import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RESTAURANTS = [
    {
        id: 1,
        name: 'KFC Amir Temur',
        address: 'Amir Temur xiyoboni, 108',
        phone: '+998 71 200 00 01',
        hours: '09:00 - 23:00',
        rating: 4.8,
        reviews: 1250,
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400',
        coords: { lat: 41.311151, lng: 69.279737 },
        features: ['Drive Thru', 'Wi-Fi', 'Parking'],
    },
    {
        id: 2,
        name: 'KFC Chilonzor',
        address: 'Chilonzor 9-kvartal, 15',
        phone: '+998 71 200 00 02',
        hours: '10:00 - 22:00',
        rating: 4.7,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
        coords: { lat: 41.285714, lng: 69.204853 },
        features: ['Wi-Fi', 'Kids Zone'],
    },
    {
        id: 3,
        name: 'KFC Yunusobod',
        address: 'Yunusobod tumani, Amir Temur ko\'chasi, 45',
        phone: '+998 71 200 00 03',
        hours: '09:00 - 23:00',
        rating: 4.9,
        reviews: 2100,
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400',
        coords: { lat: 41.365714, lng: 69.284853 },
        features: ['Drive Thru', 'Wi-Fi', 'Parking', 'Kids Zone'],
    },
    {
        id: 4,
        name: 'KFC Sergeli',
        address: 'Sergeli tumani, O\'zbekiston ko\'chasi, 22',
        phone: '+998 71 200 00 04',
        hours: '10:00 - 22:00',
        rating: 4.6,
        reviews: 650,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
        coords: { lat: 41.225714, lng: 69.224853 },
        features: ['Parking'],
    },
    {
        id: 5,
        name: 'KFC Samarqand Darvoza',
        address: 'Samarqand Darvoza ko\'chasi, 55',
        phone: '+998 71 200 00 05',
        hours: '09:00 - 23:00',
        rating: 4.8,
        reviews: 1800,
        image: 'https://images.unsplash.com/photo-1513639776629-7b611d22f654?auto=format&fit=crop&q=80&w=400',
        coords: { lat: 41.298714, lng: 69.264853 },
        features: ['Drive Thru', 'Wi-Fi', 'Parking'],
    },
    {
        id: 6,
        name: 'KFC Tashkent City',
        address: 'Tashkent City Mall, 2-qavat',
        phone: '+998 71 200 00 06',
        hours: '10:00 - 22:00',
        rating: 4.9,
        reviews: 3200,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
        coords: { lat: 41.312714, lng: 69.294853 },
        features: ['Wi-Fi', 'Kids Zone'],
    },
];

const Restaurants = () => {
    const navigate = useNavigate();
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

    return (
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                    <MapPin className="text-red-600" size={28} />
                    Restoranlarimiz
                </h1>
                <p className="text-slate-500 text-sm mt-1">Toshkent shahrida {RESTAURANTS.length} ta restoran</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-red-600">{RESTAURANTS.length}</p>
                    <p className="text-xs text-slate-600 font-medium">Restoranlar</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-green-600">24/7</p>
                    <p className="text-xs text-slate-600 font-medium">Yetkazib berish</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-yellow-600">4.8</p>
                    <p className="text-xs text-slate-600 font-medium">O'rtacha reyting</p>
                </div>
            </div>

            {/* Restaurant List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RESTAURANTS.map(restaurant => (
                    <div
                        key={restaurant.id}
                        onClick={() => setSelectedRestaurant(selectedRestaurant === restaurant.id ? null : restaurant.id)}
                        className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all cursor-pointer ${selectedRestaurant === restaurant.id ? 'border-red-500 shadow-lg' : 'border-slate-100 hover:shadow-md'
                            }`}
                    >
                        {/* Image */}
                        <div className="relative h-36 overflow-hidden">
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold">{restaurant.rating}</span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 text-lg mb-2">{restaurant.name}</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2 text-slate-600">
                                    <MapPin size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{restaurant.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Clock size={14} className="text-green-500" />
                                    <span>{restaurant.hours}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Phone size={14} className="text-blue-500" />
                                    <span>{restaurant.phone}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {restaurant.features.map(feature => (
                                    <span
                                        key={feature}
                                        className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-1 rounded-full"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.coords.lat},${restaurant.coords.lng}`, '_blank');
                                    }}
                                    className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1 hover:bg-red-700 transition-colors"
                                >
                                    <Navigation size={14} />
                                    Yo'nalish
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/menu');
                                    }}
                                    className="flex-1 bg-slate-100 text-slate-800 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1 hover:bg-slate-200 transition-colors"
                                >
                                    Buyurtma <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Spacing for mobile nav */}
            <div className="h-24 lg:h-0"></div>
        </div>
    );
};

export default Restaurants;
