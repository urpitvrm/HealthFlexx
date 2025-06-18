import React from 'react';
import CategoryGroup from './CategoryGroup';

const TimerList = ({
  timers,
  filter,
  onUpdateTimer,
  onResetTimer,
  onDeleteTimer,
  onCompleteTimer,
  onBulkAction,
}) => {
  const grouped = timers.reduce((acc, t) => {
    if (filter === 'All' || t.category === filter) {
      acc[t.category] = acc[t.category] || [];
      acc[t.category].push(t);
    }
    return acc;
  }, {});

  const isEmpty = Object.keys(grouped).length === 0;

  return (
    <div className="mt-6">
      {isEmpty ? (
        <p className="text-center text-gray-500">No timers found for selected category.</p>
      ) : (
        Object.keys(grouped).map((category) => (
          <CategoryGroup
            key={category}
            category={category}
            timers={grouped[category]}
            onUpdate={onUpdateTimer}
            onReset={onResetTimer}
            onDelete={onDeleteTimer}
            onComplete={onCompleteTimer}
            onBulkAction={onBulkAction}
          />
        ))
      )}
    </div>
  );
};

export default TimerList;
