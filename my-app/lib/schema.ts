import { z } from "zod";

export const FormDataSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .min(6, { message: "Message must be at least 6 characters" }),
});
