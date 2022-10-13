import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userSlice } from "./User/UserReducer";
import { categoriesSlice } from "./Categories/CategoriesReducer";
import { productsSlice } from "./Products/ProductsReducer";
import { cartSlice } from "./Cart/CartReducer";
//root-reducer
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: [logger],
});
