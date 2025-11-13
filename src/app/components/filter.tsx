// components/FilterSidebar.tsx
'use client';

import { ActiveFilters } from '@/app/interfaces/interfaces';

interface FilterSidebarProps {
  options: {
    trainTypes: string[];
  };
  activeFilters: ActiveFilters;
  onFilterChange: (newFilters: ActiveFilters) => void;
}

export default function FilterSidebar({ options, activeFilters, onFilterChange }: FilterSidebarProps) {
  
  const handleTypeChange = (trainType: string) => {
    // Create a new Set from the old one
    const newTypes = new Set(activeFilters.trainTypes);

    if (newTypes.has(trainType)) {
      newTypes.delete(trainType);
    } else {
      newTypes.add(trainType);
    }
    
    // Call the parent function with the new filters object
    onFilterChange({
      ...activeFilters,
      trainTypes: newTypes,
    });
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-gray-800">
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      
      {/* --- TODO: Add more filter sections --- */}
      <div>
        <h4 className="font-semibold mb-2">Train Type</h4>
        {options.trainTypes.map(type => (
          <div key={type} className="flex items-center">
            <input
              type="checkbox"
              id={type}
              checked={activeFilters.trainTypes.has(type)}
              onChange={() => handleTypeChange(type)}
              className="mr-2"
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
      {/* --------------------------------- */}
    </div>
  );
}