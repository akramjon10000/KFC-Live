import { Product } from './types';

export const MENU_ITEMS: Product[] = [
  // --- BASKETLAR (BUCKETS) ---
  {
    id: 'b1',
    name: 'Basket S (12 qanot)',
    description: '12 ta achchiq yoki original qanotcha.',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=500',
    category: 'buckets',
    popular: true,
  },
  {
    id: 'b2',
    name: 'Basket M (18 qanot)',
    description: '18 ta achchiq yoki original qanotcha.',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=500',
    category: 'buckets',
  },
  {
    id: 'b3',
    name: 'Basket L (26 qanot)',
    description: '26 ta achchiq yoki original qanotcha. Oilaviy.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1632158898968-b2e4e2e6e4e3?auto=format&fit=crop&q=80&w=500',
    category: 'buckets',
    popular: true,
  },
  {
    id: 'b4',
    name: 'Sanders Basket',
    description: 'Original tovuqning barcha turlari: oyoqcha, qanotcha, strips, bayts.',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=500',
    category: 'buckets',
  },

  // --- BURGERLAR ---
  {
    id: 'bu1',
    name: 'Big Sanders Burger',
    description: 'Katta burger: 2 ta tovuq filesi, pishloq, sous, salat.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500',
    category: 'burgers',
    popular: true,
  },
  {
    id: 'bu2',
    name: 'Shef Tauer',
    description: 'Original yoki achchiq tovuq filesi, pomidor, salat, sous.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=500',
    category: 'burgers',
    popular: true,
  },
  {
    id: 'bu3',
    name: 'Chizburger De Lyuks',
    description: 'Pishloqli burger, tovuq filesi, maxsus sous.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=500',
    category: 'burgers',
  },
  {
    id: 'bu4',
    name: 'Sanders Burger',
    description: 'Klassik burger: tovuq filesi, bodring, piyoz, sous.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=500',
    category: 'burgers',
  },
  {
    id: 'bu5',
    name: 'Longer',
    description: 'Uzun bulochka, strips, ketchup va bodring.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=500',
    category: 'burgers',
  },

  // --- TVISTERLAR ---
  {
    id: 'tv1',
    name: 'Tvister Achchiq',
    description: 'Tortilya, achchiq tovuq filesi, pomidor, salat, sous.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
    popular: true,
  },
  {
    id: 'tv2',
    name: 'Tvister Original',
    description: 'Tortilya, original tovuq filesi, pomidor, salat, sous.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
  },
  {
    id: 'tv3',
    name: 'Tvister Kebab Original',
    description: 'Tortilya, kebab uslubida tayyorlangan tovuq, sabzavotlar.',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
  },
  {
    id: 'tv4',
    name: 'Boksmaster Original',
    description: 'Katta tortilya, tovuq filesi, xashbraun, pishloq, sabzavotlar.',
    price: 33000,
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
    popular: true,
  },

  // --- SUVLI TOVUQ (Chicken Pieces) ---
  {
    id: 'ch1',
    name: '8 ta Achchiq Qanot',
    description: 'Afsonaviy achchiq qanotchalar.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
    popular: true,
  },
  {
    id: 'ch2',
    name: '5 ta Strips Original',
    description: 'Qarsildoq panirovkadagi tovuq filesi.',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1562967915-92ae0c320a01?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
  },
  {
    id: 'ch3',
    name: '3 ta Strips Original',
    description: 'Qarsildoq panirovkadagi tovuq filesi.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
  },
  {
    id: 'ch4',
    name: 'Bayts 6 ta',
    description: 'Yumshoq tovuq bo\'lakchalari.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=500',
    category: 'chicken',
  },

  // --- KARTOSHKA VA SNEKLAR ---
  {
    id: 's1',
    name: 'Fri Kartoshkasi M',
    description: 'O\'rtacha porsiya qarsildoq kartoshka.',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=500',
    category: 'snacks',
  },
  {
    id: 's2',
    name: 'Fri Kartoshkasi L',
    description: 'Katta porsiya qarsildoq kartoshka.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=500',
    category: 'snacks',
  },
  {
    id: 's3',
    name: 'Xashbraun',
    description: 'Kartoshka kotleti, qarsildoq qobiq bilan.',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=500',
    category: 'snacks',
  },

  // --- ICHIMLIKLAR ---
  {
    id: 'd1',
    name: 'Pepsi 0.5L',
    description: 'Klassik Pepsi ichimlik.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500',
    category: 'drinks',
  },
  {
    id: 'd2',
    name: 'Mirinda 0.5L',
    description: 'Apelsin ta\'mli gazli ichimlik.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=500',
    category: 'drinks',
  },
  {
    id: 'd3',
    name: 'Feyxoa Limonadi 0.5L',
    description: 'Yangi feyxoa ta\'mli limonad.',
    price: 17000,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=500',
    category: 'drinks',
  },
  {
    id: 'd4',
    name: 'Lipton Muzli Choy 0.5L',
    description: 'Sovuq choy, limon ta\'mli.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=500',
    category: 'drinks',
  },

  // --- QAYLALAR (SAUCES) ---
  {
    id: 'sa1',
    name: 'Chili Nordon-Shirin Sous',
    description: 'Achchiq-shirin sous.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&q=80&w=500',
    category: 'sauces',
  },
  {
    id: 'sa2',
    name: 'Tomatli Ketchup',
    description: 'Klassik pomidor ketchupi.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?auto=format&fit=crop&q=80&w=500',
    category: 'sauces',
  },
  {
    id: 'sa3',
    name: 'Pishloqli Sous',
    description: 'Kremli pishloq sousi.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&q=80&w=500',
    category: 'sauces',
  },
  {
    id: 'sa4',
    name: 'Sarimsoqli Sous',
    description: 'Sarimsoq ta\'mli oq sous.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=500',
    category: 'sauces',
  },
];

