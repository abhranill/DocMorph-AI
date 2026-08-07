const fs = require("fs");
const path = require("path");
const libre = require("libreoffice-convert");

libre.convertAsync = require("util").promisify(libre.convert);

async function wordToPdf(filePath) {
  try {
    const outputDir = path.join(__dirname, "../converted");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const input = fs.readFileSync(filePath);

    const pdfBuffer = await libre.convertAsync(
      input,
      ".pdf",
      undefined
    );

    const outputName =
      path.basename(filePath, path.extname(filePath)) + ".pdf";

    const outputPath = path.join(outputDir, outputName);

    fs.writeFileSync(outputPath, pdfBuffer);

    return {
      success: true,
      fileName: outputName,
      downloadUrl: `/converted/${outputName}`,
    };
  } catch (error) {
    console.error("Word Conversion Error:", error);

    throw error;
  }
}

module.exports = {
  wordToPdf,
};