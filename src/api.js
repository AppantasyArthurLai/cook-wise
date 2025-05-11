// Frontend call to Gemini Proxy API

// 使用環境變數來設置 API 基礎 URL
// 在開發環境中使用空字串（相對路徑），在生產環境中使用 VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchGemini(prompt) {
  const res = await fetch(`${API_BASE_URL}/api/gemini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error('Gemini API error');
  return await res.text();
}
