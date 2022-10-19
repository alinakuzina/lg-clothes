import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsData } from "./ProductsAction";

const PRODUCTS_INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
  favorites: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState: PRODUCTS_INITIAL_STATE,
  reducers: {
    fetchProductsSuccess(state, action) {
      state.products = action.payload.products;
      state.isLoading = false;
    },
    getProductsFailed(state, action) {
      state.error = action.payload;
      state.error.isLoading = false;
    },
    getProductsStart(state) {
      state.error = false;
      state.isLoading = true;
    },
    addToFavorites(state, action) {
      console.log(state);
      state.favorites.push(action.payload.item);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (el) => el.articleCodes[0] !== action.payload.item.articleCodes[0]
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProductsData.pending, (state, action) => {
      state.error = false;
      state.isLoading = true;
    });
    builder.addCase(fetchProductsData.fulfilled, (state, action) => {
      if (action.payload.products) {
        state.error = false;
        state.isLoading = false;
        state.products = action.payload.products;
      }
    });
    builder.addCase(fetchProductsData.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export const productsActions = productsSlice.actions;
