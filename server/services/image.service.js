const sharp = require("sharp");

async function convertImage(inputPath, outputPath, format) {
  switch (format) {
    case "png":
      await sharp(inputPath).png().toFile(outputPath);
      break;

    case "jpg":
    case "jpeg":
      await sharp(inputPath).jpeg().toFile(outputPath);
      break;

    case "webp":
      await sharp(inputPath).webp().toFile(outputPath);
      break;

    default:
      throw new Error("Unsupported format");
  }

  return outputPath;
}

module.exports = {
  convertImage,
};