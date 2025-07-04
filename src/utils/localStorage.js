// utils/localStorage.js

export const getTasks = (username) => {
  if (!username) return [];
  try {
    const data = localStorage.getItem(`tasks_${username}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (username, tasks) => {
  if (username && Array.isArray(tasks)) {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  }
};
