import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import jobSlice from "./slice/jobSlice";
const store = configureStore({ reducer: { auth: authSlice, job: jobSlice } });
export default store;
