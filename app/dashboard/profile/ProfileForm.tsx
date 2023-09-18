"use client";

import { useQuizContext } from "@/app/context/quiz";
import { getUserById } from "@/app/graphql";
import { registerValidation } from "@/app/validation";
import { useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useEffect } from "react";

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
  const { loggedInUser } = useQuizContext();
  const userId = loggedInUser?.user?.id;
  const { data, loading, error } = useQuery(getUserById, {
    variables: { userId },
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: registerValidation,
    onSubmit: () => {},
  });

  useEffect(() => {
    setFieldValue("firstName", data?.findOneUser?.firstName);
    setFieldValue("lastName", data?.findOneUser.lastName);
    setFieldValue("email", data?.findOneUser?.email);
  }, [data]);

  if (loading)
    return (
      <h1 className="text-3xl text-center my-10 text-slate-300">
        Loading user info...
      </h1>
    );

  if (error)
    return <h1 className="text-3xl text-red-500 text-center my-10"></h1>;

  return (
    <section className="w-full mx-auto text-lg text-slate-300">
      <h1 className="text-center text-3xl my-2">Upadte Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-1/3  mx-auto gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="fName">First Name</label>
          <input
            className="input-control"
            name="firstName"
            id="fName"
            onChange={handleChange}
            value={values.firstName}
          />
          {touched.firstName && errors.firstName && (
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
          {touched.lastName && errors.lastName && (
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
          {touched.password && errors.password && (
            <small className="text-red-500">{errors.password}</small>
          )}
        </div>
        <div className="w-full mt-4 flex items-center justify-center">
          <button
            className="w-full  px-6 bg-opacity-25 
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
