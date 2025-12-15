import React, { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const AdminMenu = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...editingProduct,
      price: Number(editingProduct.price),
      id: editingProduct.id || Math.random().toString(36).substr(2, 9),
      popular: editingProduct.popular || false,
    } as Product;

    if (editingProduct.id) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct({});
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingProduct({ category: 'burgers', image: 'https://picsum.photos/400' });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">Menu Manager</h2>
        <button 
          onClick={openNew}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center space-x-2"
        >
          <Plus size={16} /> <span>Add Item</span>
        </button>
      </div>

      <div className="space-y-3">
        {products.map(product => (
          <div key={product.id} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
            <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900">{product.name}</h3>
                <div className="flex space-x-2">
                  <button onClick={() => openEdit(product)} className="text-blue-600 bg-blue-50 p-1.5 rounded-lg"><Edit2 size={16} /></button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-600 bg-red-50 p-1.5 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mb-1">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                 <span className="font-bold text-red-600 text-sm">{formatCurrency(product.price)}</span>
                 <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold uppercase text-slate-500">{product.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingProduct.id ? 'Edit Product' : 'New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                <input 
                  required
                  value={editingProduct.name || ''} 
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl"
                  placeholder="e.g. Spicy Burger"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price (UZS)</label>
                  <input 
                    required
                    type="number"
                    value={editingProduct.price || ''} 
                    onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    className="w-full p-3 border border-slate-200 rounded-xl"
                    placeholder="25000"
                  />
                </div>
                <div className="flex-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                   <select 
                      value={editingProduct.category || 'burgers'}
                      onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}
                      className="w-full p-3 border border-slate-200 rounded-xl bg-white"
                   >
                     {['burgers', 'buckets', 'chicken', 'snacks', 'drinks'].map(c => (
                       <option key={c} value={c}>{c}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                <div className="flex gap-2">
                   <input 
                    required
                    value={editingProduct.image || ''} 
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl"
                    placeholder="https://..."
                  />
                  {editingProduct.image && (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={editingProduct.image} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea 
                  required
                  value={editingProduct.description || ''} 
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl h-24"
                  placeholder="Tasty chicken with..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="popular"
                  checked={editingProduct.popular || false}
                  onChange={e => setEditingProduct({...editingProduct, popular: e.target.checked})}
                  className="w-5 h-5 accent-red-600 rounded"
                />
                <label htmlFor="popular" className="font-medium text-slate-700">Mark as Popular/Hit</label>
              </div>

              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg mt-4">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;