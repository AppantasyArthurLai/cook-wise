/**
 * Gemini API 相關工具函式
 */
const { GoogleGenAI } = require('@google/genai');
const { MODEL_NAME } = require('../config/constants');

// 建立 Gemini 客戶端
function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');
  return new GoogleGenAI({ apiKey });
}

// 創建標準請求配置
function createRequestConfig(prompt, options = {}) {
  const config = { 
    responseMimeType: options.mimeType || 'text/plain',
    ...options 
  };
  
  const contents = [{ 
    role: 'user', 
    parts: [{ text: prompt }] 
  }];
  
  return {
    model: options.model || MODEL_NAME,
    config,
    contents
  };
}

module.exports = {
  createGeminiClient,
  createRequestConfig
};
