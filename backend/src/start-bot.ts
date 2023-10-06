import TelegramBot from 'node-telegram-bot-api';
import * as mongoose from "mongoose";
import express from 'express';
import cors from 'cors';

import {usersRouter} from "./router/usersRouter";
import {diariesRouter} from "./router/diariesRouter";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'no-bot-token';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://locahost:3000';
const DB_URI = process.env.DB_URI || 'http://127.0.0.1';

(async () => {
  const expressApp = express();

  expressApp.use(express.json());
  expressApp.use(cors());
  expressApp.use('/users', usersRouter);
  expressApp.use('/diaries', diariesRouter);

  expressApp.listen(4000, () => {
    console.log(`expressApp app listening on port ${4000}`)
  });

  try {
    console.log(`MongoDB: connecting to database...`);
    await mongoose.connect(DB_URI);
    console.log(`MongoDB: connection is established successfully`);
  } catch (error) {
    console.error(
      `Error happend while connecting MongoDB`,
      { error },
    );
  }

  const petHealthBot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
    polling: true,
  });

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
})();
