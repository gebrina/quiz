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

type SelectedChoice = {
  idx: number;
  cIdx: number;
  correctAnswer: string;
  answer: string;
};

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getQuizCategoryById, {
    variables: { categoryId: id },
  });

  const [activeQuestion, setActiveQuestion] = useState<Question>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const secondsRef = useRef<string>("00");
  const minutesRef = useRef<string>("0");
  const timerIntervalRef = useRef<any>(null);
  const totalQuestionsRef = useRef<number>(0);
  const selectedChoicesRef = useRef<SelectedChoice[]>([]);

  const addZeroPrefix = (value: string) => {
    return Number(value) < 10 ? "0" + value : value;
  };

  useEffect(() => {
    if (!showResult) {
      timerIntervalRef.current = setInterval(() => {
        let secondsRefInNumber = Number(secondsRef.current);
        secondsRef.current = (secondsRefInNumber + 1).toString();

        if (secondsRefInNumber === 59) {
          let minutesRefInNumber = Number(minutesRef.current);
          minutesRef.current = (minutesRefInNumber + 1).toString();
          secondsRef.current = "0";
        }

        setTimer(
          addZeroPrefix(minutesRef.current) +
            " : " +
            addZeroPrefix(secondsRef.current)
        );
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [showResult]);

  useEffect(() => {
    const quizzes = data?.findOneQuizCategory?.quizzes;
    if (quizzes?.length > 0) {
      totalQuestionsRef.current = quizzes?.length;
      setActiveQuestion(quizzes[questionIndex]);
    }
  }, [data, questionIndex]);

  if (loading)
    return (
      <h1 className="text-center my-10 text-slate-300 text-3xl">Loading...</h1>
    );

  if (error)
    return (
      <h1 className="text-center text-3xl my-10 text-red-500">
        {error.message}
      </h1>
    );

  const handleNext = () => {
    if (questionIndex + 1 <= totalQuestionsRef.current) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleChoiceSelection = (
    idx: number,
    cIdx: number,
    answer: string,
    correctAnswer: string
  ) => {
    selectedChoicesRef.current.splice(idx, 1, {
      idx,
      cIdx,
      answer,
      correctAnswer,
    });
  };

  const calculateResult = () => {
    clearInterval(timerIntervalRef.current);
    const correctAnswers = selectedChoicesRef.current.filter(
      (choice) => choice.answer === choice.correctAnswer
    );
    setScore(correctAnswers.length);
    setShowResult(true);
  };

  const handleRestartQuiz = () => {
    clearInterval(timerIntervalRef.current);
    minutesRef.current = "0";
    secondsRef.current = "0";
    setTimer("00:00");
    selectedChoicesRef.current = [];
    setShowResult(false);
    setQuestionIndex(0);
  };

  return (
    <section className="container mx-auto md:w-1/2  text-slate-300 my-10">
      <h1 className="text-center text-3xl underline decoration-yellow-600 font-bold">
        {data?.findOneQuizCategory?.name} Quiz
      </h1>

      <section className="flex items-start flex-col my-10 gap-2">
        <p className="text-xl">
          {questionIndex + 1}, {activeQuestion?.qusetion}
        </p>
        <p className="flex w-full items-center justify-between font-semibold">
          <span className="bg-black px-5">
            {questionIndex + 1} of {totalQuestionsRef.current}
          </span>
          {showResult && (
            <span className="bg-green-900 rounded-full shadow-green-300 shadow-lg px-5 py-1">
              Score: {score} / {totalQuestionsRef.current}
            </span>
          )}
          <span className="bg-yellow-500 rounded text-black px-5 ">
            {timer}
          </span>
        </p>
        <ul className="flex flex-col mt-3 gap-3 w-full text-lg">
          {activeQuestion?.answers.map((choice: Answer, index: number) => (
            <li
              onClick={() =>
                handleChoiceSelection(
                  questionIndex,
                  index,
                  choice.answer,
                  activeQuestion.correctAnswer
                )
              }
              className={`${
                selectedChoicesRef.current[questionIndex]?.cIdx === index
                  ? "bg-slate-800 cursor-auto"
                  : "bg-slate-600  hover:cursor-pointer bg-opacity-50 hover:bg-opacity-30"
              }   px-2 py-1  rounded`}
              key={choice.id}
            >
              {choice.answer}
            </li>
          ))}
          {questionIndex + 1 < totalQuestionsRef.current ? (
            <button
              className="bg-yellow-900 py-2
             rounded-md
             transition-all
             duration-500
             my-6
             hover:shadow-lg
             hover:shadow-yellow-500
             w-max  px-12 text-xl"
              onClick={handleNext}
            >
              Next Question
            </button>
          ) : (
            <>
              {selectedChoicesRef.current.length ===
              totalQuestionsRef.current ? (
                <div className="flex justify-between">
                  {!showResult ? (
                    <button
                      onClick={calculateResult}
                      className="bg-green-900 py-2
                  rounded-md
                  transition-all
                  duration-500
                  my-6
                  hover:shadow-lg
                  hover:shadow-green-500
                  w-max  px-12 text-xl"
                    >
                      Show Result
                    </button>
                  ) : (
                    <button
                      onClick={handleRestartQuiz}
                      className="bg-blue-900 py-2
                  rounded-md
                  transition-all
                  duration-500
                  my-6
                  hover:shadow-lg
                  hover:shadow-blue-500
                  w-max  px-12 text-xl"
                    >
                      Restart Quiz
                    </button>
                  )}
                </div>
              ) : (
                <p className="bg-green-400 text-green-900  w-max px-5">
                  You left this question answer and see your result !
                </p>
              )}
            </>
          )}
        </ul>
      </section>
    </section>
  );
};

export default Quiz;
