const Certificate = require('../models/Certificate');
const generateCertificateId = require('../utils/generateCertificateId');
const { v4: uuidv4 } = require('uuid');


// Get all certificates
//   @route GET /api/certificates
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    // If no certificates found, return 404
    if (!certificates || certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No certificates found',
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certificates fetched successfully',
      data: certificates
    });

  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates',
      error: error.message
    });
  }
}

// Get the count of all certificates
//   @route GET /api/certificates/count
const certificateCount = async (req, res) => {
  const certificates = await Certificate.find({});
  if (!certificates) {
    return res.status(404).json({
      success: false,
      message: 'No certificates found'
    })
  };

  try {
    res.status(200).json({
      success: true,
      count: certificates.length,
    });

  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates',
      error: error.message
    })
  };
}


// Create a new certificate
//   @route POST /api/certificates
const createCertificate = async (req, res) => {
  try {
    const {
      recipientName,
      CourseTitle,
      InstructorName,
      issuerDesignation
    } = req.body;

    // 1. Validate
    if (!recipientName || !CourseTitle || !InstructorName || !issuerDesignation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // 2. Generate Certificate ID
    const currentYear = new Date().getFullYear();
    const courseCode = CourseTitle.substring(0, 2).toUpperCase();
    const certificateId = generateCertificateId(currentYear, courseCode, Math.floor(Math.random() * 100000));


    const certificateData = {
      certificateId,
      recipientName,
      CourseTitle,
      InstructorName,
      issuerDesignation,
      issueDate: new Date(),
    };

    // 5. Save to DB
    const certificate = new Certificate(certificateData);
    await certificate.save();

    // 6. Return Response
    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: {
        certificateId: certificate.certificateId,
      }
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create certificate',
      error: error.message
    });
  }
};


// Get a certificate by ID
//   @route GET /api/certificates/:id
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Certificate fetched successfully',
      data: certificate
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ success: false, message: 'Error fetching certificate', error: error.message });
  }
};

// Export the controller functions
module.exports = {
  getAllCertificates,
  certificateCount,
  createCertificate,
  getCertificateById,
}