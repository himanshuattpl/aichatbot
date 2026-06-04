import { z } from "zod";

import {
  ROLE_LIST,
  DEPARTMENT_LIST,
} from "../constants/index.js";

export const createUserSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .min(2)
        .max(100),

      email: z.email(),

      password: z
        .string()
        .min(8),

      role: z.enum(ROLE_LIST),

      department: z
        .enum(DEPARTMENT_LIST)
        .optional(),
    }),
  });