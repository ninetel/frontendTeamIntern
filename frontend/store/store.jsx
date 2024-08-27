import { configureStore } from "@reduxjs/toolkit";
// import resetPasswordSlice from './slices/resetPasswordSlice';
import { useDispatch, useSelector } from "react-redux";
import authenticationSlice from "./slices/authenticationSlice";
import allUsersSlice from "./slices/allUsersSlice";
import currentLoggedInUserSlice from "./slices/currentLoggedInUserSlice";

const store = configureStore({
  reducer: {
    currentLoggedInUser: currentLoggedInUserSlice,
    allUsers: allUsersSlice,
    authentication: authenticationSlice,
    // resetPassword: resetPasswordSlice
  },
});

export const useAppDispatch = () => {
  return useDispatch();
};
export const useAppSelector = useSelector;
export default store;
