import React from "react";

const ProgressBar = ({ percent }) => {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full h-2 bg-gray-200 rounded mt-2">
      <div
        className={`h-2 rounded ${
          clamped === 100 ? "bg-green-600" : "bg-blue-500"
        }`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};

export default ProgressBar;
