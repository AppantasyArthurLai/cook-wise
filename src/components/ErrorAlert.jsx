import React from "react";

export default function ErrorAlert({ error }) {
  if (!error) return null;
  return (
    <div className="alert alert-error mb-4">{error}</div>
  );
}
