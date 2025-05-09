import React, { useState } from "react";
import { fetchGemini } from "./api";



function App() {
  const [mainIngredient, setMainIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [calorie, setCalorie] = useState("");
  const [special, setSpecial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // 組合 prompt
  const buildPrompt = () => {
    let prompt = `請根據以下條件產生一道食譜，並包含食材、步驟與簡單營養資訊：\n`;
    if (mainIngredient) prompt += `主食材：${mainIngredient}\n`;
    if (cuisine) prompt += `料理類型：${cuisine}\n`;
    if (calorie) prompt += `熱量範圍：${calorie} 大卡\n`;
    if (special) prompt += `特殊需求：${special}\n`;
    prompt += `請用條列式清楚呈現。`;
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
      setResult(res);
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
        {error && <div className="alert alert-error mb-4">{error}</div>}
        {result && (
          <div className="card bg-base-100 shadow-xl w-full max-w-xl whitespace-pre-line p-6">
            <h3 className="card-title mb-2">AI 食譜建議</h3>
            <div>{result}</div>
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
