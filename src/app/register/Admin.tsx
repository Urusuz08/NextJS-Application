'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterUser() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'TRAIN_MANAGER' | 'STATION_MANAGER' |'TICKET_MANAGER' | 'ROLE_MANAGER' | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:8081/api/account/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, phone, role, password}),
      });

      if (response.ok) {
        console.log('User registration successful');
        // Optionally, redirect to the login page or a success page
        router.push('/login');
      } else {
        console.error('Registration failed');
        // Handle errors, e.g., show an error message
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  return (
    <div className="bg-center bg-no-repeat flex items-center justify-start min-h-screen bg-gray-100"
    
      style={{ backgroundImage: "url('/pj.png')",
      backgroundSize: '100% 100%',
    }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create an Admin Account</h2>
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="name"
              required
              value={role || ''}
              onChange={(e) =>{
                const selectedRole = e.target.value as 'ADMIN' | 'TRAIN_MANAGER' | 'STATION_MANAGER' |'TICKET_MANAGER' | 'ROLE_MANAGER';
                setRole(selectedRole);
              } }
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="" disabled>Select a role</option>
                <option value="ADMIN">Admin</option>
                <option value="TRAIN_MANAGER">Train Manager</option>
                <option value="STATION_MANAGER">Station Manager</option>
                <option value="TICKET_MANAGER">Ticket Manager</option>
                <option value="ROLE_MANAGER">Role Manager</option>
              </select>
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
              type="cpassword"
              required
              value={cpassword}
              onChange={(e) => {setCPassword(e.target.value);

                if ( password !== e.target.value){
                setError('Passwords do not match');
              }else{
                setError('');
              }

            }
            }
              
              
              className="block w-full px-3 py-2 mt-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className ="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.replace('/login?role=admin')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login
            </button>
          
            <button
              type="submit"

              disabled={!!error}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}