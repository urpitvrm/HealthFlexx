import React, { useState } from "react";

const TimerForm = ({ onAddTimer }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration || !category) return;
    if (parseInt(duration) <= 0)
      return alert("Duration must be greater than 0");

    onAddTimer({
      id: Date.now(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: "idle",
      halfwayAlert,
      createdAt: new Date().toISOString(),
    });

    setName("");
    setDuration("");
    setCategory("");
    setHalfwayAlert(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 border border-blue-200 p-6 rounded-xl shadow-md space-y-5 w-full max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-indigo-800 text-center">Add New Timer</h2>

      <input
        type="text"
        placeholder="Timer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />

      <input
        type="number"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-3 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
        min="1"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />

      <label className="flex items-center space-x-3 text-slate-700">
        <input
          type="checkbox"
          checked={halfwayAlert}
          onChange={() => setHalfwayAlert(!halfwayAlert)}
          className="h-4 w-4 accent-indigo-500"
        />
        <span>Enable Halfway Alert</span>
      </label>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-2 rounded-lg font-semibold transition shadow-md"
      >
        ➕ Add Timer
      </button>
    </form>
  );
};

export default TimerForm;
