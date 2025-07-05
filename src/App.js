import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasks, saveTasks } from './utils/localStorage';
import './styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState(null); // NEW

  useEffect(() => {
    if (user) {
      const userTasks = getTasks(user);
      setTasks(userTasks);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveTasks(user, tasks);
    }
  }, [tasks, user]);

  const handleAddOrUpdateTask = (task) => {
    if (editTask) {
      setTasks(tasks.map((t) => (t.id === editTask.id ? { ...t, ...task } : t)));
      setEditTask(null);
      toast.success('Task updated successfully!');
    } else {
      const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: task.priority,
        dueDate: task.dueDate,
        tags: task.tags,
      };
      setTasks([...tasks, newTask]);
      toast.success('Task added successfully!');
    }
  };

  const handleToggle = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser(null);
    setTasks([]);
  };

  const handleTagClick = (tag) => {
    setTagFilter(tag); // ✅ Filter tasks by tag
  };

  const clearTagFilter = () => {
    setTagFilter(null); // ✅ Clear tag filter
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = tagFilter ? task.tags?.includes(tagFilter) : true;
    return matchesFilter && matchesSearch && matchesTag;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      {user ? (
        <div className="App">
          <div className="topbar">
            <div className="user-info">
              <span>Hello, {user}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="dark-toggle-switch">
              <label className="switch">
                <input type="checkbox" onChange={toggleDarkMode} />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {tagFilter && (
            <div className="tag-filter-indicator">
              <span>Filtering by tag: <strong>{tagFilter}</strong></span>
              <button onClick={clearTagFilter}>Clear</button>
            </div>
          )}

          <TaskForm onSubmit={handleAddOrUpdateTask} editTask={editTask} />
          <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditTask}
            onTagClick={handleTagClick}
          />
        </div>
      ) : (
        <Login onLogin={setUser} />
      )}
    </>
  );
}

export default App;
