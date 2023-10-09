import express from "express";

import {Diaries} from "../../../models/diaries.model";

export const getDiaryByUserId = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const foundDiaries = await Diaries.find(
    { telegramChatId: userId },
    {},
    { lean: true },
  );

  const diaryWithReversedRecords = foundDiaries.map((diary) => ({
    ...diary,
    records: [...diary.records.reverse()],
  }));

  return res.json(diaryWithReversedRecords);
};