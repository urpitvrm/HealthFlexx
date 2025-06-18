import React, { useState } from "react";
import TimerCard from "./TimerCard";

const CategoryGroup = ({
  category,
  timers,
  onUpdate,
  onReset,
  onDelete,
  onComplete,
  onBulkAction,
}) => {
  const [expanded, setExpanded] = useState(true);
  const handleBulk = (type) => onBulkAction(category, type);

  return (
    <div className="mb-2 rounded-xl s bg-purple-200 border border-gray-200">
     
     
      <div
        className="flex justify-between items-center px-6 py-4 bg-purple-100 rounded-t-xl cursor-pointer hover:bg-gray-200 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
          {category}
        </h2>
        <button
          aria-label="Toggle Expand/Collapse"
          className="text-2xl font-bold text-gray-600"
        >
          {expanded ? "−" : "+"}
        </button>
      </div>


      {expanded && (
        <>
          <div className="flex flex-wrap gap-3 px-6 pt-4">
            <button
              onClick={() => handleBulk("start")}
              className="border border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md transition"
            >
              ▶ Start All
            </button>
            <button
              onClick={() => handleBulk("pause")}
              className="border border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md transition"
            >
              ⏸ Pause All
            </button>
            <button
              onClick={() => handleBulk("reset")}
              className="border border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md transition"
            >
              🔄 Reset All
            </button>
          </div>


          <div className="px-6 pb-6 pt-4 space-y-4">
            {timers.map((timer) => (
              <TimerCard
                key={timer.id}
                timer={timer}
                onStart={() => onUpdate(timer.id, "running")}
                onPause={() => onUpdate(timer.id, "paused")}
                onReset={() => onReset(timer.id)}
                onDelete={() => onDelete(timer.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryGroup;
