const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");

async function imageToPdf(inputPath, outputPath) {
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Normalize any input format (png/webp/etc.) to JPEG so pdf-lib can embed it reliably
  const imageBuffer = await sharp(inputPath).jpeg({ quality: 92 }).toBuffer();
  const metadata = await sharp(imageBuffer).metadata();

  const { width, height } = metadata;

  const pdfDoc = await PDFDocument.create();
  const jpgImage = await pdfDoc.embedJpg(imageBuffer);

  const page = pdfDoc.addPage([width, height]);

  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width,
    height,
  });

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(outputPath, pdfBytes);

  return outputPath;
}

module.exports = {
  imageToPdf,
};