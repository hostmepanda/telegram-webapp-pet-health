import express from "express";
import {logRequest} from "../middlewares/logRequest.middleware";
import {getMeByUserId} from "./routerHandlers/getMeByuserId.handler";

const router = express.Router();

router.use(logRequest)

router.get('/me/:userId', getMeByUserId);

export const usersRouter = router;
