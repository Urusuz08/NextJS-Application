'use client';

import { useState } from 'react';
import LoginPage from "./page";

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [role, setRole] = useState<'login' | null>(null);

  if(role === 'login'){
    return <LoginPage />;
  }

  
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    console.log('Admin login attempt with:', { username, password });

    try{
    const response = await fetch('https://localhost:8081/api/account/admin/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ 'username':username,
      'password':password,
      'role':'ADMIN', 
      'status':false }
    ),
  });

  if(response.ok){
    const responseData = await response.json();
    console.log('Admin login successful:', responseData);
  }else{
    console.error('Admin login failed with status:', response.statusText);
  }
  }catch(error){
    console.error('Error during admin login:', error);
  }
  };

  return (
    
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/train-image.png')" }}
    >
      <div className="w-full max-w-sm p-8 space-y-6 bg-white center rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          

          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <button
            onClick={() => setRole('login')}
            className="flex justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Back
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}