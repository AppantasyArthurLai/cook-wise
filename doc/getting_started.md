# Recipe GPT 新手上手指南

## 專案概述

Recipe GPT（藝智廚）是一個基於 AI 的食譜生成網站，使用 React 和 Node.js 開發。用戶可以通過指定主要食材、料理類型、熱量和特殊需求來獲取個性化食譜。專案使用 Google Gemini AI 作為後端 LLM，支持流式生成響應，並具有現代化的使用者界面。

## 技術架構

### 前端技術

- **框架**：React 17 + Vite
- **樣式**：Tailwind CSS + DaisyUI
- **狀態管理**：React Hooks
- **國際化**：i18next
- **API 調用**：Fetch API

### 後端技術

- **框架**：Node.js + Express
- **API 代理**：連接到 Google Gemini AI API
- **安全性**：Helmet、CORS、速率限制
- **日誌**：自定義中間件

### 顏色主題

採用專業的烹飪主題配色方案：
- **主色調**：#E67E22（活力橘色）
- **輔助色**：#2ECC71（清新綠色）
- **強調色**：#3498DB（藍色點綴）
- **背景色**：淺色系（#F8F9FA、#ECF0F1）
- **文字色**：深色板岩灰（#2A303C）

## 環境要求

- Node.js 16+ 和 npm/yarn
- Google Gemini API 密鑰 (https://ai.google.dev/)
- 支持現代瀏覽器 (Chrome, Firefox, Safari, Edge)

## 快速開始

### 1. 克隆專案

```bash
git clone <repository-url>
cd recipe_gpt
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 配置環境變數

專案使用環境特定的配置文件：

**開發環境**：在專案根目錄創建 `.env.development` 文件
```
# 開發環境不需要設置 VITE_API_URL，使用相對路徑和 Vite 代理

# Gemini API 密鑰（後端使用）
GEMINI_API_KEY=您的Google_Gemini_API密鑰
```

**生產環境**：在專案根目錄創建 `.env.production` 文件
```
# 生產環境 API URL 配置，解決 CORS 問題
VITE_API_URL=https://recipe-gpt-api.onrender.com

# Gemini API 密鑰（後端使用）
GEMINI_API_KEY=您的Google_Gemini_API密鑰
```

> 獲取 Gemini API 密鑰：前往 [Google AI Studio](https://ai.google.dev/)，註冊並創建 API 密鑰。

### 4. 啟動開發伺服器

同時啟動前端和後端服務器：

```bash
npm run dev
```

這將啟動：
- 前端開發伺服器：http://localhost:5173
- 後端 API 伺服器：http://localhost:3001

### 5. 構建生產版本

```bash
npm run build
```

構建後的文件將位於 `dist` 目錄中，可以部署到任何靜態網站託管服務。

## 專案功能

### 核心功能

1. **食譜生成**：根據用戶指定的條件生成個性化食譜
   - 可指定主食材、料理類型、熱量和特殊需求
   - 獲得完整的食材列表、步驟和營養信息

2. **多語言支持**：支持中英文界面
   - 使用 i18next 進行國際化
   - 自動檢測用戶瀏覽器語言

3. **響應式設計**：適配各種裝置尺寸
   - 桌面、平板和移動設備友好的界面

### 使用流程

1. 在表單中輸入您的食譜條件：
   - 選擇主要食材（例如：雞肉、豆腐）
   - 選擇料理類型（例如：中式、義大利式）
   - 指定熱量範圍（可選）
   - 添加特殊需求（例如：無麩質、素食）

2. 點擊「生成食譜」按鈕
3. 等待 AI 生成您的個性化食譜
4. 查看完整食譜，包括食材、步驟和營養信息

## 專案結構解析

```
recipe_gpt/
├── src/                      # 前端源代碼
│   ├── components/           # React 組件
│   ├── constants/            # 常數定義
│   ├── i18n/                 # 國際化資源
│   ├── utils/                # 工具函數
│   ├── __tests__/            # 前端測試
│   ├── api.js                # API 服務
│   ├── App.jsx               # 主應用組件
│   └── main.jsx              # 應用入口點
├── server/                   # 後端服務器代碼
│   ├── config/               # 後端配置文件
│   ├── middleware/          # Express 中間件
│   ├── routes/               # API 路由
│   │   ├── gemini.js        # Gemini AI API 路由
│   │   └── monitor.js       # 監控和狀態路由
│   ├── utils/                # 後端工具函數
│   └── index.js              # Express 服務器主入口
├── __mocks__/                # 測試模擬文件
├── doc/                      # 項目文檔
├── public/                   # 靜態資源
├── .env.development          # 開發環境變數
├── .env.production           # 生產環境變數
├── dist/                     # 構建輸出 (自動生成)
└── package.json              # 項目配置和依賴
```

### 關鍵文件說明

#### 前端關鍵文件

- **src/App.jsx**: 主應用程序組件，包含整體佈局和主要邏輯
- **src/components/RecipeForm.jsx**: 食譜生成表單
- **src/components/RecipeResult.jsx**: 食譜結果顯示
- **src/components/LoadingBlock.jsx**: 載入中狀態顯示組件
- **src/api.js**: API 調用服務，根據環境變數自動適應 API 基礎 URL
- **src/utils/promptBuilder.js**: 構建 AI 提示的工具
- **src/utils/parseGeminiResponse.js**: 解析 AI 返回內容的工具

#### 後端關鍵文件

- **server/index.js**: 主要 Express 服務器入口點，包含中間件配置和連接路由
- **server/routes/gemini.js**: Gemini API 請求處理路由
- **server/routes/monitor.js**: 服務器狀態監控路由
- **server/middleware/security.js**: 包含 CORS 和 API 速率限制等安全配置
- **server/config/constants.js**: 後端常數設定，如允許的來源網址等

#### 環境配置文件

- **.env.development**: 開發環境變數，使用相對路徑和 Vite 代理
- **.env.production**: 生產環境變數，配置生產 API URL 以解決 CORS 問題

## 自定義和擴展

### 修改 UI 主題

Recipe GPT 使用 Tailwind CSS 和自定義顏色主題。主要顏色定義在 `tailwind.config.js` 文件中，您可以根據需求調整：

```js
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        // 自定義顏色
        primary: '#E67E22',    // 主要顏色 (橘色)
        secondary: '#2ECC71',  // 次要顏色 (綠色)
        accent: '#3498DB'      // 強調顏色 (藍色)
      }
    }
  }
  // ...
}
```

### 添加新的語言支持

在 `src/i18n/locales/` 目錄下添加新的語言文件，然後在 `src/i18n/i18n.js` 中註冊。

### 修改 AI 提示模板

如需調整 AI 生成的食譜格式或內容，請修改 `src/utils/promptBuilder.js` 中的提示模板。

## 開發和調試技巧

### 前端開發

- 單獨啟動前端開發服務器：`npm run dev:client`
- 相關文件位於 `src/` 目錄

### 後端開發

- 單獨啟動後端服務器：`npm run dev:server`
- 後端入口點：`server/index.js`
- API 測試端點：
  - 食譜生成：`POST http://localhost:3001/api/gemini`
  - 短句生成：`POST http://localhost:3001/api/gemini/short-sentence`

