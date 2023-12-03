from aiogram.types import Message



async def func_start(message: Message):
    await message.answer(f"@{message.from_user.username} welcome to SWZY!.co.ltd")