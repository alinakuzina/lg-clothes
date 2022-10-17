import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsData } from "./ProductsAction";

const PRODUCTS_INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
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
    builder.addCase(fetchProductsData.pending, (state, action) => {
      state.error = false;
      state.isLoading = true;
    });
  },
});

export const productsActions = productsSlice.actions;

// export const fetchProductsData = (url) => {
//   return async (dispatch) => {
//     dispatch(productsActions.getProductsStart());
//     try {
//       let newProducts = await recieveProducts(url);
//       if (newProducts.length > 0) {
//         newProducts.forEach((el) => {
//           if (el.variantSizes.length === 0) {
//             el.variantSizes.push({ filterCode: "one size", orderFilter: 1 });
//           }
//         });
//         dispatch(
//           productsActions.fetchProductsSuccess({ products: newProducts })
//         );
//       }
//     } catch (err) {
//       console.log(err + "No such document!");
//       dispatch(productsActions.getProductsFailed());
//     }
//   };
// };
