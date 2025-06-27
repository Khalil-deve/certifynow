const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true
    },
    recipientName: {
        type: String,
        required: true
    },
    CourseTitle: {
        type: String,
        required: true
    },
    InstructorName: {
        type: String,
        required: true
    },
    issuerDesignation: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    pdfPath: {
        type: String,
        required: true
    },
    qrCodeUrl: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', CertificateSchema);