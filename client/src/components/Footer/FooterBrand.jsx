import { Award } from 'lucide-react';

export default function FooterBrand() {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
        <div className="bg-brand-orange text-white p-1.5 rounded-lg shadow-sm">
          <Award size={18} />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-white">
          Certify<span className="text-brand-orange">Now</span>
        </span>
      </div>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        Empowering learners and organizations with secure, verifiable digital achievements.
      </p>
    </div>
  );
}
