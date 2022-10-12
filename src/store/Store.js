import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userReducer } from "./User/UserReducer";
import { categoriesSlice } from "./Categories/CategoriesReducer";
//root-reducer
export const store = configureStore({
  reducer: { user: userReducer, categories: categoriesSlice.reducer },
  middleware: [logger],
});
