import React, { useState } from 'react';
import '../styles/App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
  <h2>Login to Task Tracker</h2>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter your username"
      required
    />
    <button type="submit">Login</button>
  </form>
</div>

  );
}

export default Login;
