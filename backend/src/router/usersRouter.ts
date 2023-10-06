import express from "express";
import {Users} from "../models/users.model";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Incoming request at users on ${Date.now()}: ${req.url}`);
  next();
})

router.get('/me/:userId', async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;

  const foundUser = await Users.findOne({ telegramUserId: userId });

  if (!foundUser) {
    res.json({});
  } else {
    res.json(foundUser.toObject());
  }
});

export const usersRouter = router;
