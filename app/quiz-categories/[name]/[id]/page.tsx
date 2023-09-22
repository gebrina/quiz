"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { getQuizCategoryById } from "@/app/graphql";
import { useParams } from "next/navigation";

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getQuizCategoryById, {
    variables: { categoryId: id },
  });

  if (loading)
    return <h1 className="text-center my-10 text-3xl">Loading...</h1>;

  if (error)
    return (
      <h1 className="text-center text-3xl my-10 text-red-500">
        {error.message}
      </h1>
    );

  return (
    <section className="container mx-auto   text-slate-300 my-10">
      <h1 className="text-center text-3xl  border-b-2 border-yellow-500 font-bold">
        {data?.findOneQuizCategory?.name}
      </h1>
      <div className="my-7 text-xl flex justify-center items-center flex-col">
        {data?.findOneQuizCategory?.quizzes?.map((quiz: any, index: number) => (
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

export default Quiz;