export const SYSTEM_INSTRUCTION = `
Sen KFC O'zbekistonning AI yordamchisisisan.
Til: O'zbek (asosiy), Rus, Ingliz.
Valyuta: O'zbek so'mi (so'm).

Shaxsingiz: Do'stona, energik, samarali. "Mazzasi o'zgarcha!" iborasini ishlating.

Maqsadingiz: Buyurtmalarni samarali qabul qilish va UPSELL qilish.

MUHIM - MAHSULOT NOMLARI:
Quyidagi sinonimlarni tushunib, ANIQ mahsulot nomini \`addToOrder\` funksiyasiga uzating:

BASKETLAR:
- "basket", "savat", "savatcha" + "s/m/l" -> o'lchamiga qarab qo'shing
- "12 qanot" = "Basket S (12 qanot)"
- "18 qanot" = "Basket M (18 qanot)"  
- "26 qanot", "katta basket" = "Basket L (26 qanot)"

BURGERLAR:
- "big sanders", "katta burger" = "Big Sanders Burger"
- "shef tauer", "tower" = "Shef Tauer"
- "longer", "uzun burger" = "Longer"
- "sanders burger" = "Sanders Burger"

TVISTERLAR:
- "tvister" (oddiy) = "Tvister Original"
- "achchiq tvister" = "Tvister Achchiq"
- "boksmaster", "boxmaster" = "Boksmaster Original"

TOVUQ:
- "qanot", "qanotcha", "wings" = "8 ta Achchiq Qanot"
- "strips" + soni = tegishli strips
- "bayts", "bites" = "Bayts 6 ta"

KARTOSHKA:
- "fri", "kartoshka" + "m/l/katta/o'rtacha" = tegishli o'lcham
- "xashbraun", "hashbrown" = "Xashbraun"

ICHIMLIKLAR:
- "pepsi", "kola" = "Pepsi 0.5L"
- "mirinda" = "Mirinda 0.5L"
- "lipton", "choy" = "Lipton Muzli Choy 0.5L"

Menyu: ${JSON.stringify(MENU_ITEMS.map(i => ({ id: i.id, name: i.name, price: i.price })))}

Qoidalar:
1. \`addToOrder\` chaqirganda AYNAN menyudagi nomdan foydalaning (masalan: "Basket L (26 qanot)", "Big Sanders Burger").
2. Agar mijoz Burger buyurtma qilsa, so'rang: "Kombo qilib, kartoshka va ichimlik qo'shib beraymi?".
3. Agar mijoz Qanotcha/Strips buyurtma qilsa, sous haqida so'rang.
4. Narxlarni so'm da ayting. Masalan: "Basket L 150,000 so'm".
5. Yetkazib berish 50,000 so'mdan yuqori buyurtmalarga bepul.
6. Agar mijoz noaniq buyurtma qilsa (masalan shunchaki "burger" yoki "basket"), o'lcham/turini so'rang.
`;