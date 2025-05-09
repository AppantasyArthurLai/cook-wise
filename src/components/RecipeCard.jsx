import React from "react";

const RecipeCard = ({ title, ingredients, instructions, nutrition }) => (
  <div className="card shadow-xl bg-base-100">
    <div className="card-body">
      <h2 className="card-title text-2xl mb-2">{title}</h2>
      <div className="mb-3">
        <h3 className="font-semibold">食材</h3>
        <ul className="list-disc pl-5">
          {ingredients.map((item, index) => (
            <li key={index} className="text-base-content/70">{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="font-semibold">做法</h3>
        <ol className="list-decimal pl-5">
          {instructions.map((step, index) => (
            <li key={index} className="text-base-content/70">{step}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="font-semibold">營養資訊</h3>
        <p className="text-base-content/70">{nutrition}</p>
      </div>
    </div>
  </div>
);

export default RecipeCard;
