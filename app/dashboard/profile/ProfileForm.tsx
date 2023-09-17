"use client";

import { registerValidation } from "@/app/validation";
import { useFormik } from "formik";
import { FC } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type ProfileProps = {
  user: User;
};

const ProfileForm: FC<ProfileProps> = ({ user }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues,
      validationSchema: registerValidation,
      onSubmit: () => {},
    });

  return (
    <section className="w-max mx-auto text-lg text-slate-300">
      <h1 className="text-center text-3xl my-2">Upadte Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flxe-col md:flex-row md:w-1/2 flex-wrap mx-auto gap-4"
      >
        <div className=" flex flex-col">
          <label htmlFor="fName">First Name</label>
          <input
            className="input-control"
            name="firstName"
            id="fName"
            onChange={handleChange}
            value={values.firstName}
          />
          {errors.firstName && (
            <small className="text-red-500">{errors.firstName}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lName">Last Name</label>
          <input
            className="input-control"
            name="lastName"
            id="lName"
            onChange={handleChange}
            value={values.lastName}
          />
          {errors.lastName && (
            <small className="text-red-500">{errors.lastName}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            className="input-control"
            name="email"
            id="fName"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
        </div>

        <div className=" flex flex-col ">
          <label htmlFor="password">Password</label>
          <input
            className="input-control"
            name="password"
            id="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password}</small>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className="w-max px-6 bg-opacity-25 
        border-[1px] bg-green-600 p-1 
          hover:bg-opacity-50
        text-2xl"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
