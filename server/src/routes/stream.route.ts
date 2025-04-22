import { streamController } from "@src/controllers/stream.controller";
import express from "express";

const streamRouter = express.Router();

streamRouter.get("/stream", streamController);

export { streamRouter };
