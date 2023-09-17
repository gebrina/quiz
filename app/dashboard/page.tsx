"use client";
import React, { useState } from "react";
import Tab from "./tab";
import User from "./user";
import Quiz from "./quiz";
import QuizCategory from "./quiz-category";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activePage, setActivePage] = useState("");

  return (
    <section className="container max-auto">
      <Tab setActivePage={setActivePage} />
      {activePage.includes("user") && <User />}
      {activePage.includes("quiz") && <Quiz />}
      {activePage.includes("category") && <QuizCategory />}
    </section>
  );
};

export default DashboardLayout;
