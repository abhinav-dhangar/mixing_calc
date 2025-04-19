import { ChatGroq } from "@langchain/groq";
import "dotenv/config"
const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  apiKey:process.env.GROQ_API_KEY,
  temperature: 0
});


export {llm}