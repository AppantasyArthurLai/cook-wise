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
    <form className="card-body gap-4" onSubmit={onSubmit}>
      <div>
        <label className="label">
          <span className="label-text">主食材</span>
        </label>
        <input
          value={mainIngredient}
          onChange={e => setMainIngredient(e.target.value)}
          className="input input-bordered"
          placeholder="例如：雞胸肉、豆腐、鮭魚..."
          disabled={loading}
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">料理類型</span>
        </label>
        <input
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
          className="input input-bordered"
          placeholder="例如：日式、義式、家常..."
          disabled={loading}
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">熱量範圍（大卡）</span>
        </label>
        <input
          value={calorie}
          onChange={e => setCalorie(e.target.value)}
          className="input input-bordered"
          placeholder="例如：300"
          disabled={loading}
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">特殊需求</span>
        </label>
        <input
          value={special}
          onChange={e => setSpecial(e.target.value)}
          className="input input-bordered"
          placeholder="例如：高蛋白、低醣、全素、無麩質..."
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "產生中..." : "產生 AI 食譜"}
      </button>
    </form>
  );
}
