"use client";
import React from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/app/validation";

const Page = () => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {},
  });
  return <section></section>;
};

export default Page;
