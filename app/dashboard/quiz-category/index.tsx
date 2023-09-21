"use client";
import { getQuizCategoriesQuery } from "@/app/graphql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import QuizCategoryForm from "./Quiz-categoryForm";
const QuizCategory = () => {
  const [action, setAction] = useState<string>("");
  const [category, setCategory] = useState<any>();
  const { error, loading, data } = useQuery(getQuizCategoriesQuery);

  if (loading)
    return <h1 className="text-center text-3xl text-red-500">Loading...</h1>;
  if (error)
    return (
      <h1 className="text-center text-3xl text-red-500">{error.message}</h1>
    );

  return (
    <section className="text-slate-300 mt-10">
      {action && <QuizCategoryForm action={action} category={category} />}
      <section>
        <table className="w-full md:w-2/3  border-l-2 mx-auto text-center">
          <caption className="relatvie">
            <h1 className="text-3xl py-2 underline decoration-yellow-500 ">
              Quiz Categories
            </h1>

            <button
              onClick={() => {
                action ? setAction("") : setAction("new");
              }}
              className={`px-3 text-[22px] border-[1px]
              hover:bg-opacity-80
              rounded
              transition-all
              float-right
              mb-2
              ${action ? "bg-red-500" : "bg-green-700"}
             `}
            >
              {action ? "Cancel" : "Add Category"}
            </button>
          </caption>

          <thead className="bg-slate-800 text-xl">
            <th>ID</th>
            <th>Name</th>
            <th># Quizzes</th>
            <th colSpan={2}>Actions</th>
          </thead>
          <tbody>
            {data.findAllQuizCategory.map((category: any) => (
              <tr key={category.id} className="hover:bg-slate-700">
                <td className="py-2" title={category.id}>
                  {category.id.substring(0, 10)}
                </td>
                <td className="py-2">{category.name}</td>
                <td className="py-2">{category.quizzes.length}</td>
                <td className="py-2">
                  <button
                    onClick={() => setCategory(category)}
                    className="bg-green-500 px-2 rounded-sm hover:bg-opacity-50"
                  >
                    Update
                  </button>
                </td>
                <td className="py-2">
                  <button className="bg-red-500 px-2 rounded-sm hover:bg-opacity-50">
                    Delete
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

export default QuizCategory;
