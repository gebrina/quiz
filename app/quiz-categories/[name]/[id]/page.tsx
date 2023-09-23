"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { getQuizCategoryById } from "@/app/graphql";
import { useParams } from "next/navigation";

type Answer = {
  id: string;
  answer: string;
};

type Question = {
  answers: Answer[];
  correctAnswer: string;
  qusetion: string;
};

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getQuizCategoryById, {
    variables: { categoryId: id },
  });
  const [activeQuestion, setActiveQuestion] = useState<Question>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestionsRef = useRef<number>(0);

  useEffect(() => {
    const quizzes = data?.findOneQuizCategory?.quizzes;
    if (quizzes?.length > 0) {
      totalQuestionsRef.current = quizzes?.length;
      setActiveQuestion(quizzes[questionIndex]);
    }
  }, [data, questionIndex]);

  if (loading)
    return <h1 className="text-center my-10 text-3xl">Loading...</h1>;

  if (error)
    return (
      <h1 className="text-center text-3xl my-10 text-red-500">
        {error.message}
      </h1>
    );

  const handleNext = () => {};

  return (
    <section className="container mx-auto md:w-1/2  text-slate-300 my-10">
      <h1 className="text-center text-3xl underline decoration-yellow-600 font-bold">
        {data?.findOneQuizCategory?.name}
      </h1>
      <section className="flex items-start flex-col my-10 gap-2">
        <p className="text-xl">
          {questionIndex + 1}, {activeQuestion?.qusetion}
        </p>
        <ul className="flex flex-col mt-3 gap-2 text-lg">
          {activeQuestion?.answers.map((choice: Answer) => (
            <li
              className={`bg-slate-900 bg-opacity-80 px-2 py-1 hover:cursor-pointer hover:bg-opacity-30 rounded`}
              key={choice.id}
            >
              {choice.answer}
            </li>
          ))}
          <button
            className="bg-orange-900 py-2
             rounded-md
             transitio-all
             hover:animate-pulse
             my-6
             hover:shadow
             hover:shadow-yellow-500
             w-max mx-auto px-12 text-xl"
            onClick={handleNext}
          >
            Next Question
          </button>
        </ul>
      </section>
    </section>
  );
};

export default Quiz;
