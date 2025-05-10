// Express proxy server for Gemini API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3001;

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

// 允許的來源網址列表 (Referrer)
const allowedReferrers = [
  'https://unique-croquembouche-330182.netlify.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

// 日誌記錄中介軟體
const logRequests = (req, res, next) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const logFile = path.join(logsDir, `api-requests-${date}.log`);
  
  const logEntry = {
    timestamp: now.toISOString(),
    ip: req.ip,
    method: req.method,
    path: req.path,
    referrer: req.get('Referrer') || 'none',
    userAgent: req.get('User-Agent') || 'none'
  };
  
  fs.appendFile(logFile, JSON.stringify(logEntry) + '\n', (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
  
  next();
};

// 請求來源驗證中介軟體
const validateReferrer = (req, res, next) => {
  const referrer = req.get('Referrer');
  
  // 如果是本地開發環境，直接通過
  if (process.env.NODE_ENV === 'development') {
    return next();
  }
  
  // 檢查 referrer 是否來自允許的網址
  if (!referrer || !allowedReferrers.some(allowed => referrer.startsWith(allowed))) {
    return res.status(403).json({ error: 'Access denied. Invalid referrer.' });
  }
  
  next();
};

// 用量計數器
let apiUsageCounter = {
  date: new Date().toISOString().split('T')[0],
  count: 0,
  limit: 1000 // 每日限制
};

// 重置計數器的函數 (每天執行一次)
const resetCounter = () => {
  const today = new Date().toISOString().split('T')[0];
  if (apiUsageCounter.date !== today) {
    // 紀錄昨天的使用量
    const usageLogFile = path.join(logsDir, `daily-usage.log`);
    fs.appendFile(usageLogFile, JSON.stringify(apiUsageCounter) + '\n', (err) => {
      if (err) console.error('Error writing usage log:', err);
    });
    
    // 重置計數器
    apiUsageCounter = {
      date: today,
      count: 0,
      limit: 1000
    };
  }
};

// 每天午夜重置計數器
setInterval(resetCounter, 60 * 60 * 1000); // 每小時檢查一次

// 使用中介軟體
app.use(cors({
  origin: allowedReferrers
}));
app.use(express.json());
app.use(logRequests);
app.use(validateReferrer);
app.use('/api/', apiLimiter);

app.post('/api/gemini', async (req, res) => {
  // 檢查 API 使用量限制
  resetCounter(); // 確保計數器是最新的
  if (apiUsageCounter.count >= apiUsageCounter.limit) {
    return res.status(429).json({ 
      error: 'Daily API usage limit reached. Please try again tomorrow.' 
    });
  }
  
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  try {
    // 增加計數器
    apiUsageCounter.count++;
    
    // 每 100 次請求記錄一次使用情況
    if (apiUsageCounter.count % 100 === 0) {
      console.log(`API usage: ${apiUsageCounter.count}/${apiUsageCounter.limit} on ${apiUsageCounter.date}`);
    }
    
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
  resetCounter(); // 確保計數器是最新的
  if (apiUsageCounter.count >= apiUsageCounter.limit) {
    return res.status(429).json({ 
      error: 'Daily API usage limit reached. Please try again tomorrow.' 
    });
  }
  
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
    // 增加計數器
    apiUsageCounter.count++;
    
    // 每 100 次請求記錄一次使用情況
    if (apiUsageCounter.count % 100 === 0) {
      console.log(`API usage: ${apiUsageCounter.count}/${apiUsageCounter.limit} on ${apiUsageCounter.date}`);
    }
    
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
    resetCounter();
    const stats = {
      status: 'ok',
      usage: apiUsageCounter,
      memory: process.memoryUsage(),
      uptime: process.uptime()
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server with security measures enabled, listening on http://localhost:${PORT}`);
  console.log(`API rate limits: ${apiLimiter.max} requests per ${apiLimiter.windowMs/1000/60/60} hour`);
  console.log(`Daily API call limit: ${apiUsageCounter.limit} calls`);
});
