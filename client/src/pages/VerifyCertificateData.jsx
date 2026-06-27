import { CheckCircle } from "lucide-react";

export default function VerifyCertificateData({ result }) {
  return (
    <div className="w-full mt-4 bg-white rounded-3xl transition-all duration-300">
      {/* Success Banner */}
      <div className="flex items-center gap-3 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal rounded-2xl px-5 py-4 shadow-sm mb-6">
        <CheckCircle className="w-6 h-6 shrink-0" />
        <span className="text-sm sm:text-base font-bold">
          Certificate Successfully Verified
        </span>
      </div>

      {/* Certificate Details Card */}
      <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Certificate Information</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <InfoRow label="Recipient" value={result.data.recipientName} />
          <InfoRow label="Achievement" value={result.data.CourseTitle} />
          <InfoRow label="Instructor" value={result.data.InstructorName} />
          <InfoRow label="Designation" value={result.data.issuerDesignation} />
          <InfoRow label="Issue Date" value={new Date(result.data.issueDate).toLocaleDateString()} />
          <InfoRow
            label="Certificate ID"
            value={
              <code className="bg-brand-orange/10 px-2.5 py-1 rounded-lg text-xs sm:text-sm text-brand-orange font-bold font-mono tracking-tight break-all border border-brand-orange/15">
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
    <div className="flex flex-col sm:flex-row px-6 py-4 items-start sm:items-center hover:bg-gray-50/30 transition-colors">
      <div className="w-full sm:w-1/3 text-gray-500 text-sm font-semibold mb-1 sm:mb-0">
        {label}
      </div>
      <div className="w-full sm:w-2/3 text-gray-800 text-sm font-bold break-words">
        {value}
      </div>
    </div>
  );
}
