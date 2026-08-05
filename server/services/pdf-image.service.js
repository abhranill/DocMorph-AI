const path = require("path");
const fs = require("fs");
const pdf = require("pdf-poppler");

async function pdfToImages(pdfPath) {
  const outputDir = path.join(__dirname, "../converted");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = path.basename(pdfPath, path.extname(pdfPath));

  const options = {
    format: "jpeg",
    out_dir: outputDir,
    out_prefix: fileName,
    page: null,
  };

  await pdf.convert(pdfPath, options);

  const files = fs
    .readdirSync(outputDir)
    .filter((file) => file.startsWith(fileName));

  return files.map((file) => ({
    fileName: file,
    url: `/converted/${file}`,
    filePath: path.join(outputDir, file),
  }));
}

module.exports = {
  pdfToImages,
};