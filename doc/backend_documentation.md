# Recipe GPT Backend Documentation

## Overview
Recipe GPT 後端是一個基於 Node.js 和 Express 的服務器，主要作為 Google Gemini AI API 的代理。它處理來自前端的請求，將其轉發給 Gemini API，然後將 AI 生成的食譜回傳給前端。

## 技術架構

### Core Technologies
- **Node.js**: 執行環境
- **Express**: Web 應用框架
- **@google/genai**: Google Gemini AI 客戶端庫
- **dotenv**: 環境變數管理
- **cors**: 跨域資源共享中間件

## 伺服器設定

伺服器在 `server/index.js` 中配置，預設運行在 3001 端口上。基本設定如下：

```javascript
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ... API endpoints ...

app.listen(PORT, () => {
  console.log(`Gemini proxy server listening on http://localhost:${PORT}`);
});
```

## API 端點

### 1. 生成完整食譜 (POST `/api/gemini`)

此端點接收食譜的生成提示，通過 Gemini AI 生成完整的食譜內容。

#### 請求參數
```json
{
  "prompt": "String - 完整的生成提示文本"
}
```

#### 處理流程
1. 驗證提供的提示是否存在
2. 檢查 Gemini API 密鑰是否設置
3. 配置 Gemini AI 請求
4. 使用 streaming 模式生成內容
5. 將生成的文本直接流式傳輸回前端

#### 實現代碼
```javascript
app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  try {
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
    res.status(500).json({ error: err.message });
  }
});
```

### 2. 生成加載短句 (POST `/api/gemini/short-sentence`)

此端點根據用戶的食譜條件生成一個個性化的短句，用於加載畫面顯示。

#### 請求參數
```json
{
  "mainIngredient": "String - 主要食材 (可選)",
  "cuisine": "String - 料理類型 (可選)",
  "calorie": "String - 熱量要求 (可選)",
  "special": "String - 特殊需求 (可選)"
}
```

#### 處理流程
1. 檢查 Gemini API 密鑰是否設置
2. 根據提供的參數組合提示文本
3. 請求 Gemini AI 生成短句
4. 處理響應，只保留第一句話並添加標點
5. 返回生成的短句

#### 實現代碼
```javascript
app.post('/api/gemini/short-sentence', async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});
```

## 錯誤處理

後端針對各種情況實現了錯誤處理：

1. **缺少提示文本**: 返回 400 Bad Request 錯誤
2. **缺少 API 密鑰**: 返回 500 Internal Server Error 錯誤
3. **Gemini API 錯誤**: 捕獲並返回錯誤訊息

## 環境配置

應用程序使用 `.env` 文件存儲配置變量：

```
GEMINI_API_KEY=您的Google Gemini API密鑰
```

確保在部署或運行應用程序之前正確設置此環境變量。使用 dotenv 包加載這些變量：

```javascript
require('dotenv').config();
```

## Gemini AI 集成

後端使用 Google 的官方 `@google/genai` JavaScript 客戶端與 Gemini 2.5 Flash 模型集成。主要特點：

1. **流式響應**: 使用 `generateContentStream` 方法實現實時文本流式傳輸
2. **模型版本**: 使用 'gemini-2.5-flash-preview-04-17' 模型
3. **MIME 類型配置**: 配置為純文本響應

## 部署注意事項

1. 確保 Node.js 環境已正確設置
2. 安裝所有必要的依賴項：`npm install`
3. 配置 `.env` 文件，包含有效的 GEMINI_API_KEY
4. 使用 `npm run dev:server` 啟動服務器，或在生產環境中使用適當的進程管理器（如 PM2）

## 安全考慮

1. API 密鑰保護在服務器端，不暴露給前端
2. 啟用 CORS 以控制對 API 的存取
3. 輸入驗證，確保提供必要的參數
