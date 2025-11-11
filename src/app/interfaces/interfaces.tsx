// interfaces/index.ts

/**
 * Represents the availability and fare for a specific class (SL, 3A, etc.)
 */
export interface TrainClass {
  className: string; // e.g., 'SL', '3A', '2A'
  fare: number;
  availability: {
    date: string; // e.g., 'MON 28, NOV'
    status: string; // e.g., 'AVL-256'
  }[];
}

/**
 * Represents a single train in the search results.
 */
export interface Train {
//   id: string; // Use trainNumber or another unique ID from your API
  trainId: string;
  name: string;
  runningDays: string; // e.g., "M T W T F S S" with bolding logic
  sourceStation: string;
  destinationStation: string;
  journeyTime: string; // e.g., "14h 30m"
  routeUrl: string; // For the hyperlink button
  classes: TrainClass[];
  // This 'type' field is for the filter sidebar
  type: string; // e.g., 'RAJDHANI', 'PASSENGER'
}

/**
 * The data captured from the purple search form.
 */
export interface SearchFormData {
  from: string;
  to: string;
  date: string;
}

/**
 * The state of the filters from the sea blue sidebar.
 */
export interface ActiveFilters {
  // Example: A Set of selected train types
  trainTypes: Set<string>;
}

/**
 * Represents a user of the application.
 */
export interface User {
  name: string;
  username: string;
  role: 'ADMIN' | 'USER';
}