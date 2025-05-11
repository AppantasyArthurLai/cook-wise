/**
 * 系統常數與配置集中管理
 */
const path = require('path');

// 路徑與檔案
const LOGS_DIR = path.join(__dirname, '..', 'logs');
const ERROR_LOG_FILE = path.join(LOGS_DIR, 'api-errors.log');
const API_LOG_FORMAT = req => `[REQUEST] ${new Date().toISOString()} | IP: ${req.ip} | ${req.method} ${req.path}`;

// API 設定
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const API_HOURLY_LIMIT = parseInt(process.env.API_HOURLY_LIMIT) || 100;
const REQUEST_BODY_LIMIT = '1mb';

// 安全設定
const LOCALHOST_IPS = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
const ALLOWED_ORIGINS = [
  'https://unique-croquembouche-330182.netlify.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:3001'
];

module.exports = {
  LOGS_DIR,
  ERROR_LOG_FILE,
  API_LOG_FORMAT,
  MODEL_NAME,
  API_HOURLY_LIMIT,
  REQUEST_BODY_LIMIT,
  LOCALHOST_IPS,
  ALLOWED_ORIGINS
};
