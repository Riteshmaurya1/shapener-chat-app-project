const { GoogleGenAI } = require("@google/genai");

// Validate API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY not found in .env file");
}

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getSmartReplies(lastMessage) {
  const prompt = `
You are generating ultra-short smart replies for a chat app.

Last chat message: "${lastMessage}"

Strictly follow Rules:
- Reply in the SAME language as the last message.
- Generate EXACTLY 3 replies.
- Each reply MUST be ONLY ONE word.
- No punctuation, emojis, or numbers.
- No offensive, rude, or unsafe content.

Output format:
Return the 3 replies, each on its own line, with NOTHING else.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using the new supported model
      contents: prompt,
    });

    const text = response.text;
    const replies = text.split("\n").filter(Boolean).slice(0, 3);

    console.log("*****************************");
    console.log(replies);

    return replies;
  } catch (error) {
    console.error("❌ Error generating smart replies:", error.message);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

module.exports = { getSmartReplies };