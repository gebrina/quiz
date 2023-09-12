"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuizContext } from "../context/quiz";

const Header = () => {
  const pathname = usePathname();
  const { loggedInUser, handleLogout } = useQuizContext();
  console.log(loggedInUser);
  return (
    <header className="h-16 bg-black bg-opacity-25 text-slate-300 flex justify-between items-center px-24 ">
      <Image src={"/logo.ico"} width={40} height={40} alt="Quiz logo" />
      <section className="flex gap-10 text-lg">
        <Link
          className={`hover:text-yellow-500 ${
            pathname == "/" && "active-link"
          }`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`hover:text-yellow-500 ${
            pathname == "/quiz/random" && "active-link"
          }`}
          href={"/quiz/random"}
        >
          Random Quiz
        </Link>
        <Link
          className={`hover:text-yellow-500 ${
            pathname == "/quiz-categories" && "active-link"
          }`}
          href={"/quiz-categories"}
        >
          Quiz Categories
        </Link>
      </section>
      <section className="flex  border-2 rounded bg-yellow-900 group border-yellow-500 ">
        <button
          className={`px-2 ${pathname.includes("register") && "active-btn"}`}
        >
          <Link href="/user/register">Register</Link>
        </button>
        <span className="border  -skew-x-12 border-r-[1px] border-yellow-500 block"></span>
        <button
          className={`px-3 ${!pathname.includes("register") && "active-btn"}`}
        >
          {loggedInUser?.access_token ? (
            <Link onClick={handleLogout} href={"/user/login"}>
              Logout
            </Link>
          ) : (
            <Link href={"/user/login"}>Login</Link>
          )}
        </button>
      </section>
    </header>
  );
};

export default Header;
