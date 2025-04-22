import { ChatPromptTemplate } from "@langchain/core/prompts";
import { llm } from "@src/libs/initGroq";
import { openaiLlm } from "@src/libs/initOpenai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { Request } from "express";

const taggingPrompt = ChatPromptTemplate.fromTemplate(
  `you are PHD north indian farmer instructor, make more simple like illitrate indian farmer can understand (especially uttar pradesh wale), make them know in their own taste, like what they know about theese all sh#t
  give response in markdown format with headings and subheadings, and bullet points, and tables if needed, and also give examples in their own language (hindi), make them understand like they are 5 year old kid, use simple words and sentences, use emojis to make it more fun and engaging.
  give response in what language user have asked the question,
  i will give you crop, and land size and location, and you will give me the best fertilizer for that crop and land size and location,
  and also give me the best time to apply that fertilizer, and also give me the best way to apply that fertilizer, and also give me the best quantity of that fertilizer to apply, and also give me the best method to apply that fertilizer, and also give me the best time to harvest that crop, and also give me the best way to harvest that crop, and also give me the best quantity of that crop to harvest, and also give me the best method to harvest that crop, and also give me the best time to store that crop, and also give me the best way to store that crop, and also give me the best quantity of that crop to store, and also give me the best method to store that crop.
  and give me pesticide planner too, and precaution and safety measures too, and also give me the best time to apply that pesticide, and also give me the best way to apply that pesticide,
  main point : => you will have to give me two output, one is markdown that i have to show, and other one is that text output which will i have to give to llm for making that to speech which will more straight-forward, (will not speak much more)
  user query is: {input}`
);

const classificationSchema = z.object({
  markdown: z.string().describe("the markdown output for the user to see"),
  audio_output: z
    .string()
    .describe("the text output for the llm to convert to speech"),
});

// For streaming response
export const invokeStreamingOutput = async (input: string) => {
  const prompt = await taggingPrompt.invoke({
    input,
  });

  // Create a streaming chain
  const stream = await openaiLlm
    .withStructuredOutput(classificationSchema)
    .stream(prompt);

  // Convert to HTTP response
  const httpResponse = new Response(stream, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return httpResponse;
};

// HTTP handler
export const handler = async (request: any) => {
  try {
    // Extract input from request (adapt this based on your actual request format)
    const body = await request.json();
    const input = body.input || "";

    return await invokeStreamingOutput(input);
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
