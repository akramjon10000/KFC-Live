import React, { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

const CATEGORIES = ['All', 'burgers', 'buckets', 'chicken', 'snacks', 'drinks'];

const Menu = () => {
  const { products } = useMenu();
  const location = useLocation();
  const { t } = useLanguage();
  
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  // Handle incoming navigation state (e.g. from Home categories)
  useEffect(() => {
    if (location.state) {
        if (location.state.category) {
            setActiveCat(location.state.category);
        }
        if (location.state.search) {
            setSearch(location.state.search);
        }
    }
  }, [location]);

  const filtered = products.filter(item => {
    const matchesCat = activeCat === 'All' || item.category === activeCat;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Sticky Header Area */}
      <div className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-30 px-4 md:px-8 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900">{t.menu}</h1>
                
                {/* Search */}
                <div className="flex gap-2 w-full md:w-auto md:min-w-[400px]">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                        type="text" 
                        placeholder={t.searchPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="bg-white px-3 rounded-xl border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50">
                        <SlidersHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-1">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCat(cat);
                            setSearch(''); // Clear search when switching category manually
                        }}
                        className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-all border ${
                            activeCat === cat 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-red-200 hover:text-red-600'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-grow px-4 md:px-8 py-4 md:py-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {filtered.map(item => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
        
        {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 opacity-50">
                <img src="https://cdn-icons-png.flaticon.com/512/1147/1147854.png" alt="No chicken" className="w-16 h-16 mb-4 grayscale" />
                <p className="font-bold">Mahsulot topilmadi</p>
                {(activeCat !== 'All' || search) && (
                    <button 
                        onClick={() => {setActiveCat('All'); setSearch('');}}
                        className="mt-4 text-red-600 font-bold text-sm hover:underline"
                    >
                        Barchasini ko'rsatish
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Menu;