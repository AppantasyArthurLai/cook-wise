import React, { useEffect, useMemo, useState } from "react";

// 輕鬆、專屬、貼心的訊息陣列
const loadingMessages = [
  "您的專屬廚師研究中...",
  "我們努力讓你吃的健康！",
  "正在為你量身打造美味菜單~",
  "廚房裡熱情備料中，請稍候！",
  "專屬美味即將上桌，敬請期待！",
  "根據你的需求精心設計菜單中...",
  "讓我們為你找出最適合的料理！",
  "美味正在生成，謝謝你的耐心等候！",
  "我們在為你挑選最棒的食材...",
  "健康又好吃的料理馬上來！"
];

// 跑馬燈動畫 CSS
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

// 動態插入 keyframes
if (typeof window !== 'undefined' && !document.getElementById('marquee-keyframes')) {
  const style = document.createElement('style');
  style.id = 'marquee-keyframes';
  style.innerHTML = `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }`;
  document.head.appendChild(style);
}

export default function LoadingBlock({ mainIngredient, cuisine, calorie, special }) {
  // 隨機訊息
  const randomMessage = useMemo(() => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  }, []);

  // Gemini 產生的短句
  // const [sentence, setSentence] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!mainIngredient && !cuisine && !calorie && !special) {
  //     setSentence("");
  //     return;
  //   }
  //   setLoading(true);
  //   setError(null);
  //   fetch("/api/gemini/short-sentence", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ mainIngredient, cuisine, calorie, special })
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
      {/* 自定義加載動畫 */}
      <div className="mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
      </div>
      <span className="font-bold text-gray-800 mb-2 text-center">{randomMessage}</span>
      <span className="text-sm text-gray-600 w-full text-center" style={{ minHeight: 28 }}>
        {/*
        {loading && <span className="animate-pulse">專屬短句產生中...</span>}
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
