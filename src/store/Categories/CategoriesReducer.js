import { categoriesArray } from "../../utilits/Categories";
import { CATEGORIES_ACTION_TYPES } from "./CategoriesTypes";
import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INITIAL_STATE = { categories: categoriesArray };

// createSlice({
//   name: "categories",
//   initialState: { categories: categoriesArray },
//   reducers: {
//     recieveCategories() {},

//   },
// });

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPES.RECIEVE_CATEGORIES_ARRAY:
      return { categories: payload };
    default:
      return state;
  }
};
