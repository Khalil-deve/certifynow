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
    <>
      <div className="overflow-hidden max-w-3xl mx-auto md:px-6 py-6 rounded-lg">
        <CertificateHeader message="View Certificate" />
        <form onSubmit={handleVerify} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="certificateId"
              className="text-sm font-medium text-white block mb-2"
            >
              Certificate ID
            </label>
            <input
              id="certificateId"
              type="text"
              placeholder="Enter your certificate ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium"
            disabled={loading}
          >
            {loading ? "Loading..." : "View Certificate"}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Certificate Not Found */}
      {certificate === null && certificateId && !loading && (
        <div className="max-w-3xl mx-auto mt-6 p-4 bg-white dark:bg-gray-800 border-l-4 border-red-500 shadow rounded">
          <div className="flex items-center">
            <X className="text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-bold text-red-500">
                Certificate Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We couldn’t load the certificate. Please double-check the ID.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Found */}
      {certificate && <ViewCertificateData certificate={certificate} />}

      {/* Grid of All Certificates */}
      {!certificateId && !certificate && allCertificates.length > 0 && (
        <ShowCertificateData
          certificates={allCertificates}
          title="All Certificates"
          onCardClick={handleCardClick}
        />
      )}
    </>
  );
}
