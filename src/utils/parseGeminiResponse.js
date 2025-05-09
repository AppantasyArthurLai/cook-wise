// 自動修復 Gemini 回傳內容並解析 JSON，並附 debug log
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
