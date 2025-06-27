import InfoSectionCard from "../InfoSectionCard";
import { Lock, Search, BarChart2 } from 'lucide-react';

export default function InfoSection() {
  const infoCards = [
  {
    title: 'Secure Storage',
    icon: <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    description: 'All certificates are encrypted and securely saved in our database.',
  },
  {
    title: 'Easy Verification',
    icon: <Search className="w-10 h-10 text-green-600 dark:text-green-400" />,
    description: 'Anyone can verify certificates using a unique ID in seconds.',
  },
  {
    title: 'Real-Time Stats',
    icon: <BarChart2 className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
    description: 'Get insights into how many certificates have been issued and verified.',
  },
];


  return (
    <section className="w-full max-w-6xl px-6 py-10 rounded-2xl my-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-6">
        About This Platform
      </h2>

      <p className="text-gray-600 dark:text-gray-200 text-center max-w-3xl mx-auto mb-8">
        This platform is designed to simplify the management and verification of digital certificates.
        Whether you are a student, employee, or organization, our system ensures that all certificates are
        stored securely and are easily accessible for verification at any time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
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
