const path = require("path");
const fs = require("fs");

const { convertImage } = require("../services/image.service");
const { imageToPdf } = require("../services/image-to-pdf.service");
const { wordToPdf } = require("../services/word.service");

exports.convertFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { conversion } = req.body;

    // ============================
    // IMAGE CONVERSIONS
    // ============================

    if (
      conversion === "jpg-png" ||
      conversion === "png-jpg" ||
      conversion === "jpeg-png" ||
      conversion === "png-webp" ||
      conversion === "webp-jpg"
    ) {
      let format = "png";

      switch (conversion) {
        case "jpg-png":
          format = "png";
          break;

        case "png-jpg":
          format = "jpg";
          break;

        case "jpeg-png":
          format = "png";
          break;

        case "png-webp":
          format = "webp";
          break;

        case "webp-jpg":
          format = "jpg";
          break;
      }

      const outputDir = path.join(
        __dirname,
        "../converted"
      );

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {
          recursive: true,
        });
      }

      const outputPath = path.join(
        outputDir,
        `${Date.now()}.${format}`
      );

      await convertImage(
        req.file.path,
        outputPath,
        format
      );

      return res.download(outputPath);
    }

    // ============================
    // IMAGE → PDF
    // ============================

    if (conversion === "image-pdf") {
      const result = await imageToPdf(req.file.path);

      return res.download(
        path.join(
          __dirname,
          "../converted",
          result.fileName
        )
      );
    }

    // ============================
    // WORD → PDF
    // ============================

    if (conversion === "word-pdf") {
      const result = await wordToPdf(req.file.path);

      return res.download(
        path.join(
          __dirname,
          "../converted",
          result.fileName
        )
      );
    }

    return res.status(400).json({
      success: false,
      message: "Unsupported conversion.",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Conversion failed.",
    });
  }
};