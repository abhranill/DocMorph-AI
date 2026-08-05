const { pdfToImages } = require("../services/pdf-image.service");

exports.convertPdfToImages = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const images = await pdfToImages(req.file.path);

    res.json({
      success: true,
      images,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "PDF conversion failed",
    });
  }
};