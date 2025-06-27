const express = require('express');
const router = express.Router();
const { verifyCertificate, } = require('../controllers/verificationController');

// Verify a certificate
router.get('/:id', verifyCertificate);

module.exports = router;