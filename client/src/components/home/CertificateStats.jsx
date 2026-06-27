export default function CertificateStats({ count }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="pt-4 md:pt-0">
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange transition-transform duration-300 hover:scale-105 inline-block">
            {count}+
          </p>
          <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1.5">
            Issued Credentials
          </p>
        </div>
        
        <div className="pt-4 md:pt-0 md:pl-6">
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange transition-transform duration-300 hover:scale-105 inline-block">
            &lt; 2s
          </p>
          <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1.5">
            Verification Time
          </p>
        </div>

        <div className="pt-4 md:pt-0 md:pl-6">
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange transition-transform duration-300 hover:scale-105 inline-block">
            100%
          </p>
          <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1.5">
            Tamper-Proof
          </p>
        </div>

        <div className="pt-4 md:pt-0 md:pl-6">
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange transition-transform duration-300 hover:scale-105 inline-block">
            4.9 ★
          </p>
          <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1.5">
            Trust Score
          </p>
        </div>
      </div>
    </div>
  );
}
