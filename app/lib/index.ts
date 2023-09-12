export const getLoggedInUser = () => {
  let user = { authUser: null };
  if (typeof window !== "undefined") {
    const localUser = localStorage.getItem("user");
    if (localUser !== "undefined" && localUser) {
      user = JSON.parse(localUser);
    }
  }
  return user?.authUser;
};

export const setLoggedInUser = (user: any) => {
  if (typeof window !== "undefined") {
    const loggedInUser = JSON.stringify(user);
    if (loggedInUser) {
      localStorage.setItem("user", loggedInUser);
    }
  }
};

export const handleUserLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
