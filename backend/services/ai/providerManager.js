const { generateWithGemini } = require('./providers/geminiProvider');

async function generateContent(prompt) {
  return await generateWithGemini(prompt);
}

module.exports = { generateContent };