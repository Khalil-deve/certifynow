import { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection from '../components/home/HeroSection';
import CertificateStats from '../components/home/CertificateStats';
import SearchBar from '../components/home/SearchBar';
import RecentCertificates from '../components/home/RecentCertificates';
import InfoSection from '../components/home/InfoSection';

export default function Home() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [certificateCount, setCertificateCount] = useState(0);

  useEffect(() => {
    fetchCertificates();
    fetchCertificateCount();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get('https://certifynow.vercel.app/api/certificates');
      console.log('Fetched certificates:', res.data);
      setCertificates(res.data.data || []);
    } catch (err) {
      console.error('Error fetching certificates', err);
    }
  };

  const fetchCertificateCount = async () => {
    try {
      const res = await axios.get('https://certifynow.vercel.app/api/certificates/count');
      setCertificateCount(res.data.count);
    } catch (err) {
      console.error('Error fetching count', err);
    }
  };
  const filteredCerts = certificates.filter((cert) =>
    cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-stretch px-2 mt-4 mb-16 space-y-12">
      <HeroSection />
      <InfoSection />
      <CertificateStats count={certificateCount} />
      
      <div className="flex flex-col items-center max-w-6xl mx-auto w-full px-4">
        <div className="text-center max-w-xl mx-auto mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Search Digital Directory
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Find any issued credentials by searching the recipient's name or the unique Certificate ID.
          </p>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <RecentCertificates certificates={filteredCerts} />
    </div>
  );
}
