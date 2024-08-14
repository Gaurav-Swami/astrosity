import { createSlice } from "@reduxjs/toolkit";


const darkMode = createSlice({
  name: "darkMode",
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    
    // isDarkMode(state) {
    //   state.isDarkMode = !state.isDarkMode;
    // },
  },
});

export const {toggleDarkMode} = darkMode.actions;
export default darkMode.reducer;
