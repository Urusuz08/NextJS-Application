// app/trains/page.tsx
'use client';

import { useState, useMemo } from 'react';
import SearchForm from '@/app/components/form';
import FilterSidebar from '@/app/components/filter';
import TrainResultsList from '@/app/components/trainInfo';
import { Train, SearchFormData, ActiveFilters } from '@/app/interfaces/interfaces';

export default function TrainsPage() {
  // State for the complete list of trains from the API
  const [allTrains, setAllTrains] = useState<Train[]>([]);
  
  // State for the currently active filters
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    trainTypes: new Set(),
  });

  /**
   * Called by SearchForm. Fetches data from the backend.
   */
  const handleSearch = async (formData: SearchFormData) => {
    console.log('Searching with:', formData);
    
    // --- TODO: API Endpoint ---
    // const apiEndpoint = `YOUR_API_ENDPOINT?from=${formData.from}&to=${formData.to}&date=${formData.date}`;
    // const response = await fetch(apiEndpoint);
    // const data: Train[] = await response.json();
    // setAllTrains(data);
    // --------------------------

    // For testing, setting mock data:
    const mockData: Train[] = [
      // Add mock train objects here...
    ];
    setAllTrains(mockData);
  };

  /**
   * Called by FilterSidebar. Updates the active filters.
   */
  const handleFilterChange = (newFilters: ActiveFilters) => {
    setActiveFilters(newFilters);
  };

  /**
   * Calculates the final list of trains to display
   * This "memoized" list only recalculates when trains or filters change.
   */
  const filteredTrains = useMemo(() => {
    return allTrains.filter(train => {
      // --- TODO: Filter Logic ---
      // If no filters are set, show all
      if (activeFilters.trainTypes.size === 0) {
        return true;
      }
      // Otherwise, check if the train's type is in the filter Set
      return activeFilters.trainTypes.has(train.type);
      // --------------------------
    });
  }, [allTrains, activeFilters]);

  // These are the unique filter options to build the sidebar
  const filterOptions = useMemo(() => {
    const types = new Set(allTrains.map(train => train.type));
    return {
      trainTypes: Array.from(types),
    };
  }, [allTrains]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex max-w-7xl mx-auto pt-8 gap-6">
        {/* 2. Sea Blue Section */}
        <aside className="w-1/4">
          <FilterSidebar
            options={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* 3. Sea Green Section */}
        <main className="w-3/4">
          <div className="mb-4">
            <SearchForm onSearch={handleSearch} />
          </div>
          <TrainResultsList trains={filteredTrains} />
        </main>
      </div>
    </div>
  );
}