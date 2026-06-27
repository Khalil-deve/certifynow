import { ArrowRight, Award, CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroAboutCard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-0">
            {/* Left promo banner: 2/3 width on desktop, brand orange */}
            <div className="lg:col-span-2 relative bg-gradient-to-br from-brand-orange to-red-600 rounded-3xl p-8 sm:p-10 shadow-lg text-white flex flex-col justify-between overflow-hidden group min-h-[300px] sm:min-h-[350px]">
                {/* Abstract decorative circles */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl transition-all duration-500 group-hover:scale-125" />
                <div className="absolute right-10 top-5 w-24 h-24 rounded-full bg-white/5 blur-lg" />
                
                <div>
                    <span className="inline-block bg-white/20 text-white font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-6">
                        FAST & SECURE
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-md">
                        Generate Certificates in Seconds
                    </h2>
                    <p className="mt-4 text-white/90 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
                        Create encrypted, tamper-proof, and professionally styled PDF credentials for students, course completers, or employees instantly.
                    </p>
                </div>

                <div className="mt-8">
                    <Link
                        to="/create"
                        className="inline-flex items-center gap-2 bg-white text-brand-orange hover:text-brand-orange-hover font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-md transition-all duration-200 active:scale-95"
                    >
                        <span>Start Creating</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Right column: Stacked cards (1/3 width) */}
            <div className="flex flex-col gap-6">
                {/* Top Navy Card */}
                <div className="flex-1 relative bg-brand-navy-dark rounded-3xl p-6 sm:p-8 shadow-lg text-white flex flex-col justify-between overflow-hidden group min-h-[160px]">
                    <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/5 blur-lg group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="text-xs text-brand-orange font-semibold uppercase tracking-wider">Verification API</span>
                            <h3 className="text-xl font-bold mt-1 text-white">Verify Certificate</h3>
                            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed max-w-[200px]">
                                Instant cryptographic validation using a credential ID.
                            </p>
                        </div>
                        <div className="bg-brand-navy-card text-brand-orange p-2.5 rounded-xl shadow-inner border border-white/5">
                            <Search size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            to="/verify"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-orange transition-colors"
                        >
                            <span>Verify credential</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Teal Card */}
                <div className="flex-1 relative bg-brand-teal rounded-3xl p-6 sm:p-8 shadow-lg text-white flex flex-col justify-between overflow-hidden group min-h-[160px]">
                    <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/10 blur-lg group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="text-xs text-white/80 font-semibold uppercase tracking-wider">Directory</span>
                            <h3 className="text-xl font-bold mt-1 text-white">Public Records</h3>
                            <p className="text-white/80 text-xs mt-1.5 leading-relaxed max-w-[200px]">
                                Search and view all public digital certificates.
                            </p>
                        </div>
                        <div className="bg-white/15 text-white p-2.5 rounded-xl shadow-inner">
                            <Award size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            to="/view"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-white/80 transition-colors"
                        >
                            <span>View records</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
