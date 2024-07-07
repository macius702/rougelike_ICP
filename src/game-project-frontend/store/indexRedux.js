import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import profileSlice from "./profileSlice";

const store = configureStore({
  reducer: { profile: profileSlice },
  middleware: [thunk],
});

export default store;
