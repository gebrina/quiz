import { FC, useState } from "react";
import { addQuizMutation, getQuizCategoriesQuery } from "@/app/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { quizValidation } from "@/app/validation";
import { toast } from "react-toastify";

type QuizFormProps = {
  user: string;
  action: string;
};
type Answer = {
  answer: string;
};

const QuizForm: FC<QuizFormProps> = ({ user, action }) => {
  const [cerateQuiz, { data, error, loading }] = useMutation(addQuizMutation);
  const { data: categories } = useQuery(getQuizCategoriesQuery);

  const [answers, setAnswers] = useState<Answer[]>([]);

  const initialQuizValues = {
    question: "",
    correctAnswer: "",
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialQuizValues,
    validationSchema: quizValidation,
    onSubmit: () => handleCreateQuiz(),
  });

  const handleCreateQuiz = () => {
    cerateQuiz({
      variables: {
        user,
        answers,
        question: values.question,
        correctAnswer: values.correctAnswer,
      },
    })
      .then((res) => {
        toast.success("Quiz creacted successfully");
      })
      .catch((err) => {
        toast.error("Unable to creact quiz try again!");
      });
  };

  const handleAddAnswers = () => {
    setAnswers((prevAnswers) => [...prevAnswers, { answer: "" }]);
  };

  const handleUpdateAnswers = (value: string, index: number) => {
    const prevAnsers = answers[index];
    prevAnsers.answer = value;
    const filterdAnswers = answers.filter((answer, i) => i !== index);
    setAnswers([...filterdAnswers, prevAnsers]);
  };

  if (loading) return <h1 className="text-center text-3xl">Submitting...</h1>;
  if (error)
    return (
      <h1 className="text-center text-3xl text-red-500">{error.message}</h1>
    );
  return (
    <section className="flex flex-col gap-2 justify-center items-center my-10">
      <h1 className="text-3xl font-bold opacity-90">
        {action == "new" ? "New Quiz" : "Update Quiz"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="text-slate-300 w-full sm:w-1/4 md:w-2/5 text-md flex flex-col gap-4"
      >
        <select className="bg-transparent">
          Category
          {categories.findAllQuizCategory.map((category: any) => (
            <option className="bg-transparent" key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
        <div className="flex justify-between ">
          <p>
            Choices{" "}
            <small className="bg-black bg-opacity-30 px-2 ">
              Click the add button and eneter unlimeted chioces{" "}
            </small>{" "}
          </p>
          <button
            type="button"
            onClick={handleAddAnswers}
            className="bg-yellow-900 rounded-sm 
            shadow shadow-indigo-200 
             hover:shadow-none transition-all p-1 px-3"
          >
            + Add choice
          </button>
        </div>
        {answers?.map((answer, i) => (
          <div key={i}>
            <label htmlFor={`choice${i}`}>Choice {i + 1}</label>
            <input
              id={`choice${i}`}
              value={answer.answer}
              onChange={(e) => handleUpdateAnswers(e.target.value, i)}
              className="input-control w-full"
            />
          </div>
        ))}
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
