const { extractTextFromPDF } = require("../services/pdf.service");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const extractedText = await extractTextFromPDF(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      fileName: req.file.filename,
      originalName: req.file.originalname,
      text: extractedText,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to extract PDF text",
    });
  }
};