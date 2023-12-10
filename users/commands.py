from aiogram.types import Message, WebAppInfo, ReplyKeyboardMarkup, KeyboardButton
from users.db import DataBase

db = DataBase('swzy_db')



async def func_start(message: Message):
    if not db.user_exists(message.from_user.id):
        db.add_user(message.from_user.id, message.from_user.username, message.from_user.first_name,
                    message.from_user.last_name, message.from_user.url)
        
    kb = [
        [KeyboardButton(text="открыть swzy!", web_app=WebAppInfo(url="https://iridescent-duckanoo-20b130.netlify.app/"))]
    ]
    keyboard = ReplyKeyboardMarkup(
        keyboard=kb,
        resize_keyboard=True)
    
    await message.answer(f"welcome to SWZY! co ltd", reply_markup=keyboard)