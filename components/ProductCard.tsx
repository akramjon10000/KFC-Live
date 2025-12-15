import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { useTelegram } from '../hooks/useTelegram';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const { isTelegram, hapticFeedback } = useTelegram();

  const handleAddToCart = () => {
    if (isTelegram) hapticFeedback('medium');
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full border border-slate-100 group hover:shadow-xl hover:border-red-100 transition-all duration-300">
      {/* Image Area */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {product.popular && (
          <span className="absolute top-3 left-0 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-r-lg shadow-lg">
            🔥 HIT
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <h3 className="font-black text-slate-900 text-sm md:text-base lg:text-lg leading-tight mb-2 line-clamp-2 uppercase tracking-tight group-hover:text-red-600 transition-colors">{product.name}</h3>
        <p className="text-xs md:text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through decoration-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatCurrency(product.price * 1.2)}
            </span>
            <span className="font-black text-slate-900 text-base md:text-lg lg:text-xl">{formatCurrency(product.price).split(" ")[0]} <span className="text-xs font-normal text-slate-500">so'm</span></span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 active:scale-95 transition-all"
          >
            <Plus size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;