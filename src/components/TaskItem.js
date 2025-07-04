import React from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit, onTagClick }) {
  return (
    <div className="task-item animate-fade">
      <div className="task-main" onClick={() => onToggle(task.id)}>
        <input type="checkbox" checked={task.completed} readOnly />
        <div>
          <span className={task.completed ? 'task-title completed-title' : 'task-title'}>
            {task.title}
          </span>
          {task.description && <div className="task-desc">{task.description}</div>}
          <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
          {task.dueDate && (
  <small>
    {' '}| Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}
  </small>
)}

          <div className="task-meta">
            <span className={`priority ${task.priority?.toLowerCase()}`}>
              {task.priority}
            </span>

            {/* Clickable tag badges */}
            {task.tags?.length > 0 && (
              <div className="task-tags">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag-badge clickable"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent toggle on tag click
                      onTagClick(tag);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>✏️ Edit</button>
        <button onClick={() => onDelete(task.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
