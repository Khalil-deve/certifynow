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
        <div className="max-w-3xl mx-auto mt-4 px-4">
            <BackMenu />

            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/30 overflow-hidden">
                {/* Navy Title Header */}
                <div className="bg-brand-navy-dark p-6 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-orange text-white p-2.5 rounded-xl shadow-lg shadow-brand-orange/20">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                                    Certificate of Achievement
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">Verified Digital Credential</p>
                            </div>
                        </div>
                        <div>
                            {certificate.isValid ? (
                                <div className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold bg-brand-teal/20 text-brand-teal border border-brand-teal/20">
                                    <Check size={14} className="mr-1 shrink-0" />
                                    Valid Credential
                                </div>
                            ) : (
                                <div className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold bg-red-500/20 text-red-500 border border-red-500/20">
                                    <X size={14} className="mr-1 shrink-0" />
                                    Invalid Credential
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {/* Recipient Details */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Recipient Details
                            </h4>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 mt-0.5">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recipient Name</p>
                                        <p className="font-extrabold text-gray-900 mt-1">{certificate.recipientName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 mt-0.5">
                                        <Award size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Achievement / Course</p>
                                        <p className="font-extrabold text-gray-900 mt-1">{certificate.CourseTitle}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 mt-0.5">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Issue Date</p>
                                        <p className="font-extrabold text-gray-900 mt-1">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Issuer Details */}
                        <div className="md:pl-8 pt-6 md:pt-0 space-y-6">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Authority Details
                            </h4>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 mt-0.5">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Authorized Signatory</p>
                                        <p className="font-extrabold text-gray-900 mt-1">{certificate.InstructorName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 mt-0.5">
                                        <Briefcase size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Issuer Designation</p>
                                        <p className="font-extrabold text-gray-900 mt-1">{certificate.issuerDesignation}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${certificate.isValid ? 'bg-brand-teal/10 text-brand-teal' : 'bg-red-500/10 text-red-500'}`}>
                                        {certificate.isValid ? <Check size={18} /> : <X size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verification Status</p>
                                        <p className={`font-extrabold mt-1 ${certificate.isValid ? 'text-brand-teal' : 'text-red-500'}`}>
                                            {certificate.isValid ? 'Verified Authenticity' : 'Invalid Signature'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="mt-10 border-t border-gray-100 pt-8 flex flex-col items-center">
                        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <QRCodeCanvas id='qrcode' value={certificate.certificateId} size={128} />
                        </div>
                        <p className="text-xs font-semibold text-gray-500 mt-3 uppercase tracking-wider">
                            Scan to verify authenticity
                        </p>
                    </div>

                    {/* Download Button */}
                    {isLoading && <LoaderOverlay />}

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleDownload}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-2xl shadow-lg shadow-brand-orange/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                        >
                            <Download size={18} />
                            <span>Download PDF Certificate</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
