"use client";

import { registerValidation } from "@/app/validation";
import { useFormik } from "formik";

const Register = () => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidation,
    onSubmit: () => {},
  });
  return (
    <section className="text-slate-300 min-h-[80vh] flex items-center justify-center">
      <form
        className="flex flex-col gap-2 sm:w-3/4 md:w-1/5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            id="fistName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className="input-control"
          />
          {errors.firstName && touched.firstName && (
            <small className="text-red-600">{errors.firstName}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className="input-control"
          />
          {errors.lastName && touched.lastName && (
            <small className="text-red-600">{errors.lastName}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="input-control"
          />
          {errors.email && touched.email && (
            <small className="text-red-600">{errors.email}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            className="input-control"
          />
          {errors.password && touched.password && (
            <small className="text-red-600">{errors.email}</small>
          )}
        </div>
        <button className="w-full bg-yellow-800 py-2 text-lg hover:bg-slate-900 transition-all hover:border-[1px] mt-4">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
