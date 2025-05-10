export function buildPrompt({ mainIngredient, cuisine, calorie, special, language = 'en' }) {
  // 根據語言決定提示文字
  const isEnglish = language.startsWith('en');
  
  let prompt;
  
  if (isEnglish) {
    prompt = `Generate a recipe based on the following criteria, including ingredients, steps, and basic nutritional information:\n`;
    if (mainIngredient) prompt += `Main ingredient: ${mainIngredient}\n`;
    if (cuisine) prompt += `Cuisine type: ${cuisine}\n`;
    if (calorie) prompt += `Calorie range: ${calorie} calories\n`;
    if (special) prompt += `Special requirements: ${special}\n`;
    prompt += `Please present clearly in a list format.\n`;
    prompt += `Respond in English.\n`;
  } else {
    // 中文提示
    prompt = `根據以下條件生成菜譜，包括食材、步驟和基本營養信息:\n`;
    if (mainIngredient) prompt += `主要食材: ${mainIngredient}\n`;
    if (cuisine) prompt += `料理類型: ${cuisine}\n`;
    if (calorie) prompt += `熱量範圍: ${calorie} 大卡\n`;
    if (special) prompt += `特殊需求: ${special}\n`;
    prompt += `請以清晰的列表格式呈現。\n`;
    prompt += `請用繁體中文回答。\n`;
  }
  
  prompt += `Please use the following JSON format with no additional explanations:\n`;
  prompt += `{
  "title": "",
  "description": "",
  "ingredients": [],
  "steps": [],
  "nutrition": {
    "calories": "",
    "protein": "",
    "fat": "",
    "carbohydrates": "",
    "other": ""
  },
  "suitable": []
}`;
  return prompt;
}
