export const getLoggedInUser = () => {
  let user = { authUser: null };
  if (typeof window !== undefined) {
    user = JSON.parse(localStorage.getItem("user") ?? "");
  }
  return user?.authUser;
};

export const setLoggedInUser = (user: any) => {
  if (typeof window !== "undefined") {
    const loggedInUser = JSON.stringify(user);
    localStorage.setItem("user", loggedInUser);
  }
};

export const handleUserLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
