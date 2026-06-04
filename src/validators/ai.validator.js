import { z } from "zod";

export const aiPromptSchema =
  z.object({
    message: z
      .string()
      .min(1)
      .max(5000),
  });