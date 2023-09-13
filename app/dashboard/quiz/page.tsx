"use client";

import { getAllQuizzesQuery } from "@/app/graphql";
import { useQuery } from "@apollo/client";

const page = () => {
  const { data, loading, error } = useQuery(getAllQuizzesQuery);

  return (
    <section
      className="container mx-auto shadow-md
      text-slate-300
      text-xl
  "
    >
      <section>
        <table className="w-full my-5">
          <caption className="text-3xl py-2 underline decoration-yellow-500">
            Quizzes
          </caption>
          <thead className="flex justify-evenly w-full">
            <th>ID</th>
            <th>Question</th>
            <th>User</th>
            <th>Category</th>
            <th>Action</th>
          </thead>
        </table>
      </section>
    </section>
  );
};

export default page;
