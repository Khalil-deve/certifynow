export default function InfoSectionCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center justify-center w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-2xl mb-6 transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm text-center mt-3 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
