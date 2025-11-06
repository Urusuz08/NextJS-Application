// components/TrainResultsList.tsx

import { Train } from '@/app/interfaces/interfaces';
import TrainDetailCard from './trainCardDetail';

interface TrainResultsListProps {
  trains: Train[];
}

export default function TrainResultsList({ trains }: TrainResultsListProps) {
  if (trains.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No trains found for your search.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {trains.map(train => (
        <TrainDetailCard key={train.trainId} train={train} />
      ))}
    </div>
  );
}