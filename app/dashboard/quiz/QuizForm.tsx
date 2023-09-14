import { FC, useState } from "react";
import { addQuizMutation } from "@/app/graphql";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

type QuizFormProps = {
  user: string;
  category: string;
  action: string;
};
const QuizForm: FC<QuizFormProps> = ({ category, user, action }) => {
  const [cerateQuiz, { data, error, loading }] = useMutation(addQuizMutation);
  const [answers, setAnswers] = useState<Array<string>>([""]);

  const initialQuizValues = {
    question: "",
    correctAnswer: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialQuizValues,
    onSubmit: () => {},
  });

  return (
    <section className="flex flex-col gap-2 justify-center items-center my-10">
      <h1 className="text-3xl font-bold opacity-90">
        {action == "new" ? "New Quiz" : "Update Quiz"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="text-slate-300 w-full sm:w-1/4 md:w-2/5 text-md flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="question">Question</label>
          <input
            className="input-control"
            name="question"
            value={values.question}
            onChange={handleChange}
            id="question"
          />
          {touched.question && errors.question && (
            <small className="text-red-500">{errors.question}</small>
          )}
        </div>
        <div>
          <label htmlFor="correctAns">Correct Answer</label>
          <input
            value={values.correctAnswer}
            name="correctAnswer"
            onChange={handleChange}
            id="correctAns"
            className="input-control w-full"
          />
          {touched.correctAnswer && errors.correctAnswer && (
            <small className="text-red-500">{errors.correctAnswer}</small>
          )}
        </div>

        <button
          className="bg-green-700 py-2 text-lg rounded hover:bg-slate-900"
          type="submit"
        >
          {action === "new" ? "Add" : "Uppdate"}
        </button>
      </form>
    </section>
  );
};

export default QuizForm;
