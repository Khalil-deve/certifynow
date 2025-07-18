import { Award, Calendar, User, Briefcase, Check, X, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import LoaderOverlay from './LoaderOverlay.jsx';
import { generatePDF } from '../../utils/generatePDF.js';
import BackMenu from './BackMenu.jsx';
import { useState } from 'react';
import toast from 'react-hot-toast';


export default function ViewCertificateData({ certificate }) {
    const [isLoading, setIsLoading] = useState(false);
    console.log('Certificate Data:', certificate);

    const handleDownload = () => {
        setIsLoading(true);

        setTimeout(async () => {
            try {
                await generatePDF(certificate);
                toast.success('PDF downloaded successfully!');
            } catch (err) {
                console.error('PDF Generation Failed:', err);
                toast.error('Failed to generate PDF.');
            } finally {
                setIsLoading(false);
            }
        }, 0);
    };


    return (
        <div className="max-w-3xl mx-auto mt-2 p-6">
            <BackMenu />

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center">
                            <Award size={24} className="mr-2" />
                            Certificate of Achievement
                        </h2>
                        <div className="flex items-center">
                            {certificate.isValid ? (
                                <div className="flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white text-blue-700">
                                    <Check size={16} className="mr-1" />
                                    Valid
                                </div>
                            ) : (
                                <div className="flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white text-red-700">
                                    <X size={16} className="mr-1" />
                                    Invalid
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                Recipient Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <User size={20} className="text-blue-500 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Recipient Name</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{certificate.recipientName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Award size={20} className="text-blue-500 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Course</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{certificate.CourseTitle}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar size={20} className="text-blue-500 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Issue Date</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                Instructor Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <User size={20} className="text-blue-500 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Instructor Name</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{certificate.InstructorName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Briefcase size={20} className="text-blue-500 mr-3 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Issuer Designation</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{certificate.issuerDesignation}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    {certificate.isValid ? (
                                        <Check size={20} className="text-green-500 mr-3 mt-1" />
                                    ) : (
                                        <X size={20} className="text-red-500 mr-3 mt-1" />
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                        <p className={`font-medium ${certificate.isValid ? 'text-green-600' : 'text-red-600'}`}>
                                            {certificate.isValid ? 'Valid' : 'Invalid'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="mt-8 flex flex-col items-center">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <QRCodeCanvas id='qrcode' value={certificate.certificateId} size={128} />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Scan to verify certificate authenticity</p>
                    </div>

                    {/* Download Button */}
                    {isLoading && <LoaderOverlay />}

                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={handleDownload}
                            disabled={isLoading}
                            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                            <Download size={16} className="mr-2" />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
