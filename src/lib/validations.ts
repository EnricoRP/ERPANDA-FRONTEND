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

export const tenantInfoSchema = z.object({
  companyName: z
    .string()
    .min(3, "Nama Perusahaan minimal 3 karakter")
    .nonempty("Nama Perusahaan wajib diisi"),
  industry: z
    .string()
    .min(2, "Bidang Industri minimal 2 karakter")
    .nonempty("Bidang Industri wajib diisi"),
  address: z
    .string()
    .min(5, "Alamat minimal 5 karakter")
    .nonempty("Alamat wajib diisi"),
  city: z
    .string()
    .min(2, "Kota minimal 2 karakter")
    .nonempty("Kota wajib diisi"),
  phone: z
    .string()
    .min(5, "Telepon minimal 5 karakter")
    .nonempty("Telepon wajib diisi"),
  fax: z.string().optional(),
  logoUrl: z.string().url("URL Logo tidak valid").optional(),
});
