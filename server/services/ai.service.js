const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ---------------- Summary ----------------

async function summarizeText(text) {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: `
You are an expert document assistant.

Summarize this document clearly using headings and bullet points.

Document:

${text}
`,
  });

  return response.text;
}

// ---------------- Chat ----------------

async function chatWithDocument(documentText, question) {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: `
You are an AI assistant.

Answer ONLY from the document below.

If the answer does not exist inside the document, reply:

"I couldn't find that information in this document."

DOCUMENT:

${documentText}

QUESTION:

${question}
`,
  });

  return response.text;
}

module.exports = {
  summarizeText,
  chatWithDocument,
};