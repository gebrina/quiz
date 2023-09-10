export const getLoggedInUser = () => {
  let user = { authUser: null };
  if (typeof window !== undefined) {
    user = JSON.parse(localStorage.getItem("user") ?? "");
  }
  return user?.authUser;
};
