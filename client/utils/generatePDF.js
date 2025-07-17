import jsPDF from 'jspdf';
import sealBase64 from '../src/assets/seal2.png';

// Dynamically adjusts font size for recipient name.
function calculateNameSize(name) {
    const length = name.length;
    if (length <= 20) return 36;
    if (length <= 30) return 32;
    return 28;
}

//Watermark function
const addWatermark = (doc) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.saveGraphicsState();

    // Set light opacity
    doc.setGState(new doc.GState({ opacity: 0.12 }));

    // Font setup
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(25);
    doc.setTextColor(30, 58, 138); // Deep blue

    //  Adjusted X and Y so the watermark is truly centered diagonally
    const watermarkText = 'CERTIFICATE OF AUTHENTICITY';

    doc.text(watermarkText, pageWidth / 2 + 70, pageHeight / 2 + 110, {
        angle: 30,
        align: 'center',
    });

    doc.restoreGraphicsState();
};



function drawShadowText(doc, text, x, y, fontSize, textColor, shadowColor, offset = 2) {
    doc.setFontSize(fontSize);
    doc.setFont('Helvetica', 'bold');

    // Draw shadow
    doc.setTextColor(...shadowColor);
    doc.text(text, x + offset, y + offset, { align: 'center' });

    // Draw main text
    doc.setTextColor(...textColor);
    doc.text(text, x, y, { align: 'center' });
}


export const generatePDF = async (certificateData) => {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    addWatermark(doc);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Golden border design
    doc.setLineWidth(3);
    doc.setDrawColor(255, 153, 0); // #F59E0B
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60);

    doc.setLineWidth(1);
    doc.rect(35, 35, pageWidth - 70, pageHeight - 70);

    // Background
    doc.setFillColor(255, 255, 255); // White
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer thick border
    doc.setLineWidth(4);
    doc.setDrawColor(255, 215, 0); // Rich gold
    doc.rect(25, 25, pageWidth - 50, pageHeight - 50);

    // Inner thin border
    doc.setLineWidth(1);
    doc.setDrawColor(184, 134, 11); // Darker gold
    doc.rect(35, 35, pageWidth - 70, pageHeight - 70);

    // Alternative with jsPDF plugin (if available)
    doc.setLineDashPattern([5, 3], 0);
    doc.rect(45, 45, pageWidth - 90, pageHeight - 90);
    doc.setLineDashPattern([], 0); // Reset to solid line

    // Title with Stroke
    drawShadowText(
        doc,
        'CERTIFICATE OF APPRECIATION',
        pageWidth / 2,
        100,
        40,
        [255, 255, 255],     // white text
        [0, 0, 0],           // black shadow
        2
    );


    // Title
    const title = 'CERTIFICATE OF APPRECIATION';
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(30, 58, 138);
    doc.text(title, pageWidth / 2, 100, { align: 'center' });

    // Calculate text width
    const textWidth = doc.getTextWidth(title);

    // Draw underline manually
    const underlineY = 115; // adjust slightly below text
    doc.setDrawColor(30, 58, 138); // underline color (#F59E0B)
    doc.setLineWidth(4);
    doc.line(
        pageWidth / 2 - textWidth / 2, // start X
        underlineY,
        pageWidth / 2 + textWidth / 2, // end X
        underlineY
    );

    //Watermark function
    addWatermark(doc, pageWidth, pageHeight);


    // Seal Image
    if (sealBase64) {
        doc.addImage(sealBase64, 'PNG', pageWidth / 2 - 60, 140, 120, 0);
    }

    // Certificate ID and Date
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); // #6B7280
    doc.text(`Certificate ID: ${certificateData.certificateId}`, 90, 250);
    doc.text(`Issued: ${new Date(certificateData.issueDate).toISOString().split('T')[0]}`, pageWidth - 100, 250, { align: 'right' });

    // Presented To
    doc.setFont('Times', 'italic');
    doc.setFontSize(18);
    doc.setTextColor(75, 85, 99);
    doc.text('This Certificate is Proudly Presented To', pageWidth / 2, 285, { align: 'center' });

    // Name
    const nameFontSize = calculateNameSize(certificateData.recipientName);
    doc.setFont('Times', 'bold');
    doc.setFontSize(nameFontSize);
    doc.setTextColor(185, 28, 28);
    doc.text(certificateData.recipientName.toUpperCase(), pageWidth / 2, 325, { align: 'center', characterSpacing: 1.2 });

    doc.setFont('Times', 'italic');
    doc.setFontSize(16);
    doc.setTextColor(55, 65, 81); // Neutral dark-gray

    const achievementText = [
        `This certificate is proudly awarded to "${certificateData.recipientName.toUpperCase()}"`,
        `for successfully completing the course titled "${certificateData.CourseTitle.toUpperCase()}" at UET Mardan.`,
        `Your commitment to learning and consistent effort throughout the course are truly commendable.`,
        `We congratulate you on this achievement and wish you continued success in your journey ahead.`
    ];

    // Add the text block (center aligned, with line spacing)
    const textStartY = 355; // Adjust this to move it up/down
    const lineHeight = 24;

    achievementText.forEach((line, i) => {
        doc.text(line, pageWidth / 2, textStartY + i * lineHeight, { align: 'center' });
    });


    // Signature Section
    const signatureY = pageHeight - 180;
    doc.setFont('Times', 'italic');
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138);
    doc.text(certificateData.InstructorName, 100, signatureY + 65);
    doc.setFontSize(14);
    doc.text(certificateData.issuerDesignation, 100, signatureY + 85);

    // QR Code from canvas (e.g. from <QRCodeCanvas />)
    const qrCodeCanvas = document.getElementById('qrcode');
    if (qrCodeCanvas) {
        const qrImg = qrCodeCanvas.toDataURL('image/png');
        doc.addImage(qrImg, 'PNG', pageWidth - 160, signatureY + 40, 80, 80);
        doc.setFontSize(10);
        doc.text('Scan to Verify Authenticity', pageWidth - 120, signatureY + 30, { align: 'center' });
    }

    doc.save(`${certificateData.certificateId}.pdf`);
};
