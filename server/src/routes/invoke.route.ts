import { invokeController } from "@src/controllers/invoke.controller";
import { invoke2Controller } from "@src/controllers/invoke2.controller";
import express from "express";

const llmRouter = express.Router();

llmRouter.post("/invoke", invokeController);
llmRouter.post("/invoke2", invoke2Controller);

export { llmRouter };
