import React from "react";
import ProgressBar from "./ProgressBar";

const TimerCard = ({ timer, onStart, onPause, onReset, onDelete }) => {
  const { name, duration, remaining, status } = timer;
  const percent = Math.floor(((duration - remaining) / duration) * 100);

  return (
    <div className="bg-purple-100 border border-gray-200 rounded-xl p-5 transition hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
            status === "running"
              ? "bg-green-100 text-green-700"
              : status === "paused"
              ? "bg-yellow-100 text-yellow-700"
              : status === "completed"
              ? "bg-gray-200 text-gray-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Time Remaining:{" "}
        <span className="text-gray-900 font-medium">{remaining}s</span>
      </p>

      <ProgressBar percent={percent} />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={onStart}
          disabled={status === "running" || remaining === 0}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start
        </button>

        <button
          onClick={onPause}
          disabled={status !== "running"}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pause
        </button>

        <button
          onClick={onReset}
          className="bg-purple-900 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Reset
        </button>

        <button
          onClick={onDelete}
          disabled={status !== "completed"}
          className={`${
            status === "completed"
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded-lg font-medium transition`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimerCard;
