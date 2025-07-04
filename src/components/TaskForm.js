import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setPriority(editTask.priority || 'Medium');
      setDueDate(editTask.dueDate || '');
      setTags(editTask.tags ? editTask.tags.join(', ') : '');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title,
      description,
      priority,
      dueDate,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setTags('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editTask ? 'Edit Task' : 'Add New Task'}</h3>
      <div className="input-group">
        <span>📝</span>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <span>📄</span>
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span>⚡</span>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div className="input-group">
        <span>📅</span>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span>🏷</span>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

export default TaskForm;
