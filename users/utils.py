from aiogram import Bot
from aiogram.types import BotCommand, BotCommandScopeDefault


# меню команд в боте
async def bot_commands(bot: Bot):
    commands = [
        BotCommand(
            command="start",
            description="начать"
        )
    ]
    await bot.set_my_commands(commands, BotCommandScopeDefault())
    