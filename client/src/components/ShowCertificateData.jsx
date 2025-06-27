import { BadgeCheck, GraduationCap, User } from "lucide-react";

export default function ShowCertificateData({certificates, title}) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <BadgeCheck className="text-blue-600" /> {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <div
                        key={cert.certificateId}
                        onClick={() => handleCardClick(cert.certificateId)}
                        className="cursor-pointer bg-white dark:bg-gray-600 p-5 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <User className="text-blue-500" />
                            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                                {cert.recipientName}
                            </h3>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
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
        </div>
    )
}