### 常見問題排除

1. **API 密鑰錯誤**

   問題：出現 "GEMINI_API_KEY not set" 錯誤
   
   解決方案：
   - 確認在根目錄創建了 `.env` 文件
   - 確認文件中包含有效的 `GEMINI_API_KEY=您的密鑰`
   - 重啟開發服務器

2. **依賴問題**

   問題：安裝依賴時出錯
   
   解決方案：
   - 嘗試清除 npm 緩存：`npm cache clean --force`
   - 刪除 `node_modules` 目錄並重新安裝：`rm -rf node_modules && npm install`

3. **API 響應格式錯誤**

   問題：生成食譜失敗，顯示 "AI 回傳格式錯誤"
   
   解決方案：
   - 檢查 `src/utils/promptBuilder.js` 中的提示模板是否正確
   - 檢查 Google Gemini API 狀態是否正常
   - 可能需要在 `src/utils/parseGeminiResponse.js` 中增強錯誤處理

4. **端口衝突**

   問題：啟動服務器時出現端口已被使用的錯誤
   
   解決方案：
   - 修改 `server/index.js` 中的 PORT 變量
   - 關閉可能佔用該端口的其他應用

## 部署指南

### 環境變數配置

部署前請確保正確配置環境變數：

1. **前端部署（如 Netlify、Vercel 等）**：
   - 設置 `VITE_API_URL` 指向您的後端 API 服務器
   - 例如：`VITE_API_URL=https://recipe-gpt-api.onrender.com`

2. **後端部署（如 Render、Heroku 等）**：
   - 設置 `GEMINI_API_KEY` 為有效的 Google Gemini API 密鑰
   - 設置 `NODE_ENV=production`
   - 根據需要配置 `PORT`

### 前後端分離部署

#### 1. 部署前端到 Netlify

1. 在 `package.json` 中添加 build 命令：
   ```
   "build": "vite build"
   ```

2. 創建 `netlify.toml` 文件：
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/api/*"
     to = "https://your-backend-api.com/api/:splat"
     status = 200
   ```

3. 部署後端 API 到支持 Node.js 的服務，如 Heroku, Vercel 或 Render

### 自託管

1. 構建前端：`npm run build`
2. 將 `dist` 目錄部署到任何支持靜態網站的服務器
3. 單獨部署後端 Express 服務器
4. 確保配置正確的 CORS 和 API 端點

## 資源

- Google Gemini API 文檔：https://ai.google.dev/docs/gemini_api
- React 文檔：https://reactjs.org/docs/getting-started.html
- Tailwind CSS 文檔：https://tailwindcss.com/docs
- Express 文檔：https://expressjs.com/

## 貢獻和支援

歡迎提交 issues 和 pull requests 來改進此專案！

如有問題或需要幫助，請聯繫開發團隊或在 GitHub 上提出 issue。
