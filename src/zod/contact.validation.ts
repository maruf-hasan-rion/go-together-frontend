import z from "zod";

export const contactValidationZodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(120),
  email: z.string().email({ message: "Valid email is required" }),
  message: z
    .string()
    .min(10, { message: "Please write at least 10 characters" })
    .max(2000, { message: "Message is too long" }),
});
