import { z } from "zod";

export const sendMessageSchema = z.object({
  body: z.object({
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(5000),

    sessionId: z
      .string()
      .optional(),

    platform: z
      .enum([
        "WEBSITE",
        "WHATSAPP",
      ])
      .default("WEBSITE"),
  }),
});