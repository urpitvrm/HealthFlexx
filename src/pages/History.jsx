import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("timerHistory") || "[]");
      setHistory(data.reverse());
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timer_history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📜 Timer History</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Export JSON
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600 text-center">No completed timers yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((entry, idx) => (
            <li key={idx} className="bg-white p-3 rounded shadow text-sm">
              <strong>{entry.name}</strong> completed at{" "}
              {new Date(entry.completedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
