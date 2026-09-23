/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      } else {
        setIsError(true);
        setMessage(data.error);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server connection failed. Backend chalu hai?");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center p-4 font-sans text-white">
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-cyan-500"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-2">
            Join TalkVault
          </h1>
          <p className="text-gray-400 text-sm">Create an account to start practicing</p>
        </div>

        {message && (
          <div className={`text-sm p-3 rounded-xl mb-6 text-center border ${isError ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-green-500/10 border-green-500/50 text-green-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#151c33] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              placeholder="Enter Your Name "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#151c33] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#151c33] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              placeholder="Create a password"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition transform hover:scale-[1.02]"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <Link to="/" className="text-cyan-400 hover:text-cyan-300 font-medium">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;