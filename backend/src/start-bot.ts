import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'no-bot-token';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://locahost:3000'

const petHealthBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

petHealthBot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text

  if (messageText === '/start') {
    await petHealthBot.sendMessage(
      chatId,
      'Received your message!',
      {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Open pet\'s diary',
              web_app: { url: WEB_APP_URL }
            }],
          ],
      }
    });
  }
})