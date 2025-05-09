import React from "react";
import { useTranslation } from "react-i18next";

export default function RecipeResult({ result }) {
  const { t } = useTranslation();
  if (!result) return null;
  return (
    <div className="bg-white shadow-xl rounded-lg w-full max-w-xl p-6 space-y-4">
      {/* Title and Description */}
      <div>
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-culinary-dark">
          <span role="img" aria-label="recipe">🍽️</span>
          {result.title}
        </h3>
        <p className="text-gray-600 mb-2">{result.description}</p>
      </div>
      {/* Ingredients Section */}
      <div>
        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 font-medium">{t('result.ingredients')}</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <ul className="list-disc ml-6">
          {result.ingredients.map((item, idx) => (
            <li key={idx} className="mb-1 text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      {/* Steps Section */}
      <div>
        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 font-medium">{t('result.steps')}</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <ol className="list-decimal ml-6">
          {result.steps.map((step, idx) => (
            <li key={idx} className="mb-1 text-gray-600">{step}</li>
          ))}
        </ol>
      </div>
      {/* Nutrition Information */}
      <div>
        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 font-medium">{t('result.nutrition')}</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="space-y-2">
          {Object.entries(result.nutrition).map(([k, v]) => {
            // Map nutrition property names to display labels using i18n
            const nutritionLabels = {
              "calories": t('result.nutritionLabels.calories'),
              "protein": t('result.nutritionLabels.protein'),
              "fat": t('result.nutritionLabels.fat'),
              "carbohydrates": t('result.nutritionLabels.carbs'),
              "other": t('result.nutritionLabels.other')
            };
            
            return (
              <div
                key={k}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full flex items-center text-gray-700 text-sm"
                style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
              >
                <span className="font-semibold mr-2">{nutritionLabels[k] || k}: </span>
                <span>{v}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Suitable For */}
      {result.suitable && result.suitable.length > 0 && (
        <div>
          <div className="flex items-center my-3">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 font-medium">{t('result.suitableFor')}</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.suitable.map((s, idx) => (
              <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary bg-opacity-10 text-primary border border-primary">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
