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
    <section>
      <form>
        <div>
          <label htmlFor="name">Category Name</label>
          <input
            className="input-control"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && <small>{errors.name}</small>}
        </div>
      </form>
    </section>
  );
};

export default QuizCategoryForm;
