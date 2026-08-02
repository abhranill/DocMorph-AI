const path = require("path");

const {
  convertImage,
} = require("../services/image.service");

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
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};