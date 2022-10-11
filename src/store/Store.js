import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userReducer } from "./User/UserReducer";
import { categoriesReducer } from "./Categories/CategoriesReducer";

//root-reducer
export const store = configureStore({
  reducer: { user: userReducer, categories: categoriesReducer },
  middleware: [logger],
});
