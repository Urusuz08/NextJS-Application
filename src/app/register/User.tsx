'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterUser() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [cpassword, setCPassword] = useState('');
  const [revert, setRevert] = useState<'login' | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== cpassword) {
      setError('Passwords do not match.');
      return;
    }

    if(revert === 'login'){
      router.push('/register');
      return;
    }

    try {
      const response = await fetch('https://localhost:8081/api/account/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, phone, email, password }),
      });

      if (response.ok) {
        console.log('User registration successful');
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat flex items-center justify-start p-4"
      style={{
        backgroundImage: "url('/pj.png')", // <-- PUT YOUR IMAGE URL HERE
        backgroundSize: '100% 100%',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Form container, centered on top of the background */}
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create a User Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="cpassword"
              type="password"
              required
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
                if (password !== e.target.value) {
                  setError('Passwords do not match');
                } else {
                  setError('');
                }
              }}
              className={`block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border rounded-md shadow-sm focus:outline-none ${
                error && cpassword
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => {
                router.push('/login?role=user');
              }}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login
            </button>
            <button
              type="submit"
              disabled={!!error}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}