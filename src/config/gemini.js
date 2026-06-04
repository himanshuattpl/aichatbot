import axios from "axios";
import env from "./env.js";

const geminiClient = axios.create({
  baseURL:
    "https://generativelanguage.googleapis.com/v1beta",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export const generateGeminiResponse =
  async (prompt) => {

    try {

      const response =
        await geminiClient.post(
          `/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }
        );

      return (
        response.data?.candidates?.[0]
          ?.content?.parts?.[0]?.text ||
        "No response generated."
      );

    } catch (error) {

      console.error(
        "Gemini Error:",
        error.response?.data || error.message
      );

      const status =
        error.response?.status;

      if (status === 429) {
        throw new Error(
          "GEMINI_QUOTA_EXCEEDED"
        );
      }

      if (status === 401) {
        throw new Error(
          "GEMINI_AUTH_ERROR"
        );
      }

      throw new Error(
        "GEMINI_SERVICE_ERROR"
      );
    }
  };

export default generateGeminiResponse;