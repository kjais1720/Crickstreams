/**
 *
 * @param {object} state : the auth state containing properties of the user
 * @param {object} action : Containing type & payload properties
 * @returns {object} state : modified state
 */
export const authReducer = (state, { type, payload }) => {
  console.log({ type, payload });
  switch (type) {
    case "login":
      return { ...state, isLoggedIn: true, ...payload };
    case "logout":
      localStorage.removeItem("userToken");
      return { ...state, isLoggedIn: false, user: {} };
    default:
      return state;
  }
};
