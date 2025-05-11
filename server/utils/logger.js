/**
 * 日誌相關工具函式
 */
const fs = require('fs');
const path = require('path');
const { LOGS_DIR, ERROR_LOG_FILE } = require('../config/constants');

// 確保日誌目錄存在
const ensureLogDir = () => {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
};

// 記錄 API 錯誤
const logApiError = (req, err) => {
  const errorEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    path: req.path,
    error: err.message
  };
  fs.appendFile(ERROR_LOG_FILE, JSON.stringify(errorEntry) + '\n', () => {});
  
  // 開發環境額外輸出堆疊追蹤
  if (process.env.NODE_ENV === 'development') {
    console.error(`[API ERROR] ${errorEntry.timestamp} | ${req.path}:`, err);
  }
};

module.exports = {
  ensureLogDir,
  logApiError
};
