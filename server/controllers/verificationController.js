const Certificate = require('../models/Certificate');

// Verify a certificate by its ID
const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    
    if (!certificate) {
      return res.status(200).json({
        success: true,
        isValid: false,
        message: 'Certificate not found in the system'
      });
    }
    
    res.status(200).json({
      success: true,
      isValid: certificate.isValid,
      message: certificate.isValid 
        ? 'Certificate is valid' 
        : 'Certificate has been marked as invalid',
      data: certificate.isValid ? {
        certificateId: certificate.certificateId,
        recipientName: certificate.recipientName,
        CourseTitle: certificate.CourseTitle,
        InstructorName: certificate.InstructorName,
        issuerDesignation: certificate.issuerDesignation,
        issueDate: certificate.issueDate
      } : null
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate',
      error: error.message
    });
  }
};

module.exports = {
  verifyCertificate,
};