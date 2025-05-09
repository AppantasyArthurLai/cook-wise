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
      <nav className="bg-[#E67E22] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo and brand */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍳</span>
              <span className="text-2xl font-bold tracking-wide hidden sm:inline">Cook Wise 藝智廚</span>
              <span className="text-2xl font-bold tracking-wide sm:hidden">Cook Wise</span>
            </div>
            
            {/* Center navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-[#ECF0F1] transition-colors duration-200 font-medium">Home</a>
              <a href="#" className="hover:text-[#ECF0F1] transition-colors duration-200 font-medium">Popular</a>
              <a href="#" className="hover:text-[#ECF0F1] transition-colors duration-200 font-medium">Seasonal</a>
              <a href="#" className="hover:text-[#ECF0F1] transition-colors duration-200 font-medium">About</a>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button className="hidden sm:flex items-center space-x-1 bg-[#2ECC71] hover:bg-[#27AE60] px-3 py-1.5 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Create Your Recipe</span>
              </button>
              <button className="sm:hidden flex items-center justify-center bg-[#2ECC71] hover:bg-[#27AE60] p-1.5 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="md:hidden flex items-center justify-center hover:bg-[#D35400] p-1.5 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center max-w-6xl">
        <div className="w-full mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gourmet Recipes by 藝智廚</h1>
          <p className="text-gray-600">Enter your ingredients, cuisine style, and dietary preferences to get a personalized recipe instantly</p>
        </div>
        
        {/* Side-by-side layout for form and result */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Recipe Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
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
          
          {/* Recipe Result */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 h-fit">
            {result ? (
              <RecipeResult result={result} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                <div className="text-6xl mb-4">🍳</div>
                <p className="text-lg font-medium">Your recipe will appear here</p>
                <p className="text-sm">Fill out the form and click submit to get your custom recipe</p>
              </div>
            )}
          </div>
        </div>
        
        <ErrorAlert error={error} />
        
        {/* Full-screen overlay LoadingBlock */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4">
              <LoadingBlock
                mainIngredient={mainIngredient}
                cuisine={cuisine}
                calorie={calorie}
                special={special}
              />
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="p-6 bg-gray-900 text-white mt-auto text-center">
        <aside>
          <p>© 2025 Cook Wise 藝智廚 · Powered by React, Vite, TailwindCSS, HeadlessUI</p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
