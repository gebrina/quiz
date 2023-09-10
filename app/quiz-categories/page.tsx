const page = () => {
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
        <ul className="flex flex-wrap justify-center items-center gap-5">
          <li className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer animate-bounce bg-yellow-500 bg-opacity-5 my-4 ">
            React
          </li>
          <li className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer animate-bounce bg-yellow-500 bg-opacity-5 my-4 ">
            Angular
          </li>
          <li className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer animate-bounce bg-yellow-500 bg-opacity-5 my-4 ">
            Node JS
          </li>
          <li className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer animate-bounce bg-yellow-500 bg-opacity-5 my-4 ">
            Express JS
          </li>
        </ul>
      </section>
    </section>
  );
};

export default page;
