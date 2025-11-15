'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';


interface Train{
  trainId: string;
  name: string;
  type: string;
  sourceStation: string;
  destinationStation : string;
}
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
      
      const url = `${baseurl}?${searchParams.toString()}`;


      const response = await fetch(url,{
        method :'GET',
        headers: {'Content-Type':'application/json'},
      }) 

      if(!response.ok){
        console.error('Train search failed with status:', response.statusText);
        return;
      }

      const rD = await response.json();
      // console.log('Train search successful:', JSON.stringify(responseData));
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

  const handleFormSubmit = useCallback((data:Train[]) => {
     console.log('Received train data in HomePage:', data);
     setTrainData(data);
   }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/train-image.png')" }}
    >
      <div className="min-h-screen bg-opacity-50">
        <main className="flex flex-col items-center justify-center px-4 text-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
          <h2 className="text-5xl font-extrabold mb-4">Welcome to Your Journey</h2>
          <p className="text-xl mb-8">Find and book your train tickets with ease.</p>

          <RouteForm OnFormSubmit={handleFormSubmit} />

          {trainData && (
            <div className="mt-8 w-full max-w-4xl bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6 text-black">
              <h3 className="text-2xl font-bold mb-4">Available Trains:</h3>
              
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white bg-opacity-80 rounded-lg">
                  <thead>
                    <tr key={"h-1"} className="border-b border-gray-300">
                      <th>Train Number</th>
                      <th>Train Name</th>
                      <th>Type</th>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody>
                  {trainData.map((train:Train,index) => (
                    <tr key={train.trainId} className="border-b border-gray-200">
                      <td className="p-3">{train.trainId}</td>
                      <td className="p-3">{train.name}</td>
                      <td className="p-3">{train.type}</td>
                      <td className="p-3">{train.sourceStation}</td>
                      <td className="p-3">{train.destinationStation}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                </div>
              
            </div>
          )}
        </main>
      </div>
    </div>
  );
}