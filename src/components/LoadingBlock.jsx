import React from "react";

export default function LoadingBlock({ mainIngredient, cuisine, calorie, special }) {
  return (
    <div className="flex flex-col items-center justify-center w-full my-8">
      <span className="loading loading-spinner loading-lg mb-3"></span>
      <span className="font-bold mb-1">AI 產生中 ...</span>
      <span className="text-sm text-base-content/60 animate-pulse">
        條件：
        {mainIngredient && <span className="mx-1">主食材：{mainIngredient}</span>}
        {cuisine && <span className="mx-1">料理類型：{cuisine}</span>}
        {calorie && <span className="mx-1">熱量：{calorie} 大卡</span>}
        {special && <span className="mx-1">特殊需求：{special}</span>}
      </span>
    </div>
  );
}
