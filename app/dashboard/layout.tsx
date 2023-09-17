"use client";
import React, { useState } from "react";
import Tab from "./tab";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activePage, setActivePage] = useState("");

  return (
    <section className="container max-auto">
      <Tab setActivePage={setActivePage} />
    </section>
  );
};

export default DashboardLayout;
