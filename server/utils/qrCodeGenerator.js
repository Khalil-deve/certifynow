const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

/**
 * Generate a QR code for a certificate
 * @param {string} certificateId - Unique identifier for the certificate
 * @param {string} baseUrl - Base URL for verification (e.g., http://localhost:5173)
 * @returns {Promise<string>} Path to the generated QR code image
 */
const generateQRCode = async (certificateId, baseUrl) => {
  try {
    // Create directory for QR codes if it doesn't exist
    const qrDir = path.join(__dirname, '../uploads/qrcodes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Generate verification URL
    const verificationUrl = `${baseUrl}/verify/${certificateId}`;
    
    // Define the file path for the QR code
    const qrFilePath = path.join(qrDir, `${certificateId}.png`);
    
    // Generate QR code image
    await QRCode.toFile(qrFilePath, verificationUrl, {
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      width: 300,
      margin: 1
    });
    
    return `/uploads/qrcodes/${certificateId}.png`;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = { generateQRCode };