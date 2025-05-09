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
          <span>Main Ingredient</span>
        </label>
        <input
          value={mainIngredient}
          onChange={e => setMainIngredient(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="E.g., chicken breast, tofu, salmon..."
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>Cuisine Type</span>
        </label>
        <input
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="E.g., Italian, Japanese, homestyle..."
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>Calories (kcal)</span>
        </label>
        <input
          value={calorie}
          onChange={e => setCalorie(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="E.g., 300"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>Dietary Requirements</span>
        </label>
        <input
          value={special}
          onChange={e => setSpecial(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder="E.g., high protein, low carb, vegan, gluten-free..."
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-bold rounded-lg shadow transition-colors duration-200 mt-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Create Your Recipe"}
      </button>
    </form>
  );
}
