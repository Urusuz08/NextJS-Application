'use client';

import { useState } from 'react';

export default function HomePage() {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle train search logic here, e.g., call an API
    console.log('Searching for trains:', { fromStation, toStation, journeyDate });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/train-image.png')" }}
    >
      <div className="min-h-screen bg-opacity-50">
        <main className="flex flex-col items-center justify-center px-4 text-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
          <h2 className="text-5xl font-extrabold mb-4">Welcome to Your Journey</h2>
          <p className="text-xl mb-8">Find and book your train tickets with ease.</p>

          <div className="w-full max-w-2xl p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="From Station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="To Station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search Trains
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}