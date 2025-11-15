// components/TrainDetailCard.tsx
'use client';

import { useState, useMemo } from 'react';
import { Train } from '@/app/interfaces/interfaces';

interface TrainDetailCardProps {
  train: Train;
}

export default function TrainDetailCard({ train }: TrainDetailCardProps) {
  // This card manages its own state for the selected class.
  // Default to the first class in the list.
  const [selectedClass, setSelectedClass] = useState(train.classes[0]?.className || '');

  // Find the full data object for the currently selected class
  const currentClassData = useMemo(() => {
    return train.classes.find(c => c.className === selectedClass);
  }, [selectedClass, train.classes]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold">{train.name} ({train.trainId})</h3>
          <p className="text-sm text-gray-600">
            {/* TODO: Add logic to bold running days */}
            Runs on: {train.runningDays}
          </p>
        </div>
        <a 
          href={train.routeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Route
        </a>
      </div>

      {/* Journey Info */}
      <div className="bg-gray-100 p-3 rounded-md mb-4 text-center">
        <span className="font-semibold">{train.sourceStation}</span>
        <span className="text-gray-500 mx-2">-- {train.journeyTime} --</span>
        <span className="font-semibold">{train.destinationStation}</span>
      </div>

      {/* Availability Section */}
      <div>
        {/* Class Tabs */}
        <div className="flex border-b mb-4">
          {train.classes.map(cls => (
            <button
              key={cls.className}
              onClick={() => setSelectedClass(cls.className)}
              className={`py-2 px-4 font-semibold ${
                selectedClass === cls.className
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
            >
              {cls.className}
            </button>
          ))}
        </div>

        {/* Date Boxes */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {currentClassData?.availability.map(day => (
            <div key={day.date} className="border border-gray-300 rounded-md p-3 text-center min-w-[120px]">
              <div className="text-sm font-semibold">{day.date}</div>
              <div className="text-green-600 font-bold">{day.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-xl font-bold">
            Fare: &#8377; {currentClassData?.fare}
          </span>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
          Book Now
        </button>
      </div>
    </div>
  );
}