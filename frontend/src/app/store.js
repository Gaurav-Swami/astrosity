import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { loadAuthState } from "../utils/loadAuthState";
import darkModeReducer from "../features/darkmode/darkMode";

const preLoadedState = {
  auth: loadAuthState() || {
    isAuthenticated: false,
    user: null,
    token: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer, // 'auth' will be the key in the state for this slice
  },preLoadedState
});

export default store;
