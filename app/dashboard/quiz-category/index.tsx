"use client";
import { getQuizCategoriesQuery } from "@/app/graphql";
import { useQuery, useMutation } from "@apollo/client";
const QuizCategory = () => {
  const { error, loading, data } = useQuery(getQuizCategoriesQuery);

  if (loading)
    return <h1 className="text-center text-3xl text-red-500">Loading...</h1>;
  if (error)
    return (
      <h1 className="text-center text-3xl text-red-500">{error.message}</h1>
    );

  return (
    <section className="text-slate-300 mt-10">
      <section>
        <table className="w-full md:w-2/3  border-l-2 mx-auto text-center">
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
                  <button className="bg-green-500 px-2 rounded-sm text-white hover:bg-opacity-50">
                    Update
                  </button>
                </td>
                <td className="py-2">
                  <button className="bg-red-500 px-2 rounded-sm text-white hover:bg-opacity-50">
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
