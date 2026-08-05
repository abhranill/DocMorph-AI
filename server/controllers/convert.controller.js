const path = require("path");
const fs = require("fs");

const { convertImage } = require("../services/image.service");
const { pdfToImages } = require("../services/pdf-image.service");
const { imageToPdf: convertImageToPdfFile } = require("../services/image-to-pdf.service");
const { zipFiles } = require("../services/zip.service");

exports.convertFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const format = req.body.format;

    const outputName =
      Date.now() + "." + format;

    const outputPath = path.join(
      __dirname,
      "..",
      "converted",
      outputName
    );

    await convertImage(
      req.file.path,
      outputPath,
      format
    );

    res.json({
      success: true,
      downloadUrl:
        "http://localhost:5000/converted/" +
        outputName,
    });
  } catch (err) {
    console.error("CONVERT_FILE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.pdfToImage = async (req, res) => {
  let images = [];
  let zipPath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    images = await pdfToImages(req.file.path);

    if (!images.length) {
      return res.status(500).json({
        success: false,
        message: "No pages could be converted from this PDF",
      });
    }

    const zipName = `converted-${Date.now()}.zip`;

    zipPath = path.join(
      __dirname,
      "..",
      "converted",
      zipName
    );

    await zipFiles(
      images.map((img) => img.filePath),
      zipPath
    );

    res.download(zipPath, "converted.zip", (err) => {
      if (err) {
        console.error("PDF_TO_IMAGE DOWNLOAD ERROR:", err);
      }

      // cleanup temp files
      images.forEach((img) => {
        if (fs.existsSync(img.filePath)) {
          fs.unlinkSync(img.filePath);
        }
      });

      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    });
  } catch (err) {
    console.error("PDF_TO_IMAGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "PDF to JPG conversion failed",
    });
  }
};

exports.imageToPdf = async (req, res) => {
  let outputPath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const outputName = `converted-${Date.now()}.pdf`;

    outputPath = path.join(
      __dirname,
      "..",
      "converted",
      outputName
    );

    await convertImageToPdfFile(req.file.path, outputPath);

    res.download(outputPath, "converted.pdf", (err) => {
      if (err) {
        console.error("IMAGE_TO_PDF DOWNLOAD ERROR:", err);
      }

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    });
  } catch (err) {
    console.error("IMAGE_TO_PDF ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "JPG to PDF conversion failed",
    });
  }
};