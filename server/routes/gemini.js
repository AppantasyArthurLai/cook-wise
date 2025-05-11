/**
 * Gemini API 相關路由
 */
const express = require('express');
const router = express.Router();
const apiMonitor = require('../monitors/apiMonitor');
const { logApiError } = require('../utils/logger');
const { createGeminiClient, createRequestConfig } = require('../utils/gemini');

// Gemini 文本生成 API
router.post('/', async (req, res) => {
  if (apiMonitor.isLimitReached()) {
    return res.status(429).json({ error: 'Daily API usage limit reached. Please try again tomorrow.' });
  }
  
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  
  try {
    // 記錄 API 呼叫
    apiMonitor.logApiCall(req, '/api/gemini');
    
    // 建立 Gemini 客戶端並送出請求
    const ai = createGeminiClient();
    const requestConfig = createRequestConfig(prompt);
    const response = await ai.models.generateContentStream(requestConfig);
    
    // 串流回應
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const chunk of response) {
      res.write(chunk.text);
    }
    res.end();
  } catch (err) {
    logApiError(req, err);
    res.status(500).json({ error: err.message });
  }
});

// Gemini 短句 API
router.post('/short-sentence', async (req, res) => {
  if (apiMonitor.isLimitReached()) {
    return res.status(429).json({ error: 'Daily API usage limit reached. Please try again tomorrow.' });
  }
  
  const { mainIngredient, cuisine, calorie, special, language = 'zh-TW' } = req.body;
  
  try {
    // 組合 prompt
    const isEnglish = language.startsWith('en');
    let prompt;
    let conds = [];
    
    if (isEnglish) {
      if (mainIngredient) conds.push(`Main ingredient: ${mainIngredient}`);
      if (cuisine) conds.push(`Cuisine type: ${cuisine}`);
      if (calorie) conds.push(`Calories: ${calorie} kcal`);
      if (special) conds.push(`Special requirements: ${special}`);
      const condStr = conds.length ? conds.join(', ') : 'no specific conditions';
      prompt = `Based on the following conditions, generate a friendly, personalized, light-hearted short sentence for a recipe loading screen: ${condStr}. Please respond in English.`;
    } else {
      if (mainIngredient) conds.push(`主食材：${mainIngredient}`);
      if (cuisine) conds.push(`料理類型：${cuisine}`);
      if (calorie) conds.push(`熱量：${calorie} 大卡`);
      if (special) conds.push(`特殊需求：${special}`);
      const condStr = conds.length ? conds.join('，') : '無特別條件';
      prompt = `請根據以下條件，產生一句貼心、專屬、輕鬆的短句，用於料理等待畫面：${condStr}。請用繁體中文回答。`;
    }
    
    // 記錄 API 呼叫
    apiMonitor.logApiCall(req, '/api/gemini/short-sentence');
    
    // 建立 Gemini 客戶端並送出請求
    const ai = createGeminiClient();
    const requestConfig = createRequestConfig(prompt);
    const response = await ai.models.generateContentStream(requestConfig);
    
    // 處理回應
    let sentence = '';
    for await (const chunk of response) {
      sentence += chunk.text;
    }
    
    // 只取第一句
    sentence = sentence.split(/[。！？\n]/)[0].trim() + '。';
    res.json({ sentence });
  } catch (err) {
    logApiError(req, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
