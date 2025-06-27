import { BadgeCheck, FileText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroAboutCard() {
    return (
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-3xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Icon Section */}
            <div className="relative w-full md:w-1/2 h-48 sm:h-60 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full blur-2xl opacity-30" />
                <div className="z-10 flex flex-row md:flex-col items-center justify-center space-x-3 md:space-x-0 md:space-y-4">
                    <div className="bg-white dark:bg-gray-700 rounded-full p-3 sm:p-4 shadow-lg">
                        <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-full p-3 sm:p-4 shadow-lg">
                        <BadgeCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-full p-3 sm:p-4 shadow-lg">
                        <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>

            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
                    What is <span className="text-blue-600">CertifyNow</span>?
                </h2>
                <p className="text-yellow-700 text-base sm:text-lg mb-6">
                    CertifyNow is a secure platform for generating, storing, and verifying digital certificates.
                    Say goodbye to lost documents and hello to reliable, verifiable achievements — instantly and securely.
                </p>
                <Link
                    to="/create"
                    className="inline-block w-full sm:w-auto text-center bg-purple-600 px-6 py-3 text-white rounded-lg shadow hover:bg-purple-700 transition-all"
                >
                    Get Started
                </Link>
            </div>
        </div>

    );
}
