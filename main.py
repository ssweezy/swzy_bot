import asyncio
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.types import ContentType
import config as cfg
from users.commands import func_start, func_webapp



# works at launching the bot
async def on_start(bot: Bot):
    await bot.send_message(cfg.admin, "launched")
    print("launched")


# works when bot stopped
async def on_shutdown(bot: Bot):
    await bot.send_message(cfg.admin, "stopped")
    print("stopped")


async def main():
    logging.basicConfig(level=logging.INFO, filename="history.log", encoding="utf-8",
                        format="%(asctime)s %(levelname)s %(message)s")
    bot = Bot(cfg.TOKEN, parse_mode='HTML')
    dp = Dispatcher()

    # func registration
    dp.startup.register(on_start)
    dp.shutdown.register(on_shutdown)

    dp.message.register(func_start, F.text == "/start")
    dp.message.register(func_webapp, F.web_app_data)

    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()

if __name__ == "__main__":
    asyncio.run(main())

