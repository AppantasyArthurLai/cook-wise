/**
 * Loading messages for the recipe application
 * Organized by language for i18n support
 */

// English loading messages
export const loadingMessagesEN = [
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

// Traditional Chinese loading messages
export const loadingMessagesZH = [
  "藝智廚正在為您創建食譜...",
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

/**
 * Get loading messages based on language code
 * @param {string} language - The language code (e.g., 'en', 'zh')
 * @returns {string[]} Array of loading messages in the specified language
 */
export const getLoadingMessages = (language) => {
  return language.startsWith('en') ? loadingMessagesEN : loadingMessagesZH;
};
