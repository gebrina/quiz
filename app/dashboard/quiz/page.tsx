"use client";

import { getAllQuizzesQuery } from "@/app/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLoggedInUser } from "@/app/lib";

const DashboardPage = () => {
  const loggedInUser: any = getLoggedInUser();
  const router = useRouter();
  const { data, loading, error } = useQuery(getAllQuizzesQuery);

  useEffect(() => {
    if (!loggedInUser?.access_token) {
      router.push("/user/login");
    }
  }, [loggedInUser?.access_token, router]);

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
        <table className="w-full border-l-2 my-5">
          <caption className="text-3xl py-2 underline decoration-yellow-500">
            Quizzes
          </caption>
          <thead className="bg-slate-500  bg-opacity-30">
            <tr className="h-14">
              <th>Question</th>
              <th>User</th>
              <th>Category</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.findAllQuiz.map((quiz: any) => (
              <tr
                key={quiz.qusetion}
                className="text-center hover:bg-black h-12"
              >
                <td title={quiz.qusetion}>
                  {quiz.qusetion.substring(0, 10)} ...
                </td>
                <td>{quiz?.user?.firstName}</td>
                <td>{quiz.category.name}</td>
                <td>
                  <button className="text-md shadow-sm hover:bg-opacity-50 bg-red-500 bg-opacity-90 px-2 rounded-sm cursor-pointer">
                    Delete
                  </button>
                </td>
                <td>
                  <button className="text-md shadow-sm hover:bg-opacity-50 bg-green-500 bg-opacity-30 px-2 rounded-sm cursor-pointer">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default DashboardPage;
