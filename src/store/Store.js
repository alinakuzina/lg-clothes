import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userSlice } from "./User/UserReducer";
import { categoriesSlice } from "./Categories/CategoriesReducer";
import { ProductsSlice } from "./Products/ProductsReducer";
//root-reducer
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    categories: categoriesSlice.reducer,
    products: ProductsSlice.reducer,
  },
  middleware: [logger],
});
