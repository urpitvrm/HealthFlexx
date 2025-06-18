import React, { useEffect, useState } from "react";
import TimerForm from "../components/TimerForm";
import TimerList from "../components/TimerList";
import Modal from "../components/Modal";
import useTimers from "../context/useTimers";

const Home = () => {
  const {
    timers,
    addTimer,
    updateStatus,
    resetTimer,
    deleteTimer,
    bulkAction,
    loadFromStorage,
    lastCompleted,
    clearLastCompleted,
  } = useTimers();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const allCategories = [...new Set(timers.map((t) => t.category))];

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
        🕒 Timer Manager
      </h1>


      <TimerForm onAddTimer={addTimer} />


      {allCategories.length > 0 && (
        <div className="my-6 flex justify-center items-center">
          <label className="mr-3 font-medium text-slate-700">Filter:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            {allCategories.map((cat, idx) => (
              <option key={idx}>{cat}</option>
            ))}
          </select>
        </div>
      )}


      <TimerList
        timers={timers}
        filter={categoryFilter}
        onUpdateTimer={updateStatus}
        onResetTimer={resetTimer}
        onDeleteTimer={deleteTimer}
        onCompleteTimer={() => {}}
        onBulkAction={bulkAction}
      />
      
      {lastCompleted && (
        <Modal onClose={clearLastCompleted}>
          <h2 className="text-xl font-semibold text-green-700">
            🎉 Timer Completed!
          </h2>
          <p className="text-slate-700 mt-2">{lastCompleted}</p>
        </Modal>
      )}
    </div>
  );
};

export default Home;
