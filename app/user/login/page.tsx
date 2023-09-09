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
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
          />
          {touched.email && errors.email && <small>{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="passoword"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && (
            <small>{errors.password}</small>
          )}
        </div>
      </form>
    </section>
  );
};

export default Page;
