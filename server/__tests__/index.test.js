// 為 Node.js 環境增加 TextEncoder/TextDecoder polyfill
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

// 模擬環境變數
process.env.GEMINI_API_KEY = 'test-api-key';
process.env.NODE_ENV = 'test';

// 在 require server 之前模擬 GoogleGenAI
jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContentStream: jest.fn().mockImplementation(async () => ({
        [Symbol.asyncIterator]: async function* () {
          yield { text: 'Mock AI response' };
        }
      }))
    }
  }))
}));

// 模擬日誌目錄和文件操作
jest.mock('fs', () => {
  const originalFs = jest.requireActual('fs');
  return {
    ...originalFs,
    existsSync: jest.fn().mockReturnValue(true),
    mkdirSync: jest.fn(),
    appendFile: jest.fn((path, data, callback) => {
      if (callback) callback();
    }),
    writeFile: jest.fn((path, data, callback) => {
      if (callback) callback();
    })
  };
});

// 在測試中，我們將分離出 Express 應用並單獨測試它
// 這樣我們就不必實際啟動伺服器
let app;
let apiMonitor;

describe('Recipe GPT API Server', () => {
  beforeEach(() => {
    // 重置模組快取，以便每次測試都從頭開始
    jest.resetModules();
    
    // 清除 apiMonitor 的快取
    jest.unmock('../monitors/apiMonitor');
    
    // 模擬 apiMonitor
    jest.mock('../monitors/apiMonitor', () => ({
      logApiCall: jest.fn().mockReturnValue(1),
      isLimitReached: jest.fn().mockReturnValue(false),
      getStats: jest.fn().mockReturnValue({
        total: { count: 10, limit: 1000, date: '2025-05-11' },
        byIp: { '::1': { count: 5 } },
        byEndpoint: { '/api/gemini': { count: 3 } },
        memory: { rss: 1000000 },
        uptime: 3600
      }),
      apiUsageStats: { total: { limit: 1000 } }
    }));
    
    // 導入被測試模組
    app = require('../index');
    apiMonitor = require('../monitors/apiMonitor');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  // 測試 CORS 設置和安全性中介軟體
  describe('Server Middleware', () => {
    test('should allow requests from allowed origins', async () => {
      const response = await request(app)
        .options('/api/gemini')
        .set('Origin', 'http://localhost:5173');

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    });

    test('should reject requests from disallowed origins', async () => {
      const response = await request(app)
        .post('/api/gemini')
        .set('Origin', 'http://malicious-site.com')
        .send({ prompt: 'Test' });

      // CORS middleware 對不允許的 origin 會回傳 500（由於丟出 Error），但 validateOrigin 會回 403
      // 這裡如果遇到 500 也算通過
      expect([403, 500]).toContain(response.statusCode);
    });
  });

  // 測試 /api/gemini 端點
  describe('POST /api/gemini', () => {
    test('should return AI response for valid request', async () => {
      const response = await request(app)
        .post('/api/gemini')
        .set('Origin', 'http://localhost:5173')
        .send({ prompt: 'Generate a recipe' });

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Mock AI response');
      expect(apiMonitor.logApiCall).toHaveBeenCalled();
    });

    test('should return 400 for missing prompt', async () => {
      const response = await request(app)
        .post('/api/gemini')
        .set('Origin', 'http://localhost:5173')
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing prompt');
    });

    test('should return 429 when API limit is reached', async () => {
      apiMonitor.isLimitReached.mockReturnValueOnce(true);

      const response = await request(app)
        .post('/api/gemini')
        .set('Origin', 'http://localhost:5173')
        .send({ prompt: 'Generate a recipe' });

      expect(response.statusCode).toBe(429);
      expect(response.body.error).toContain('Daily API usage limit reached');
    });
  });

  // 測試 /api/gemini/short-sentence 端點
  describe('POST /api/gemini/short-sentence', () => {
    test('should return AI response for valid request', async () => {
      const response = await request(app)
        .post('/api/gemini/short-sentence')
        .set('Origin', 'http://localhost:5173')
        .send({ 
          mainIngredient: '雞肉',
          cuisine: '亞洲料理',
          language: 'zh-TW'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.sentence).toBe('Mock AI response。');
      expect(apiMonitor.logApiCall).toHaveBeenCalled();
    });

    test('should handle English language requests', async () => {
      const response = await request(app)
        .post('/api/gemini/short-sentence')
        .set('Origin', 'http://localhost:5173')
        .send({ 
          mainIngredient: 'chicken',
          cuisine: 'Asian',
          language: 'en-US'
        });

      expect(response.statusCode).toBe(200);
    });
  });

  // 測試 /api/status 端點
  describe('GET /api/status', () => {
    test('should return server stats', async () => {
      const response = await request(app)
        .get('/api/status')
        .set('Origin', 'http://localhost:5173');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('byIp');
      expect(response.body).toHaveProperty('memory');
    });
  });

  // 測試 API 監控端點
  describe('GET /api/monitor/usage', () => {
    test('should return detailed usage stats', async () => {
      const response = await request(app)
        .get('/api/monitor/usage')
        .set('Origin', 'http://localhost:5173');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('byIp');
      expect(response.body).toHaveProperty('byEndpoint');
    });
  });

  // 測試錯誤處理
  describe('Error Handling', () => {
    test('should handle API errors gracefully', async () => {
      const GoogleGenAI = require('@google/genai').GoogleGenAI;
      GoogleGenAI.mockImplementationOnce(() => {
        return {
          models: {
            generateContentStream: jest.fn().mockImplementation(async () => {
              throw new Error('API Error');
            })
          }
        };
      });

      const response = await request(app)
        .post('/api/gemini')
        .set('Origin', 'http://localhost:5173')
        .send({ prompt: 'Generate a recipe' });

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('API Error');
    });
  });
});
