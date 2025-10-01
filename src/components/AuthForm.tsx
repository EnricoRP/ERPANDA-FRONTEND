"use client";

import React, { useRef } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { ZodType } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from "@/constants";
import { useRouter } from "next/navigation";
import MediaUpload, { MediaType, MediaUploadRef } from "./MediaUpload";

export enum FormType {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  TENANT_INFO = "TENANT_INFO",
}

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: FormType;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const imageUploadRef = useRef<MediaUploadRef>(null);
  const router = useRouter();
  const isSignIn = type === FormType.SIGN_IN;
  const isSignUp = type === FormType.SIGN_UP;
  const isTenantInfo = type === FormType.TENANT_INFO;
  console.log("type:", type);
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        router.push("/");
      } else {
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-center">
        {isSignIn && "Masuk ke ERPANDA"}
        {isSignUp && "Buat Akun Baru"}
        {isTenantInfo && "Informasi Perusahaan Anda"}
      </h1>
      <p className="text-center text-dark-500">
        {isSignIn && "Masukkan email atau username dan password untuk masuk."}
        {isSignUp &&
          "Lengkapi formulir berikut untuk mendaftar dan mulai mengelola bisnis Anda."}
        {isTenantInfo &&
          "Lengkapi informasi Bisnis Anda agar ERPANDA dapat membantu mengelola bisnis dengan lebih mudah."}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "logoUrl" ? (
                      <MediaUpload
                        ref={imageUploadRef}
                        folder="images/logos"
                        placeholder="Unggah Logo Bisnis Anda"
                        onFileChange={field.onChange}
                        mediaType={MediaType.IMAGE}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        placeholder={
                          FIELD_PLACEHOLDERS[
                            field.name as keyof typeof FIELD_PLACEHOLDERS
                          ]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn && "Masuk"}
            {isSignUp && "Daftar"}
            {isTenantInfo && "Simpan"}
          </Button>
        </form>
      </Form>
      {(type === FormType.SIGN_IN || type === FormType.SIGN_UP) && (
        <p className="text-center text-base font-medium">
          {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
          <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="link">
            {isSignIn ? "Daftar Sekarang" : "Masuk"}
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
