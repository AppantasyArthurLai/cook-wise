export function buildPrompt({ mainIngredient, cuisine, calorie, special }) {
  let prompt = `Generate a recipe based on the following criteria, including ingredients, steps, and basic nutritional information:\n`;
  if (mainIngredient) prompt += `Main ingredient: ${mainIngredient}\n`;
  if (cuisine) prompt += `Cuisine type: ${cuisine}\n`;
  if (calorie) prompt += `Calorie range: ${calorie} calories\n`;
  if (special) prompt += `Special requirements: ${special}\n`;
  prompt += `Please present clearly in a list format.\n`;
  prompt += `Respond in Traditional Chinese (zh-TW).\n`;
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
