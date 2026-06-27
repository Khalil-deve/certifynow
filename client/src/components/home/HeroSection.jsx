import HeroAboutCard from './HeroAboutCard';
import { Shield, Sparkles, CheckCircle2, QrCode } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full md:px-4 py-8">
      <div className="text-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Create, Verify & Share <span className="text-brand-orange">Digital Certificates</span> Instantly
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Empowering educational platforms, instructors, and companies with secure, tamper-proof, and beautiful digital certifications.
        </p>

        {/* E-commerce style Value Prop Bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm max-w-4xl mx-auto">
          {[
            { icon: <Shield className="w-5 h-5 text-brand-orange" />, text: "100% Encrypted" },
            { icon: <Sparkles className="w-5 h-5 text-brand-orange" />, text: "Instant Generation" },
            { icon: <CheckCircle2 className="w-5 h-5 text-brand-orange" />, text: "WCAG Compliant" },
            { icon: <QrCode className="w-5 h-5 text-brand-orange" />, text: "QR Verifiable" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2.5 py-1.5 px-3 border-r border-gray-100 last:border-r-0">
              {item.icon}
              <span className="text-sm font-semibold text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <HeroAboutCard />
      </div>
    </section>
  );
}
