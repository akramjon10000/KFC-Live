# 🍗 KFC Voice AI Delivery

<div align="center">
<img width="800" alt="KFC Voice AI" src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200" />

**Real-time Voice AI powered KFC delivery app with Telegram Mini App support**

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat&logo=telegram&logoColor=white)](https://telegram.org/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

## ✨ Xususiyatlar

- 🎤 **Voice AI** - Gemini Live API bilan real-time ovozli buyurtma
- 📱 **Telegram Mini App** - Telegram ichida to'liq ishlaydi
- 🛒 **Smart Cart** - Mahsulotlarni qo'shish/o'chirish
- 🗺️ **Xarita** - Leaflet bilan yetkazish joyi
- 💳 **To'lov** - Payme, Click, Uzum, Naqd
- 🌍 **Ko'p tilli** - O'zbek, Rus, Ingliz
- 📊 **Admin Panel** - Buyurtma va menyu boshqarish

## 🚀 Tez boshlash

### Lokal ishga tushirish

```bash
# Dependencies o'rnatish
npm install

# .env.local yaratish
cp .env.example .env.local
# GEMINI_API_KEY ni o'z kalitingiz bilan almashtiring

# Ishga tushirish
npm run dev
```

Brauzerda oching: http://localhost:3000

### Telegram Bot sozlash

1. **@BotFather** da yangi bot yarating
2. Bot token oling
3. Bot papkasida `.env` yarating:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
WEBAPP_URL=https://your-deployed-app.onrender.com
```

4. Bot ni ishga tushiring:

```bash
cd bot
pip install -r requirements.txt
python main.py
```

5. @BotFather da Web App URL sozlang:
   - `/mybots` → Bot tanlang → `Bot Settings` → `Menu Button` → `Configure menu button`
   - URL: Deploy qilingan app URL

## 🌐 Render.com ga deploy

1. GitHub ga push qiling
2. Render.com da yangi **Static Site** yarating
3. Sozlamalar:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**: `GEMINI_API_KEY`
4. Headers qo'shing (Telegram uchun):
   - `X-Frame-Options: ALLOWALL`
   - `Access-Control-Allow-Origin: *`

## 📁 Loyiha tuzilishi

```
kfc-voice-ai-delivery/
├── components/          # React komponentlar
│   ├── LiveAgent.tsx    # Voice AI agent
│   ├── ProductCard.tsx  # Mahsulot kartasi
│   └── ...
├── context/             # React Context
│   ├── CartContext.tsx  # Savat holati
│   ├── AuthContext.tsx  # Telegram auth
│   └── ...
├── hooks/               # Custom hooks
│   └── useTelegram.ts   # Telegram WebApp hook
├── pages/               # Sahifalar
├── types/               # TypeScript types
│   └── telegram.ts      # Telegram types
├── bot/                 # Telegram bot (Python)
│   ├── main.py
│   └── requirements.txt
├── render.yaml          # Render deployment
└── vite.config.ts       # Vite config
```

## 🔧 Telegram Mini App Integratsiyasi

### Mavjud hooklar:

```tsx
import { useTelegram, useMainButton, useBackButton } from './hooks/useTelegram';

// useTelegram - asosiy hook
const { 
  isTelegram,      // Telegram ichidami?
  user,            // Telegram user
  hapticFeedback,  // Tebranish
  showAlert,       // Alert ko'rsatish
  showConfirm,     // Tasdiqlash
  sendData,        // Bot ga data yuborish
  closeApp         // Appni yopish
} = useTelegram();

// useMainButton - asosiy tugma
useMainButton('Buyurtma berish', handleCheckout, {
  color: '#E4002B',
  isVisible: true
});

// useBackButton - orqaga tugma
useBackButton(() => navigate(-1), true);
```

### HapticFeedback turlari:
- `light`, `medium`, `heavy` - bosish
- `success`, `error`, `warning` - natija
- `selection` - tanlov

## 🎤 Voice AI

Gemini Live API orqali real-time ovozli buyurtma:

1. 🎤 Mikrofon tugmasini bosing
2. "Pepsi qo'sh" yoki "Katta basket beringlar" deb ayting
3. AI javob beradi va savatga qo'shadi

### Qo'llab-quvvatlanadigan buyruqlar:
- Mahsulot qo'shish: "2 ta burger qo'sh"
- Savat holati: "Savatda nima bor?"
- Buyurtma: "Buyurtma ber"

## 📜 License

MIT

---

<div align="center">

**Mazzasi o'zgarcha! 🍗**

</div>
