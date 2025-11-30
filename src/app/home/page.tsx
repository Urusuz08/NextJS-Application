'use client';

import { useState, useMemo, useCallback } from 'react';
import { Train, ActiveFilters } from '@/app/interfaces/interfaces';
import FilterSidebar from '@/app/components/filter';
import TrainResultsList from '@/app/components/trainInfo';


interface routeDetails{

  OnFormSubmit : (responseData:Train[]) => void;
}


const RouteForm:React.FC<routeDetails> = ({OnFormSubmit}) => {

  
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
  } finally {
    setIsLoading(false);
  }
  }

  // useEffect(()=>{
  //   if(responseData){
  //     OnFormSubmit(responseData);
  //   }

    return (
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          {/* Row 1: From -> Arrow -> To */}
          <div className="flex items-center gap-2">
            <div className="flex-1 group">
              <label className="block text-xs font-medium text-gray-200 mb-1 uppercase tracking-wider">From</label>
              <input
                type="text"
                placeholder="Station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner"
                required
              />
            </div>
            
            {/* Arrow Icon */}
            <div className="text-white pt-6 opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>

            <div className="flex-1 group">
              <label className="block text-xs font-medium text-gray-200 mb-1 uppercase tracking-wider">To</label>
              <input
                type="text"
                placeholder="Station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Row 2: Date */}
          <div className="group">
            <label className="block text-xs font-medium text-gray-200 mb-1 uppercase tracking-wider">Date</label>
            <input
              type="date"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner"
              required
            />
          </div>

          {/* Row 3: Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              'Search Trains'
            )}
          </button>
        </form>
      </div>
    );
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
    <div className="relative min-h-screen font-sans">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('/train-image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="grow flex items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Side: Search Form */}
            <div className="lg:col-span-5 flex flex-col justify-center py-12">
               <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
                Begin Your <br/>
                <span className="text-blue-400">Journey</span> Today
              </h1>
              <RouteForm OnFormSubmit={handleFormSubmit} />
            </div>

            {/* Right Side: Spacer or future content */}
            <div className="lg:col-span-7 hidden lg:block">
            </div>
          </div>
        </main>

        {/* Results Section */}
        {trainData && (
          <div className="w-full max-w-7xl mx-auto px-4 pb-12">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}