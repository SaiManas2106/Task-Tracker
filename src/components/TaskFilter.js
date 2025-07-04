import React from 'react';

function TaskFilter({ filter, setFilter, counts }) {
  return (
    <div className="task-filter">
      {['all', 'completed', 'pending'].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={filter === type ? 'active' : ''}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} ({counts[type]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
