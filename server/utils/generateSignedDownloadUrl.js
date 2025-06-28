const cloudinary = require('cloudinary').v2;

const generateSignedDownloadUrl = (publicId) => {
  return cloudinary.url(`certifyNow/certificates/${publicId}.pdf`, {
    resource_type: 'raw',
    type: 'authenticated',
    sign_url: true,
    secure: true,
    flags: 'attachment', // Forces download
    expires_at: Math.floor(Date.now() / 1000) + 300 // Valid for 5 minutes
  });
};
module.exports = generateSignedDownloadUrl;