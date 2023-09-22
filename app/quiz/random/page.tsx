"use client";
import { getQuizCategoriesQuery } from "@/app/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const RandomQuiz = () => {
  const { error, loading, data } = useQuery(getQuizCategoriesQuery);
  const [quizCategory, setQuizCategory] = useState<any>([]);

  useEffect(() => {
    let quizCategoryLength = data?.findAllQuizCategory?.length;
    if (quizCategoryLength > 0) {
      let randomIndex = Math.floor(Math.random() * quizCategoryLength);
      const randomQuizCategory = data?.findAllQuizCategory?.[randomIndex];
      setQuizCategory(randomQuizCategory);
    }
  }, [data]);

  if (loading)
    return (
      <h1 className="text-3xl text-center text-slate-300 my-10">Loading...</h1>
    );
  if (error) return <h1 className="text-3xl text-red-500">{error.message}</h1>;

  return (
    <section className="text-slate-300 my-10">
      <h1 className="text-center text-3xl underline decoration-yellow-500">
        {quizCategory.name}
      </h1>
      <div className="my-7 text-xl flex justify-center items-center flex-col">
        {quizCategory?.quizzes?.map((quiz: any, index: number) => (
          <div key={quiz.id} className="mb-4 md:w-1/2">
            <p className="font-semibold">
              {index + 1}, {quiz.qusetion}
            </p>
            {quiz?.answers?.map((choice: any) => (
              <ul
                className="bg-slate-900 bg-opacity-30 mt-2 flex flex-col gap-2"
                key={choice.id}
              >
                <li className="p-2 hover:cursor-pointer hover:bg-yellow-300 hover:bg-opacity-25">
                  {choice.answer}
                </li>
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RandomQuiz;
