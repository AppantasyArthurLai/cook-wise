import React from "react";

export default function RecipeForm({
  mainIngredient,
  setMainIngredient,
  cuisine,
  setCuisine,
  calorie,
  setCalorie,
  special,
  setSpecial,
  loading,
  onSubmit
}) {
  return (
    <form className="w-full space-y-6" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>主食材</span>
        </label>
        <input
          value={mainIngredient}
          onChange={e => setMainIngredient(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="例如：雞胸肉、豆腐、鮭魚..."
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>料理類型</span>
        </label>
        <input
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="例如：日式、義式、家常..."
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>熱量範圍（大卡）</span>
        </label>
        <input
          value={calorie}
          onChange={e => setCalorie(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="例如：300"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>特殊需求</span>
        </label>
        <input
          value={special}
          onChange={e => setSpecial(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="例如：高蛋白、低醣、全素、無麩質..."
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow transition-colors duration-200 mt-4"
        disabled={loading}
      >
        {loading ? "產生中..." : "產生 AI 食譜"}
      </button>
    </form>
  );
}
