"use client";

import React, { useEffect, useState } from "react";

const Tab = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState<string>("profile");

  useEffect(() => {
    setActivePage(activeTab);
  }, [activeTab]);

  return (
    <section
      className="h-12 flex items-center mx-auto
    justify-center  bg-yellow-950 bg-opacity-25 w-max mb-5 mt-10 text-xl text-slate-300"
    >
      <button
        onClick={() => setActiveTab("profile")}
        className={`${
          activeTab.includes("profile") && "bg-black"
        } h-full border-l-2 px-6 hover:bg-black  transition-all`}
      >
        Profile
      </button>
      <button
        onClick={() => setActiveTab("quizz")}
        className={`${
          activeTab.includes("quizz") && "bg-black"
        } h-full border-l-2 px-6 hover:bg-black  transition-all`}
      >
        Quizzes
      </button>
      <button
        onClick={() => setActiveTab("category")}
        className={`${
          activeTab.includes("category") && "bg-black"
        } h-full border-l-2 px-6 hover:bg-black  transition-all`}
      >
        Quiz Category
      </button>
    </section>
  );
};

export default Tab;
