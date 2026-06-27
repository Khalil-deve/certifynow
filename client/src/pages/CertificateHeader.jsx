export default function CertificateHeader({ message }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        {message}
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Verify or view issued credentials in real-time.
      </p>
    </div>
  );
}