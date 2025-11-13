'use client';

import { useState, useMemo, useCallback } from 'react';
import { Train, ActiveFilters } from './interfaces/interfaces';
import FilterSidebar from './components/filter';
import TrainResultsList from './components/trainInfo';


interface routeDetails{

  OnFormSubmit : (responseData:Train[]) => void;
}


const RouteForm:React.FC<routeDetails> = ({OnFormSubmit}) => {

  
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  
  
  

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle train search logic here, e.g., call an API
    console.log('Searching for trains:', { fromStation, toStation, journeyDate });
    const searchParams = new URLSearchParams();
    try{

      const baseurl='https://localhost:8081/api/trains/route';
      searchParams.append('from', fromStation);
      searchParams.append('to', toStation);
      searchParams.append('date', journeyDate);
      
      const url = `${baseurl}?${searchParams.toString()}`;


      const response = await fetch(url,{
        method :'GET',
        
      }) 

      if(!response.ok){
        console.error('Train search failed with status:', response.statusText);
        return;
      }

      const rD = await response.json();
      // console.log('Train search successful:', JSON.stringify(responseData));
      console.log('Train search successful:', JSON.stringify(rD));
      OnFormSubmit(rD);
      


  }catch(error){
    console.error('Error during train search:', error);
  }
  }

  // useEffect(()=>{
  //   if(responseData){
  //     OnFormSubmit(responseData);
  //   }

    return(
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
    )
  }


export default function HomePage() {
  const [trainData, setTrainData] = useState<Train[] | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    trainTypes: new Set(),
  });

  const handleFormSubmit = useCallback((data: Train[]) => {
    console.log('Received train data in HomePage:', data);
    setTrainData(data);
  }, []);

  const handleFilterChange = useCallback((newFilters: ActiveFilters) => {
    setActiveFilters(newFilters);
  }, []);

  // Memoize filter options so they don't recalculate on every render
  const filterOptions = useMemo(() => {
    if (!trainData) {
      return { trainTypes: [] };
    }
    // Get unique train types from the search results
    const trainTypes = [...new Set(trainData.map(train => train.type))];
    return { trainTypes };
  }, [trainData]);

  // Memoize the filtered results
  const filteredTrains = useMemo(() => {
    if (!trainData) {
      return [];
    }
    // Apply filters
    return trainData.filter(train => {
      // If no type filters are selected, show all trains
      if (activeFilters.trainTypes.size === 0) {
        return true;
      }
      // Otherwise, only show trains whose type is in the active filter set
      return activeFilters.trainTypes.has(train.type);
    });
  }, [trainData, activeFilters]);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/train-image.png')" }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        <main className="flex flex-col items-center justify-center px-4 text-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
          <h2 className="text-5xl font-extrabold mb-4">Welcome to Your Journey</h2>
          <p className="text-xl mb-8">Find and book your train tickets with ease.</p>

          <RouteForm OnFormSubmit={handleFormSubmit} />

          {trainData && (
            <div className="mt-8 w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
              {/* Filter Sidebar (Left Column) */}
              <div className="md:col-span-1">
                <FilterSidebar
                  options={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Train Results (Right Column) */}
              <div className="md:col-span-3">
                <TrainResultsList trains={filteredTrains} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}