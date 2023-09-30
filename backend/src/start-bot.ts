import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'no-bot-token';

const petHealthBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

petHealthBot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  await petHealthBot.sendMessage(chatId, 'Received your message!');
})