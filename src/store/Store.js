import { applyMiddleware, compose, middleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./RoodReducer";

//root-reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});
