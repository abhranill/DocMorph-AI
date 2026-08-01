const { extractTextFromPDF } = require("../services/pdf.service");
const { summarizeText } = require("../services/ai.service");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const extractedText = await extractTextFromPDF(req.file.path);
    const summary = await summarizeText(extractedText);
    res.status(200).json({
  success: true,
  message: "File uploaded successfully!",
  fileName: req.file.filename,
  originalName: req.file.originalname,
  text: extractedText,
  summary,
   });
  } catch (error) {
  console.log("========== GEMINI ERROR ==========");
  console.error(error);

  if (error.response) {
    console.log(error.response.data);
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};