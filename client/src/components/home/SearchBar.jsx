import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 sm:px-0">
      <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-brand-orange focus-within:ring-4 focus-within:ring-brand-orange/10 transition-all duration-300 overflow-hidden p-1">
        <div className="pl-3 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search certificate by name or ID..."
          aria-label="Search certificate by recipient name or credential ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-3 text-sm text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="p-2 text-gray-400 hover:text-gray-600 text-xs font-semibold mr-1 focus:outline-none"
            type="button"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
