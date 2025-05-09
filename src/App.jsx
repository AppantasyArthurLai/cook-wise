import React, { useState } from "react";
import RecipeCard from "./components/RecipeCard";

const initialRecipes = [
  {
    title: "番茄炒蛋",
    ingredients: ["番茄 2 顆", "雞蛋 3 顆", "鹽 適量", "蔥花 適量"],
    instructions: [
      "番茄切塊，雞蛋打散。",
      "熱鍋加油，先炒雞蛋至半熟盛起。",
      "同鍋炒番茄，出汁後倒回雞蛋拌炒。",
      "加鹽調味，撒上蔥花即可。",
    ],
    nutrition: "熱量約 250 大卡，蛋白質豐富，含維生素C與茄紅素。",
  },
  {
    title: "青椒牛肉絲",
    ingredients: ["青椒 2 條", "牛肉 200g", "醬油 1 匙", "蒜末 適量"],
    instructions: [
      "牛肉切絲，用醬油醃 10 分鐘。",
      "青椒切絲，蒜末備用。",
      "熱鍋炒牛肉至變色，盛起。",
      "同鍋炒青椒與蒜末，最後回鍋牛肉拌炒均勻。",
    ],
    nutrition: "熱量約 320 大卡，鐵質與維生素C豐富。",
  },
];

function App() {
  const [recipes] = useState(initialRecipes);
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
        <div className="w-full max-w-2xl space-y-8">
          {recipes.map((recipe, idx) => (
            <RecipeCard key={idx} {...recipe} />
          ))}
        </div>
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
