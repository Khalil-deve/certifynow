const QRCode = require('qrcode');
const cloudinary = require('./cloudinary');

const generateQRCode = async (certificateId, baseUrl) => {
  try {
    const verifyUrl = `${baseUrl}/verify/${certificateId}`;
    const dataUrl = await QRCode.toDataURL(verifyUrl); // returns base64

    const uploadRes = await cloudinary.uploader.upload(dataUrl, {
      folder: 'certifyNow/qrcodes',
      public_id: certificateId,
      overwrite: true
    });

    return uploadRes.secure_url; // URL of QR Code
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = { generateQRCode };
