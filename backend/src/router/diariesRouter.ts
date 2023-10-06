import express from "express";
import {Types} from "mongoose";

import {Diaries} from "../models/diaries.model";

const { ObjectId } = Types

const router = express.Router();

const checkUserId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { userId } = req.params;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).send('userId is not provided')
  }

  return next();
}

const getDiaryByUserId = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const foundDiaries = await Diaries.find(
    { telegramChatId: userId },
    {},
    { lean: true }
  );

  return res.json(foundDiaries);
};

const createDiaryForUserId = async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const createdDiary = new Diaries({
    telegramChatId: userId,
  });

  await createdDiary.save();

  res.json(createdDiary.toObject());
};

const deleteDiaryById = async (req: express.Request, res: express.Response) => {
  const { diaryId } = req.params;

  let diaryIdObject = undefined

  try {
    diaryIdObject = new ObjectId(diaryId);
  } catch {
    // do nothing
  }

  if (!diaryId || !diaryIdObject) {
    return res.status(400).send('diaryId is bad or not provided')
  }

  await Diaries.findOneAndDelete({ _id: diaryId });

  res.sendStatus(200);
};

const createRecordForDiary = async (req: express.Request, res: express.Response) => {
  const { diaryId } = req.params;
  const {
    recordDate,
    note,
  } = req.body;

  const updatedDiary = await Diaries.findOneAndUpdate(
    { _id: new ObjectId(diaryId) },
    {
      $push: { records: { recordDate, note } },
    },
    { lean: true, new: true },
  );

  res.json(updatedDiary);
};

router.use((req, res, next) => {
  console.log(`Incoming request at diaries on ${Date.now()}: ${req.url}`);
  next();
});

router.get('/:userId', checkUserId, getDiaryByUserId);
router.post('/:userId', checkUserId, createDiaryForUserId);
router.delete('/:diaryId', deleteDiaryById);
router.post('/:diaryId/records', createRecordForDiary);

export const diariesRouter = router;
