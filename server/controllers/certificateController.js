const Certificate = require('../models/Certificate');
const { generateQRCode } = require('../utils/qrCodeGenerator');
const { generateCertificatePDF } = require('../utils/pdfGenerator');
const { v4: uuidv4 } = require('uuid');

// Create a new certificate
//   @route POST /api/certificates
//   @access Public

const generateCertificateId = (year, courseCode, serial) => {
  return `CERT-${year}-${courseCode}-${serial.toString().padStart(5, '0')}`;
};


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

const certificateCount = async (req, res) =>{
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
  console.log("hello world");
  try {
    const { 
      recipientName, 
      CourseTitle, 
      InstructorName, 
      issuerDesignation 
    } = req.body;

    console.log(req.body);
    // Validate request
    if (!recipientName || !CourseTitle || !InstructorName || !issuerDesignation) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const currentYear = new Date().getFullYear();
    const courseCode = CourseTitle.substring(0, 2).toUpperCase(); // For example, 'FS' for Full Stack
    const certificateId = generateCertificateId(currentYear, courseCode, Math.floor(Math.random() * 100000));
    
    // Base URL for verification (should be configured in environment variables)
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
    
    // Generate QR code
    const qrCodeUrl = await generateQRCode(certificateId, baseUrl);
    console.log('the base Url is: ', baseUrl);
    console.log("the qecodeUrl is:", qrCodeUrl);
    // Prepare certificate data
    const certificateData = {
      certificateId,
      recipientName,
      CourseTitle,
      InstructorName,
      issuerDesignation,
      issueDate: new Date(),
      qrCodeUrl,
      pdfPath: '' // Will be updated after PDF generation
    };
    
    // Generate PDF certificate
    const pdfPath = await generateCertificatePDF(certificateData, qrCodeUrl);
    certificateData.pdfPath = pdfPath;
    
    // Save certificate to database
    const certificate = new Certificate(certificateData);
    await certificate.save();
    console.log("the certificate is:", certificate);
    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: {
        certificateId: certificate.certificateId,
        pdfUrl: `${req.protocol}://${req.get('host')}${pdfPath}`,
        qrCodeUrl: `${req.protocol}://${req.get('host')}${qrCodeUrl}`
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
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        ...certificate.toObject(),
        pdfUrl: `${req.protocol}://${req.get('host')}${certificate.pdfPath}`,
        qrCodeUrl: `${req.protocol}://${req.get('host')}${certificate.qrCodeUrl}`
      }
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate',
      error: error.message
    });
  }
};


module.exports = {
  getAllCertificates,
  certificateCount,
  createCertificate,
  getCertificateById,
}