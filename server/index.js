// Express proxy server for Gemini API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const apiMonitor = require('./monitors/apiMonitor');

const app = express();
const PORT = process.env.PORT || 3001;

// 在雲端環境中信任代理伺服器
app.set('trust proxy', 1);

// 建立日誌目錄
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// 速率限制配置 - 每個 IP 每小時最多 100 個請求
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 小時
  max: 100, // 每個 IP 限制 100 個請求
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// 允許的來源網址列表 (Origin)
const allowedOrigins = [
  'https://unique-croquembouche-330182.netlify.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:3001'
];

// 日誌記錄中介軟體
const logRequests = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const requestLog = {
    timestamp,
    ip: req.ip,
    method: req.method,
    path: req.path,
    query: req.query
  };
  
  // 建立日期化的日誌檔名
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logsDir, `api-requests-${today}.log`);
  
  // 寫入日誌
  fs.appendFile(logFile, JSON.stringify(requestLog) + '\n', (err) => {
    if (err) console.error('Error writing log:', err);
  });
  
  // 輸出到 console 以在 Render.com 上顯示
  console.log(`[REQUEST] ${timestamp} | IP: ${req.ip} | ${req.method} ${req.path}`);
  
  next();
};

// 請求來源驗證中介軟體
const validateOrigin = (req, res, next) => {
  const origin = req.get('Origin');
  const referer = req.get('Referer'); // 注意正確拼寫是 Referer
  
  // 如果是本地開發環境，直接通過
  if (process.env.NODE_ENV === 'development') {
    return next();
  }
  
  // 如果是來自直接的 API 請求（沒有 Origin），允許通過
  if (!origin && !referer) {
    return next();
  }
  
  // 檢查 origin 是否在允許列表中
  if (origin && allowedOrigins.includes(origin)) {
    return next();
  }
  
  // 如果沒有 origin 但有 referer，檢查 referer
  if (!origin && referer && allowedOrigins.some(allowed => referer.startsWith(allowed))) {
    return next();
  }
  
  return res.status(403).json({ 
    error: 'Access denied. Invalid origin.', 
    origin: origin || 'none',
    referer: referer || 'none'
  });
};

// 使用中介軟體
app.use(cors({
  origin: function(origin, callback) {
    // 允許沒有 origin 的請求 (如 API 編輯器或本機請求)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // 允許帶憑證的請求
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(logRequests);
app.use(validateOrigin); // 使用新的驗證函數
app.use('/api/', apiLimiter);

app.post('/api/gemini', async (req, res) => {
  // 檢查 API 使用量限制
  if (apiMonitor.isLimitReached()) {
    return res.status(429).json({ 
      error: 'Daily API usage limit reached. Please try again tomorrow.' 
    });
  }
  
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  try {
    // 使用新的 API 監控模組記錄請求
    apiMonitor.logApiCall(req, '/api/gemini');
    
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
    // 詳細記錄錯誤
    const errorLogFile = path.join(logsDir, `api-errors.log`);
    const errorEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      path: req.path,
      error: err.message
    };
    fs.appendFile(errorLogFile, JSON.stringify(errorEntry) + '\n', () => {});
    
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gemini/short-sentence', async (req, res) => {
  // 檢查 API 使用量限制
  if (apiMonitor.isLimitReached()) {
    return res.status(429).json({ 
      error: 'Daily API usage limit reached. Please try again tomorrow.' 
    });
  }
  
  const { mainIngredient, cuisine, calorie, special, language = 'zh-TW' } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  // 根據語言選擇決定提示語言
  const isEnglish = language.startsWith('en');
  
  let prompt;
  let conds = [];
  
  if (isEnglish) {
    // 英文提示
    if (mainIngredient) conds.push(`Main ingredient: ${mainIngredient}`);
    if (cuisine) conds.push(`Cuisine type: ${cuisine}`);
    if (calorie) conds.push(`Calories: ${calorie} kcal`);
    if (special) conds.push(`Special requirements: ${special}`);
    const condStr = conds.length ? conds.join(', ') : 'no specific conditions';
    prompt = `Based on the following conditions, generate a friendly, personalized, light-hearted short sentence for a recipe loading screen: ${condStr}. Please respond in English.`;
  } else {
    // 中文提示
    if (mainIngredient) conds.push(`主食材：${mainIngredient}`);
    if (cuisine) conds.push(`料理類型：${cuisine}`);
    if (calorie) conds.push(`熱量：${calorie} 大卡`);
    if (special) conds.push(`特殊需求：${special}`);
    const condStr = conds.length ? conds.join('，') : '無特別條件';
    prompt = `請根據以下條件，產生一句貼心、專屬、輕鬆的短句，用於料理等待畫面：${condStr}。請用繁體中文回答。`;
  }

  try {
    // 使用新的 API 監控模組記錄請求
    apiMonitor.logApiCall(req, '/api/gemini/short-sentence');
    
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
    // 詳細記錄錯誤
    const errorLogFile = path.join(logsDir, `api-errors.log`);
    const errorEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      path: req.path,
      error: err.message
    };
    fs.appendFile(errorLogFile, JSON.stringify(errorEntry) + '\n', () => {});
    
    res.status(500).json({ error: err.message });
  }
});

// 添加狀態檢查端點 (供您監控使用)
app.get('/api/status', async (req, res) => {
  // 只允許本地 IP 存取此端點
  if (req.ip !== '127.0.0.1' && req.ip !== '::1' && req.ip !== '::ffff:127.0.0.1') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  try {
    const stats = apiMonitor.getStats();
    res.json({
      status: 'ok',
      ...stats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 新增詳細的 API 使用量監控端點
app.get('/api/monitor/usage', (req, res) => {
  try {
    const stats = apiMonitor.getStats();
    // 將監控記錄輸出到 console
    console.log(`[MONITOR ACCESS] ${new Date().toISOString()} | IP: ${req.ip} | Usage stats requested`);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 將 app 導出供測試與 server.js 使用
module.exports = app;
