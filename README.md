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
- Node.js (v16+)
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
   # 開發環境 | Development environment
   # 建立 .env.development 檔案 | Create .env.development file
   echo "GEMINI_API_KEY=your_api_key_here" > .env.development
   
   # 生產環境 | Production environment
   # 建立 .env.production 檔案 | Create .env.production file
   echo "VITE_API_URL=https://your-backend-url.com\nGEMINI_API_KEY=your_api_key_here" > .env.production
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
├── index.html            # 入口 HTML | Entry HTML
├── src/                 # 前端源代碼 | Frontend source code
│   ├── components/      # React 組件 | React components
│   ├── constants/       # 常數定義 | Constants definitions
│   ├── i18n/            # 國際化資源 | Internationalization resources
│   ├── utils/           # 工具函數 | Utility functions
│   ├── __tests__/       # 前端測試 | Frontend tests
│   ├── api.js           # API 調用服務 | API service
│   ├── App.jsx          # 主應用組件 | Main application component
│   └── main.jsx         # 應用入口點 | Application entry point
├── server/              # 後端服務器代碼 | Backend server code
│   ├── config/          # 後端配置文件 | Backend configuration files
│   ├── middleware/      # Express 中間件 | Express middleware
│   ├── routes/          # API 路由 | API routes
│   │   ├── gemini.js    # Gemini API 路由 | Gemini API routes
│   │   └── monitor.js   # 監控和狀態路由 | Monitor and status routes
│   ├── utils/           # 後端工具函數 | Backend utility functions
│   └── index.js         # Express 伺服器主入口 | Express server main entry
├── doc/                 # 專案文檔 | Project documentation
├── __mocks__/           # 測試模擬文件 | Test mock files
├── public/              # 靜態資源 | Static resources
├── .env.development     # 開發環境變數 | Development environment variables
├── .env.production      # 生產環境變數 | Production environment variables
└── package.json         # 專案配置和依賴 | Project configuration and dependencies
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

## 👷️ 技術棧 | Tech Stack

### 前端 | Frontend
- **框架 | Framework**: React 17
- **構建工具 | Build Tool**: Vite
- **樣式 | Styling**: Tailwind CSS, DaisyUI
- **狀態管理 | State Management**: React Hooks
- **國際化 | Internationalization**: i18next

### 後端 | Backend
- **框架 | Framework**: Node.js, Express
- **中間件 | Middleware**: Helmet (HTTP 安全標頭 | Security Headers), CORS
- **速率限制 | Rate Limiting**: Express-rate-limit
- **日誌 | Logging**: 自定義中間件 | Custom middleware

### AI 整合 | AI Integration
- **模型 | Model**: Google Gemini API (@google/genai)
- **定制提示 | Custom Prompts**: 食譜產生與格式化 | Recipe generation and formatting

### 工具與部署 | Tools & Deployment
- **開發工具 | Dev Tools**: dotenv, concurrently, nodemon
- **環境特定配置 | Environment Config**: .env.development, .env.production
- **前端部署 | Frontend Deploy**: Netlify/Vercel
- **後端部署 | Backend Deploy**: Render.com

## 💻 環境變數 | Environment Variables

專案使用環境特定的配置文件，以解決開發與生產環境的 CORS 問題：
*The project uses environment-specific configuration files to solve CORS issues between development and production environments:*

### 開發環境 | Development Environment

請在根目錄建立 `.env.development` 檔案：
*Please create a `.env.development` file in the root directory:*

```
# 開發環境不需要設置 VITE_API_URL，使用相對路徑和 Vite 代理
# Development environment doesn't need VITE_API_URL, it uses relative paths and Vite proxy

GEMINI_API_KEY=你的金鑰
```

### 生產環境 | Production Environment

請在根目錄建立 `.env.production` 檔案：
*Please create a `.env.production` file in the root directory:*

```
# 生產環境 API URL 配置，解決 CORS 問題
# Production environment API URL configuration to solve CORS issues
VITE_API_URL=https://recipe-gpt-api.onrender.com

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
