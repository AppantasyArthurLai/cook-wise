import React, { useState } from "react";
import { fetchGemini } from "./api";



function App() {
  const [mainIngredient, setMainIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [calorie, setCalorie] = useState("");
  const [special, setSpecial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // 組合 prompt
  const buildPrompt = () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = buildPrompt();
      const res = await fetchGemini(prompt);
      // 嘗試解析 JSON
      let data = null;
      try {
        // Debug log: 原始回傳內容
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
        // Debug log: 修復後的 JSON 字串
        console.debug('AI 修正後 JSON 字串:', jsonStr);
        data = JSON.parse(jsonStr);
      } catch (e) {
        console.error('AI 回傳內容:', res);
        console.error('修正後嘗試解析的內容:', typeof clean !== 'undefined' ? clean : res);
        console.error('JSON 解析失敗:', e);
        setError("AI 回傳格式錯誤，請再試一次或調整條件");
        setLoading(false);
        return;
      }
      setResult(data);
    } catch (err) {
      setError("取得 AI 食譜失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="container mx-auto px-4">
          <span className="text-2xl font-bold tracking-wide">🍳 AI 食譜網站</span>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl w-full max-w-xl p-6 mb-8 space-y-4">
          <h2 className="card-title mb-2">AI 食譜條件</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">主食材</span>
            </label>
            <input value={mainIngredient} onChange={e => setMainIngredient(e.target.value)} className="input input-bordered" placeholder="例如：雞肉、豆腐、鮭魚..." />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">料理類型</span>
            </label>
            <input value={cuisine} onChange={e => setCuisine(e.target.value)} className="input input-bordered" placeholder="例如：中式、日式、義式..." />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">熱量範圍（大卡）</span>
            </label>
            <input value={calorie} onChange={e => setCalorie(e.target.value)} className="input input-bordered" placeholder="例如：300~500" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">特殊需求</span>
            </label>
            <input value={special} onChange={e => setSpecial(e.target.value)} className="input input-bordered" placeholder="例如：高蛋白、低醣、全素、無麩質..." />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? '產生中...' : '產生 AI 食譜'}
          </button>
        </form>
        {/* 結果區塊 */}
        {loading && (
          <div className="flex flex-col items-center justify-center w-full my-8">
            <span className="loading loading-spinner loading-lg mb-3"></span>
            <span className="font-bold mb-1">AI 產生中 ...</span>
            <span className="text-sm text-base-content/60 animate-pulse">
              條件：
              {mainIngredient && <span className="mx-1">主食材：{mainIngredient}</span>}
              {cuisine && <span className="mx-1">料理類型：{cuisine}</span>}
              {calorie && <span className="mx-1">熱量：{calorie} 大卡</span>}
              {special && <span className="mx-1">特殊需求：{special}</span>}
            </span>
          </div>
        )}
        {error && <div className="alert alert-error mb-4">{error}</div>}
        {result && (
          <div className="card bg-base-100 shadow-xl w-full max-w-xl p-6 space-y-4">
            {/* 標題與描述 */}
            <div>
              <h3 className="card-title text-2xl mb-2 flex items-center gap-2">
                <span role="img" aria-label="recipe">🍽️</span>
                {result.title}
              </h3>
              <p className="text-base-content/80 mb-2">{result.description}</p>
            </div>
            {/* 食材區塊 */}
            <div>
              <div className="divider mb-2">食材</div>
              <ul className="list-disc ml-6">
                {result.ingredients.map((item, idx) => (
                  <li key={idx} className="mb-1 text-base-content/90">{item}</li>
                ))}
              </ul>
            </div>
            {/* 步驟區塊 */}
            <div>
              <div className="divider mb-2">步驟</div>
              <ol className="list-decimal ml-6">
                {result.steps.map((step, idx) => (
                  <li key={idx} className="mb-1 text-base-content/80">{step}</li>
                ))}
              </ol>
            </div>
            {/* 營養資訊區塊 */}
            <div>
              <div className="divider mb-2">營養資訊</div>
              <div className="space-y-2">
                {Object.entries(result.nutrition).map(([k, v]) => (
                  <div
                    key={k}
                    className="badge badge-outline badge-lg px-4 py-2 w-full justify-start whitespace-pre-line break-words"
                    style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
                  >
                    <span className="font-semibold mr-2">{k}：</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 適合族群區塊 */}
            {result.suitable && result.suitable.length > 0 && (
              <div>
                <div className="divider mb-2">適合族群</div>
                <div className="flex flex-wrap gap-2">
                  {result.suitable.map((s, idx) => (
                    <span key={idx} className="badge badge-primary badge-outline px-3 py-2">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© 2025 AI 食譜網站 · Powered by React, Vite, TailwindCSS, daisyUI</p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
