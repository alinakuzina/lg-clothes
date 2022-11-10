import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userSlice } from "./User/UserReducer";
import { categoriesSlice } from "./Categories/CategoriesReducer";
import { productsSlice } from "./Products/ProductsReducer";
import { cartSlice } from "./Cart/CartReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  categories: categoriesSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
});

//for storage
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//root-reducer
export const store = configureStore({
  reducer: persistedReducer,
  //see login only in development
  middleware: [logger, thunk],
  // middleware: [process.env.NODE_ENV === "development" && logger, thunk],
});

export const persistor = persistStore(store);
