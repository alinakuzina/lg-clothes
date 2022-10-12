import { categoriesArray } from "../../utilits/Categories";
import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INITIAL_STATE = { categories: categoriesArray };

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    recieveCategories(state, action) {
      state.categories = action.payload.categories;
    },
  },
});

export const categoriesAction = categoriesSlice.actions;
