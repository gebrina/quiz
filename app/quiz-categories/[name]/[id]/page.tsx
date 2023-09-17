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
  console.log(data);
  if (loading)
    return <h1 className="text-center my-10 text-3xl">Loading...</h1>;
  if (error)
    return (
      <h1 className="text-center text-3xl my-10 text-red-500">
        {error.message}
      </h1>
    );
  return <section className="container mx-auto"></section>;
};

export default Quiz;
