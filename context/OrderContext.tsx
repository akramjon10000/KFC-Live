import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem } from '../types';
import { formatCurrency } from '../utils/format';

// --- TELEGRAM CONFIG ---
// O'zingizning Bot Token va Chat IDingizni shu yerga yozing
// BotFather dan token oling va @userinfobot orqali IDingizni aniqlang
const TG_BOT_TOKEN = 'SIZNING_BOT_TOKENINGIZ'; // Masalan: "123456789:AAFg..."
const TG_CHAT_ID = 'SIZNING_CHAT_IDINGIZ';     // Masalan: "987654321"

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number, address: string, phone: string, userName: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kfc_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kfc_orders', JSON.stringify(orders));
  }, [orders]);

  const sendTelegramNotification = async (order: Order, userName: string) => {
    if (!TG_BOT_TOKEN || TG_BOT_TOKEN.includes('SIZNING')) {
      console.warn("Telegram Token kiritilmagan! Console da ko'rsatilmoqda.");
      return;
    }

    const itemsList = order.items
      .map(i => `- ${i.name} (${i.quantity} x ${formatCurrency(i.price)})`)
      .join('\n');

    const message = `
🍗 <b>Yangi Buyurtma!</b> #${order.id}

👤 <b>Mijoz:</b> ${userName}
📞 <b>Tel:</b> ${ (order as any).phone }
📍 <b>Manzil:</b> ${ (order as any).address }

🛒 <b>Buyurtma tarkibi:</b>
${itemsList}

💰 <b>Jami:</b> ${formatCurrency(order.total)}
📅 <b>Vaqt:</b> ${new Date(order.date).toLocaleString('uz-UZ')}
    `;

    try {
      // FIX: GET metodi va 'no-cors' rejimi brauzerdagi Network xatolarini oldini oladi
      const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`;
      
      await fetch(url, { 
        method: 'GET',
        mode: 'no-cors' // Juda muhim: Bu javobni o'qishga ruxsat bermaydi, lekin serverga yetib boradi
      });
    } catch (error) {
      console.error("Telegramga yuborishda xatolik (CORS/Network):", error);
      // Xatolik bo'lsa ham dastur to'xtab qolmasligi kerak
    }
  };

  const placeOrder = (items: CartItem[], total: number, address: string, phone: string, userName: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items,
      total,
      status: 'new',
      date: new Date().toISOString(),
      address,
      phone
    } as any; 

    setOrders(prev => [newOrder, ...prev]);
    
    // Telegramga yuborish (Async, foydalanuvchini kutdirib o'tirmaydi)
    sendTelegramNotification(newOrder, userName);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};