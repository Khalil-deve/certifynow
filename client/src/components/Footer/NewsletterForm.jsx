import { ArrowRight } from 'lucide-react';

export default function NewsletterForm() {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Stay Updated</h3>
      <p className="text-sm mb-3">Subscribe to get updates on new features and tools.</p>
      <form className="flex flex-col sm:flex-row items-center sm:items-stretch">
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2 rounded-l-md sm:rounded-md text-sm text-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 sm:ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-1 text-sm"
        >
          Subscribe <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
