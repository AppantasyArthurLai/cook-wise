/**
 * 日誌中介軟體
 */
const fs = require('fs');
const path = require('path');
const { LOGS_DIR, API_LOG_FORMAT } = require('../config/constants');

// 請求日誌中介軟體
function logRequests(req, res, next) {
  const timestamp = new Date().toISOString();
  const today = timestamp.split('T')[0];
  const logFile = path.join(LOGS_DIR, `api-requests-${today}.log`);
  
  const requestLog = {
    timestamp,
    ip: req.ip,
    method: req.method,
    path: req.path,
    query: req.query
  };
  
  fs.appendFile(logFile, JSON.stringify(requestLog) + '\n', err => {
    if (err) console.error('Error writing log:', err);
  });
  
  console.log(API_LOG_FORMAT(req));
  next();
}

module.exports = logRequests;
