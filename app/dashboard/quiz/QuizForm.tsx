import { FC, useEffect, useState } from "react";
import {
  addQuizMutation,
  getAllQuizzesQuery,
  getQuizCategoriesQuery,
  updateQuizMutation,
} from "@/app/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { quizValidation } from "@/app/validation";
import Select from "@/app/elements/Select";
import { useQuizContext } from "@/app/context/quiz";

type QuizFormProps = {
  user: string;
  action: string;
  quiz: any;
  setAction: Function;
};

type Answer = {
  answer: string;
  id?: string;
};

const QuizForm: FC<QuizFormProps> = ({ user, action, quiz, setAction }) => {
  const { handleLogout } = useQuizContext();
  const [cerateQuiz, { error, loading }] = useMutation(addQuizMutation);
  const [updateQuiz, { error: updateError, loading: updateLoading, client }] =
    useMutation(updateQuizMutation, {
      onCompleted: () => {
        client.refetchQueries({ include: "active" });
      },
      errorPolicy: "all",
    });

  const { data: categories } = useQuery(getQuizCategoriesQuery);
  const [category, setCategory] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const initialQuizValues = {
    question: (quiz?.qusetion as string) ?? "",
    correctAnswer: (quiz?.correctAnswer as string) ?? "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: initialQuizValues,
    validationSchema: quizValidation,
    onSubmit: () => (action == "new" ? handleCreateQuiz() : handleUpdateQuiz()),
  });

  const handleCreateQuiz = () => {
    cerateQuiz({
      variables: {
        user,
        category,
        answers,
        question: values.question,
        correctAnswer: values.correctAnswer,
      },
      refetchQueries: [
        {
          query: getAllQuizzesQuery,
        },
      ],
    });
    resetFormValues();
  };

  const resetFormValues = () => {
    resetForm();
    setCategory("");
    setAnswers([]);
    setFieldValue("question", "");
    setFieldValue("correctAnswer", "");
  };

  const handleUpdateQuiz = () => {
    updateQuiz({
      variables: {
        quizId: quiz.id,
        user,
        categoryId: category,
        answers,
        question: values.question,
        correctAnswer: values.correctAnswer,
      },
    });
    resetFormValues();
  };

  const handleAddAnswers = () => {
    setAnswers((prevAnswers) => [...prevAnswers, { answer: "" }]);
  };

  const handleUpdateAnswers = (value: string, index: number) => {
    if (action === "update") {
      const answer = answers[index];
      answers.splice(index, 1, { answer: value, id: answer?.id as string });
    } else {
      answers.splice(index, 1, { answer: value });
    }
    setAnswers([...answers]);
  };

  useEffect(() => {
    if (quiz) {
      setFieldValue("question", quiz?.question);
      setFieldValue("correctAnswer", quiz?.correctAnswer);
      setAnswers(
        quiz?.answers?.map((choice: any) => ({
          id: choice.id,
          answer: choice.answer,
        }))
      );
      setCategory(quiz?.category?.id);
    }
  }, [quiz, setFieldValue]);

  if (loading || updateLoading)
    return <h1 className="text-center text-3xl">Submitting...</h1>;

  if (error || updateError) {
    if (
      error?.message === "Invalid token" ||
      updateError?.message === "Invalid token"
    ) {
      handleLogout();
      location.href = location.origin + "/user/login";
    }

    return (
      <h1 className="text-center text-3xl text-red-500">
        {error?.message || updateError?.message}
      </h1>
    );
  }

  return (
    <section className="flex flex-col w-full mx-auto gap-2 justify-center items-center my-10">
      <div className="flex justify-between md:w-1/2 mb-6">
        <h1 className="text-3xl font-bold opacity-90">
          {action == "new" ? "New Quiz" : "Update Quiz"}
        </h1>
        <button
          onClick={() => setAction("")}
          className="bg-red-700 px-5 py-1 rounded hover:bg-opacity-75 "
        >
          Cancel
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`text-slate-300  w-full md:w-auto flex-col md:flex-row text-md flex gap-4`}
      >
        <div className="flex w-full flex-col gap-4">
          <div>
            <p>Quiz Category</p>
            <Select
              defalutValue={category}
              options={categories?.findAllQuizCategory}
              setValue={setCategory}
            />
          </div>

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
        </div>
        <div className="flex flex-col gap-4 w-full">
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
          {action !== "" && (
            <div className="flex w-full items-center justify-between">
              <p className="md:w-1/2">
                Choices
                <small className="bg-black bg-opacity-30 px-2 ">
                  Click the add button and eneter unlimeted chioces
                </small>
              </p>
              <button
                type="button"
                onClick={handleAddAnswers}
                className="bg-yellow-900 rounded-sm 
            shadow shadow-indigo-200 
             hover:shadow-none h-max self-end ml-2 transition-all p-1 px-3"
              >
                + Add Choice
              </button>
            </div>
          )}
          <button
            className="bg-green-700 py-2 text-lg  rounded hover:bg-slate-900"
            type="submit"
          >
            {action === "new" ? "Add" : "Uppdate"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default QuizForm;
