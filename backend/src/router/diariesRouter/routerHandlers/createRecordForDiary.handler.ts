import express from "express";

import {Diaries} from "../../../models/diaries.model";
import {ObjectId} from "../helpers/diaryRouter.helper";

export const createRecordForDiary = async (req: express.Request, res: express.Response) => {
  const { diaryId } = req.params;
  const {
    recordDate,
    note,
    recordType,
  } = req.body;

  const updatedDiary = await Diaries.findOneAndUpdate(
    { _id: new ObjectId(diaryId) },
    {
      $push: { records: { recordDate, note, recordType } },
    },
    { lean: true, new: true, sort: { updatedAt: 'desc' } },
  );

  res.json(updatedDiary);
};
