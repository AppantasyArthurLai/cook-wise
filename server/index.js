// Express proxy server for Gemini API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const config = { responseMimeType: 'text/plain' };
    const contents = [
      { role: 'user', parts: [{ text: prompt }] },
    ];
    const model = 'gemini-2.5-flash-preview-04-17';
    const response = await ai.models.generateContentStream({ model, config, contents });
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const chunk of response) {
      res.write(chunk.text);
    }
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server listening on http://localhost:${PORT}`);
});
