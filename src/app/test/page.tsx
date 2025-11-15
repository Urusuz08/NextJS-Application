// This must be a Client Component because it uses 'useState'
"use client";

import React, { useState } from 'react';

// --- 1. This is your Form component ---
// It takes a function 'onFormSubmit' as a prop
// to tell the parent component when it's done.

interface DetailsFormProps {
  // This defines the prop as a function that
  // takes a 'name' string and returns nothing (void).
  onFormSubmit: (name: string) => void;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ onFormSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the whole page from reloading
    
    // --- Validation ---
    if (name.trim() === '') {
      alert('Name is required!');
      return;
    }
    
    // Call the function from the parent, passing the name up
    onFormSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Please enter your details:</h3>
      <div>
        <label>Name: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name"
        />
      </div>
      <button type="submit">Show Content</button>
    </form>
  );
};

// --- 2. This is your "secret" Answer component ---
// It receives the submitted name as a prop to display it.

interface AnswerContentProps {
  submittedName: string;
}

const AnswerContent: React.FC<AnswerContentProps> = ({ submittedName }) => {
  return (
    <div>
      <h2>Welcome, {submittedName}!</h2>
      <p>This is the secret content, visible only after submission.</p>
    </div>
  );
};

// --- 3. This is the main Page component ---
// This is what you would export from your `page.tsx` file.
// It holds the state and controls what to show.

export default function ContentPage() {
  // State to hold the collected information (the name)
  // It starts as 'null', meaning no info is collected yet.
  const [collectedName, setCollectedName] = useState<string | null>(null);

  // This function is passed down to the form.
  // When the form calls it, we update our state.
  const handleDetailsSubmit = (name: string) => {
    console.log('Collected details:', name);
    
    // --- This is the "key" ---
    // Setting this state causes the component to re-render.
    setCollectedName(name);
  };

  // --- This is the Conditional Rendering ---
  // The ternary operator (?) checks if 'collectedName' has a value.
  // - If it does, show <AnswerContent />.
  // - If it's still 'null', show <DetailsForm />.
  return (
    <div>
      {collectedName ? (
        <AnswerContent submittedName={collectedName} />
      ) : (
        <DetailsForm onFormSubmit={handleDetailsSubmit} />
      )}
    </div>
  );
}