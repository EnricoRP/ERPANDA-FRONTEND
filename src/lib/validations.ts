import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.email(),
  password: z.string().min(8),
});
