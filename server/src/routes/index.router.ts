import express from "express";
import { helloworldRouter } from "./helloworld.route";
import { llmRouter } from "./invoke.route";

const router = express.Router();

router.use("/", helloworldRouter);
router.use('/api/llm',llmRouter)
export { router };
