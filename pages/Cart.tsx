import React, { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, CheckCircle, ShoppingBag, Tag, CreditCard, Banknote, ChevronRight, Truck, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/format';
import { useTelegram, useMainButton, useBackButton } from '../hooks/useTelegram';

const PAYMENT_METHODS = [
    { id: 'cash', name: 'Naqd pul', icon: '💵', desc: 'Yetkazib berishda to\'lash' },
    { id: 'payme', name: 'Payme', icon: '💳', desc: 'Karta orqali' },
    { id: 'click', name: 'Click', icon: '📱', desc: 'Mobil to\'lov' },
    { id: 'uzum', name: 'Uzum Bank', icon: '🏦', desc: 'Bank kartasi' },
];

const Cart = () => {
    const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const { user, currentAddress } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [success, setSuccess] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Telegram integration
    const { isTelegram, hapticFeedback, sendData, showConfirm } = useTelegram();

    const deliveryFee = total >= 50000 ? 0 : 10000;
    const discount = promoApplied ? Math.floor(total * 0.1) : 0;
    const finalTotal = total - discount + deliveryFee;

    // Telegram BackButton - navigate back
    useBackButton(() => {
        hapticFeedback('light');
        navigate(-1);
    }, isTelegram && items.length > 0);

    // Handle checkout with Telegram integration
    const handleCheckout = useCallback(async () => {
        if (!user) {
            navigate('/profile');
            return;
        }

        // Telegram confirmation
        if (isTelegram) {
            const confirmed = await showConfirm(`Buyurtmani tasdiqlaysizmi?\n\nJami: ${formatCurrency(finalTotal)}`);
            if (!confirmed) return;

            hapticFeedback('success');

            // Send order data to bot
            sendData({
                action: 'order',
                items: items.map(i => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price })),
                total: finalTotal,
                address: currentAddress,
                payment: paymentMethod,
                user: { phone: user.phone, name: user.name }
            });
        }

        placeOrder(
            items,
            finalTotal,
            currentAddress,
            user.phone,
            user.name || 'Mijoz'
        );

        clearCart();
        setSuccess(true);

        if (isTelegram) {
            hapticFeedback('success');
        }

        setTimeout(() => {
            setSuccess(false);
            navigate('/');
        }, 3000);
    }, [user, items, finalTotal, currentAddress, paymentMethod, isTelegram, hapticFeedback, sendData, showConfirm, placeOrder, clearCart, navigate]);

    // Telegram MainButton for checkout
    useMainButton(
        `Buyurtma berish • ${formatCurrency(finalTotal)}`,
        handleCheckout,
        {
            isVisible: isTelegram && items.length > 0 && !success,
            color: '#E4002B',
            textColor: '#FFFFFF'
        }
    );

    // Handle quantity change with haptic
    const handleQuantityChange = (itemId: string, delta: number) => {
        if (isTelegram) hapticFeedback('light');
        updateQuantity(itemId, delta);
    };

    // Handle remove with haptic
    const handleRemove = (itemId: string) => {
        if (isTelegram) hapticFeedback('medium');
        removeFromCart(itemId);
    };

    const handleApplyPromo = () => {
        if (promoCode.toUpperCase() === 'KFC50' || promoCode.toUpperCase() === 'KFC10') {
            setPromoApplied(true);
            setPromoError('');
            if (isTelegram) hapticFeedback('success');
        } else {
            setPromoError('Noto\'g\'ri promo kod');
            setPromoApplied(false);
            if (isTelegram) hapticFeedback('error');
        }
    };

    if (success) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-6">
                    <CheckCircle className="text-green-500 w-24 h-24 animate-bounce" />
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Buyurtma qabul qilindi! 🎉</h1>
                <p className="text-slate-500 text-lg mb-2">Sizning tovuqlaringiz tayyorlanmoqda...</p>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
                    <Clock size={16} className="text-orange-500" />
                    <span>Taxminiy vaqt: 25-40 daqiqa</span>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                    Bosh sahifaga qaytish
                </button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] px-4">
                <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={56} className="text-red-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.emptyCart}</h2>
                <p className="text-slate-500 text-center mb-8 max-w-md">{t.emptyCartDesc}</p>
                <button
                    onClick={() => navigate('/menu')}
                    className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                    {t.goToMenu} <ChevronRight size={18} />
                </button>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-8 py-6 max-w-6xl mx-auto min-h-screen">
            <h1 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 flex items-center gap-2">
                <ShoppingBag className="text-red-600" size={28} />
                {t.cart}
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left: Items List */}
                <div className="flex-1 w-full space-y-4">
                    {/* Delivery Info */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl flex items-center gap-3 border border-green-100">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Truck size={20} className="text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-green-800 text-sm">Bepul yetkazib berish</p>
                            <p className="text-green-600 text-xs">50,000 so'mdan ortiq buyurtmalarga</p>
                        </div>
                        {total >= 50000 && (
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">✓</span>
                        )}
                    </div>

                    {/* Items */}
                    {items.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform" />
                            <div className="ml-4 flex-grow min-w-0">
                                <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.name}</h3>
                                <p className="text-slate-500 text-xs line-clamp-1 mb-1">{item.description}</p>
                                <p className="text-red-600 font-bold">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <div className="flex items-center bg-slate-50 rounded-lg p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-red-600 active:scale-95 transition-all"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-green-600 active:scale-95 transition-all"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Summary Card */}
                <div className="w-full lg:w-96 flex-shrink-0 space-y-4">
                    {/* Promo Code */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Tag size={18} className="text-orange-500" />
                            <span className="font-bold text-slate-800">Promo kod</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Promo kodni kiriting"
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleApplyPromo}
                                className="bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                            >
                                Qo'llash
                            </button>
                        </div>
                        {promoApplied && (
                            <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                                <CheckCircle size={12} /> 10% chegirma qo'llanildi!
                            </p>
                        )}
                        {promoError && (
                            <p className="text-red-500 text-xs mt-2">{promoError}</p>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-3">
                            <CreditCard size={18} className="text-blue-500" />
                            <span className="font-bold text-slate-800">To'lov usuli</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {PAYMENT_METHODS.map(method => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`p-3 rounded-xl border-2 transition-all text-left ${paymentMethod === method.id
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="text-xl mb-1">{method.icon}</div>
                                    <p className="font-bold text-xs text-slate-800">{method.name}</p>
                                    <p className="text-[10px] text-slate-500">{method.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-red-500" />
                                <span className="font-bold text-slate-800 text-sm">Yetkazib berish manzili</span>
                            </div>
                            <button className="text-red-600 text-xs font-bold" onClick={() => navigate('/')}>O'zgartirish</button>
                        </div>
                        <p className="text-slate-600 text-sm mt-2 truncate">{currentAddress || 'Manzil tanlanmagan'}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">Buyurtma xulosasi</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Mahsulotlar ({items.length})</span>
                                <span className="font-medium">{formatCurrency(total)}</span>
                            </div>
                            {promoApplied && (
                                <div className="flex justify-between text-green-600">
                                    <span>Chegirma (10%)</span>
                                    <span className="font-medium">-{formatCurrency(discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-slate-600">
                                <span>Yetkazib berish</span>
                                <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                                    {deliveryFee === 0 ? 'Bepul' : formatCurrency(deliveryFee)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                <span className="font-black text-lg text-slate-900">Jami</span>
                                <span className="font-black text-2xl text-red-600">{formatCurrency(finalTotal)}</span>
                            </div>
                        </div>

                        <button
                            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-200 active:scale-[0.98] hover:bg-red-700 transition-all mt-6 flex items-center justify-center gap-2"
                            onClick={handleCheckout}
                        >
                            Buyurtma berish <ChevronRight size={20} />
                        </button>
                        <p className="text-center text-[10px] text-slate-400 mt-3">
                            Buyurtma berib, siz shartlarimizga rozilik bildirasiz
                        </p>
                    </div>

                    <div className="lg:hidden h-32"></div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="lg:hidden fixed bottom-20 left-4 right-4 bg-white p-4 rounded-2xl shadow-[0_-5px_30px_rgba(0,0,0,0.1)] border border-slate-100 z-30">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <span className="text-slate-500 text-xs">Jami</span>
                        <p className="font-black text-xl text-red-600">{formatCurrency(finalTotal)}</p>
                    </div>
                    <button
                        className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-[0.98] flex items-center gap-2"
                        onClick={handleCheckout}
                    >
                        Buyurtma <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;