"use client";
import { getQuizCategoriesQuery } from "@/app/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

const RandomQuiz = () => {
  const { error, loading, data } = useQuery(getQuizCategoriesQuery);
  const [quizCategory, setQuizCategory] = useState<any>([]);
  const [selectedChoice, setSelectedChoice] = useState<
    { right: boolean; idx: number; cIdx: number }[]
  >([]);
  const [numberofAnswerdChoices, setNumberofAnsweredChoices] =
    useState<number>(0);
  const [correctAnswerPercentage, setCorrectAnswerPercentage] = useState("0%");

  const numberofCorrectAnswersRef = useRef<number>(0);
  const totalQuestionsRef = useRef<number>(0);

  useEffect(() => {
    let quizCategoryLength = data?.findAllQuizCategory?.length;
    if (quizCategoryLength > 0) {
      let randomIndex = Math.floor(Math.random() * quizCategoryLength);
      const randomQuizCategory = data?.findAllQuizCategory?.[randomIndex];
      totalQuestionsRef.current = randomQuizCategory.quizzes.length;
      setQuizCategory(randomQuizCategory);
      setSelectedChoice(Array.from({ length: quizCategoryLength }));
    }
  }, [data]);

  if (loading)
    return (
      <h1 className="text-3xl text-center text-slate-300 my-10">Loading...</h1>
    );

  if (error) return <h1 className="text-3xl text-red-500">{error.message}</h1>;

  const handleChoiceSelection = (
    selectedAnswer: string,
    correctAnswer: string,
    idx: number,
    cIdx: number
  ) => {
    if (
      !selectedChoice.includes({
        idx,
        cIdx,
        right: correctAnswer === selectedAnswer,
      })
    ) {
      if (selectedAnswer === correctAnswer) {
        numberofCorrectAnswersRef.current += 1;
      }
      selectedChoice.splice(idx, 1, {
        right: correctAnswer === selectedAnswer,
        idx,
        cIdx,
      });
      setNumberofAnsweredChoices((prev) => {
        calculatePercenatage(prev + 1);
        return prev + 1;
      });
    }
  };
  const calculatePercenatage = (numberofAnswerdChoices: number) => {
    console.log(numberofCorrectAnswersRef.current, numberofAnswerdChoices);
    const ratio =
      numberofAnswerdChoices > 0
        ? numberofCorrectAnswersRef.current / numberofAnswerdChoices
        : 0;
    setCorrectAnswerPercentage(Math.floor(ratio * 100) + "%");
  };

  return (
    <section className="text-slate-300 my-10 relative">
      <section
        className="absolute md:right-24  top-0
          right-6
        shadow-lg shadow-yellow-300 rounded border-opacity-50 
        border-2   flex gap-5 text-center text-2xl"
      >
        <p className="bg-green-900 px-3">
          Score: {numberofCorrectAnswersRef.current}/{totalQuestionsRef.current}
        </p>
        <p className="pr-2">Percentage: {correctAnswerPercentage}</p>
      </section>
      <section className="relative top-32 md:top-0">
        <div className="flex justify-center items-center text-center w-full  flex-wrap text-3xl gap-6 md:gap-24">
          <h1 className="underline decoration-yellow-500">
            {quizCategory.name}
          </h1>
          <h1 className="bg-yellow-500 text-xl bg-opacity-40 px-2 rounded-sm shadow-md shadow-yellow-200">
            # Answerd Questions: {numberofAnswerdChoices} /
            {totalQuestionsRef.current}
          </h1>
        </div>
        <div className="my-7 text-xl flex justify-center items-center flex-col">
          {quizCategory?.quizzes?.map((quiz: any, index: number) => (
            <div key={quiz.qusetion} className="mb-6 md:w-1/2">
              <p className="font-semibold">
                {index + 1}, {quiz.qusetion}
              </p>
              {quiz?.answers?.map((choice: any, cIndex: number) => (
                <ul
                  className="bg-slate-900 bg-opacity-30 mt-2 flex flex-col gap-2"
                  key={choice.id}
                >
                  <li
                    onClick={() =>
                      handleChoiceSelection(
                        choice.answer,
                        quiz.correctAnswer,
                        index,
                        cIndex
                      )
                    }
                    className={`p-2 ${
                      selectedChoice[index]?.idx !== index &&
                      "hover:bg-yellow-300 hover:bg-opacity-25  hover:cursor-pointer"
                    } 
                      ${
                        selectedChoice[index]?.idx === index &&
                        (choice.answer === quiz.correctAnswer
                          ? "bg-green-900"
                          : selectedChoice[index]?.cIdx === cIndex
                          ? "bg-red-900"
                          : "bg-slate-500")
                      }
                      bg-opacity-50`}
                  >
                    {choice.answer}
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RandomQuiz;
