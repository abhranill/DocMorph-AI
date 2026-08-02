const { extractTextFromPDF } = require("../services/pdf.service");
const { summarizeText } = require("../services/ai.service");

// Temporary memory (later we'll use MongoDB)
let currentDocument = "";

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const extractedText = await extractTextFromPDF(req.file.path);

    // Save document for chat
    currentDocument = extractedText;

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
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process document",
    });
  }
};

// Export document so chat can access it
exports.getCurrentDocument = () => currentDocument;