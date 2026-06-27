import { ArrowRight } from 'lucide-react';

export default function NewsletterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Stay Updated</h3>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        Subscribe to get updates on new features and tools.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 rounded-xl overflow-hidden">
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Your email address"
          required
          className="flex-1 px-4 py-3 bg-brand-navy-card border border-brand-navy-card text-white placeholder-gray-500 rounded-xl sm:rounded-r-none sm:rounded-l-xl focus:outline-none focus:border-brand-orange text-sm transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-xl sm:rounded-l-none sm:rounded-r-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md shadow-brand-orange/10 active:scale-95"
        >
          <span>Subscribe</span>
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
