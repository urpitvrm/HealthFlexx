import { useEffect, useRef, useState } from "react";

const TIMER_KEY = "timers";
const HISTORY_KEY = "timerHistory";

const useTimers = () => {
  const [timers, setTimers] = useState([]);
  const [lastCompleted, setLastCompleted] = useState(null);
  const intervalRef = useRef(null);

  // Save timers to state + localStorage
  const save = (updated) => {
    setTimers(updated);
    localStorage.setItem(TIMER_KEY, JSON.stringify(updated));
  };

  // Save to history (prevent duplicate logs)
  const saveHistory = (entry) => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const exists = history.find(
      (h) => h.name === entry.name && h.completedAt === entry.completedAt
    );
    if (!exists) {
      history.push(entry);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  };

  // Add new timer
  const addTimer = (timer) => {
    save([...timers, timer]);
  };

  // Start or pause a timer
  const updateStatus = (id, newStatus) => {
    const updated = timers.map((t) => {
      if (t.id === id) {
        if (newStatus === "running") {
          return {
            ...t,
            status: "running",
            startTime: Date.now() - (t.duration - t.remaining) * 1000,
          };
        } else {
          return { ...t, status: newStatus, startTime: null };
        }
      }
      return t;
    });
    save(updated);
  };

  // Reset a timer
  const resetTimer = (id) => {
    const updated = timers.map((t) =>
      t.id === id
        ? {
            ...t,
            remaining: t.duration,
            status: "idle",
            startTime: null,
          }
        : t
    );
    save(updated);
  };

  // Bulk actions: start, pause, reset for a category
  const bulkAction = (category, action) => {
    const updated = timers.map((t) => {
      if (t.category !== category) return t;

      if (action === "start" && t.remaining > 0) {
        return {
          ...t,
          status: "running",
          startTime: Date.now() - (t.duration - t.remaining) * 1000,
        };
      }

      if (action === "pause") {
        return { ...t, status: "paused", startTime: null };
      }

      if (action === "reset") {
        return {
          ...t,
          remaining: t.duration,
          status: "idle",
          startTime: null,
        };
      }

      return t;
    });

    save(updated);
  };

  // Countdown logic
  const tick = () => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.status === "running") {
          const elapsed = Math.floor((Date.now() - t.startTime) / 1000);
          const remaining = Math.max(t.duration - elapsed, 0);

          // Halfway alert (only once)
          if (
            t.halfwayAlert &&
            t.remaining > Math.floor(t.duration / 2) &&
            remaining <= Math.floor(t.duration / 2)
          ) {
            alert(`⏳ Halfway through: ${t.name}`);
          }

          // Timer completed
          if (remaining === 0 && t.status === "running") {
            const completedAt = new Date().toISOString();
            saveHistory({ name: t.name, completedAt });
            setLastCompleted(t.name);

            return {
              ...t,
              remaining: 0,
              status: "completed",
              startTime: null,
            };
          }

          return { ...t, remaining };
        }

        return t;
      })
    );
  };

  // Start ticking interval on mount
  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
  const deleteTimer = (id) => {
    const updated = timers.filter((t) => t.id !== id);
    save(updated);
  };
  

  // Restore timers from localStorage and recalculate remaining
  const loadFromStorage = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(TIMER_KEY) || "[]");

      const updated = stored.map((t) => {
        if (t.status === "running" && t.startTime) {
          const elapsed = Math.floor((Date.now() - t.startTime) / 1000);
          const remaining = t.duration - elapsed;

          if (remaining <= 0) {
            const completedAt = new Date().toISOString();
            saveHistory({ name: t.name, completedAt });

            return {
              ...t,
              remaining: 0,
              status: "completed",
              startTime: null,
            };
          }

          return { ...t, remaining: Math.max(remaining, 0) };
        }

        return t;
      });

      setTimers(updated);
    } catch (e) {
      console.error("Failed to load timers:", e);
    }
  };

  return {
    timers,
    addTimer,
    updateStatus,
    resetTimer,
    deleteTimer, // ⬅️ added here
    bulkAction,
    loadFromStorage,
    lastCompleted,
    clearLastCompleted: () => setLastCompleted(null),
  };
  
};

export default useTimers;
