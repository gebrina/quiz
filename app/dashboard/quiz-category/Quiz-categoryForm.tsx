"use client";
import { useFormik } from "formik";
import { quizCategoryValidation } from "@/app/validation";
import { FC } from "react";

type QuizCategoryFormProps = {
  action: string;
  setAction: Function;
};
const QuizCategoryForm: FC<QuizCategoryFormProps> = ({ action, setAction }) => {
  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: quizCategoryValidation,
    onSubmit: () => {},
  });

  return (
    <section className="flex item-center justify-center my-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Category Name</label>
          <input
            className="input-control"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && <small>{errors.name}</small>}
        </div>
        <div className="w-full mt-4 flex items-center justify-center">
          <button
            type="submit"
            className="w-full  px-6 bg-opacity-25 
        border-[1px] bg-green-600 p-1 
          hover:bg-opacity-50
        text-2xl"
          >
            {action === "new" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default QuizCategoryForm;
