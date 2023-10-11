// frontend/pages/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h1>User Listing</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
