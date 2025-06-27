export default function CertificateStats({ count }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-4 shadow mb-10 w-full max-w-md">
      <p className="text-gray-800 dark:text-gray-200 text-md">
         <span className="font-bold">{count}</span> certificates have been issued through CertifyNow!
      </p>
    </div>
  );
}
