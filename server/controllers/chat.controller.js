const { chatWithDocument } = require("../services/ai.service");
const { getCurrentDocument } = require("./upload.controller");

exports.chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const document = getCurrentDocument();

    if (!document) {
      return res.status(400).json({
        success: false,
        message: "Upload a document first.",
      });
    }

    const answer = await chatWithDocument(document, question);

    res.json({
      success: true,
      answer,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Chat failed",
    });
  }
};