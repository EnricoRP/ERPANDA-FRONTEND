"use client";
import AuthForm, { FormType } from "@/components/AuthForm";
import { submitTenantInfo } from "@/lib/actions/auth";
import { tenantInfoSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type={FormType.TENANT_INFO}
      schema={tenantInfoSchema}
      defaultValues={{
        companyName: "",
        industry: "",
        address: "",
        city: "",
        phone: "",
        fax: "",
        logoUrl: "",
      }}
      onSubmit={submitTenantInfo}
    />
  );
};

export default page;
