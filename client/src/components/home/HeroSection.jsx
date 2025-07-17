import HeroAboutCard from './HeroAboutCard';

export default function HeroSection() {
  return (
    <section className="w-full md:px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
          Welcome to <span className="text-blue-600">CertifyNow</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Empowering digital certification with security, transparency, and simplicity.
        </p>
      </div>

      <HeroAboutCard />
    </section>
  );
}
