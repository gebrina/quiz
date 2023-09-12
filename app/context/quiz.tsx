"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser, handleUserLogout } from "../lib";

type QuizContextValueTypes = {
  loggedInUser: any;
  handleLogout: (data: any) => void;
  handleLogin: (data: any) => void;
};
const QuizContext = createContext<QuizContextValueTypes>({
  loggedInUser: false,
  handleLogout: () => {},
  handleLogin: () => {},
});

const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedinUser] = useState<any>();

  const handleLogout = () => {
    setLoggedinUser(null);
    handleUserLogout();
  };

  const handleLogin = (userInfo: any) => {
    setLoggedinUser(userInfo.authUser);
  };

  useEffect(() => {
    const user = getLoggedInUser();
    user && setLoggedinUser(user);
  }, []);

  return (
    <QuizContext.Provider value={{ loggedInUser, handleLogout, handleLogin }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);

export default QuizContextProvider;
