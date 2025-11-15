'use client';

export default function TransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-lg shadow p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-4">Booked Tickets</h2>
          <p className="text-sm text-gray-600">Your booking history will appear here.</p>
        </section>
        <section className="bg-white rounded-lg shadow p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-4">Cancelled Tickets</h2>
          <p className="text-sm text-gray-600">Cancelled tickets will appear here.</p>
        </section>
      </div>
    </div>
  );
}


