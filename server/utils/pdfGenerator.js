const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Dynamically adjusts font size for recipient name.
 */
function calculateNameSize(name) {
   const length = name.length;
   if (length <= 20) return 36;
   if (length <= 30) return 32;
   return 28;
}

const generateCertificatePDF = async (certificateData, qrCodePath) => {
   return new Promise((resolve, reject) => {
      try {
         const pdfDir = path.join(__dirname, '../uploads/certificates');
         if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

         const pdfFilePath = path.join(pdfDir, `${certificateData.certificateId}.pdf`);
         const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4',
            margin: 50,
            bufferPages: true
         });

         const pageWidth = doc.page.width;
         const pageHeight = doc.page.height;

         const stream = fs.createWriteStream(pdfFilePath);
         doc.pipe(stream);

         // Load assets
         const fullQrPath = path.join(__dirname, '..', qrCodePath);
         const sealPath = path.join(__dirname, '../assets/seal2.png');

         // Add security watermark
         const addWatermark = () => {
            doc.save();
            doc.fillOpacity(0.15);
            doc.fontSize(40);
            doc.font('Helvetica-Bold');
            const angle = -30;
            const x = pageWidth / 2;
            const y = pageHeight / 2;
            doc.rotate(angle, { origin: [x, y] });
            doc.fill('#1E3A8A')
               .text('CERTIFICATE OF AUTHENTICITY', x - 250, y - 20, {
                  width: 500,
                  align: 'center',
                  characterSpacing: 2
               });
            doc.rotate(-angle, { origin: [x, y] });
            doc.restore();
         };

         // Golden border design
         doc.lineWidth(3)
            .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
            .stroke('#F59E0B');

         doc.lineWidth(1)
            .rect(35, 35, doc.page.width - 70, doc.page.height - 70)
            .stroke('#F59E0B');

         // Background
         doc.rect(0, 0, pageWidth, pageHeight).fill('#FFF');

         // Outer thick border
         doc.lineWidth(4)
            .rect(25, 25, pageWidth - 50, pageHeight - 50)
            .stroke('#FFD700');  // Rich gold

         // Inner thin border
         doc.lineWidth(1)
            .rect(35, 35, pageWidth - 70, pageHeight - 70)
            .stroke('#B8860B');  // Darker gold

         // Decorative dashed border (optional)
         doc.save();
         doc.lineWidth(1)
            .dash(5, { space: 3 })
            .rect(45, 45, pageWidth - 90, pageHeight - 90)
            .stroke('#FBBF24');  // Light amber
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

         // Seal Image
         if (fs.existsSync(sealPath)) {
            doc.image(sealPath, pageWidth / 2 - 60, 140, { width: 120 });
         }

         // Certificate ID and Date
         doc.fontSize(10)
            .fill('#6B7280')
            .text(`Certificate ID: ${certificateData.certificateId}`, 70, 250)
            .text(`Issued: ${new Date(certificateData.issueDate).toISOString().split('T')[0]}`,
               pageWidth - 220, 250, { align: 'right' });

         // "Presented to"
         doc.font('Times-Italic')
            .fontSize(18)
            .fill('#4B5563')
            .text('This Certificate is Proudly Presented To', 0, 275, {
               align: 'center',
               characterSpacing: 1.5
            });

         // Recipient Name
         const nameFontSize = calculateNameSize(certificateData.recipientName);
         doc.font('Times-Bold')
            .fontSize(nameFontSize)
            .fill('#B91C1C')
            .text(certificateData.recipientName.toUpperCase(), 0, 305, {
               align: 'center',
               characterSpacing: 1.2
            });

         // Achievement Text
         doc.font('Times-Italic')
            .fontSize(16)
            .fill('#374151')
            .text(
               `This certificate is proudly awarded to ${certificateData.recipientName} for successfully completing the course titled "${certificateData.CourseTitle}" at UET Mardan. Your commitment to learning and consistent effort throughout the course are truly commendable. We congratulate you on this achievement and wish you continued success in your journey ahead.`,
               (pageWidth - 650) / 2, 355,
               { align: 'center', width: 650, lineGap: 10 }
            );


         // Signature Section
         const signatureY = pageHeight - 180;

         doc.font('Times-Italic')
            .fontSize(16)
            .fill('#1E3A8A')
            .text(certificateData.InstructorName, 100, signatureY + 65)
            .font('Times-Italic')
            .fontSize(14)
            .text(certificateData.issuerDesignation, 100, signatureY + 85)
            .stroke('#1E3A8A');


         // QR Code Section
         if (fs.existsSync(fullQrPath)) {
            
            doc.image(fullQrPath, pageWidth - 140, signatureY + 40, {
               width: 80,
               align: 'right'
            })
               .fontSize(10)
               .fill('#1E3A8A')
               .text('Scan to Verify Authenticity', pageWidth - 170, signatureY + 30, {
                  width: 120,
                  align: 'center'
               });
         }

         // Watermark
         addWatermark();

         doc.end();

         stream.on('finish', () => resolve(`/uploads/certificates/${certificateData.certificateId}.pdf`));
         stream.on('error', reject);

      } catch (error) {
         reject(error);
      }
   });
};

module.exports = { generateCertificatePDF };
