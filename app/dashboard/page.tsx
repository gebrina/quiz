"use client";
import React, { useState } from "react";
import Tab from "./tab";
import User from "./profile";
import Quiz from "./quiz";
import QuizCategory from "./quiz-category";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activePage, setActivePage] = useState("");

  return (
    <section className="container mx-auto">
      <Tab setActivePage={setActivePage} />
      {activePage.includes("profile") && <User />}
      {activePage.includes("quiz") && <Quiz />}
      {activePage.includes("category") && <QuizCategory />}
    </section>
  );
};

export default DashboardLayout;
