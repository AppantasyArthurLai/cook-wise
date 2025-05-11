/**
 * API 監控模組 - 用於記錄和統計 API 使用情況
 */
const fs = require('fs');
const path = require('path');

// 日誌目錄路徑
const logsDir = path.join(__dirname, '../logs');

// 確保日誌目錄存在
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// API 使用量統計對象
const apiUsageStats = {
  // 按 IP 地址統計
  byIp: {},
  // 按端點統計
  byEndpoint: {},
  // 總體統計
  total: {
    date: new Date().toISOString().split('T')[0],
    count: 0,
    limit: 1000
  }
};

/**
 * 記錄 API 調用
 * @param {Object} req - Express 請求對象
 * @param {String} endpoint - API 端點
 */
const logApiCall = (req, endpoint) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || '未知';
  const today = timestamp.split('T')[0];
  
  // 重置日期（如果是新的一天）
  if (apiUsageStats.total.date !== today) {
    resetStats(apiUsageStats.total.date);
    apiUsageStats.total.date = today;
    apiUsageStats.total.count = 0;
  }
  
  // 更新總計數
  apiUsageStats.total.count++;
  
  // 更新 IP 統計
  if (!apiUsageStats.byIp[ip]) {
    apiUsageStats.byIp[ip] = { count: 0 };
  }
  apiUsageStats.byIp[ip].count++;
  
  // 更新端點統計
  if (!apiUsageStats.byEndpoint[endpoint]) {
    apiUsageStats.byEndpoint[endpoint] = { count: 0 };
  }
  apiUsageStats.byEndpoint[endpoint].count++;
  
  // 寫入詳細日誌文件
  const logFile = path.join(logsDir, `api-calls-${today}.log`);
  const logEntry = {
    timestamp,
    ip,
    endpoint,
    totalCount: apiUsageStats.total.count,
    ipCount: apiUsageStats.byIp[ip].count,
    endpointCount: apiUsageStats.byEndpoint[endpoint].count
  };
  
  fs.appendFile(logFile, JSON.stringify(logEntry) + '\n', (err) => {
    if (err) console.error('Error writing API call log:', err);
  });
  
  // 輸出到 console 以在 Render.com 上查看
  console.log(`[API CALL] ${timestamp} | IP: ${ip} | Path: ${endpoint} | Count: ${apiUsageStats.total.count}/${apiUsageStats.total.limit}`);
  
  // 每 5 次調用輸出一次詳細統計
  if (apiUsageStats.total.count % 5 === 0) {
    const memoryUsage = Math.round(process.memoryUsage().rss / 1024 / 1024);
    console.log(`[API STATS] Date: ${today} | Total: ${apiUsageStats.total.count}/${apiUsageStats.total.limit} | IPs: ${Object.keys(apiUsageStats.byIp).length} | Memory: ${memoryUsage}MB`);
  }
  
  return apiUsageStats.total.count;
};

/**
 * 重置統計並保存歷史記錄
 * @param {String} date - 日期
 */
const resetStats = (date) => {
  // 保存當日統計到歷史日誌
  const usageLogFile = path.join(logsDir, 'daily-usage.log');
  const statsToLog = {
    date,
    total: apiUsageStats.total.count,
    byIp: apiUsageStats.byIp,
    byEndpoint: apiUsageStats.byEndpoint
  };
  
  fs.appendFile(usageLogFile, JSON.stringify(statsToLog) + '\n', (err) => {
    if (err) console.error('Error writing usage stats log:', err);
  });
  
  // 輸出到 console 以在 Render.com 上查看
  console.log(`[STATS RESET] ${new Date().toISOString()} | Previous date: ${date} | Total calls: ${apiUsageStats.total.count}`);
  
  // 重置統計
  apiUsageStats.byIp = {};
  apiUsageStats.byEndpoint = {};
};

/**
 * 檢查是否已達到 API 使用限制
 * @returns {Boolean} 是否已達到限制
 */
const isLimitReached = () => {
  return apiUsageStats.total.count >= apiUsageStats.total.limit;
};

/**
 * 獲取當前的 API 使用統計
 * @returns {Object} API 使用統計
 */
const getStats = () => {
  return {
    ...apiUsageStats,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  };
};

// 每小時檢查並重置計數器（如果日期變更）
setInterval(() => {
  const today = new Date().toISOString().split('T')[0];
  if (apiUsageStats.total.date !== today) {
    resetStats(apiUsageStats.total.date);
    apiUsageStats.total.date = today;
    apiUsageStats.total.count = 0;
  }
}, 60 * 60 * 1000);

module.exports = {
  logApiCall,
  isLimitReached,
  getStats,
  apiUsageStats
};
