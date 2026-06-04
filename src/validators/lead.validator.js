import { z } from "zod";

export const createLeadSchema =
  z.object({
    body: z.object({
      name: z.string(),

      email: z
        .string()
        .email(),

      phone: z.string(),

      message: z.string(),

      department: z.enum([
        "EMS",
        "AGRITECH",
      ]),
    }),
  });