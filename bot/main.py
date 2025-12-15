"""
KFC Voice AI Delivery - Telegram Bot v2
Sodda va ishonchli versiya
"""

import os
import logging
import asyncio
from http.server import HTTPServer, BaseHTTPRequestHandler
import threading

# Load .env if exists
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# Config
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
WEBAPP_URL = os.getenv('WEBAPP_URL', 'https://kfc-live-nwzj.onrender.com')
PORT = int(os.getenv('PORT', 10000))

# Logging
logging.basicConfig(
    format='%(asctime)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# === HEALTH CHECK SERVER ===
class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        html = f"""<!DOCTYPE html>
<html>
<head><title>KFC Bot</title></head>
<body style="font-family:Arial;text-align:center;padding:50px;background:#E4002B;color:white;">
<h1>🍗 KFC Voice AI Bot</h1>
<p>✅ Bot ishlayapti!</p>
<p><a href="{WEBAPP_URL}" style="color:yellow;">Saytga o'tish</a></p>
</body>
</html>"""
        self.wfile.write(html.encode())
    
    def log_message(self, format, *args):
        pass

def start_health_server():
    server = HTTPServer(('0.0.0.0', PORT), HealthHandler)
    logger.info(f"Health server on port {PORT}")
    server.serve_forever()

# === BOT HANDLERS ===
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Start buyrug'i"""
    user = update.effective_user
    name = user.first_name or "Mehmon"
    
    # Ikkita tugma: inline link va oddiy URL
    keyboard = [
        [InlineKeyboardButton("🍗 Buyurtma berish", url=WEBAPP_URL)],
        [InlineKeyboardButton("📋 Menyu", url=f"{WEBAPP_URL}/#/menu")],
        [InlineKeyboardButton("🛒 Savat", url=f"{WEBAPP_URL}/#/cart")]
    ]
    
    await update.message.reply_text(
        f"Salom, {name}! 👋\n\n"
        f"🍗 *KFC O'zbekiston*ga xush kelibsiz!\n\n"
        f"Mazali tovuq taomlarimizni buyurtma qilish uchun tugmalarni bosing.\n\n"
        f"🎤 Saytda AI ovozli yordamchi bilan gapiring!\n\n"
        f"📱 Sayt: {WEBAPP_URL}",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Menyu ko'rsatish"""
    keyboard = [[InlineKeyboardButton("📋 Menyuni ochish", url=f"{WEBAPP_URL}/#/menu")]]
    await update.message.reply_text(
        "🍗 *KFC Menyu*\n\nBasketlar, Burgerlar, Tvisterlar!",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def cart(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Savat ko'rsatish"""
    keyboard = [[InlineKeyboardButton("🛒 Savatni ochish", url=f"{WEBAPP_URL}/#/cart")]]
    await update.message.reply_text(
        "🛒 *Savatingiz*\n\nBuyurtma berishga tayyormisiz?",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Yordam"""
    await update.message.reply_text(
        "🍗 *KFC Bot*\n\n"
        "/start - Boshlash\n"
        "/menu - Menyu\n"
        "/cart - Savat\n"
        "/help - Yordam\n\n"
        f"📱 Sayt: {WEBAPP_URL}",
        parse_mode='Markdown'
    )

async def link(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Sayt linkini yuborish"""
    await update.message.reply_text(
        f"📱 *Sayt linki:*\n{WEBAPP_URL}\n\n"
        f"Bu linkni bosing yoki nusxa olib brauzerda oching.",
        parse_mode='Markdown'
    )

# === MAIN ===
def main():
    if not BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN topilmadi!")
        return
    
    logger.info(f"Bot ishga tushmoqda... WEBAPP_URL: {WEBAPP_URL}")
    
    # Health server (background)
    threading.Thread(target=start_health_server, daemon=True).start()
    
    # Bot
    app = Application.builder().token(BOT_TOKEN).build()
    
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("menu", menu))
    app.add_handler(CommandHandler("cart", cart))
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CommandHandler("link", link))
    
    logger.info("Bot tayyor!")
    app.run_polling(drop_pending_updates=True)

if __name__ == '__main__':
    main()
