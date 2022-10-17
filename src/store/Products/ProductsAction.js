import { productsActions } from "./ProductsReducer";
import { recieveProducts } from "../../utilits/Farebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "products/fetchData",
  async (url) => {
    try {
      let newProducts = await recieveProducts(url);
      if (newProducts.length > 0) {
        newProducts.forEach((el) => {
          if (el.variantSizes.length === 0) {
            el.variantSizes.push({ filterCode: "one size", orderFilter: 1 });
          }
        });
        return { products: newProducts };
      } else {
        console.log("No such document!");
        return {};
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
