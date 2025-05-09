# Recipe GPT LLM AI 技術文檔

## 概述

Recipe GPT 專案利用大型語言模型 (LLM) 技術來生成個性化食譜和互動內容。本文檔詳細說明了專案中使用的 LLM 技術，包括模型選擇、提示工程 (Prompt Engineering) 策略、API 集成和響應處理等方面。

## 使用的 LLM 模型

### Google Gemini AI

專案使用 Google 的 Gemini AI 作為核心 LLM 引擎，具體使用的模型為：

- **模型版本**: `gemini-2.5-flash-preview-04-17`
- **特點**: 
  - 高效的文本生成能力
  - 支持結構化輸出（JSON 格式）
  - 低延遲的流式響應
  - 擅長跨語言生成（支持中英文）

### 集成方式

專案通過 Google 官方的 JavaScript 客戶端庫 `@google/genai` 與 Gemini AI 進行集成：

```javascript
const ai = new GoogleGenAI({ apiKey });
const response = await ai.models.generateContentStream({
  model: 'gemini-2.5-flash-preview-04-17',
  config,
  contents
});
```

## Prompt Engineering 策略

### 1. 食譜生成 Prompt

食譜生成使用結構化的提示模板，定義在 `src/utils/promptBuilder.js` 中：

```javascript
export function buildPrompt({ mainIngredient, cuisine, calorie, special }) {
  let prompt = `Generate a recipe based on the following criteria, including ingredients, steps, and basic nutritional information:\n`;
  if (mainIngredient) prompt += `Main ingredient: ${mainIngredient}\n`;
  if (cuisine) prompt += `Cuisine type: ${cuisine}\n`;
  if (calorie) prompt += `Calorie range: ${calorie} calories\n`;
  if (special) prompt += `Special requirements: ${special}\n`;
  prompt += `Please present clearly in a list format.\n`;
  prompt += `Respond in English.\n`;
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
```

#### 關鍵 Prompt 策略：

1. **結構化指令**: 以清晰、直接的方式描述所需的食譜內容
2. **動態參數注入**: 根據用戶輸入（主食材、料理類型、熱量要求、特殊需求）動態構建提示
3. **格式控制**: 明確指定 JSON 輸出格式，使 AI 生成結構化數據
4. **語言指定**: 明確要求以英文回應
5. **零樣本提示**: 不需要提供示例，僅通過指令和格式說明引導 AI 生成所需內容

### 2. 個性化短句生成 Prompt

在 `server/index.js` 中實現了生成個性化加載訊息的提示：

```javascript
let conds = [];
if (mainIngredient) conds.push(`主食材：${mainIngredient}`);
if (cuisine) conds.push(`料理類型：${cuisine}`);
if (calorie) conds.push(`熱量：${calorie} 大卡`);
if (special) conds.push(`特殊需求：${special}`);
const condStr = conds.length ? conds.join('，') : '無特別條件';
const prompt = `請根據以下條件，產生一句貼心、專屬、輕鬆的短句，用於料理等待畫面：${condStr}`;
```

#### 關鍵 Prompt 策略：

1. **情感引導**: 明確指定生成內容的情感色彩（貼心、專屬、輕鬆）
2. **上下文提供**: 提供用戶選擇的食譜條件作為上下文
3. **目的明確**: 清楚說明生成內容的使用場景（等待畫面）
4. **中文提示**: 直接使用中文提示，適合生成中文內容

## LLM 響應處理技術

### JSON 解析與修復

由於 LLM 可能返回不完全符合預期的 JSON 格式（包含 markdown 標記或額外文本），專案實現了自動修復和解析機制，定義在 `src/utils/parseGeminiResponse.js` 中：

```javascript
export function parseGeminiResponse(res) {
  try {
    console.debug('AI 原始回傳內容:', res);
    let clean = res.trim();
    // 自動去除 markdown ```json ... ``` 區塊
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```/, '').replace(/```$/, '').trim();
    }
    // 只保留第一個 { 到最後一個 }
    const jsonStart = clean.indexOf('{');
    const jsonEnd = clean.lastIndexOf('}');
    const jsonStr = clean.substring(jsonStart, jsonEnd + 1);
    console.debug('AI 修正後 JSON 字串:', jsonStr);
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('AI 回傳內容:', res);
    console.error('JSON 解析失敗:', e);
    throw new Error('AI 回傳格式錯誤，請再試一次或調整條件');
  }
}
```

### 關鍵處理技術：

1. **Markdown 標記移除**: 自動識別並移除 LLM 可能添加的 markdown 代碼塊標記
2. **JSON 提取**: 從可能包含額外文本的回應中，準確提取 JSON 部分
3. **錯誤處理**: 提供詳細的日誌記錄和用戶友好的錯誤消息
4. **流式處理**: 使用 `generateContentStream` 和 `for await` 循環實現實時流式處理 AI 回應

## 流式回應技術

專案使用了 Gemini AI 的流式生成功能，實現即時響應：

```javascript
const response = await ai.models.generateContentStream({ model, config, contents });
res.setHeader('Content-Type', 'text/plain; charset=utf-8');
for await (const chunk of response) {
  res.write(chunk.text);
}
res.end();
```

這種方式允許長回應（如完整食譜）逐步傳送給前端，提供更好的用戶體驗。

## UI 集成

### LoadingBlock 組件

LoadingBlock 組件（`src/components/LoadingBlock.jsx`）展示了如何在 UI 中集成 LLM 生成的內容：

```javascript
// 未啟用的個性化短句生成功能
useEffect(() => {
  if (!mainIngredient && !cuisine && !calorie && !special) {
    setSentence("");
    return;
  }
  setLoading(true);
  setError(null);
  fetch("/api/gemini/short-sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mainIngredient, cuisine, calorie, special })
  })
    .then(res => res.json())
    .then(data => {
      setSentence(data.sentence || "");
      setLoading(false);
    })
    .catch(err => {
      setError("產生專屬短句時發生錯誤");
      setLoading(false);
    });
}, [mainIngredient, cuisine, calorie, special]);
```

> 注意：此功能在當前版本中被註釋掉，但代碼展示了如何將 LLM 生成的動態內容集成到 UI 中。

## API 安全與最佳實踐

1. **伺服器端 API 密鑰管理**: API 密鑰存儲在服務器端的 `.env` 文件中，避免暴露給前端
2. **錯誤處理**: 對所有 API 調用實施全面的錯誤處理
3. **內容過濾**: 短句生成功能實現了簡單的內容過濾（僅保留第一句）
4. **提示模板化**: 使用模板化提示減少錯誤並提高一致性

## 未來 LLM 集成潛力

1. **多模態支持**: Gemini AI 支持圖像理解，未來可添加食物圖像分析功能
2. **定制微調**: 考慮使用特定食譜數據微調模型
3. **更複雜對話**: 實現多輪對話，讓用戶能夠逐步完善食譜
4. **多語言支持擴展**: 增強跨語言食譜生成能力

## 調試與開發技巧

1. **提示調整**: 在開發中，頻繁測試和調整提示以獲得最佳結果
2. **日誌記錄**: 使用 `console.debug` 記錄原始 AI 回應和解析後的內容
3. **健壯性**: parseGeminiResponse 函數展示了如何處理不一致的 AI 輸出
