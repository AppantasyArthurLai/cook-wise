import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// Friendly, personalized loading messages (English)
const loadingMessagesEN = [
  "Cook Wise is creating your recipe...",
  "Crafting a healthy masterpiece just for you!",
  "Our culinary AI is designing your custom menu~",
  "Preparing ingredients in our virtual kitchen!",
  "Your gourmet creation is almost ready!",
  "Combining art and wisdom into your perfect recipe...",
  "Finding the ideal dish for your unique taste!",
  "Culinary innovation in progress, thanks for your patience!",
  "Selecting the finest ingredients for your dish...",
  "Healthy and delicious cuisine coming right up!"
];

// Friendly, personalized loading messages (Chinese)
const loadingMessagesZH = [
  "藝智廝正在為您創建食譜...",
  "為您量身制作健康的美食作品！",
  "我們的人工智能正在設計您的專屬菜單~",
  "在我們的虛擬廚房準備食材中！",
  "您的美食創作即將完成！",
  "將藝術與智慧融入您的完美食譜...",
  "為您的獨特口味尋找理想的菜餐！",
  "料理創新進行中，感謝您的耐心等待！",
  "為您的菜餐選擇最優質的食材...",
  "健康又美味的料理即將上框！"
];

// Marquee animation CSS
const marqueeStyle = {
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
};
const marqueeInnerStyle = {
  display: 'inline-block',
  paddingLeft: '100%',
  animation: 'marquee 9s linear infinite',
};

// Dynamically insert keyframes
if (typeof window !== 'undefined' && !document.getElementById('marquee-keyframes')) {
  const style = document.createElement('style');
  style.id = 'marquee-keyframes';
  style.innerHTML = `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }`;
  document.head.appendChild(style);
}

export default function LoadingBlock({ mainIngredient, cuisine, calorie, special }) {
  const { t, i18n } = useTranslation();
  
  // Random message based on current language
  const randomMessage = useMemo(() => {
    // Select message array based on language
    const messages = i18n.language.startsWith('en') ? loadingMessagesEN : loadingMessagesZH;
    return messages[Math.floor(Math.random() * messages.length)];
  }, [i18n.language]);

  // Gemini generated short sentence
  // const [sentence, setSentence] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const API_BASE_URL = import.meta.env.VITE_API_URL || '';

  // useEffect(() => {
  //   if (!mainIngredient && !cuisine && !calorie && !special) {
  //     setSentence("");
  //     return;
  //   }
  //   setLoading(true);
  //   setError(null);
  //   fetch(`${API_BASE_URL}/api/gemini/short-sentence`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ 
  //       mainIngredient, 
  //       cuisine, 
  //       calorie, 
  //       special,
  //       language: i18n.language // 傳遞當前語言設置
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setSentence(data.sentence || "");
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError("產生專屬短句時發生錯誤");
  //       setLoading(false);
  //     });
  // }, [mainIngredient, cuisine, calorie, special]);

  return (
    <div className="flex flex-col items-center justify-center w-full my-8">
      {/* Custom loading animation */}
      <div className="mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#E67E22]"></div>
      </div>
      <span className="font-bold text-gray-800 mb-2 text-center">{randomMessage}</span>
      <span className="text-sm text-gray-600 w-full text-center" style={{ minHeight: 28 }}>
        {/*
        {loading && <span className="animate-pulse">Generating your personalized message...</span>}
        {error && <span className="text-red-500">{error}</span>}
        {!loading && sentence && (
          <span style={marqueeStyle}>
            <span style={marqueeInnerStyle}>{sentence}</span>
          </span>
        )}
        */}
      </span>
    </div>
  );
}
