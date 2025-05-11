/**
 * Express Gemini API 代理伺服器主入口
 * 使用模組化架構組織程式碼
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// 導入配置與工具
const { REQUEST_BODY_LIMIT, ALLOWED_ORIGINS } = require('./config/constants');
const { ensureLogDir } = require('./utils/logger');

// 導入中介軟體
const logRequests = require('./middleware/logger');
const { validateOrigin, apiLimiter } = require('./middleware/security');

// 導入路由
const geminiRoutes = require('./routes/gemini');
const monitorRoutes = require('./routes/monitor');

// 建立 Express 應用實例
const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// 確保日誌目錄存在
ensureLogDir();

// ===== 全域中介軟體註冊 =====
// 基本設定
app.set('trust proxy', 1);
app.use(helmet()); // 安全 HTTP 標頭

// 處理 CORS
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// 解析與安全
app.use(express.json({ limit: REQUEST_BODY_LIMIT }));
app.use(logRequests);
app.use(validateOrigin);

// API 路由
app.use('/api/gemini', apiLimiter, geminiRoutes);
app.use('/api', apiLimiter); // 所有 API 都套用速率限制
app.use('/api/monitor', monitorRoutes);

// 狀態端點
const { getStatus } = require('./routes/monitor');
app.get('/api/status', getStatus);

// 錯誤處理
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  const { logApiError } = require('./utils/logger');
  logApiError(req, err);
  res.status(500).json({ 
    error: IS_DEVELOPMENT ? err.message : 'Internal server error' 
  });
});

// 導出 app 供測試與 server.js 使用
module.exports = app;
