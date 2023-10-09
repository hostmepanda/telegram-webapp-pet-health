import express from "express";

export const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`Incoming request at diaries on ${Date.now()}: ${req.url}`);
  next();
}