import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.post("/chat", async (req, res) => {
  const { message, mode } = req.body;
  let finalMessage = message;

  if (mode === "planner") {
    finalMessage = `Create a detailed study plan for: ${message}`;
  }
  if (mode === "quiz") {
    finalMessage = `Generate 5 quiz questions with answers on: ${message}`;
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: finalMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.json({
      reply: "Error connecting to AI",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
