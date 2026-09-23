/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
        body: JSON.stringify({ name, username, email, phone, password })
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
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center px-4 py-10 font-sans text-[#f5f7fb] relative overflow-hidden">
      <div className="absolute top-[-12rem] left-[-8rem] w-[28rem] h-[28rem] rounded-full bg-[#1b4d77]/30 blur-3xl"></div>
      <div className="absolute bottom-[-14rem] right-[-8rem] w-[30rem] h-[30rem] rounded-full bg-[#4b246d]/25 blur-3xl"></div>
      <div className="w-full max-w-[380px] relative z-10">
        <div className="bg-[#11151d]/95 border border-[#252d3a] px-8 py-8 shadow-2xl shadow-black/30 rounded-2xl">
          <div className="text-center mb-6">
            <img src="/talkvault-logo.svg" alt="TalkVault logo" className="mx-auto mb-4 w-16 h-16 rounded-2xl shadow-lg shadow-[#1e6fff]/20" />
            <h1 className="text-[32px] leading-none font-semibold tracking-tight text-white">TalkVault</h1>
            <p className="text-[#8b96a8] text-sm mt-3">Create your conversation profile</p>
          </div>

        {message && (
          <div className={`text-xs p-3 mb-4 text-center border rounded-lg ${isError ? 'bg-[#391b24] border-[#743343] text-[#ff9eae]' : 'bg-[#122b27] border-[#246054] text-[#8de2cb]'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3 relative z-10">
          <div>
            <label className="block text-[11px] font-medium text-[#9ca8ba] mb-1.5">Username</label>
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0b0e14] border border-[#293240] text-white text-sm px-3.5 py-3.5 rounded-lg focus:outline-none focus:border-[#4d8dff] transition placeholder:text-[#586579]" placeholder="Choose a username" />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#9ca8ba] mb-1.5">Full name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0b0e14] border border-[#293240] text-white text-sm px-3.5 py-3.5 rounded-lg focus:outline-none focus:border-[#4d8dff] transition placeholder:text-[#586579]"
              placeholder="Enter Your Name "
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#9ca8ba] mb-1.5">Phone number</label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#0b0e14] border border-[#293240] text-white text-sm px-3.5 py-3.5 rounded-lg focus:outline-none focus:border-[#4d8dff] transition placeholder:text-[#586579]" placeholder="Enter your phone number" />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#9ca8ba] mb-1.5">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0b0e14] border border-[#293240] text-white text-sm px-3.5 py-3.5 rounded-lg focus:outline-none focus:border-[#4d8dff] transition placeholder:text-[#586579]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#9ca8ba] mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0e14] border border-[#293240] text-white text-sm px-3.5 py-3.5 rounded-lg focus:outline-none focus:border-[#4d8dff] transition placeholder:text-[#586579]"
              placeholder="Create a password"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1e6fff] hover:bg-[#3b82ff] text-white text-sm font-semibold py-3.5 rounded-lg transition"
          >
            CREATE ACCOUNT
          </button>
        </form>

        </div>
        <div className="text-center text-sm text-[#8995a7] mt-6">
          Already have an account? <Link to="/" className="text-[#62a0ff] font-semibold hover:text-white transition">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;