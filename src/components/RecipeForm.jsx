import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <form className="w-full space-y-6" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>{t('form.mainIngredient')}</span>
        </label>
        <input
          value={mainIngredient}
          onChange={e => setMainIngredient(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder={t('form.mainIngredientPlaceholder')}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>{t('form.cuisineType')}</span>
        </label>
        <input
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder={t('form.cuisinePlaceholder')}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>{t('form.calories')}</span>
        </label>
        <input
          value={calorie}
          onChange={e => setCalorie(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder={t('form.caloriesPlaceholder')}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          <span>{t('form.dietaryRequirements')}</span>
        </label>
        <input
          value={special}
          onChange={e => setSpecial(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
          placeholder={t('form.dietaryPlaceholder')}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-bold rounded-lg shadow transition-colors duration-200 mt-4"
        disabled={loading}
      >
        {loading ? t('form.generating') : t('form.submit')}
      </button>
    </form>
  );
}
