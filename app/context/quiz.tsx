"use client";
import { createContext, useContext, useState } from "react";

type QuizContextValueTypes = {
  loggedInUser: string;
  setLoggedInUser: (data: any) => void;
};
const QuizContext = createContext<QuizContextValueTypes | undefined>(undefined);

const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  return (
    <QuizContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);

export default QuizContextProvider;
