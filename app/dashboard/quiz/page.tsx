"use client";

import { getAllQuizzesQuery } from "@/app/graphql";
import { useQuery } from "@apollo/client";
import { useQuizContext } from "@/app/context/quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLoggedInUser } from "@/app/lib";

const page = () => {
  const loggedInUser: any = getLoggedInUser();
  const router = useRouter();
  const { data, loading, error } = useQuery(getAllQuizzesQuery);
  useEffect(() => {
    if (!loggedInUser?.access_token) {
      router.push("/user/login");
    }
  }, []);

  if (loading)
    return (
      <h1 className="text-3xl text-slate-300 my-10 text-center">Loading ...</h1>
    );

  if (error)
    return (
      <h1 className="text-3xl text-red-500 text-center my-10">
        No Credentials...: {error.message}
      </h1>
    );

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
          <thead className="bg-slate-500 bg-opacity-30">
            <tr className="flex justify-evenly w-full py-2">
              <th>ID</th>
              <th>Question</th>
              <th>User</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </section>
    </section>
  );
};

export default page;
