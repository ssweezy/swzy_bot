from aiogram import Bot
from aiogram.types import Message, WebAppInfo, KeyboardButton, ReplyKeyboardRemove, ReplyKeyboardMarkup
from aiogram.utils.keyboard import KeyboardBuilder  
from users.db import DataBase
import config as cfg
import json

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
    print(message.text, message.from_user.username)


async def func_webapp(web_app_message, bot: Bot):
    if web_app_message.chat.type != 'private':
        await web_app_message.answer('бот не принимает заказы в чатах')
        return

    # print(web_app_message)
    await web_app_message.answer('до меня дошел ваш заказ')
    # print(web_app_message.web_app_data.data, end="\n")
    


    # вывод сообщения с заказом
    data = json.loads(web_app_message.web_app_data.data)[0]
    
    items = data["items"]

    products = ''
    total_price = 0

    for elem in items:
        for info in elem:
            products += f'{info["title"]} {info["size"]} - {info["price"]}руб \n'
            total_price += int(info["price"])

    offer = f"""<b>чек заказа</b>

имя клиента - {data["name"]}
номер телефона - {data["phone"]}
способ оплаты - {data["payment"]}
способ получения - {data["shipping"]}

состав заказа:
{products}

итого: {total_price}руб
    """
    # сообщение в чат владельцам
    offer_to_owner = f"""<b>чек заказа #</b>

юз клиента - @{web_app_message.chat.username}
ссылка на клиента - tg://user?id={web_app_message.chat.id}
имя - {data["name"]}
номер телефона - {data["phone"]}
способ оплаты - {data["payment"]}
способ получения - {data["shipping"]}
адрес доставки - {data["address"]}

состав заказа:
{products}

итого: {total_price}руб
    """   

    await web_app_message.answer(f'{offer}')
    await bot.send_message(cfg.admin, f'{offer_to_owner}')
