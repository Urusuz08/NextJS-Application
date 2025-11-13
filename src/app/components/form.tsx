// components/SearchForm.tsx
'use client';

import { useState } from 'react';
import { SearchFormData } from '@/app/interfaces/interfaces';

interface SearchFormProps {
  onSearch: (formData: SearchFormData) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the form's data UP to the parent
    onSearch({ from, to, date });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="p-2 rounded-md text-black"
        required
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="p-2 rounded-md text-black"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 rounded-md text-black"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}