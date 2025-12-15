import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'uz' | 'ru';

interface Translations {
  home: string;
  menu: string;
  cart: string;
  profile: string;
  popular: string;
  categories: string;
  searchPlaceholder: string;
  total: string;
  checkout: string;
  emptyCart: string;
  login: string;
  logout: string;
  settings: string;
  language: string;
  slogan: string;
  freeDelivery: string;
  minOrder: string;
  seeAll: string;
  emptyCartDesc: string;
  goToMenu: string;
  subtotal: string;
  notification: string;
  delivery: string;
  pickup: string;
  reorder: string;
  addressPlaceholder: string;
  confirmLocation: string;
  locating: string;
  moveMap: string;
  locationPermissionDenied: string;
  searchAddress: string;
  entrance: string;
  floor: string;
  apartment: string;
  comment: string;
  save: string;
}

const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    menu: 'Menu',
    cart: 'Bucket',
    profile: 'Profile',
    popular: 'Top Hits',
    categories: 'Categories',
    searchPlaceholder: 'Search for chicken...',
    total: 'Total',
    checkout: 'Checkout',
    emptyCart: 'Your Bucket is empty',
    login: 'Login',
    logout: 'Log Out',
    settings: 'Settings',
    language: 'Language',
    slogan: "IT'S FINGER LICKIN' GOOD",
    freeDelivery: "Free Delivery",
    minOrder: "Orders over 150k",
    seeAll: "View All",
    emptyCartDesc: "Hungry? Let's load up some chicken!",
    goToMenu: "Order Now",
    subtotal: "Subtotal",
    notification: "Notifications",
    delivery: "Delivery",
    pickup: "Pickup",
    reorder: "Order Again",
    addressPlaceholder: "Select location",
    confirmLocation: "Confirm Location",
    locating: "Locating...",
    moveMap: "Move map to select location",
    locationPermissionDenied: "Location permission denied",
    searchAddress: "Search address...",
    entrance: "Ent",
    floor: "Floor",
    apartment: "Apt",
    comment: "Comment to courier",
    save: "Save Address",
  },
  uz: {
    home: 'Asosiy',
    menu: 'Menyu',
    cart: 'Savat',
    profile: 'Profil',
    popular: 'Xitlar',
    categories: 'Kategoriyalar',
    searchPlaceholder: 'Tovuq, burger izlash...',
    total: 'Jami',
    checkout: 'Rasmiylashtirish',
    emptyCart: 'Savatingiz bo\'sh',
    login: 'Kirish',
    logout: 'Chiqish',
    settings: 'Sozlamalar',
    language: 'Til',
    slogan: "MAZZASI O'ZGARCHA",
    freeDelivery: "Yetkazib berish bepul",
    minOrder: "150 000 so'mdan oshsa",
    seeAll: "Barchasi",
    emptyCartDesc: "Qorningiz ochdimi? Keling, buyurtma beramiz!",
    goToMenu: "Menyuga o'tish",
    subtotal: "Mahsulotlar",
    notification: "Xabarnomalar",
    delivery: "Yetkazib berish",
    pickup: "Olib ketish",
    reorder: "Qayta buyurtma",
    addressPlaceholder: "Manzilni tanlang",
    confirmLocation: "Manzilni tasdiqlash",
    locating: "Aniqlanmoqda...",
    moveMap: "Manzilni tanlash uchun xaritani suring",
    locationPermissionDenied: "Geolokatsiyaga ruxsat berilmadi",
    searchAddress: "Manzilni qidiring...",
    entrance: "Yo'lak",
    floor: "Qavat",
    apartment: "Xonadon",
    comment: "Kuryer uchun izoh",
    save: "Saqlash",
  },
  ru: {
    home: 'Главная',
    menu: 'Меню',
    cart: 'Корзина',
    profile: 'Профиль',
    popular: 'Хиты',
    categories: 'Категории',
    searchPlaceholder: 'Найти курочку...',
    total: 'Итого',
    checkout: 'Оформить',
    emptyCart: 'Корзина пуста',
    login: 'Войти',
    logout: 'Выйти',
    settings: 'Настройки',
    language: 'Язык',
    slogan: "ВКУСНО КАК НИКОГДА",
    freeDelivery: "Бесплатная доставка",
    minOrder: "От 150 000 сум",
    seeAll: "Все",
    emptyCartDesc: "Кажется, вы проголодались. Пора заказать курочку!",
    goToMenu: "В меню",
    subtotal: "Подытог",
    notification: "Уведомления",
    delivery: "Доставка",
    pickup: "Самовывоз",
    reorder: "Повторить",
    addressPlaceholder: "Выберите адрес",
    confirmLocation: "Подтвердить адрес",
    locating: "Определение...",
    moveMap: "Двигайте карту для выбора",
    locationPermissionDenied: "Доступ к геолокации запрещен",
    searchAddress: "Поиск адреса...",
    entrance: "Подъезд",
    floor: "Этаж",
    apartment: "Кв.",
    comment: "Комментарий курьеру",
    save: "Сохранить",
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('uz');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};