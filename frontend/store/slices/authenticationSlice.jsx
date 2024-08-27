import { createSlice } from "@reduxjs/toolkit";

// const refreshToken =
//   localStorage.getItem("refreshToken") !== null
//     ? JSON.parse(localStorage?.getItem("refreshToken"))
//     : null;


const getParsedLocalStorageItem = (key) => {
  const item = localStorage?.getItem(key);
  // Check if the item is not null or undefined and is a valid JSON string
  if (item && item !== "undefined") {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing JSON for key "${key}":`, error);
      return null;
    }
  }
  return null;
};

// Initial state
const initialState = {
  isSignIn: getParsedLocalStorageItem("isSignIn", false),
  isLoggedIn: getParsedLocalStorageItem("isLoggedIn", false),
  accessToken: getParsedLocalStorageItem("accessToken", null),
  // refreshToken: getLocalStorageItem("refreshToken", null), // Make sure refreshToken is handled
};

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    toggleAuthSelection: (state) => {
      state.isSignIn = !state.isSignIn;
      localStorage?.setItem("isSignIn", JSON?.stringify(state.isSignIn));
    },
    toggleLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage?.setItem("isLoggedIn", JSON?.stringify(state.isLoggedIn));
    },
    setAuthenticationTokens: (state, action) => {
      // console.log("action.payload.accessToken", action.payload.accessToken);
      localStorage?.setItem(
        "accessToken",
        JSON?.stringify(action.payload?.accessToken)
      );
      // localStorage.setItem(
      //   "refreshToken",
      //   JSON?.stringify(action.payload.refreshToken)
      // );
      state.accessToken = action.payload?.accessToken;
      // state.refreshToken = action.payload.refreshToken;
    },
  },
});

export default authentication.reducer;
export const { toggleAuthSelection, toggleLoggedIn, setAuthenticationTokens } =
  authentication.actions;
