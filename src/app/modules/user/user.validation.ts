import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]),
  password: z.string().min(4, "Password must be at least 8 characters long"),
  phone: z.string().regex(/^[0-9\-\+]{9,15}$/, "Invalid phone number"),
  address: z.string(),
});
