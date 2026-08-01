const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function summarizeText(text) {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: `
You are an expert document assistant.

Summarize the following document in a clear and concise way.

Document:
${text}
`,
  });

  return response.text;
}

module.exports = {
  summarizeText,
};