import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (response && response.data && response.data.success) {
        setNotification({ message: 'Sikeres bejelentkezés!', type: 'success' });
        localStorage.setItem('username', username);
        onLogin(username);
        navigate('/');
      } else {
        setNotification({ message: 'Hibás felhasználónév vagy jelszó!', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Hibás felhasználónév vagy jelszó!', type: 'error' });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <h2 className="text-4xl font-bold mb-8 text-accent-color">Bejelentkezés</h2>
      <div className="max-w-md w-full p-4">
        {notification && <Notification message={notification.message} type={notification.type} />}
        <form autoComplete="on">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-100">
              Felhasználónév:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-100">
              Jelszó:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
            />
          </div>
          <button
          type="button"
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-accent-color text-white rounded-md hover:bg-highlight-color"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          Bejelentkezés
        </button>
        
        </form>
      </div>
    </div>
  );
};

export default Login;
