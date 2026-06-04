import generateGeminiResponse 
from "../../config/gemini.js";

class GeminiService {
  async generateResponse(prompt) {
    return generateGeminiResponse(prompt);
  }
}

export default new GeminiService();