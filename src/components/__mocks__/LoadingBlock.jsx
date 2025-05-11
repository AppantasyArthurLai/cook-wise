import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Mock version of LoadingBlock component for testing
 * Simplified implementation that focuses only on what's needed for tests
 */
export default function LoadingBlock({ 
  mainIngredient, 
  cuisine, 
  calorie, 
  special,
  enableShortSentence = false 
}) {
  const { t, i18n } = useTranslation();
  const loadingMessage = i18n.language.startsWith('en') 
    ? "Cook Wise is creating your recipe..." 
    : "藝智廝正在為您創建食譜...";

  return (
    <div className="flex flex-col items-center justify-center w-full my-8">
      {/* Test-friendly loading spinner */}
      <div className="mb-4" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#E67E22]"></div>
      </div>
      
      {/* Loading message */}
      <span className="font-bold text-gray-800 mb-2 text-center">{loadingMessage}</span>
      
      {/* Short sentence section (only shown if enabled) */}
      {enableShortSentence && (
        <span className="text-sm text-gray-600 w-full text-center" style={{ minHeight: 28 }}>
          {i18n.language.startsWith('en') 
            ? "Generating your personalized message..."
            : "正在生成您的專屬訊息..."}
        </span>
      )}
    </div>
  );
}
