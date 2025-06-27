import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-md mb-12">
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search certificate by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-sm text-gray-800 dark:text-white bg-transparent focus:outline-none"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-dark px-4 py-2" disabled>
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
