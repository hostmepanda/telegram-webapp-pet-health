import express from "express";

import {Users} from "../../../models/users.model";

export const getMeByUserId = async (req: express.Request, res: express.Response) => {
  console.log(req.params);
  const { userId } = req.params;

  const foundUser = await Users.findOne({ telegramUserId: userId });

  if (!foundUser) {
    res.json({});
  } else {
    res.json(foundUser.toObject());
  }
}