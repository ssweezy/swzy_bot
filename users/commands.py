from aiogram.types import Message, WebAppInfo, InlineKeyboardButton, ReplyKeyboardRemove
from aiogram.utils.keyboard import InlineKeyboardBuilder  
from users.db import DataBase

db = DataBase('swzy_db')



async def func_start(message: Message):
    # проверка добавлен ли человек в базу данных
    if not db.user_exists(message.from_user.id):
        db.add_user(message.from_user.id, message.from_user.username, message.from_user.first_name,
                    message.from_user.last_name, message.from_user.url)

    # открывается    
    builder = InlineKeyboardBuilder()
    builder.add(InlineKeyboardButton(
        text="открыть swzy!",
        web_app=WebAppInfo(url="https://iridescent-duckanoo-20b130.netlify.app/"))
    )
    await message.answer("bo", reply_markup=ReplyKeyboardRemove())
    await message.answer(f"welcome to SWZY! co ltd", reply_markup=builder.as_markup())
    print(message.text)