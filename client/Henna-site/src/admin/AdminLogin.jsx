import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      if (res.data.token) {
        // Store token for authenticated requests
        localStorage.setItem('adminToken', res.data.token);

        setIsAuthenticated(true);       
        navigate('/admin/dashboard');   
      } else {
        setError(res.data.message || 'Invalid login credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-20 px-6"
      style={{
        background: 'linear-gradient(135deg, #FBE4DB, #DFB6B2, #854F6C)',
      }}
    >
      <h1
        className="text-center font-extrabold"
        style={{
          color: '#854F6C',
          fontSize: '3rem',
          marginBottom: '3rem',
          letterSpacing: '0.1em',
          textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        Admin Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#FBE4DB] p-10 rounded-2xl shadow-xl w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#854F6C]">Admin Login</h2>

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

        {error && <p className="text-red-600 text-sm mb-5 text-center">{error}</p>}

        <button
          type="submit"
          className="w-50 mx-auto block bg-[#854F6C] hover:bg-[#6b3c55] text-white font-semibold py-4 rounded-full transition-all duration-300 shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
