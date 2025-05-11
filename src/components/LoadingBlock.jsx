import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./LoadingSpinner";
import { getLoadingMessages } from "../constants/loadingMessages";

/**
 * Styles for marquee text animation
 */
const marqueeStyles = {
  container: {
    overflow: "hidden",
    width: "100%",
    display: "inline-block",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  content: {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "marquee 15s linear infinite",
    paddingLeft: "100%"
  }
};

/**
 * Adds the marquee keyframes animation to the document
 * Only executed once in client-side rendering
 */
const injectMarqueeKeyframes = () => {
  if (typeof document !== "undefined") {
    // Check if keyframes already exists to avoid duplication
    const existingStyle = document.getElementById("marquee-keyframes");
    if (existingStyle) return;
    
    const style = document.createElement("style");
    style.id = "marquee-keyframes";
    style.innerHTML = `@keyframes marquee { 
      0% { transform: translateX(0); } 
      100% { transform: translateX(-100%); } 
    }`;
    document.head.appendChild(style);
  }
};

/**
 * Component that displays a loading animation with random messages
 * Optional: Can fetch and display a short personalized sentence from the API
 * 
 * @param {Object} props - Component props
 * @param {string} [props.mainIngredient] - Main ingredient for personalized message
 * @param {string} [props.cuisine] - Cuisine type for personalized message
 * @param {string} [props.calorie] - Calorie requirement for personalized message
 * @param {string} [props.special] - Special requirement for personalized message 
 * @param {boolean} [props.enableShortSentence=false] - Whether to enable the short sentence feature
 * @returns {JSX.Element} Loading component
 */
export default function LoadingBlock({ 
  mainIngredient, 
  cuisine, 
  calorie, 
  special,
  enableShortSentence = false
}) {
  const { t, i18n } = useTranslation();

  // Inject marquee keyframes on mount (client-side only)
  useEffect(() => {
    injectMarqueeKeyframes();
  }, []);
  
  // Random message based on current language
  const randomMessage = useMemo(() => {
    // Select message array based on language
    const messages = getLoadingMessages(i18n.language);
    return messages[Math.floor(Math.random() * messages.length)];
  }, [i18n.language]);

  // State for Gemini generated short sentence (optional feature)
  const [sentence, setSentence] = useState("");
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [sentenceError, setSentenceError] = useState(null);
  
  // Handle environment variables in a way compatible with Jest
  // 在開發環境中使用空字串（相對路徑），在生產環境中使用 VITE_API_URL
  const API_BASE_URL = typeof import.meta !== 'undefined' ?
    (import.meta.env.VITE_API_URL || '') :
    (process.env.VITE_API_URL || '');

  // Fetch personalized short sentence if enabled
  useEffect(() => {
    // Skip if feature is disabled or no parameters provided
    if (!enableShortSentence || (!mainIngredient && !cuisine && !calorie && !special)) {
      setSentence("");
      return;
    }
    
    setSentenceLoading(true);
    setSentenceError(null);
    
    fetch(`${API_BASE_URL}/api/gemini/short-sentence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        mainIngredient, 
        cuisine, 
        calorie, 
        special,
        language: i18n.language // Pass current language setting
      })
    })
      .then(res => res.json())
      .then(data => {
        setSentence(data.sentence || "");
        setSentenceLoading(false);
      })
      .catch(err => {
        setSentenceError(i18n.language.startsWith('en') 
          ? "Error generating personalized message" 
          : "產生專屬短句時發生錯誤");
        setSentenceLoading(false);
      });
  }, [mainIngredient, cuisine, calorie, special, enableShortSentence, i18n.language]);

  return (
    <div className="flex flex-col items-center justify-center w-full my-8">
      {/* Custom loading animation using the LoadingSpinner component */}
      <div className="mb-4">
        <LoadingSpinner size="md" color="#E67E22" />
      </div>
      
      {/* Main loading message */}
      <span className="font-bold text-gray-800 mb-2 text-center">{randomMessage}</span>
      
      {/* Optional short sentence area */}
      {enableShortSentence && (
        <span className="text-sm text-gray-600 w-full text-center" style={{ minHeight: 28 }}>
          {sentenceLoading && (
            <span className="animate-pulse">
              {i18n.language.startsWith('en') ? 
                "Generating your personalized message..." : 
                "正在生成您的專屬訊息..."}
            </span>
          )}
          {sentenceError && <span className="text-red-500">{sentenceError}</span>}
          {!sentenceLoading && sentence && (
            <span style={marqueeStyles.container}>
              <span style={marqueeStyles.content}>{sentence}</span>
            </span>
          )}
        </span>
      )}
    </div>
  );
}
