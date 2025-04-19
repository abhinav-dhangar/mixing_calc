import { invokeController } from "@src/controllers/invoke.controller"
import express from "express"


const llmRouter = express.Router()




llmRouter.post("/invoke",invokeController)


export {llmRouter}