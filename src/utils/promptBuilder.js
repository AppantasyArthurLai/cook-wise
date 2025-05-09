export function buildPrompt({ mainIngredient, cuisine, calorie, special }) {
  let prompt = `請根據以下條件產生一道食譜，並包含食材、步驟與簡單營養資訊：\n`;
  if (mainIngredient) prompt += `主食材：${mainIngredient}\n`;
  if (cuisine) prompt += `料理類型：${cuisine}\n`;
  if (calorie) prompt += `熱量範圍：${calorie} 大卡\n`;
  if (special) prompt += `特殊需求：${special}\n`;
  prompt += `請用條列式清楚呈現。\n`;
  prompt += `請依照以下 JSON 格式回覆，不要有多餘說明：\n`;
  prompt += `{
  "title": "",
  "description": "",
  "ingredients": [],
  "steps": [],
  "nutrition": {
    "熱量": "",
    "蛋白質": "",
    "脂肪": "",
    "碳水化合物": "",
    "其他": ""
  },
  "suitable": []
}`;
  return prompt;
}
