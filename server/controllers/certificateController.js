const Certificate = require('../models/Certificate');
const generateCertificateId = require('../utils/generateCertificateId');
const { generateQRCode } = require('../utils/qrCodeGenerator');
const { generateCertificatePDF } = require('../utils/pdfGenerator');
const { v4: uuidv4 } = require('uuid');
const generateSignedDownloadUrl = require('../utils/generateSignedDownloadUrl');

// Create a new certificate
//   @route POST /api/certificates
//   @access Public

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({});

    const certificatesWithUrls = certificates.map(certificate => ({
      ...certificate.toObject(),
      pdfUrl: `${req.protocol}://${req.get('host')}${certificate.pdfPath}`,
      qrCodeUrl: `${req.protocol}://${req.get('host')}${certificate.qrCodeUrl}`
    }));

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificatesWithUrls
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

    // 3. Generate QR Code
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const qrCodeUrl = await generateQRCode(certificateId, baseUrl);

    // 4. Prepare Data
    const certificateData = {
      certificateId,
      recipientName,
      CourseTitle,
      InstructorName,
      issuerDesignation,
      issueDate: new Date(),
      qrCodeUrl,
      pdfPath: ''
    };

    // 5. Generate PDF
    const pdfUrl = await generateCertificatePDF(certificateData, qrCodeUrl);
    certificateData.pdfPath = pdfUrl;

    // 6. Save to DB
    const certificate = new Certificate(certificateData);
    await certificate.save();

    // 7. Return Response
    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: {
        certificateId: certificate.certificateId,
        pdfUrl: pdfUrl,
        qrCodeUrl: qrCodeUrl
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

// 
//  Get certificate by ID
//  @route GET /api/certificates/:id
//  @access Public
//  
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    const signedPdfUrl = generateSignedDownloadUrl(certificate.certificateId);
    console.log('Signed PDF URL:', signedPdfUrl);
    res.status(200).json({
      success: true,
      data: {
        ...certificate.toObject(),
        pdfDownloadUrl: signedPdfUrl, // Use this in frontend
        qrCodeUrl: certificate.qrCodeUrl
      }
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ success: false, message: 'Error fetching certificate', error: error.message });
  }
};




module.exports = {
  getAllCertificates,
  certificateCount,
  createCertificate,
  getCertificateById,
}