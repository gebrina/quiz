import Link from "next/link";

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
        <div className="flex flex-wrap justify-center items-center gap-7">
          <Link
            href={"/"}
            className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer bg-yellow-500 bg-opacity-5  "
          >
            React
          </Link>
          <Link
            href={"/"}
            className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer bg-yellow-500 bg-opacity-5  "
          >
            Angular
          </Link>
          <Link
            href={"/"}
            className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer bg-yellow-500 bg-opacity-5  "
          >
            Node JS
          </Link>
          <Link
            href={"/"}
            className="h-24 w-full md:w-1/3 text-slate-300 text-3xl flex items-center justify-center hover:bg-opacity-10 hover:cursor-pointer bg-yellow-500 bg-opacity-5  "
          >
            Express JS
          </Link>
        </div>
      </section>
    </section>
  );
};

export default page;
