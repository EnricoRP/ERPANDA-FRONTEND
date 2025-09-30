import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(3, "Email atau Username harus diisi")
    .nonempty("Email atau Username wajib diisi"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .nonempty("Password wajib diisi"),
});
