"use client";
import { createContext, useContext, useState } from "react";

const QuizContext = createContext(null);

const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  return (
    <QuizContext.Provider value={loggedInUser}>{children}</QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);

export default QuizContextProvider;
