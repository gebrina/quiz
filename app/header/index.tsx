import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-16 bg-black bg-opacity-25 text-slate-300 flex justify-between items-center px-24 ">
      <Image src={"/logo.ico"} width={40} height={40} alt="Quiz logo" />
      <section className="flex gap-10 text-lg">
        <Link className="hover:text-yellow-500" href={"/"}>
          Home
        </Link>
        <Link className="hover:text-yellow-500" href={"/quiz"}>
          Quiz
        </Link>
        <Link className="hover:text-yellow-500" href={"/quiz/1"}>
          Quiz Category
        </Link>
      </section>
      <section>
        <button>Register</button>
        <button>Login</button>
      </section>
    </header>
  );
};

export default Header;
