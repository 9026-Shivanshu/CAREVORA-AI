const geminiProvider = require("./geminiProvider");
const openaiProvider = require("./openaiProvider");

async function generateContent(prompt) {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();

  // User selected OpenAI
  if (provider === "openai") {
    return await openaiProvider.generate(prompt);
  }

  // User selected Gemini
  try {
    return await geminiProvider.generate(prompt);
  } catch (error) {
    console.error("Gemini Failed:", error.message);

    // Auto fallback only for quota/rate limit
    if (
      error.status === 429 ||
      error.message.includes("RESOURCE_EXHAUSTED") ||
      error.message.includes("quota")
    ) {
      console.log("Gemini quota exceeded. Switching to OpenAI...");

      return await openaiProvider.generate(prompt);
    }

    throw error;
  }
}

module.exports = {
  generateContent,
};