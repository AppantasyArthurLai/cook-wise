<div align="center">

# 🍲 Recipe GPT 智慧食譜產生器

**AI-powered recipe generator based on your ingredients and preferences**

[![React](https://img.shields.io/badge/React-17-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-2.0-5A0EF8)](https://daisyui.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4)](https://ai.google.dev/)

</div>

---

## 📋 簡介 | Introduction

一個以 React + Vite + Express + Gemini API 打造的 AI 智慧食譜產生器，支援依據主食材、料理類型、熱量、特殊需求自訂產生食譜，並顯示營養資訊與適合族群。

*An AI recipe generator built with React + Vite + Express + Gemini API. Generate custom recipes based on main ingredients, cuisine type, calories, and special requirements, with nutrition information and suitable dietary groups.*

## 🎨 設計風格 | Design Style

Recipe GPT 使用 Tailwind CSS 與 DaisyUI 打造專業的烹飪主題界面，色彩方案包括：

*Recipe GPT uses Tailwind CSS and DaisyUI to create a professional culinary-themed interface with the following color scheme:*

- **主色調 | Primary**: #E67E22 (活力橙 | Vibrant Orange)
- **次要色 | Secondary**: #2ECC71 (清新綠 | Fresh Green)
- **強調色 | Accent**: #3498DB (藍色點綴 | Blue Accent)
- **背景色 | Background**: #F8F9FA, #ECF0F1 (淺色調 | Light Tones)
- **文字色 | Text**: #2A303C (深石板色 | Dark Slate)

溫暖而富有食慾感的色彩搭配，完美呈現食品網站的視覺體驗。

*A warm and appetizing color palette, perfect for a food website's visual experience.*

## 🚀 專案啟動 | Getting Started

### 先決條件 | Prerequisites
- Node.js (v14+)
- Google Gemini API Key

### 安裝步驟 | Installation

1. 複製專案 | Clone the repository
   ```sh
   git clone https://github.com/your-username/recipe-gpt.git
   cd recipe-gpt
   ```

2. 安裝相依套件 | Install dependencies
   ```sh
   npm install
   ```

3. 設定環境變數 | Configure environment variables
   ```sh
   # 建立 .env 檔案 | Create a .env file
   echo "GEMINI_API_KEY=your_api_key_here" > .env
   ```

4. 啟動本地開發（同時啟動前端與後端）| Start local development
   ```sh
   npm run dev
   ```
   - 前端 | Frontend: Vite (預設 | default: http://localhost:5173)
   - 後端 | Backend: Express API Proxy (http://localhost:3001)

5. 打包 production 靜態檔案 | Build for production
   ```sh
   npm run build
   ```

6. 預覽 production build | Preview production build
   ```sh
   npm run preview
   ```

## ✨ 主要功能 | Features

- 🍳 依條件產生 AI 食譜（主食材、料理類型、熱量、特殊需求）
  *Generate AI recipes based on conditions (main ingredients, cuisine type, calories, special requirements)*

- 📝 顯示食譜標題、描述、食材、步驟、營養資訊、適合族群
  *Display recipe title, description, ingredients, steps, nutrition information, and suitable dietary groups*

- 🔄 輕鬆貼心的 loading 訊息
  *Thoughtful loading messages*

- 🔒 前後端分離，後端 proxy Gemini API，安全隱藏金鑰
  *Separation of frontend and backend, backend proxy for Gemini API to securely hide keys*

- 🛠️ 自動修正 AI 回傳格式錯誤
  *Automatic correction of AI response format errors*

## 📁 目錄結構 | Project Structure

```
recipe-gpt/
├── index.html         # 入口 HTML | Entry HTML
├── src/
│   ├── App.jsx        # 主應用，狀態管理與頁面結構 | Main app, state management and page structure
│   ├── main.jsx       # React 入口 | React entry
│   ├── index.css      # Tailwind CSS 設定 | Tailwind CSS settings
│   ├── api.js         # 前端 API 呼叫 | Frontend API calls
│   ├── components/
│   │   ├── RecipeForm.jsx     # 條件表單 | Condition form
│   │   ├── RecipeResult.jsx   # 食譜結果顯示 | Recipe result display
│   │   ├── LoadingBlock.jsx   # Loading 動畫與訊息 | Loading animation and messages
│   │   └── ErrorAlert.jsx     # 錯誤訊息 | Error messages
│   └── utils/
│       ├── promptBuilder.js         # 自訂 prompt 組合 | Custom prompt composition
│       └── parseGeminiResponse.js   # AI 回傳自動修正與解析 | AI response auto-correction and parsing
├── server/
│   └── index.js       # Express 伺服器，proxy Gemini API | Express server, Gemini API proxy
└── .env               # 環境變數 | Environment variables
```

## 🔌 API 說明 | API Documentation

### `/api/gemini`
- **方法 | Method**: POST
- **請求體 | Request Body**: `{ prompt }`
- **回應 | Response**: AI 產生的食譜（JSON 格式）| AI-generated recipe (JSON format)

### `/api/gemini/short-sentence`
- **方法 | Method**: POST
- **請求體 | Request Body**: `{ mainIngredient, cuisine, calorie, special }`
- **回應 | Response**: 一則貼心短句（用於 loading）| A thoughtful short sentence (used for loading)

## 🛠️ 技術棧 | Tech Stack

- **前端 | Frontend**: React 17, Vite, Tailwind CSS, DaisyUI
- **後端 | Backend**: Express 5
- **AI 整合 | AI Integration**: Google Gemini API (@google/genai)
- **工具 | Tools**: dotenv, concurrently

## 💻 環境變數 | Environment Variables

請於根目錄建立 `.env` 檔，內容如下：
*Please create a `.env` file in the root directory with the following content:*

```
GEMINI_API_KEY=你的金鑰
```

## 🤝 貢獻 | Contributing

歡迎提交 Pull Request 或開 Issue 來改進專案！
*Contributions are welcome! Feel free to submit a Pull Request or open an Issue to improve the project!*

## 📝 授權 | License

本專案採用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案了解更多詳情。
*This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.*

---

<div align="center">

**🍽️ 如需擴充功能、API 整合、雲端部署，歡迎隨時詢問！**

*For feature extensions, API integration, or cloud deployment, feel free to ask anytime!*

</div>
