from aiogram.types import Message, WebAppInfo, KeyboardButton, ReplyKeyboardRemove, ReplyKeyboardMarkup
from aiogram.utils.keyboard import KeyboardBuilder  
from users.db import DataBase
from main import cfg, Bot

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

    # кнопка с ссылкой на вебапп 
    await message.answer("bo", reply_markup=ReplyKeyboardRemove())
    await message.answer(f"welcome to SWZY! co ltd", reply_markup=keyboard)
    print(message.text)


async def func_webapp(web_app_message, bot: Bot):
    
    print(web_app_message.web_app_data.data)

    # вывод сообщения с заказом
    data = web_app_message[0]
    items = data["items"]

    products = ''
    total_price = 0

    for elem in items:
        for info in elem:
            products += f'{info["title"]} {info["size"]}- {info["price"]}руб \n'
            total_price += int(info["price"])


    offer = f"""
    <b>чек заказа</b>

    имя клиента - {data["name"]}
    номер телефона - {data["phone"]}
    способ оплаты - {data["payment"]}
    способ получения - {data["shipping"]}

    состав заказа:
    {products}

    итого: {total_price}руб
    """

    # сообщение в чат владельцам
    offer_to_owner = f"""
    <b>чек заказа #</b>

    имя клиента - {data["name"]}
    номер телефона - {data["phone"]}
    способ оплаты - {data["payment"]}
    способ получения - {data["shipping"]}

    состав заказа:
    {products}

    итого: {total_price}руб
    """

    await web_app_message.answer(offer)
    await bot.send_message(cfg.admin, )
