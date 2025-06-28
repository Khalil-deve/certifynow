const generateCertificateId = (year, courseCode, serial) => {
  return `CERT-${year}-${courseCode}-${serial.toString().padStart(5, '0')}`;
};

module.exports = generateCertificateId;