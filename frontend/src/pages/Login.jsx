// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add API call for login here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src="/SmartGov.svg" alt="smartGov logo" className='mb-8' />
      <div className="w-full max-w-md p-8 bg-[rgba(255,255,255,0.6)] rounded-lg shadow-whiteGold">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gold-700 rounded-lg hover:bg-gold-500"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-gold-800 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;