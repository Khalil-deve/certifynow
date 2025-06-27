import { Link } from 'react-router-dom';
import ShowCertificateData from '../ShowCertificateData';

export default function RecentCertificates({ certificates }) {
  const visibleCertificates = certificates.slice(0, 6); // Show only first 6

  return (
    <div className="w-full max-w-7xl px-4 mx-auto">

      {certificates.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No certificates found.</p>
      ) : (
        <>
          <ShowCertificateData certificates={visibleCertificates} title = 'Recent Certificates' />

          {/* View All Button */}
          {certificates.length > 6 && (
            <div className="mt-10 text-center">
              <Link
                to="/view"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
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
