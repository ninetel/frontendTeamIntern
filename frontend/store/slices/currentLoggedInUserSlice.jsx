import { createSlice } from "@reduxjs/toolkit";

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

const currentUserId = getParsedLocalStorageItem("currentUserId");
const currentUserName = getParsedLocalStorageItem("currentUserName");
const currentUserEmail = getParsedLocalStorageItem("currentUserEmail");
const currentUserPhoneNumber = getParsedLocalStorageItem(
  "currentUserPhoneNumber"
);
const currentUserRole = getParsedLocalStorageItem("currentUserRole");
const currentUserHasAnsweredQuestions = getParsedLocalStorageItem(
  "currentUserHasAnsweredQuestions"
);

const initialState = {
  userInfo: {
    id: currentUserId,
    email: currentUserEmail,
    name: currentUserName,
    phoneNumber: currentUserPhoneNumber,
    hasAnsweredQuestions: currentUserHasAnsweredQuestions,
    role: currentUserRole,
  },
};

const currentLoggedInUserSlice = createSlice({
  name: "currentLoggedInUserSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("action-------->", action.payload);
      state.userInfo.id = action.payload?._id;
      state.userInfo.email = action.payload?.email;
      state.userInfo.name = action.payload?.name;
      state.userInfo.phoneNumber = action.payload?.phoneNumber;
      state.userInfo.role = action.payload?.role;
      state.userInfo.currentUserHasAnsweredQuestions =
        action.payload?.hasAnsweredQuestions;
      localStorage.setItem(
        "currentUserId",
        JSON?.stringify(state.userInfo?.id)
      );
      localStorage.setItem(
        "currentUserName",
        JSON?.stringify(state.userInfo?.name)
      );
      localStorage.setItem(
        "currentUserEmail",
        JSON?.stringify(state.userInfo?.email)
      );
      localStorage.setItem(
        "currentUserPhoneNumber",
        JSON?.stringify(state.userInfo?.phoneNumber)
      );
      localStorage.setItem(
        "currentUserRole",
        JSON?.stringify(state.userInfo?.role)
      );
      localStorage.setItem(
        "currentUserHasAnsweredQuestions",
        JSON?.stringify(state.userInfo?.currentUserHasAnsweredQuestions)
      );
    },
  },
});

console.log(
  "currentLoggedInUserSlice.userInfo -----++++++",
  currentLoggedInUserSlice.userInfo
);

export default currentLoggedInUserSlice.reducer;
export const { setCurrentUser } = currentLoggedInUserSlice.actions;
