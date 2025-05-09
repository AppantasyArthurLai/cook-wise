import React, { useState } from "react";
import { fetchGemini } from "./api";
import RecipeForm from "./components/RecipeForm";
import RecipeResult from "./components/RecipeResult";
import LoadingBlock from "./components/LoadingBlock";
import ErrorAlert from "./components/ErrorAlert";
import { buildPrompt } from "./utils/promptBuilder";
import { parseGeminiResponse } from "./utils/parseGeminiResponse";



function App() {
  const [mainIngredient, setMainIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [calorie, setCalorie] = useState("");
  const [special, setSpecial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const prompt = buildPrompt({ mainIngredient, cuisine, calorie, special });
      const res = await fetchGemini(prompt);
      const data = parseGeminiResponse(res);
      setResult(data);
    } catch (err) {
      setError(err.message || "取得 AI 食譜失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="bg-orange-500 text-white shadow-lg py-4">
        <div className="container mx-auto px-4">
          <span className="text-2xl font-bold tracking-wide">🍳 AI 食譜網站</span>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center max-w-4xl">
        <div className="w-full mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">專業 AI 廚師為您設計美味食譜</h1>
          <p className="text-gray-600">輸入您想料理的主要食材、烹飪風格和特殊需求，讓 AI 為您創建專屬食譜</p>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <RecipeForm
            mainIngredient={mainIngredient}
            setMainIngredient={setMainIngredient}
            cuisine={cuisine}
            setCuisine={setCuisine}
            calorie={calorie}
            setCalorie={setCalorie}
            special={special}
            setSpecial={setSpecial}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
        {loading && (
          <LoadingBlock
            mainIngredient={mainIngredient}
            cuisine={cuisine}
            calorie={calorie}
            special={special}
          />
        )}
        <ErrorAlert error={error} />
        <RecipeResult result={result} />
      </div>
      {/* Footer */}
      <footer className="p-6 bg-gray-900 text-white mt-auto text-center">
        <aside>
          <p>© 2025 AI 食譜網站 · Powered by React, Vite, TailwindCSS, daisyUI</p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
