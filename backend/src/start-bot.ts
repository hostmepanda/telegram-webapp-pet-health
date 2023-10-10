import TelegramBot from 'node-telegram-bot-api';
import * as mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

let certificates = {};

import {usersRouter} from "./router/userRouter/usersRouter";
import {diariesRouter} from "./router/diariesRouter/diariesRouter";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'no-bot-token';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://locahost:3000';
const DB_URI = process.env.DB_URI || 'http://127.0.0.1';
const LISTEN_PORT = process.env.LISTEN_PORT ?? 4000;
const PROTOCOL_TO_SERVE = process.env.PROTOCOL_TO_SERVE === 'https' ? 'https' : 'http';

(async () => {
  const expressApp = express();

  const petHealthBot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
    polling: true,
  });

  expressApp.use(express.json());
  expressApp.use(cors());
  expressApp.use('/users', usersRouter);
  expressApp.use('/diaries', diariesRouter(petHealthBot));


  if (PROTOCOL_TO_SERVE === 'https') {
    certificates = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    };
    https.createServer(certificates, expressApp).listen(LISTEN_PORT, () => {
      console.log(`expressApp app listening on ${PROTOCOL_TO_SERVE} port ${LISTEN_PORT}`)
    });
  } else {
    expressApp.listen(LISTEN_PORT, () => {
      console.log(`expressApp app listening on ${PROTOCOL_TO_SERVE} port ${LISTEN_PORT}`)
    });

  }

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

  petHealthBot
    .on('message', async (msg) => {
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
                  web_app: {url: WEB_APP_URL}
                }],
              ],
            }
          });
      }
    })
})();
