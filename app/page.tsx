import Link from "next/link";
import { FC } from "react";

const Page: FC = () => {
  return (
    <main className="min-h-[80vh] flex justify-center items-center">
      <section>
        <aside>
          <blockquote className="text-slate-300 text-3xl w-full sm:w-3/4 md:w-1/2">
            &quot; I’m hosting a quiz show, but I never considered myself a game
            show host.&quot;
            <span className="text-yellow-500 text-[16px] "> Maury Povich</span>
          </blockquote>
          <Link
            className="px-3  mt-4 block  w-max py-1 text-2xl rounded hover:text-yellow-500 hover:animate-pulse  bg-orange-500 bg-opacity-20 text-slate-300"
            href={"/quiz-categories"}
          >
            Take Quiz
          </Link>
        </aside>
      </section>
    </main>
  );
};

export default Page;
