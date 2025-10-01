"use client";

import AuthForm, { FormType } from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type={FormType.SIGN_UP}
      schema={signUpSchema}
      defaultValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default page;
