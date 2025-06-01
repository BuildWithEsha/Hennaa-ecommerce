import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid login credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBE4DB, #DFB6B2, #854F6C)',
      }}
    >
      <h1
        className="text-[#854F6C] text-3xl sm:text-4xl font-extrabold mb-10 text-center tracking-wide drop-shadow-sm max-w-lg w-full"
      >
        Admin Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#FBE4DB] w-full max-w-lg p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-[#854F6C]">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-5 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
          required
        />

        {error && (
          <p className="text-red-600 text-sm mb-5 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-4 bg-[#854F6C] hover:bg-[#6b3c55] text-white font-semibold rounded-full transition-all duration-300 shadow-md mx-auto block"
        >
          Login
        </button>
      </form>
    </div>
  );
}
