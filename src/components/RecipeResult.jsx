import React from "react";

export default function RecipeResult({ result }) {
  if (!result) return null;
  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-xl p-6 space-y-4">
      {/* 標題與描述 */}
      <div>
        <h3 className="card-title text-2xl mb-2 flex items-center gap-2">
          <span role="img" aria-label="recipe">🍽️</span>
          {result.title}
        </h3>
        <p className="text-base-content/80 mb-2">{result.description}</p>
      </div>
      {/* 食材區塊 */}
      <div>
        <div className="divider mb-2">食材</div>
        <ul className="list-disc ml-6">
          {result.ingredients.map((item, idx) => (
            <li key={idx} className="mb-1 text-base-content/90">{item}</li>
          ))}
        </ul>
      </div>
      {/* 步驟區塊 */}
      <div>
        <div className="divider mb-2">步驟</div>
        <ol className="list-decimal ml-6">
          {result.steps.map((step, idx) => (
            <li key={idx} className="mb-1 text-base-content/80">{step}</li>
          ))}
        </ol>
      </div>
      {/* 營養資訊區塊 */}
      <div>
        <div className="divider mb-2">營養資訊</div>
        <div className="space-y-2">
          {Object.entries(result.nutrition).map(([k, v]) => (
            <div
              key={k}
              className="badge badge-outline badge-lg px-4 py-2 w-full justify-start whitespace-pre-line break-words"
              style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
            >
              <span className="font-semibold mr-2">{k}：</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 適合族群區塊 */}
      {result.suitable && result.suitable.length > 0 && (
        <div>
          <div className="divider mb-2">適合族群</div>
          <div className="flex flex-wrap gap-2">
            {result.suitable.map((s, idx) => (
              <span key={idx} className="badge badge-primary badge-outline px-3 py-2">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
