import express from "express";
import {Diaries} from "../../../models/diaries.model";

export const createDiaryForUserId = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;
  const { petName } = req.body;

  const createdDiary = new Diaries({
    telegramChatId: userId,
    petName,
    recordTypes: [
      {
        symbol: '🍗',
        caption: 'Food',
      },
      {
        symbol: '💧',
        caption: 'Water',
      },
      {
        symbol: '💊',
        caption: 'Medicine',
      },
      {
        symbol: '💩',
        caption: 'Toilet',
      },
      {
        symbol: '🤮',
        caption: 'Vomit',
      },
      {
        symbol: '😵‍💫',
        caption: 'Illness attack',
      },
    ],
  });

  await createdDiary.save();

  res.json(createdDiary.toObject());
};
