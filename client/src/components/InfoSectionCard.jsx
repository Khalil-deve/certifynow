export default function InfoSectionCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-600 rounded-xl shadow-sm">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2">
        {description}
      </p>
    </div>
  );
}
