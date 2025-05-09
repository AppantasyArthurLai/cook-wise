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
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="container mx-auto px-4">
          <span className="text-2xl font-bold tracking-wide">🍳 AI 食譜網站</span>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center">
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
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© 2025 AI 食譜網站 · Powered by React, Vite, TailwindCSS, daisyUI</p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
