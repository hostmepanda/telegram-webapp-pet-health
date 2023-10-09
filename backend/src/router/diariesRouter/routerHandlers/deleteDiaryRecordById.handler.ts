import express from "express";

import {Diaries} from "../../../models/diaries.model";
import {ObjectId} from "../helpers/diaryRouter.helper";

export const deleteDiaryRecordById = async (req: express.Request, res: express.Response) => {
  const { diaryId, recordId } = req.params;

  let diaryIdObject = undefined;
  let recordIdObject = undefined;

  try {
    diaryIdObject = new ObjectId(diaryId);
    recordIdObject = new ObjectId(recordId);
  } catch {
    // do nothing
  }

  if (!diaryId || !diaryIdObject || !recordId || !recordIdObject) {
    return res.status(400).send('diaryId or recordId are bad or not provided')
  }

  await Diaries.findOneAndUpdate(
    { _id: diaryId },
    {
      $pull: { records: { _id: recordIdObject } },
    }
  );

  res.sendStatus(200);
};
