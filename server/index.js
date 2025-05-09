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

app.post('/api/gemini/short-sentence', async (req, res) => {
  const { mainIngredient, cuisine, calorie, special } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  // 組 prompt
  let conds = [];
  if (mainIngredient) conds.push(`主食材：${mainIngredient}`);
  if (cuisine) conds.push(`料理類型：${cuisine}`);
  if (calorie) conds.push(`熱量：${calorie} 大卡`);
  if (special) conds.push(`特殊需求：${special}`);
  const condStr = conds.length ? conds.join('，') : '無特別條件';
  const prompt = `請根據以下條件，產生一句貼心、專屬、輕鬆的短句，用於料理等待畫面：${condStr}`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const config = { responseMimeType: 'text/plain' };
    const contents = [
      { role: 'user', parts: [{ text: prompt }] },
    ];
    const model = 'gemini-2.5-flash-preview-04-17';
    const response = await ai.models.generateContentStream({ model, config, contents });
    let sentence = '';
    for await (const chunk of response) {
      sentence += chunk.text;
    }
    // 只取第一句
    sentence = sentence.split(/[。！？\n]/)[0].trim() + '。';
    res.json({ sentence });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server listening on http://localhost:${PORT}`);
});
