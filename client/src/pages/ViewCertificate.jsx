import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCertificateById,
  getAllCertificates,
} from "../services/certificateService";
import CertificateHeader from "./CertificateHeader";
import ViewCertificateData from "./ViewCertificateData";
import ShowCertificateData from "../components/ShowCertificateData";

export default function ViewCertificate() {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const location = useLocation();
  const [certificateId, setCertificateId] = useState(
    location.state?.certificateId || ""
  );
  const [loading, setLoading] = useState(false);
  const [allCertificates, setAllCertificates] = useState([]);

  useEffect(() => {
    // On first load, fetch all certificates
    getAllCertificates()
      .then((res) => setAllCertificates(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  //This will trigger handleVerify only when certificateId is set
  useEffect(() => {
    if (certificateId) {
      handleVerify({ preventDefault: () => {} });
    }
  }, [certificateId]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId) return;
    setLoading(true);
    try {
      const res = await getCertificateById(certificateId);
      setCertificate(res.data.data);
    } catch (err) {
      console.error(err);
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCardClick = async (id) => {
    setCertificateId(id);
    setLoading(true);
    try {
      const res = await getCertificateById(id);
      setCertificate(res.data.data);
    } catch (err) {
      console.error(err);
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/40 p-8 sm:p-10 mb-8">
        <CertificateHeader message="View Certificate" />
        <form onSubmit={handleVerify} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="certificateId"
              className="text-sm font-bold text-gray-700 block mb-2"
            >
              Certificate ID
            </label>
            <input
              id="certificateId"
              type="text"
              placeholder="e.g. CERT-123456"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 text-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3.5 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-brand-orange/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Loading credential...</span>
              </div>
            ) : (
              "View Certificate"
            )}
          </button>
        </form>
      </div>

      {/* Loading State indicator */}
      {loading && (
        <div className="flex justify-center items-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-orange"></div>
        </div>
      )}

      {/* Certificate Not Found banner */}
      {certificate === null && certificateId && !loading && (
        <div className="max-w-3xl mx-auto mt-6 p-5 bg-red-50/50 border border-red-100 shadow-sm rounded-2xl">
          <div className="flex items-start">
            <X className="text-red-500 mr-3 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-red-800">
                Certificate Not Found
              </h3>
              <p className="text-sm text-red-700/80 mt-1 leading-relaxed">
                We couldn’t find a certificate matching that ID. Please check the ID and try again.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Found */}
      {certificate && <ViewCertificateData certificate={certificate} />}

      {/* Grid of All Certificates */}
      {!certificateId && !certificate && allCertificates.length > 0 && (
        <div className="mt-8">
          <ShowCertificateData
            certificates={allCertificates}
            title="All Issued Credentials"
            onCardClick={handleCardClick}
            isDarkTheme={false}
          />
        </div>
      )}
    </div>
  );
}
