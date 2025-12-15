import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { Order } from '../../types';
import { Clock, MapPin, Phone, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrders();

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-black text-lg text-slate-900">#{order.id}</h3>
          <p className="text-xs text-slate-400">{new Date(order.date).toLocaleString()}</p>
        </div>
        <span className="font-bold text-red-600">{formatCurrency(order.total)}</span>
      </div>

      <div className="space-y-1 mb-3">
        {(order as any).phone && (
           <div className="flex items-center text-sm text-slate-600 space-x-2">
              <Phone size={14} /> <span>{(order as any).phone}</span>
           </div>
        )}
        {(order as any).address && (
           <div className="flex items-center text-sm text-slate-600 space-x-2">
              <MapPin size={14} /> <span className="line-clamp-1">{(order as any).address}</span>
           </div>
        )}
      </div>

      <div className="bg-slate-50 p-2 rounded-lg mb-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm text-slate-700">
            <span>{item.quantity}x {item.name}</span>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
        {['new', 'cooking', 'delivering', 'completed'].map((status) => (
           <button
             key={status}
             onClick={() => updateOrderStatus(order.id, status as any)}
             disabled={order.status === status}
             className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition-all border ${
               order.status === status 
                 ? 'bg-slate-900 text-white border-slate-900' 
                 : 'bg-white text-slate-500 border-slate-200 hover:border-red-200 hover:text-red-600'
             }`}
           >
             {status}
           </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pb-20">
      <h2 className="text-2xl font-black text-slate-900 mb-4">Order Manager</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <Clock size={48} className="mx-auto mb-4 text-slate-400" />
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* New Orders */}
          {orders.some(o => o.status === 'new') && (
            <div>
               <h3 className="font-bold text-blue-600 uppercase text-xs tracking-wider mb-2">New Orders</h3>
               {orders.filter(o => o.status === 'new').map(o => <OrderCard key={o.id} order={o} />)}
            </div>
          )}

          {/* In Progress */}
          {orders.some(o => ['cooking', 'delivering'].includes(o.status)) && (
            <div>
               <h3 className="font-bold text-orange-600 uppercase text-xs tracking-wider mb-2">In Progress</h3>
               {orders.filter(o => ['cooking', 'delivering'].includes(o.status)).map(o => <OrderCard key={o.id} order={o} />)}
            </div>
          )}

          {/* Completed */}
          {orders.some(o => o.status === 'completed') && (
             <div>
               <h3 className="font-bold text-green-600 uppercase text-xs tracking-wider mb-2">History</h3>
               {orders.filter(o => o.status === 'completed').map(o => <OrderCard key={o.id} order={o} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;