import { ShieldCheck, BadgeCheck, FileText, Laptop2, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoSectionCard from '../components/InfoSectionCard';
import certificateImage from '../assets/certifcateImage.svg'

const features = [
  {
    title: 'Secure Storage',
    description:
      'Every certificate is encrypted and stored in our database to ensure security and integrity.',
    icon: <ShieldCheck className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-400 mb-3" />,
  },
  {
    title: 'Instant Verification',
    description:
      'With a single certificate ID, anyone can verify the authenticity in seconds.',
    icon: <BadgeCheck className="w-10 h-10 mx-auto text-green-600 dark:text-green-400 mb-3" />,
  },
  {
    title: 'Easy Management',
    description:
      'Generate and manage certificates through a clean, simple dashboard built for efficiency.',
    icon: <FileText className="w-10 h-10 mx-auto text-purple-600 dark:text-purple-400 mb-3" />,
  },
];


export default function AboutUs() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row justify-around items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold mb-4">
              About <span className="text-indigo-600">CertifyNow</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              CertifyNow is a secure digital certificate management platform. Whether you're an instructor,
              organization, or learner, our goal is to simplify how certificates are issued, stored, and verified.
            </p>
            <Link
              to="/create"
              className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={certificateImage} 
              alt="Digital certificate illustration"
              className="w-1/2 h-auto rounded-lg"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Our mission is to build trust in digital achievements. We aim to make certificate management effortless,
            reliable, and verifiable — so learners can focus on learning, and organizations can focus on teaching.
          </p>
        </section>


        {/* Features Section */}
        <section>
          <h2 className="flex justify-center items-center text-3xl font-bold text-center mb-8"><Lightbulb className='w-10 h-10 text-yellow-600 dark:text-yellow-400' /> Why Choose CertifyNow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                  <InfoSectionCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
          </div>
        </section>

        {/* Meet the Developer */}
        <section className="bg-purple-50 dark:bg-purple-900 p-6 md:p-10 rounded-xl shadow text-center">
          <h2 className="flex justify-center items-center text-3xl font-bold mb-4"><Laptop2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" /> Meet the Developer</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Hi, I’m Muhammad Khalil — a passionate full-stack web developer and the creator of CertifyNow. 
            I built this platform to solve real-world problems around digital certification and verification.
            This is part of my portfolio showcasing what I can do with React, Node.js, MongoDB, and Express.
          </p>
        </section>

      </div>
    </div>
  );
}
