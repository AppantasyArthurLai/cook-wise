// Frontend call to Gemini Proxy API
export async function fetchGemini(prompt) {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error('Gemini API error');
  return await res.text();
}
