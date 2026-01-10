import z from "zod";

export const createEventValidationZodSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine(
      (dateStr) => {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return date >= tomorrow;
      },
      { message: "Event date must be at least tomorrow" }
    ),
  capacity: z.coerce
    .number()
    .min(10, { message: "Capacity must be at least 10" }),
  joiningFee: z.coerce
    .number()
    .min(200, { message: "Joining fee Must be more than 200" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z
    .array(z.string())
    .min(1, { message: "At least one type is required" }),
  image: z.any().refine((file) => file instanceof File && file.size > 0, {
    message: "Image is required",
  }),
});

export const updateEventValidationZodSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine(
      (dateStr) => {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return date >= tomorrow;
      },
      { message: "Event date must be at least tomorrow" }
    ),
  capacity: z.coerce
    .number()
    .min(10, { message: "Capacity must be at least 10" }),
  joiningFee: z.coerce
    .number()
    .min(200, { message: "Joining fee Must be more than 200" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z
    .array(z.string())
    .min(1, { message: "At least one type is required" }),
  image: z.any().optional(),
});
