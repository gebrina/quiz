"use client";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/app/validation";
import { LoginMutation } from "@/app/graphql";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLoggedInUser, setLoggedInUser } from "@/app/lib";

const Page = () => {
  const [authUser, { data, loading, error }] = useMutation(LoginMutation);
  const router = useRouter();
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      handleLogin();
    },
  });

  const handleLogin = () => {
    authUser({
      variables: {
        ...values,
      },
    });
  };

  useEffect(() => {
    setLoggedInUser(data);
  }, [data]);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      router.push("/dashboard/quiz");
    }
  }, [router]);

  if (loading)
    return <p className="text-center text-3xl mt-12"> Submintting...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 text-3xl mt-12">
        Something went wrong...
      </p>
    );

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
            name="password"
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
