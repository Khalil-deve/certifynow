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
      const res = await axios.get('http://localhost:5000/api/certificates');
      console.log('Fetched certificates:', res.data);
      setCertificates(res.data.data || []);
    } catch (err) {
      console.error('Error fetching certificates', err);
    }
  };

  const fetchCertificateCount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/certificates/count');
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
    <main className="flex flex-col items-center justify-center text-center px-4 mt-8 mb-16">
      <HeroSection />
      <InfoSection />
      
       <CertificateStats count={certificateCount} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <RecentCertificates certificates={filteredCerts} />
    </main>
  );
}
