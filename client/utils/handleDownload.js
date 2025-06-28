import { Download } from 'lucide-react';

const handleDownload = async () => {
  try {
    const response = await fetch(certificate.pdfDownloadUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download certificate');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${certificate.certificateId}.pdf`; // File name
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download the certificate. Please try again.');
  }
};

module.exports = handleDownload;