# AI 食譜網站（recipe_gpt）

一個以 React + Vite + Express + Gemini API 打造的 AI 智慧食譜產生器，支援依據主食材、料理類型、熱量、特殊需求自訂產生食譜，並顯示營養資訊與適合族群。

---

## 專案啟動

1. 安裝相依套件
   ```sh
   npm install
   ```
2. 啟動本地開發（同時啟動前端與後端）
   ```sh
   npm run dev
   ```
   - 前端 Vite (預設 http://localhost:5173)
   - 後端 Express API Proxy (http://localhost:3001)
3. 打包 production 靜態檔案
   ```sh
   npm run build
   ```
4. 預覽 production build
   ```sh
   npm run preview
   ```

## 主要功能
- 依條件產生 AI 食譜（主食材、料理類型、熱量、特殊需求）
- 顯示食譜標題、描述、食材、步驟、營養資訊、適合族群
- 輕鬆貼心的 loading 訊息
- 前後端分離，後端 proxy Gemini API，安全隱藏金鑰
- 自動修正 AI 回傳格式錯誤

## 目錄結構

- `index.html`：入口 HTML
- `src/`
  - `App.jsx`：主應用，狀態管理與頁面結構
  - `main.jsx`：React 入口
  - `index.css`：Tailwind CSS 設定
  - `api.js`：前端 API 呼叫
  - `components/`
    - `RecipeForm.jsx`：條件表單
    - `RecipeResult.jsx`：食譜結果顯示
    - `LoadingBlock.jsx`：loading 動畫與訊息
    - `ErrorAlert.jsx`：錯誤訊息
  - `utils/`
    - `promptBuilder.js`：自訂 prompt 組合
    - `parseGeminiResponse.js`：AI 回傳自動修正與解析
- `server/index.js`：Express 伺服器，proxy Gemini API
- `.env`：設定 GEMINI_API_KEY

## API 說明
- `/api/gemini`：POST，body: `{ prompt }`，回傳 AI 產生的食譜（JSON 格式）
- `/api/gemini/short-sentence`：POST，body: `{ mainIngredient, cuisine, calorie, special }`，回傳一則貼心短句（用於 loading）

## 技術棧
- React 17
- Vite
- Tailwind CSS + DaisyUI
- Express 5
- @google/genai (Gemini API)
- dotenv, concurrently

## 環境變數
請於根目錄建立 `.env` 檔，內容如下：
```
GEMINI_API_KEY=你的金鑰
```

---

如需擴充功能、API 整合、雲端部署，歡迎隨時詢問！
