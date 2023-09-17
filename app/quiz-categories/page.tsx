"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { getQuizCategoriesQuery } from "../graphql";

const page = () => {
  const { data, error, loading } = useQuery(getQuizCategoriesQuery);

  if (loading)
    return (
      <h1 className="text-center my-10 text-3xl text-slate-300"> Loading...</h1>
    );
  if (error)
    return (
      <h1 className="text-center my-10 text-3xl text-red-500">
        Error happened...
      </h1>
    );

  return (
    <section className="container mx-auto py-5">
      <h1
        className="text-center
        underline
        underline-offset-8
      decoration-yellow-500
      text-5xl font-bold text-slate-300"
      >
        Select & take a Quiz
      </h1>
      <section className="text-center mt-12">
        <div className="flex flex-wrap justify-center items-center gap-7">
          {data.findAllQuizCategory.map((category: any) => (
            <Link
              key={category.id}
              href={`/quiz-categories/${category.name}/${category.id}`}
              className="h-24 w-full md:w-1/3 text-slate-300 text-3xl 
                          flex items-center justify-center hover:bg-opacity-10 
                          hover:cursor-pointer bg-yellow-500 bg-opacity-5"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default page;
