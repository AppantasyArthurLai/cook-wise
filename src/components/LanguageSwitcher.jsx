import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'en' || i18n.language.startsWith('en-') 
            ? 'bg-white text-[#E67E22]' 
            : 'text-white hover:bg-[#D35400]'
        }`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('zh')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'zh' || i18n.language.startsWith('zh-') 
            ? 'bg-white text-[#E67E22]' 
            : 'text-white hover:bg-[#D35400]'
        }`}
      >
        中文
      </button>
    </div>
  );
}
