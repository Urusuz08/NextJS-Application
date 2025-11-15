'use client';

export default function UserProfilePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-lg shadow p-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <p className="text-sm text-gray-600">Your personal information and preferences.</p>
        </section>
        <aside className="bg-white rounded-lg shadow p-6 text-gray-900">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Update profile</li>
            <li>Security settings</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}


