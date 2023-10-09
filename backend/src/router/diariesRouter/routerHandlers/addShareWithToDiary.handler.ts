import express from "express";
import TelegramBot from "node-telegram-bot-api";

import {Diaries} from "../../../models/diaries.model";
import {ObjectId} from "../helpers/diaryRouter.helper";

const BOT_USER_NAME = process.env.BOT_USER_NAME ?? 'not-provided';
const APP_NAME = process.env.APP_NAME ?? 'not-provided';

export const addShareWithToDiaryHandler = (petHealthBot: TelegramBot) =>
  async (req: express.Request, res: express.Response) => {
  const { diaryId } = req.params;
  const { telegramUserId: shareTelegramUserId } = req.body;

  try {
    new ObjectId(diaryId);
  } catch (error) {
    res.status(401).send('Bad diaryId');
  }

  try {
    const diaryDocument = await Diaries.findOne(
      { _id: new ObjectId(diaryId) },
      {},
      { lean: true },
    );

    if (!diaryDocument) {
      console.error(`Can't find diary document by provided id ${diaryId}`);
      return res.sendStatus(401);
    }

    const generatedCheckCode = parseInt(`${Math.random() * 10000}`, 10) + 1000;

    await Diaries.updateOne(
      { _id: new ObjectId(diaryId) },
      { $push: { sharedWith: { telegramId: shareTelegramUserId, checkCode: generatedCheckCode } } },
      { lean: true },
    );

    const base64ShareParams = Buffer.from(`{"code": "${generatedCheckCode}", "uid": "${shareTelegramUserId}"}`).toString('base64')
    const shareLink = `https://t.me/${BOT_USER_NAME}/${APP_NAME}?startapp=${base64ShareParams}`;
    await petHealthBot.sendMessage(diaryDocument.telegramChatId as string, `Please share this link with telegram contact you entered on share screen to give access to your diary ${shareLink}`);

    return res.sendStatus(200);
  } catch (error) {
    console.error(`Error happened while sharing a diary`, { error });
    return res.sendStatus(401);
  }
}