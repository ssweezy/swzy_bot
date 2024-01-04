from aiogram.types import Message, WebAppInfo, KeyboardButton, ReplyKeyboardRemove, ReplyKeyboardMarkup
from aiogram.utils.keyboard import KeyboardBuilder  
from users.db import DataBase

db = DataBase('swzy_db')
web_app = WebAppInfo(url="https://iridescent-duckanoo-20b130.netlify.app/")

keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="open SWZY!", web_app=web_app)]
    ],
    resize_keyboard=True
)

async def func_start(message: Message):
    # проверка добавлен ли человек в базу данных
    if not db.user_exists(message.from_user.id):
        db.add_user(message.from_user.id, message.from_user.username, message.from_user.first_name,
                    message.from_user.last_name, message.from_user.url)

    # открывается    
    await message.answer("bo", reply_markup=ReplyKeyboardRemove())
    await message.answer(f"welcome to SWZY! co ltd", reply_markup=keyboard)
    print(message.text)


async def func_webapp(web_app_message):
    
    print(web_app_message.web_app_data.data)
    await web_app_message.answer('web data recieved')
    await web_app_message.answer(web_app_message.web_app_data.data)