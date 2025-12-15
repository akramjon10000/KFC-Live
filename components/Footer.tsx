import React from 'react';
import { Phone, Clock, MapPin, Instagram, Facebook, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white mt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white font-black italic text-2xl tracking-tighter shadow-lg">
                                KFC
                            </div>
                            <div>
                                <h3 className="font-black text-xl">KFC O'zbekiston</h3>
                                <p className="text-slate-400 text-sm">Finger Lickin' Good</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 max-w-md">
                            Dunyo bo'ylab mashhur mazali tovuq taomlarini yetkazib beruvchi rasmiy xizmat.
                            Tez, sifatli va mazali!
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                                <Send size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Bog'lanish</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Phone size={18} className="text-red-500" />
                                <span className="text-sm">+998 71 200 00 00</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <Clock size={18} className="text-red-500" />
                                <span className="text-sm">09:00 - 23:00</span>
                            </div>
                            <div className="flex items-start gap-3 text-slate-400">
                                <MapPin size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">Toshkent sh., Amir Temur xiyoboni, 108</span>
                            </div>
                        </div>
                    </div>

                    {/* App Download */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Ilovani yuklab oling</h4>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors">
                                <div className="text-2xl">📱</div>
                                <div>
                                    <p className="text-[10px] text-slate-400">Download on</p>
                                    <p className="font-bold text-sm">App Store</p>
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors">
                                <div className="text-2xl">🤖</div>
                                <div>
                                    <p className="text-[10px] text-slate-400">Get it on</p>
                                    <p className="font-bold text-sm">Google Play</p>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2024 KFC O'zbekiston. Barcha huquqlar himoyalangan.
                    </p>
                    <div className="flex gap-4 text-slate-500 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
                        <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
