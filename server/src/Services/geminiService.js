const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // fast model[web:88][web:101]

async function getSmartReplies(lastMessage) {
  const prompt = `
You are generating ultra-short smart replies for a chat app.

Last chat message: "${lastMessage}"

Stricty follow Rules:
- Reply in the SAME language as the last message.
- Generate EXACTLY 3 replies.
- Each reply MUST be ONLY ONE word.
- No punctuation, emojis, or numbers.
- No offensive, rude, or unsafe content.

Output format:
Return the 3 replies, each on its own line, with NOTHING else.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const replies = text.split("\n").filter(Boolean).slice(0, 3);
  console.log("*****************************");
  console.log(replies);

  return replies;
}

module.exports = { getSmartReplies };
