import React from "react";

const RecipeCard = ({ title, ingredients, instructions, nutrition }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-700">食材</h3>
      <ul className="list-disc pl-5">
        {ingredients.map((item, index) => (
          <li key={index} className="text-gray-600">{item}</li>
        ))}
      </ul>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-700">做法</h3>
      <ol className="list-decimal pl-5">
        {instructions.map((step, index) => (
          <li key={index} className="text-gray-600">{step}</li>
        ))}
      </ol>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">營養資訊</h3>
      <p className="text-gray-600">{nutrition}</p>
    </div>
  </div>
);

export default RecipeCard;
