import { invokeOutput } from "@utils/llmCall";

import { Request, Response } from "express";

export const invokeController = async (req: Request, res: Response) => {
  const { input } = req.body;

  const response = await invokeOutput(input);
  res.status(200).json(response);
};
