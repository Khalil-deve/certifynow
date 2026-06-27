import InfoSectionCard from "../InfoSectionCard";
import { Lock, Search, BarChart2 } from 'lucide-react';

export default function InfoSection() {
  const infoCards = [
    {
      title: 'Secure Storage',
      icon: <Lock className="w-7 h-7" />,
      description: 'All certificates are encrypted and securely saved in our database.',
    },
    {
      title: 'Easy Verification',
      icon: <Search className="w-7 h-7" />,
      description: 'Anyone can verify certificates using a unique ID in seconds.',
    },
    {
      title: 'Real-Time Stats',
      icon: <BarChart2 className="w-7 h-7" />,
      description: 'Get insights into how many certificates have been issued and verified.',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 my-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Why Choose CertifyNow?
        </h2>
        <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
          Our digital certificate system is built on speed, trust, and simplicity. We provide organizations and learners with tools to securely manage their achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
        {infoCards.map((card, index) => (
          <InfoSectionCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}
