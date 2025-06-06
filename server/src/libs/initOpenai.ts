import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o", 
  temperature: 0.9,
  apiKey: process.env.OPENAI_API_KEY
});


export {model as openaiLlm}