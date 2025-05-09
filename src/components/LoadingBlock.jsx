import React, { useEffect, useMemo, useState } from "react";

// Friendly, personalized loading messages
const loadingMessages = [
  "Cook Wise 藝智廚 is creating your recipe...",
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
  // Random message
  const randomMessage = useMemo(() => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  }, []);

  // Gemini generated short sentence
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
