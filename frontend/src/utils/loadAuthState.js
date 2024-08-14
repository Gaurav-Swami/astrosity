export const loadAuthState = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (token && user) {
      return {
        isAuthenticated: true,
        user,
        token,
      };
    }
    return undefined;
  } catch (err) {
    console.log("Couldn't find user");
    return undefined;
  }
};
