/**
 * 監控相關路由
 */
const express = require('express');
const router = express.Router();
const apiMonitor = require('../monitors/apiMonitor');
const { logApiError } = require('../utils/logger');
const { LOCALHOST_IPS } = require('../config/constants');

// API 使用量統計端點
router.get('/usage', (req, res) => {
  try {
    const stats = apiMonitor.getStats();
    console.log(`[MONITOR ACCESS] ${new Date().toISOString()} | IP: ${req.ip} | Usage stats requested`);
    res.json(stats);
  } catch (err) {
    logApiError(req, err);
    res.status(500).json({ error: err.message });
  }
});

// 導出狀態檢查端點
const getStatus = async (req, res) => {
  // 僅允許本地端 IP 存取
  if (!LOCALHOST_IPS.includes(req.ip)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  try {
    const stats = apiMonitor.getStats();
    res.json({ 
      status: 'ok', 
      environment: process.env.NODE_ENV || 'development',
      ...stats 
    });
  } catch (err) {
    logApiError(req, err);
    res.status(500).json({ error: err.message });
  }
};

// 導出路由和狀態函數
module.exports = router;
module.exports.getStatus = getStatus;
