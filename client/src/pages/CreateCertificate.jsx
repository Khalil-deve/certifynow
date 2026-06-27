import { useState } from 'react';
import { createCertificate } from '../services/certificateService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreateCertificate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientName: '',
    CourseTitle: '',
    InstructorName: '',
    issuerDesignation: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createCertificate(formData);
      toast.success(`Certificate Created! ${res.data.data.certificateId}`);
    } catch (err) {
      toast.error('Error creating certificate. Please try again.');
      console.error(err);
    }
    setLoading(false);
    setFormData({
      recipientName: '',
      CourseTitle: '',
      InstructorName: '',
      issuerDesignation: ''
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/40 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Certificate
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Fill in the details below to generate a new verifiable credential.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Recipient Name</label>
            <input
              type="text"
              placeholder="Enter recipient's full name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 text-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Completed Full Stack Course"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 text-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
              value={formData.CourseTitle}
              onChange={(e) => setFormData({ ...formData, CourseTitle: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Instructor Name</label>
            <input
              type="text"
              placeholder="Course Instructor"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 text-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
              value={formData.InstructorName}
              onChange={(e) => setFormData({ ...formData, InstructorName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Issuer Designation</label>
            <input
              type="text"
              placeholder="e.g. Lead Web Instructor, CodeAcademy"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 text-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
              value={formData.issuerDesignation}
              onChange={(e) => setFormData({ ...formData, issuerDesignation: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3.5 px-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-brand-orange/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
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
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Certificate'
            )}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 text-center text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
        >
          &larr; Go Back
        </button>
      </div>
    </div>
  );
}
