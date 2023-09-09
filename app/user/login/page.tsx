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
    <section className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="text-slate-300 w-full sm:w-1/4 md:w-1/5 text-md flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="  input-control"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
          />
          {touched.email && errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="  input-control"
            type="password"
            id="password"
            name="passoword"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && (
            <small className="text-red-500">{errors.password}</small>
          )}
        </div>
        <button
          className="bg-yellow-700 py-2 text-lg rounded hover:bg-slate-900"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Page;
