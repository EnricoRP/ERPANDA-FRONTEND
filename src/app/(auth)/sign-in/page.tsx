"use client";
import AuthForm, { FormType } from "@/components/AuthForm";
import { signIn } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type={FormType.SIGN_UP}
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signIn}
    />
  );
};

export default page;
