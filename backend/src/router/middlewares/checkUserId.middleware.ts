import express from "express";

export const checkUserId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { userId } = req.params;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).send('userId is not provided')
  }

  return next();
}