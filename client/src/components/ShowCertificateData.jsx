import { BadgeCheck, GraduationCap, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShowCertificateData({ certificates, title, onCardClick, isDarkTheme = false }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (onCardClick) {
      onCardClick(id);
    } else {
      navigate("/view", { state: { certificateId: id } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-extrabold mb-8 flex items-center justify-center gap-2.5 ${
        isDarkTheme ? "text-white" : "text-gray-900"
      }`}>
        <BadgeCheck className="text-brand-orange w-6 h-6" /> 
        <span>{title}</span>
      </h2>

      {certificates.length === 0 ? (
        <p className={`text-center py-6 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
          No certificates found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.certificateId}
              role="button"
              tabIndex={0}
              onClick={() => handleClick(cert.certificateId)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(cert.certificateId)}
              className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isDarkTheme
                  ? "bg-brand-navy-card border-white/5 hover:border-brand-orange/30 hover:bg-[#252233]"
                  : "bg-white border-gray-100 hover:border-brand-orange/30 hover:shadow-gray-200/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${isDarkTheme ? "bg-white/5 text-brand-orange" : "bg-brand-orange/10 text-brand-orange"}`}>
                  <User size={18} />
                </div>
                <h3 className={`text-lg font-bold truncate ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}>
                  {cert.recipientName}
                </h3>
              </div>
              
              <div className="space-y-2 mt-2">
                <div className={`text-sm flex items-center gap-2.5 ${
                  isDarkTheme ? "text-gray-400" : "text-gray-600"
                }`}>
                  <GraduationCap size={16} className="text-brand-orange shrink-0" />
                  <span className="truncate"><strong>Course:</strong> {cert.CourseTitle}</span>
                </div>
                
                <div className={`text-sm flex items-center gap-2.5 ${
                  isDarkTheme ? "text-gray-400" : "text-gray-600"
                }`}>
                  <User size={16} className="text-brand-orange shrink-0" />
                  <span className="truncate"><strong>Instructor:</strong> {cert.InstructorName}</span>
                </div>
              </div>

              {/* ID Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100/10 dark:border-white/5 flex justify-between items-center">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                  isDarkTheme ? "text-gray-500" : "text-gray-400"
                }`}>
                  Credential ID
                </span>
                <span className="text-xs font-mono font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                  {cert.certificateId.substring(0, 12)}...
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
