import { ShieldCheck, BadgeCheck, FileText, Laptop2, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoSectionCard from '../components/InfoSectionCard';
import certificateImage from '../assets/certifcateImage.svg';

const features = [
  {
    title: 'Secure Storage',
    description:
      'Every certificate is encrypted and stored in our database to ensure security and integrity.',
    icon: <ShieldCheck className="w-7 h-7" />,
  },
  {
    title: 'Instant Verification',
    description:
      'With a single certificate ID, anyone can verify the authenticity in seconds.',
    icon: <BadgeCheck className="w-7 h-7" />,
  },
  {
    title: 'Easy Management',
    description:
      'Generate and manage certificates through a clean, simple dashboard built for efficiency.',
    icon: <FileText className="w-7 h-7" />,
  },
];

export default function AboutUs() {
  return (
    <div className="px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <span className="inline-block bg-brand-orange/10 text-brand-orange font-bold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full">
              Digital Integrity
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              About <span className="text-brand-orange">CertifyNow</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              CertifyNow is a secure digital certificate management platform. Whether you are an instructor,
              organization, or learner, our goal is to simplify how credentials are issued, securely archived, and publicly verified.
            </p>
            <div className="pt-2">
              <Link
                to="/create"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-2xl shadow-lg shadow-brand-orange/20 transition-all duration-200 active:scale-95 text-sm sm:text-base"
              >
                Get Started Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={certificateImage} 
              alt="Digital certificate illustration representing verification and achievements"
              className="w-4/5 sm:w-2/3 md:w-4/5 h-auto rounded-3xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Our mission is to build trust in digital achievements. We aim to make certificate management effortless,
            reliable, and verifiable — so learners can focus on learning, and organizations can focus on teaching.
          </p>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="flex justify-center items-center gap-2.5 text-3xl font-extrabold text-gray-900">
              <Lightbulb className="w-8 h-8 text-brand-orange" />
              <span>Why Choose CertifyNow?</span>
            </h2>
            <p className="text-sm text-gray-500">
              Explore the core values and features that define our verification platform.
            </p>
          </div>
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
        <section className="relative bg-gradient-to-br from-brand-orange/5 to-brand-teal/5 border border-brand-orange/10 p-8 sm:p-12 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="absolute right-0 top-0 w-44 h-44 rounded-full bg-brand-orange/5 blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="flex justify-center mb-2">
              <div className="bg-brand-orange/10 p-3 rounded-2xl text-brand-orange">
                <Laptop2 className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Meet the Developer</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Hi, I’m Muhammad Khalil — a passionate full-stack web developer and the creator of CertifyNow. 
              I built this platform to solve real-world problems around digital certification and verification.
              This is part of my portfolio showcasing what I can do with React, Node.js, MongoDB, and Express.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
