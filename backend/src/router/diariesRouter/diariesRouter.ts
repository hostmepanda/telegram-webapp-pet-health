import express from "express";
import TelegramBot from "node-telegram-bot-api";

import {checkUserId} from "../middlewares/checkUserId.middleware";
import {getDiaryByUserId} from "./routerHandlers/getDiaryByUserId.handler";
import {createDiaryForUserId} from "./routerHandlers/createDiaryForUserId.handler";
import {deleteDiaryRecordById} from "./routerHandlers/deleteDiaryRecordById.handler";
import {createRecordForDiary} from "./routerHandlers/createRecordForDiary.handler";
import {deleteDiaryById} from "./routerHandlers/deleteDiaryById.handler";
import {logRequest} from "../middlewares/logRequest.middleware";
import {addShareWithToDiaryHandler} from "./routerHandlers/addShareWithToDiary.handler";

export const diariesRouter = (petHealthBot: TelegramBot) => {
  const router = express.Router();

  router.use(logRequest)

  router.get('/:userId', checkUserId, getDiaryByUserId);
  router.post('/:userId', checkUserId, createDiaryForUserId);
  router.delete('/:diaryId', deleteDiaryById);
  router.delete('/:diaryId/records/:recordId', deleteDiaryRecordById);
  router.post('/:diaryId/records', createRecordForDiary);
  router.post('/:diaryId/share', addShareWithToDiaryHandler(petHealthBot));

  return router;
};
