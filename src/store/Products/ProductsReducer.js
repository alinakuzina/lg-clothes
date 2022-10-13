import { createSlice } from "@reduxjs/toolkit";

const PRODUCTS_INITIAL_STATE = {
  products: [],
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState: PRODUCTS_INITIAL_STATE,
  reducers: {
    recieveProducts(state, action) {
      state.products = action.payload.products;
    },
  },
});

export const productsActions = ProductsSlice.actions;
