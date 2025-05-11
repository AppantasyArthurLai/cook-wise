/**
 * 安全相關中介軟體
 */
const rateLimit = require('express-rate-limit');
const { ALLOWED_ORIGINS, API_HOURLY_LIMIT } = require('../config/constants');

// 來源驗證中介軟體
function validateOrigin(req, res, next) {
  const origin = req.get('Origin');
  const referer = req.get('Referer');
  
  // 開發環境或本地請求直接通過
  if (process.env.NODE_ENV === 'development') return next();
  if (!origin && !referer) return next();
  if (origin && ALLOWED_ORIGINS.includes(origin)) return next();
  if (!origin && referer && ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed))) return next();
  
  return res.status(403).json({
    error: 'Access denied. Invalid origin.',
    origin: origin || 'none',
    referer: referer || 'none'
  });
}

// API 請求速率限制中介軟體
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: API_HOURLY_LIMIT,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  validateOrigin,
  apiLimiter
};
