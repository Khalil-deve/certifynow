import { Link } from 'react-router-dom';
import ShowCertificateData from '../ShowCertificateData';

export default function RecentCertificates({ certificates }) {
  const visibleCertificates = certificates.slice(0, 6);

  return (
    <div className="w-full max-w-6xl mx-auto bg-brand-navy-dark rounded-[2.5rem] shadow-xl p-8 sm:p-12 my-8 text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

      {certificates.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 font-medium">No certificates have been issued yet.</p>
          <Link to="/create" className="inline-block mt-4 text-brand-orange hover:text-brand-orange-hover font-semibold">
            Be the first to issue a certificate &rarr;
          </Link>
        </div>
      ) : (
        <>
          <ShowCertificateData 
            certificates={visibleCertificates} 
            title="Recent Certificates" 
            isDarkTheme={true}
          />

          {/* View All Button */}
          {certificates.length > 6 && (
            <div className="mt-8 text-center">
              <Link
                to="/view"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-2xl shadow-lg shadow-brand-orange/20 transition-all duration-200 active:scale-95 text-sm sm:text-base"
              >
                View All Certificates
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
