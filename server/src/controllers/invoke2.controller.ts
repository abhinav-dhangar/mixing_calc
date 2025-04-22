import { openaiLlm } from "@src/libs/initOpenai";
import { Request, Response } from "express";
import { z } from "zod";

export const invoke2Controller = async (req: Request, res: Response) => {
  const { input } = req.body;
  const markdown = z.object({
    markdown: z
      .string()
      .describe(
        "the response related to query will be in markdown use advanced emoji related to it"
      ),
    audio_output: z
      .string()
      .describe(
        "the straightforward summary that you need to speak related to it"
      ),
  });

  const structuredLlm = openaiLlm.withStructuredOutput(markdown);

  const response = await structuredLlm.invoke(input);

  res.send(response);
};
