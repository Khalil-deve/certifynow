
import { CheckCircle } from "lucide-react";

export default function VerifyCertificateData({ result }) {
  return (
    <div className="w-full mt-4 bg-white rounded-2xl transition-all duration-300">

      {/* Success Banner */}
      <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-900 rounded-md px-4 py-3 shadow-sm mb-6">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <span className="text-base sm:text-lg font-semibold">
          Certificate Successfully Verified
        </span>
      </div>

      {/* Certificate Details Card */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 shadow-inner overflow-hidden">
        <div className="bg-indigo-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700">Certificate Information</h2>
        </div>

        <div className="divide-y divide-gray-100">
          <InfoRow label="Recipient" value={result.data.recipientName} />
          <InfoRow label="Achievement" value={result.data.CourseTitle} />
          <InfoRow label="Instructor" value={result.data.InstructorName} />
          <InfoRow label="Designation" value={result.data.issuerDesignation} />
          <InfoRow label="Issue Date" value={result.data.issueDate} />
          <InfoRow
            label="Certificate ID"
            value={
              <code className="bg-indigo-100 px-2 py-1 rounded text-sm text-indigo-700 break-all font-mono">
                {result.data.certificateId || "N/A"}
              </code>
            }
          />
        </div>
      </div>
    </div>
  );
}

// Reusable component for info rows
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row px-4 sm:px-6 py-3 sm:py-4 items-start sm:items-center hover:bg-white transition">
      <div className="w-full sm:w-1/3 text-gray-600 text-sm font-medium mb-1 sm:mb-0">
        {label}
      </div>
      <div className="w-full sm:w-2/3 text-gray-900 font-semibold break-words">
        {value}
      </div>
    </div>
  );
}
