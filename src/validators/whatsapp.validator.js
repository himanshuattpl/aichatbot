import { z } from "zod";

export const whatsappWebhookSchema =
  z.object({
    body: z.object({
      Body: z.string(),

      From: z.string(),
    }),
  });