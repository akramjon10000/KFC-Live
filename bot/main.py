"""
KFC Voice AI Delivery - Telegram Bot
Bu bot veb ilovani Telegram Mini App sifatida ochadi
"""

import os
import json
import logging
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, MenuButtonWebApp
from telegram.ext import Application, CommandHandler, MessageHandler, ContextTypes, filters

# Logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Configuration
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
WEBAPP_URL = os.getenv('WEBAPP_URL', 'https://your-app.onrender.com')  # Deploy qilingan URL

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Start buyrug'i - Mini App ni ochish"""
    user = update.effective_user
    
    keyboard = [[
        InlineKeyboardButton(
            text="🍗 Buyurtma berish",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_html(
        f"Salom, {user.mention_html()}! 👋\n\n"
        f"🍗 <b>KFC O'zbekiston</b>ga xush kelibsiz!\n\n"
        f"Mazali tovuq taomlarimizni buyurtma qilish uchun quyidagi tugmani bosing.\n\n"
        f"🎤 <i>AI ovozli yordamchi bilan gapiring!</i>",
        reply_markup=reply_markup
    )

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Menyuni ko'rsatish"""
    keyboard = [[
        InlineKeyboardButton(
            text="📋 Menyuni ko'rish",
            web_app=WebAppInfo(url=f"{WEBAPP_URL}/#/menu")
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "🍗 KFC Menyu\n\n"
        "Basketlar, Burgerlar, Tvisterlar va boshqalar!",
        reply_markup=reply_markup
    )

async def cart(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Savatni ko'rsatish"""
    keyboard = [[
        InlineKeyboardButton(
            text="🛒 Savatni ko'rish",
            web_app=WebAppInfo(url=f"{WEBAPP_URL}/#/cart")
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "🛒 Sizning savatingiz\n\n"
        "Buyurtma berishga tayyormisiz?",
        reply_markup=reply_markup
    )

async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Mini App dan kelgan ma'lumotlarni qayta ishlash"""
    try:
        data = json.loads(update.effective_message.web_app_data.data)
        logger.info(f"WebApp data received: {data}")
        
        if data.get('action') == 'order':
            # Buyurtma ma'lumotlarini qayta ishlash
            items = data.get('items', [])
            total = data.get('total', 0)
            address = data.get('address', 'Noma\'lum')
            payment = data.get('payment', 'cash')
            
            items_text = "\n".join([f"  • {i['qty']}x {i['name']}" for i in items])
            
            await update.message.reply_html(
                f"✅ <b>Buyurtma qabul qilindi!</b>\n\n"
                f"📦 <b>Mahsulotlar:</b>\n{items_text}\n\n"
                f"💰 <b>Jami:</b> {total:,} so'm\n"
                f"📍 <b>Manzil:</b> {address}\n"
                f"💳 <b>To'lov:</b> {payment}\n\n"
                f"🚗 Yetkazib berish vaqti: 25-40 daqiqa\n\n"
                f"<i>Rahmat! Mazzali bo'lsin! 🍗</i>"
            )
            
            # Admin ga xabar yuborish (optional)
            # admin_chat_id = os.getenv('ADMIN_CHAT_ID')
            # if admin_chat_id:
            #     await context.bot.send_message(
            #         chat_id=admin_chat_id,
            #         text=f"🆕 Yangi buyurtma!\n\n{items_text}\nJami: {total:,} so'm"
            #     )
        else:
            await update.message.reply_text(f"Ma'lumot qabul qilindi: {data}")
            
    except Exception as e:
        logger.error(f"Error processing webapp data: {e}")
        await update.message.reply_text("Xatolik yuz berdi. Qayta urinib ko'ring.")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Yordam buyrug'i"""
    await update.message.reply_text(
        "🍗 <b>KFC Bot Buyruqlari:</b>\n\n"
        "/start - Botni ishga tushirish\n"
        "/menu - Menyuni ko'rish\n"
        "/cart - Savatni ko'rish\n"
        "/help - Yordam\n\n"
        "🎤 AI ovozli yordamchi bilan buyurtma bering!",
        parse_mode='HTML'
    )

async def post_init(application: Application) -> None:
    """Bot ishga tushganda Menu Button o'rnatish"""
    await application.bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(
            text="🍗 Buyurtma",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )
    )

def main() -> None:
    """Botni ishga tushirish"""
    if not BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN environment variable not set!")
        return
    
    # Application yaratish
    application = Application.builder().token(BOT_TOKEN).post_init(post_init).build()
    
    # Handlerlarni qo'shish
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("menu", menu))
    application.add_handler(CommandHandler("cart", cart))
    application.add_handler(CommandHandler("help", help_command))
    
    # WebApp data handler
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))
    
    # Botni polling rejimida ishga tushirish
    logger.info("Bot started!")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
