import { BadgeCheck, GraduationCap, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShowCertificateData({ certificates, title, onCardClick}) {
    const navigate = useNavigate();

  const handleClick = (id) => {
    if (onCardClick) {
      onCardClick(id);
    } else {
      // Navigate to /view and pass the ID via state
      navigate("/view", { state: { certificateId: id } });
    }
  };
    return (
        <div className="max-w-7xl mx-auto md:px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
                <BadgeCheck className="text-blue-600" /> {title}
            </h2>

            {certificates.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">No certificates found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div
                            key={cert.certificateId}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleClick(cert.certificateId)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cert.certificateId)}
                            className="cursor-pointer bg-white dark:bg-gray-600 p-5 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-500"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <User className="text-blue-500" />
                                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 truncate">
                                    {cert.recipientName}
                                </h3>
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1 flex items-cneter gap-2">
                                <GraduationCap size={16} />
                                <span><strong>Course:</strong> {cert.CourseTitle}</span>
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <User size={16} />
                                <span><strong>Instructor:</strong> {cert.InstructorName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
