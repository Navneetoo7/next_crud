// frontend/pages/dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleCreateUser = () => {
    axios.post('/api/users', { username: newUsername, password: newPassword }).then((response) => {
      setNewUsername('');
      setNewPassword('');
      setUsers([...users, response.data]);
    });
  };

  return (
    <div>
      <h1>Dashboard (Admin)</h1>
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
      <h2>User Listing</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
