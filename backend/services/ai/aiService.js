const providerManager = require("./providers/providerManager");
const { buildResumePrompt } = require("./prompts/resumePrompt");
const { generateDemoResume } = require("./demoResumeGenerator");
async function generateResumeWithAI(userData) {
  try {
    const prompt = buildResumePrompt(userData);

    const response = await providerManager.generateContent(prompt);

   let cleanedResponse = response.trim();

cleanedResponse = cleanedResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanedResponse);
  }catch (error) {

    console.error("AI Service Error:", error.message);

    console.log("Development Mode Enabled");

    return generateDemoResume(userData);

}
  }


module.exports = {
  generateResumeWithAI,
};