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
      const res = await axios.get(`https://certifynow.vercel.app/verify/${certificateId}`);
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
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-10 space-y-6">
        <CertificateHeader message="Verify Certificate" />

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative">
            <label htmlFor="certificateId" className="text-sm font-semibold text-gray-700  mb-2 block">
              Certificate ID
            </label>
            <input
              id="certificateId"
              type="text"
              placeholder="e.g. CERT-123456"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm dark:text-gray"
              required
            />
            {certificateId && (
              <button
                type="button"
                onClick={() => setCertificateId('')}
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Verifying...
              </div>
            ) : (
              'Verify Certificate'
            )}
          </button>

          <BackMenu />
        </form>

        {result && result.isValid && (
          <div className="mt-6">
            <VerifyCertificateData result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
