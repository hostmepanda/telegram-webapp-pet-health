import express from "express";

import {ObjectId} from "../helpers/diaryRouter.helper";
import {Diaries} from "../../../models/diaries.model";

export const deleteDiaryById = async (req: express.Request, res: express.Response) => {
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

