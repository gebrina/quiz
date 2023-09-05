"use client";

import { registerValidation } from "@/app/validation";
import { useFormik } from "formik";

const Register = () => {
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      passowrd: "",
    },
    validationSchema: registerValidation,
    onSubmit: () => {},
  });
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="fistName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <small>{errors.firstName}</small>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <small>{errors.lastName}</small>}
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="passowrd"
            onChange={handleChange}
          />
          {errors.passowrd && <small>{errors.email}</small>}
        </div>
      </form>
    </section>
  );
};

export default Register;
