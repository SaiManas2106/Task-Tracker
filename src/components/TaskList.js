import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onEdit, onTagClick }) {
  if (tasks.length === 0) return <p className="empty">No tasks found.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onTagClick={onTagClick} // ✅ Pass the tag click handler
        />
      ))}
    </div>
  );
}

export default TaskList;
