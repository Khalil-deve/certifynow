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
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-500 mb-6">
          Create Certificate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Recipient Name</label>
            <input
              type="text"
              placeholder="Enter recipient's full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Completed Full Stack Course"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={formData.CourseTitle}
              onChange={(e) => setFormData({ ...formData, CourseTitle: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Instructor Name</label>
            <input
              type="text"
              placeholder="Course Instructor"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={formData.InstructorName}
              onChange={(e) => setFormData({ ...formData, InstructorName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Issuer Designation</label>
            <input
              type="text"
              placeholder="e.g. Lead Web Instructor, CodeAcademy"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={formData.issuerDesignation}
              onChange={(e) => setFormData({ ...formData, issuerDesignation: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Certificate'}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 text-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
