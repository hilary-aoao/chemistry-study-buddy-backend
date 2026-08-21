require("dotenv").config();

const cors = require("cors");
app.use(cors());

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  const keyExists = process.env.GROQ_API_KEY ? "Key loaded" : "Key missing";
  res.send("Server is running. " + keyExists);
});

app.use(express.json());

app.post("/chat", async function (req, res) {
  const { messages, model } = req.body;

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY,
      },
      body: JSON.stringify({ model: model, messages: messages }),
    });

    const data = await groqResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong contacting Groq." });
  }
});

app.listen(PORT, function () {
  console.log("Server listening on http://localhost:" + PORT);
});