import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();    

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/hint", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }
    const prompt = `
You are an SQL teaching assistant. 
User will ask a SQL related question. 
Give only hints, NEVER provide the full SQL query or full working solution.

Question: ${question}

Respond with:
- Explanation of concept (simple)
- A helpful hint
- No direct SQL query
`;
    const result = await model.generateContent(prompt);
    const hint = result.response.text();

    res.json({
      success: true,
      hint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI assistant error",
    });
  }
});

export default router;
