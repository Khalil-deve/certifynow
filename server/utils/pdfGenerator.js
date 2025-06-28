const PDFDocument = require('pdfkit');
const axios = require('axios');
const cloudinary = require('./cloudinary'); // Cloudinary config
const stream = require('stream');

/**
 * Dynamically adjusts font size for recipient name.
 */
function calculateNameSize(name) {
  const length = name.length;
  if (length <= 20) return 36;
  if (length <= 30) return 32;
  return 28;
}

/**
 * Generate Certificate PDF and upload to Cloudinary
 * @param {Object} certificateData - Info to include in certificate
 * @param {string} qrCodeUrl - Public URL to the QR code (from Cloudinary)
 * @returns {Promise<string>} Cloudinary PDF URL
 */
const generateCertificatePDF = async (certificateData, qrCodeUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
        margin: 50
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));

      doc.on('end', async () => {
        const pdfBuffer = Buffer.concat(buffers);

       

        // Upload to Cloudinary (ensure .pdf in public_id)
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'certifyNow/certificates',
            public_id: `${certificateData.certificateId}.pdf`,  // ← Important: add .pdf
            resource_type: 'raw',
            type: 'authenticated'
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url); // Return secure URL from Cloudinary
          }
        );

        const pass = new stream.PassThrough();
        pass.end(pdfBuffer);
        pass.pipe(uploadStream);
      });

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;

      // Watermark
      const addWatermark = () => {
        doc.save();
        doc.fillOpacity(0.15);
        doc.fontSize(40);
        doc.font('Helvetica-Bold');
        const angle = -30;
        const x = pageWidth / 2;
        const y = pageHeight / 2;
        doc.rotate(angle, { origin: [x, y] });
        doc.fill('#1E3A8A').text('CERTIFICATE OF AUTHENTICITY', x - 250, y - 20, {
          width: 500,
          align: 'center',
          characterSpacing: 2
        });
        doc.rotate(-angle, { origin: [x, y] });
        doc.restore();
      };

      // Background and borders
      doc.rect(0, 0, pageWidth, pageHeight).fill('#FFF');
      doc.lineWidth(4).rect(25, 25, pageWidth - 50, pageHeight - 50).stroke('#FFD700');
      doc.lineWidth(1).rect(35, 35, pageWidth - 70, pageHeight - 70).stroke('#B8860B');
      doc.save().lineWidth(1).dash(5, { space: 3 }).rect(45, 45, pageWidth - 90, pageHeight - 90).stroke('#FBBF24');
      doc.undash().restore();

      // Title
      doc.font('Helvetica-Bold')
        .fontSize(42)
        .fill('#1E3A8A')
        .text('CERTIFICATE OF APPRECIATION', 0, 80, {
          align: 'center',
          underline: true,
          underlineColor: '#F59E0B',
          underlineThickness: 2
        });

      // Certificate ID and date
      doc.fontSize(10)
        .fill('#6B7280')
        .text(`Certificate ID: ${certificateData.certificateId}`, 70, 250)
        .text(`Issued: ${new Date(certificateData.issueDate).toISOString().split('T')[0]}`, pageWidth - 220, 250, {
          align: 'right'
        });

      // "Presented to"
      doc.font('Times-Italic')
        .fontSize(18)
        .fill('#4B5563')
        .text('This Certificate is Proudly Presented To', 0, 275, {
          align: 'center',
          characterSpacing: 1.5
        });

      // Recipient name
      const nameFontSize = calculateNameSize(certificateData.recipientName);
      doc.font('Times-Bold')
        .fontSize(nameFontSize)
        .fill('#B91C1C')
        .text(certificateData.recipientName.toUpperCase(), 0, 305, {
          align: 'center',
          characterSpacing: 1.2
        });

      // Description
      doc.font('Times-Italic')
        .fontSize(16)
        .fill('#374151')
        .text(
          `This certificate is proudly awarded to ${certificateData.recipientName} for successfully completing the course titled "${certificateData.CourseTitle}" at UET Mardan. Your commitment to learning and consistent effort throughout the course are truly commendable. We congratulate you on this achievement and wish you continued success in your journey ahead.`,
          (pageWidth - 650) / 2, 355,
          { align: 'center', width: 650, lineGap: 10 }
        );

      // Signature
      const signatureY = pageHeight - 180;
      doc.font('Times-Italic')
        .fontSize(16)
        .fill('#1E3A8A')
        .text(certificateData.InstructorName, 100, signatureY + 65)
        .fontSize(14)
        .text(certificateData.issuerDesignation, 100, signatureY + 85)
        .stroke('#1E3A8A');

      // QR Code from Cloudinary
      const qrRes = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });
      const qrBuffer = Buffer.from(qrRes.data, 'binary');
      doc.image(qrBuffer, pageWidth - 140, signatureY + 40, {
        width: 80,
        align: 'right'
      });
      doc.fontSize(10)
        .fill('#1E3A8A')
        .text('Scan to Verify Authenticity', pageWidth - 170, signatureY + 30, {
          width: 120,
          align: 'center'
        });

      // Watermark
      addWatermark();

      doc.end(); // Important to end the document here

    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
};

module.exports = { generateCertificatePDF };
