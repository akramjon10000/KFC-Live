import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { MENU_ITEMS } from '../constants';

// Version to force menu update when constants.ts changes
const MENU_VERSION = 'v2.3-all-images-fixed';

interface MenuContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedVersion = localStorage.getItem('kfc_menu_version');
    // If version doesn't match, use fresh MENU_ITEMS from constants.ts
    if (savedVersion !== MENU_VERSION) {
      localStorage.setItem('kfc_menu_version', MENU_VERSION);
      localStorage.removeItem('kfc_menu');
      return MENU_ITEMS;
    }
    const saved = localStorage.getItem('kfc_menu');
    return saved ? JSON.parse(saved) : MENU_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('kfc_menu', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  return (
    <MenuContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};