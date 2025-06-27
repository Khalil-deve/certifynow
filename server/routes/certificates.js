const express = require('express');
const router = express.Router();
const { 
  createCertificate, 
  getAllCertificates,
  certificateCount,
  getCertificateById, 
} = require('../controllers/certificateController');

//Get all certificates
router.get('/',  getAllCertificates);

//Number of Certificates
router.get('/count', certificateCount);

// Create a new certificate
router.post('/', createCertificate);

// Get a certificate by ID
router.get('/:id', getCertificateById);

module.exports = router;