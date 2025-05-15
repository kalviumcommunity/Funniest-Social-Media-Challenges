import React, { useState } from 'react';
import axios from 'axios';

const TestAuth = () => {
  const [loginStatus, setLoginStatus] = useState('');
  const [logoutStatus, setLogoutStatus] = useState('');
  const [user, setUser] = useState({
    email: 'test@example.com',
    password: 'password123'
  });

  const handleLogin = async () => {
    try {
      setLoginStatus('Logging in...');
      const response = await axios.post('http://localhost:9080/user/login', user, {
        withCredentials: true, // Important for cookies to be set
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLoginStatus(`Login successful: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setLoginStatus(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutStatus('Logging out...');
      const response = await axios.post('http://localhost:9080/user/logout', {}, {
        withCredentials: true // Important for cookies to be cleared
      });
      setLogoutStatus(`Logout successful: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setLogoutStatus(`Logout failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Authentication Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Login Test</h3>
        <button onClick={handleLogin} style={{ padding: '8px 16px', marginRight: '10px' }}>
          Test Login
        </button>
        <div style={{ marginTop: '10px' }}>
          Status: <span style={{ color: loginStatus.includes('successful') ? 'green' : 'red' }}>
            {loginStatus || 'Not tested yet'}
          </span>
        </div>
      </div>
      
      <div>
        <h3>Logout Test</h3>
        <button onClick={handleLogout} style={{ padding: '8px 16px', marginRight: '10px' }}>
          Test Logout
        </button>
        <div style={{ marginTop: '10px' }}>
          Status: <span style={{ color: logoutStatus.includes('successful') ? 'green' : 'red' }}>
            {logoutStatus || 'Not tested yet'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;
