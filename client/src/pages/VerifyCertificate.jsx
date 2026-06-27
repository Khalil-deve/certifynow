import { useState } from 'react';
import axios from 'axios';
import VerifyCertificateData from './VerifyCertificateData';
import CertificateHeader from './CertificateHeader';
import BackMenu from './BackMenu';
import toast from 'react-hot-toast';

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setResult(null); // Clear previous result
    setLoading(true);

    if (!certificateId.startsWith('CERT-')) {
      toast.error('Certificate ID must start with "CERT-"');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://certifynow.vercel.app/api/verify/${certificateId}`);
      if (res.data && res.data.isValid) {
        setResult(res.data);
        toast.success('Certificate verified successfully!');
      } else {
        toast.error('Certificate is not valid.');
      }
    } catch (err) {
      toast.error('Verification failed. Please check the certificate ID.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/40 p-8 sm:p-10 space-y-6">
        <CertificateHeader message="Verify Certificate" />

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="relative">
            <label htmlFor="certificateId" className="text-sm font-bold text-gray-700 mb-2 block">
              Certificate ID
            </label>
            <input
              id="certificateId"
              type="text"
              placeholder="e.g. CERT-123456"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 text-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
              required
            />
            {certificateId && (
              <button
                type="button"
                onClick={() => setCertificateId('')}
                className="absolute right-3 top-[3.1rem] text-gray-400 hover:text-gray-600 text-lg font-bold"
                aria-label="Clear field"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3.5 px-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-brand-orange/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Verifying Credential...</span>
              </div>
            ) : (
              'Verify Certificate'
            )}
          </button>

          <BackMenu />
        </form>

        {result && result.isValid && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <VerifyCertificateData result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
